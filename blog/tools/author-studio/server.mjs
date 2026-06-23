#!/usr/bin/env node
import http from "node:http";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, "../..");
const sourceRoot = path.join(blogRoot, "source");
const optimizerScript = path.join(__dirname, "optimize-image.py");
const port = Number(process.env.STUDIO_PORT || process.argv[2] || 4050);
const maxBodyBytes = 80 * 1024 * 1024;

function formatDate(date = new Date()) {
  const pad = value => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + " " + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(":");
}

function today() {
  return formatDate(new Date()).slice(0, 10);
}

function normalizeDate(value) {
  if (!value) return formatDate();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value} 00:00:00`;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    return `${value.replace("T", " ")}:00`;
  }
  return value;
}

function yamlString(value) {
  return `'${String(value || "").replace(/'/g, "''")}'`;
}

function splitList(value) {
  return String(value || "")
    .split(/[,，\n]/)
    .map(item => item.trim())
    .filter(Boolean);
}

function slugify(value) {
  const slug = String(value || "")
    .normalize("NFKC")
    .trim()
    .replace(/[\\/:*?"<>|#%{}^~[\]`;]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `post-${formatDate().replace(/[-: ]/g, "")}`;
}

function safeFileName(value, fallback = "file") {
  const parsed = path.parse(String(value || fallback));
  const name = slugify(parsed.name || fallback);
  const ext = parsed.ext.replace(/[^.\w]/g, "").toLowerCase();
  return `${name}${ext}`;
}

function mimeExt(mime) {
  const map = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg"
  };
  return map[mime] || "";
}

function uniqueCandidate(targetDir, baseName, ext) {
  let candidate = `${baseName}${ext}`;
  let counter = 2;
  while (existsSync(path.join(targetDir, candidate))) {
    candidate = `${baseName}-${counter}${ext}`;
    counter += 1;
  }
  return {
    candidate,
    fullPath: path.join(targetDir, candidate)
  };
}

function runProcess(command, args) {
  return new Promise(resolve => {
    const child = spawn(command, args);
    let output = "";
    child.stdout.on("data", chunk => { output += chunk.toString(); });
    child.stderr.on("data", chunk => { output += chunk.toString(); });
    child.on("error", error => resolve({ code: 1, output: error.message }));
    child.on("close", code => resolve({ code, output }));
  });
}

let cwebpAvailable;
let pythonOptimizerAvailable;
let pythonOptimizerCommand;

async function canUseCwebp() {
  if (cwebpAvailable !== undefined) return cwebpAvailable;
  cwebpAvailable = (await runProcess("cwebp", ["-version"])).code === 0;
  return cwebpAvailable;
}

async function canUsePythonOptimizer() {
  if (pythonOptimizerAvailable !== undefined) return pythonOptimizerAvailable;
  if (!existsSync(optimizerScript)) {
    pythonOptimizerAvailable = false;
  } else {
    const candidates = [
      process.env.AUTHOR_STUDIO_PYTHON,
      "python3",
      "/Library/Frameworks/Python.framework/Versions/3.12/bin/python3",
      "/opt/homebrew/bin/python3",
      "/usr/local/bin/python3",
      "/usr/bin/python3"
    ].filter(Boolean);
    for (const candidate of candidates) {
      if ((await runProcess(candidate, [optimizerScript, "--help"])).code === 0) {
        pythonOptimizerCommand = candidate;
        pythonOptimizerAvailable = true;
        return pythonOptimizerAvailable;
      }
    }
    pythonOptimizerAvailable = false;
  }
  return pythonOptimizerAvailable;
}

async function imageSize(filePath) {
  const result = await runProcess("sips", ["-g", "pixelWidth", "-g", "pixelHeight", filePath]);
  if (result.code !== 0) return null;
  const width = Number(result.output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(result.output.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) return null;
  return { width, height };
}

function scaledSize(size, maxEdge) {
  if (!size) return { width: maxEdge, height: 0 };
  const scale = Math.min(1, maxEdge / Math.max(size.width, size.height));
  return {
    width: Math.max(1, Math.round(size.width * scale)),
    height: Math.max(1, Math.round(size.height * scale))
  };
}

function decodeDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?;base64,(.*)$/);
  if (!match) throw Object.assign(new Error("文件数据格式不正确。"), { status: 400 });
  return {
    mime: match[1] || "application/octet-stream",
    buffer: Buffer.from(match[2], "base64")
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBodyBytes) {
      throw Object.assign(new Error("上传内容太大。"), { status: 413 });
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(value, null, 2));
}

