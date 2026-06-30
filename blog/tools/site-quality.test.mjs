import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function walk(dir, paths = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".deploy_git") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, paths);
    else paths.push(fullPath);
  }
  return paths;
}

test("mobile and accessibility defaults stay usable", () => {
  const headTemplate = read("themes/anzhiyu/layout/includes/head.pug");
  const albumTemplate = read("themes/anzhiyu/layout/includes/page/album_detail.pug");
  const catalogCss = read("themes/anzhiyu/source/css/_extra/catalog_list/catalog_list.css");
  const categoryCss = read("themes/anzhiyu/source/css/_extra/categoryBar/categoryBar.css");
  const sidebarCss = read("themes/anzhiyu/source/css/_layout/sidebar.styl");
  const customCss = read("themes/anzhiyu/source/css/_extra/anzhiyu/custom.css");
  const postUiTemplate = read("themes/anzhiyu/layout/includes/mixins/post-ui.pug");
  const additionalJs = read("themes/anzhiyu/layout/includes/additional-js.pug");

  assert.doesNotMatch(headTemplate, /user-scalable\s*=\s*no/);
  assert.match(headTemplate, /initial-scale=1\.0/);
  assert.match(albumTemplate, /img\([^)]*alt=/);
  assert.match(catalogCss, /\.catalog-list-item\.selected a[\s\S]*color:\s*var\(--anzhiyu-black\)/);
  assert.match(categoryCss, /\.catalog-list-item\.select a[\s\S]*color:\s*var\(--anzhiyu-black\)/);
  assert.match(sidebarCss, /\.card-archive-list-date,[\s\S]*opacity:\s*0\.78/);
  assert.match(customCss, /mjx-container[\s\S]*overflow-x:\s*auto/);
  assert.match(postUiTemplate, /img\.post_bg\.nolazyload/);
  assert.match(postUiTemplate, /fetchpriority=['"]high['"]/);
  assert.match(postUiTemplate, /loading=['"]eager['"]/);
  assert.match(additionalJs, /secureBlankTargetLinks/);
  assert.match(additionalJs, /MutationObserver/);
});

test("project cards use native image loading instead of theme-only lazy placeholders", () => {
  const equipmentTemplate = read("themes/anzhiyu/layout/includes/page/equipment.pug");

  assert.match(equipmentTemplate, /img\.equipment-item-content-item-image\.nolazyload/);
  assert.match(equipmentTemplate, /src=url_for\(iten\.image\)/);
  assert.match(equipmentTemplate, /loading=['"]lazy['"]/);
  assert.match(equipmentTemplate, /decoding=['"]async['"]/);
  assert.doesNotMatch(equipmentTemplate, /data-lazy-src=url_for\(iten\.image\)/);
});

test("SEO discovery files are configured", () => {
  const packageJson = read("package.json");
  const robots = read("source/robots.txt");

  assert.match(packageJson, /"hexo-generator-sitemap"/);
  assert.match(robots, /^Sitemap: https:\/\/wjjpku\.github\.io\/sitemap\.xml$/m);
  assert.match(robots, /^Allow: \/$/m);
});

test("generated blank-target links are opener-safe when public exists", () => {
  const publicRoot = join(root, "public");
  if (!existsSync(publicRoot)) return;

  const failures = walk(publicRoot)
    .filter(file => file.endsWith(".html"))
    .flatMap(file => {
      const html = readFileSync(file, "utf8");
      const tags = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) ?? [];
      return tags
        .filter(tag => !/rel=["'][^"']*(noopener|noreferrer)/i.test(tag))
        .map(tag => `${relative(root, file)}: ${tag.slice(0, 180)}`);
    });

  assert.deepEqual(failures, [], `target="_blank" links need rel="noopener noreferrer":\n${failures.join("\n")}`);
});

test("generated site does not lock mobile zoom when public exists", () => {
  const publicRoot = join(root, "public");
  if (!existsSync(publicRoot)) return;

  const failures = walk(publicRoot)
    .filter(file => file.endsWith(".html"))
    .flatMap(file => {
      const html = readFileSync(file, "utf8");
      const viewport = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i)?.[0] ?? "";
      return /user-scalable\s*=\s*no/i.test(viewport) ? [relative(root, file)] : [];
    });

  assert.deepEqual(failures, [], `Viewport must not disable user zoom:\n${failures.join("\n")}`);
});
