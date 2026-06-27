import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const sourceRoot = join(root, 'source');
const publicRoot = join(root, 'public');
const chinesePattern = /[\u3400-\u9fff]/;

function walk(dir, paths = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'public' || entry === '.deploy_git') continue;
    const fullPath = join(dir, entry);
    paths.push(fullPath);
    if (statSync(fullPath).isDirectory()) walk(fullPath, paths);
  }
  return paths;
}

const sourcePaths = walk(sourceRoot)
  .map(path => relative(root, path))
  .filter(path => chinesePattern.test(path));

assert.deepEqual(sourcePaths, [], `Source paths must be English-only:\n${sourcePaths.join('\n')}`);

if (existsSync(publicRoot)) {
  const publicPaths = walk(publicRoot)
    .map(path => relative(root, path))
    .filter(path => chinesePattern.test(path));

  assert.deepEqual(publicPaths, [], `Generated public paths must be English-only:\n${publicPaths.join('\n')}`);
}

const content = walk(sourceRoot)
  .filter(path => statSync(path).isFile())
  .filter(path => /\.(md|json|yml|yaml|js|css|html)$/i.test(path))
  .flatMap(path => {
    const text = readFileSync(path, 'utf8');
    const matches = text.match(/(?:\/post_photos|\/tags|\/categories)\/[^\s"'`<>)\]]*[\u3400-\u9fff][^\s"'`<>)\]]*/g);
    return matches ? matches.map(match => `${relative(root, path)}: ${match}`) : [];
  });

assert.deepEqual(content, [], `URL path references must be English-only:\n${content.join('\n')}`);

const frontMatterTaxonomy = walk(join(sourceRoot, '_posts'))
  .filter(path => path.endsWith('.md'))
  .flatMap(path => {
    const text = readFileSync(path, 'utf8');
    const frontMatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const lines = frontMatter.split(/\r?\n/);
    const failures = [];
    let inTaxonomy = false;

    for (const [index, line] of lines.entries()) {
      if (/^(tags|categories):\s*$/.test(line)) {
        inTaxonomy = true;
        continue;
      }
      if (/^\S/.test(line)) inTaxonomy = false;
      if (inTaxonomy && chinesePattern.test(line)) {
        failures.push(`${relative(root, path)}:${index + 2}: ${line}`);
      }
    }

    return failures;
  });

assert.deepEqual(frontMatterTaxonomy, [], `Tags and categories must be English-only:\n${frontMatterTaxonomy.join('\n')}`);

console.log('English path check passed');