async function sendStatic(response, filePath, contentType) {
  const data = await readFile(filePath);
  response.writeHead(200, {
    "content-type": contentType,
    "cache-control": "no-store"
  });
  response.end(data);
}

async function optimizeUpload(buffer, mime, targetDir, baseName, sourceExt, options) {
  const shouldOptimize = options.optimize !== false
    && mime !== "image/gif"
    && mime !== "image/svg+xml";
  if (!shouldOptimize) return null;

  const { candidate, fullPath } = uniqueCandidate(targetDir, baseName, ".webp");
  const tempPath = path.join(targetDir, `.${baseName}-${Date.now()}-${Math.random().toString(16).slice(2)}${sourceExt}`);
  await writeFile(tempPath, buffer);
  if (await canUsePythonOptimizer()) {
    const result = await runProcess(pythonOptimizerCommand, [
      optimizerScript,
      tempPath,
      fullPath,
      "--max-edge",
      String(options.maxEdge || 1800),
      "--quality",
      String(options.quality || 82)
    ]);
    await rm(tempPath, { force: true });
    if (result.code === 0 && existsSync(fullPath)) return { candidate, fullPath };
    return null;
  }
  if (!await canUseCwebp()) {
    await rm(tempPath, { force: true });
    return null;
  }
  const size = scaledSize(await imageSize(tempPath), options.maxEdge || 1800);
  const result = await runProcess("cwebp", [
    "-quiet",
    "-q",
    String(options.quality || 82),
    "-resize",
    String(size.width),
    String(size.height),
    tempPath,
    "-o",
    fullPath
  ]);
  await rm(tempPath, { force: true });
  if (result.code !== 0 || !existsSync(fullPath)) return null;
  return { candidate, fullPath };
}

async function saveUploads(files, targetDir, publicPrefix, options = {}) {
  if (!files.length) return [];
  await mkdir(targetDir, { recursive: true });
  const saved = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const { mime, buffer } = decodeDataUrl(file.dataUrl);
    if (!mime.startsWith("image/")) {
      throw Object.assign(new Error("目前只支持上传图片。"), { status: 400 });
    }
    const original = safeFileName(file.name || `image-${index + 1}${mimeExt(mime)}`);
    const parsed = path.parse(original);
    const ext = parsed.ext || mimeExt(mime) || ".bin";
    let optimized = await optimizeUpload(buffer, mime, targetDir, parsed.name, ext, options);
    if (!optimized) {
      optimized = uniqueCandidate(targetDir, parsed.name, ext);
      await writeFile(optimized.fullPath, buffer);
    }
    saved.push({
      filename: optimized.candidate,
      publicPath: `${publicPrefix}/${optimized.candidate}`,
      alt: file.alt || parsed.name
    });
  }
  return saved;
}

function imageMarkdown(images) {
  if (!images.length) return "";
  return images
    .map((image, index) => `![${image.alt || `图片${index + 1}`}](${image.publicPath})`)
    .join("\n\n") + "\n\n";
}

