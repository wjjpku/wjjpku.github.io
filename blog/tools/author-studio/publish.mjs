import { spawn } from "node:child_process";

export function runProcess(command, args = [], options = {}) {
  return new Promise(resolve => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      shell: options.shell || false,
      env: {
        ...process.env,
        ...options.env
      }
    });
    let output = "";
    child.stdout.on("data", chunk => { output += chunk.toString(); });
    child.stderr.on("data", chunk => { output += chunk.toString(); });
    child.on("error", error => resolve({ code: 1, output: error.message }));
    child.on("close", code => resolve({ code, output }));
  });
}

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

export function formatCommitMessage(content, date = new Date()) {
  const summary = String(content || "").trim().replace(/\s+/g, " ");
  if (!summary) throw new Error("请填写提交内容。");
  return `${summary} - ${formatDate(date)}`;
}

function commandLine(command, args = []) {
  return [command, ...args].join(" ");
}

async function runChecked(command, args, options, output) {
  output.push(`$ ${commandLine(command, args)}`);
  const result = await runProcess(command, args, options);
  if (result.output.trim()) output.push(result.output.trim());
  if (result.code !== 0) {
    const error = new Error(`${commandLine(command, args)} 执行失败。`);
    error.output = output.join("\n\n");
    throw error;
  }
  return result;
}

export async function publishSourceChanges(options = {}) {
  const blogRoot = options.blogRoot;
  const message = formatCommitMessage(options.content, options.now);
  const output = [];
  const gitEnv = {
    GIT_SSH_COMMAND: "ssh -o HostName=ssh.github.com -p 443 -o StrictHostKeyChecking=accept-new"
  };

  const repoRootResult = await runChecked("git", ["rev-parse", "--show-toplevel"], {
    cwd: blogRoot
  }, output);
  const repoRoot = repoRootResult.output.trim();

  const branchResult = await runChecked("git", ["branch", "--show-current"], {
    cwd: repoRoot
  }, output);
  const branch = branchResult.output.trim();
  if (branch !== "main") {
    throw new Error(`当前分支是 ${branch || "(detached)"}，请切到 main 后再提交。`);
  }

  const statusResult = await runChecked("git", ["status", "--short", "--untracked-files=all"], {
    cwd: repoRoot
  }, output);
  if (!statusResult.output.trim()) {
    return {
      ok: true,
      noChanges: true,
      message,
      output: `${output.join("\n\n")}\n\n没有需要提交的改动。`
    };
  }

  await runChecked("npm", ["run", "build"], { cwd: blogRoot }, output);
  await runChecked("git", ["add", "-A"], { cwd: repoRoot }, output);

  const staged = await runProcess("git", ["diff", "--cached", "--quiet"], { cwd: repoRoot });
  if (staged.code === 0) {
    return {
      ok: true,
      noChanges: true,
      message,
      output: `${output.join("\n\n")}\n\n没有需要提交的源码改动。`
    };
  }

  await runChecked("git", ["commit", "-m", message], { cwd: repoRoot }, output);
  await runChecked("git", ["push", "origin", "main"], {
    cwd: repoRoot,
    env: gitEnv
  }, output);

  return {
    ok: true,
    noChanges: false,
    message,
    output: output.join("\n\n")
  };
}