async function createPost(payload) {
  const title = String(payload.title || "").trim();
  const content = String(payload.content || "").trim();
  if (!title) throw Object.assign(new Error("请填写标题。"), { status: 400 });
  if (!content) throw Object.assign(new Error("请填写正文。"), { status: 400 });

  const kind = payload.kind === "note" ? "note" : "thought";
  const slug = slugify(payload.slug || title);
  const postPath = path.join(sourceRoot, "_posts", `${slug}.md`);
  if (existsSync(postPath)) {
    throw Object.assign(new Error(`已存在同名文章：${slug}.md`), { status: 409 });
  }

  const images = await saveUploads(
    payload.images || [],
    path.join(sourceRoot, "post_photos", slug),
    `/post_photos/${slug}`,
    { maxEdge: 1800, quality: 84 }
  );
  const tags = splitList(payload.tags);
  if (kind === "note" && !tags.includes("笔记")) tags.unshift("笔记");
  if (kind === "thought" && !tags.includes("随笔")) tags.unshift("随笔");

  const categories = splitList(payload.categories || (kind === "note" ? "笔记" : "日常"));
  const frontMatter = [
    "---",
    `title: ${yamlString(title)}`,
    `date: ${normalizeDate(payload.date)}`,
    "tags:",
    ...tags.map(tag => `  - ${tag}`),
    "categories:",
    ...categories.map(category => `  - ${category}`),
    images[0] ? `cover: ${images[0].publicPath}` : "",
    "---",
    ""
  ].filter(line => line !== "").join("\n");

  const markdown = `${frontMatter}${imageMarkdown(images)}${content}\n`;
  await writeFile(postPath, markdown, "utf8");
  return {
    file: path.relative(blogRoot, postPath),
    slug,
    images: images.map(image => image.publicPath)
  };
}

async function addPhotos(payload) {
  const files = payload.images || [];
  if (!files.length) throw Object.assign(new Error("请选择照片。"), { status: 400 });

  const date = payload.date || today();
  const caption = String(payload.caption || "").trim();
  const alt = String(payload.alt || caption || "生活照片").trim();
  const images = await saveUploads(files, path.join(sourceRoot, "photos"), "/photos", {
    maxEdge: 1800,
    quality: 82
  });
  const jsonPath = path.join(sourceRoot, "photos", "photos.json");
  const current = JSON.parse(await readFile(jsonPath, "utf8"));
  const entries = images.map(image => ({
    src: image.publicPath,
    alt,
    title: caption,
    date
  }));
  await writeFile(jsonPath, `${JSON.stringify([...entries, ...current], null, 2)}\n`, "utf8");
  return {
    file: path.relative(blogRoot, jsonPath),
    photos: entries
  };
}

function runShell(command) {
  return new Promise(resolve => {
    const child = spawn(command, {
      cwd: blogRoot,
      shell: true,
      env: {
        ...process.env,
        GIT_SSH_COMMAND: "ssh -o HostName=ssh.github.com -p 443 -o StrictHostKeyChecking=accept-new"
      }
    });
    let output = "";
    child.stdout.on("data", chunk => { output += chunk.toString(); });
    child.stderr.on("data", chunk => { output += chunk.toString(); });
    child.on("close", code => resolve({ code, output }));
  });
}

async function handleApi(request, response, pathname) {
  const payload = request.method === "POST" ? await readJsonBody(request) : {};
  if (pathname === "/api/post" && request.method === "POST") {
    return sendJson(response, 200, { ok: true, result: await createPost(payload) });
  }
  if (pathname === "/api/photos" && request.method === "POST") {
    return sendJson(response, 200, { ok: true, result: await addPhotos(payload) });
  }
  if (pathname === "/api/run" && request.method === "POST") {
    const action = payload.action;
    const commands = {
      build: "npm run clean && npm run build",
      deploy: "npm run deploy"
    };
    if (!commands[action]) throw Object.assign(new Error("未知操作。"), { status: 400 });
    const result = await runShell(commands[action]);
    return sendJson(response, result.code === 0 ? 200 : 500, { ok: result.code === 0, result });
  }
  return sendJson(response, 404, { ok: false, error: "Not found" });
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      return await handleApi(request, response, url.pathname);
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return await sendStatic(response, path.join(__dirname, "index.html"), "text/html; charset=utf-8");
    }
    return sendJson(response, 404, { ok: false, error: "Not found" });
  } catch (error) {
    return sendJson(response, error.status || 500, {
      ok: false,
      error: error.message || String(error)
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Author Studio: http://127.0.0.1:${port}`);
});
