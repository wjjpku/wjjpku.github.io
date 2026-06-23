import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  formatCommitMessage,
  publishSourceChanges,
  runProcess
} from "./publish.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "author-studio-publish-"));
  const remote = path.join(root, "remote.git");
  const repo = path.join(root, "repo");
  const blogRoot = path.join(repo, "blog");
  await mkdir(path.join(blogRoot, "source", "photos"), { recursive: true });
  await runProcess("git", ["init", "--bare", remote], { cwd: root });
  await runProcess("git", ["init", "-b", "main", repo], { cwd: root });
  await runProcess("git", ["config", "user.name", "Author Studio Test"], { cwd: repo });
  await runProcess("git", ["config", "user.email", "studio@example.test"], { cwd: repo });
  await runProcess("git", ["remote", "add", "origin", remote], { cwd: repo });
  await writeFile(path.join(blogRoot, "package.json"), JSON.stringify({
    scripts: {
      build: "node -e \"console.log('build ok')\""
    }
  }));
  await writeFile(path.join(blogRoot, "source", "photos", "photos.json"), "[]\n");
  await runProcess("git", ["add", "blog"], { cwd: repo });
  await runProcess("git", ["commit", "-m", "initial"], { cwd: repo });
  await runProcess("git", ["push", "-u", "origin", "main"], { cwd: repo });
  return { repo, blogRoot };
}

test("formatCommitMessage combines user content and time", () => {
  assert.equal(
    formatCommitMessage("更新生活照片", new Date("2025-11-29T08:09:10")),
    "更新生活照片 - 2025-11-29 08:09:10"
  );
});

test("publishSourceChanges builds, commits and pushes current source changes", async () => {
  const { repo, blogRoot } = await fixture();
  const photosPath = path.join(blogRoot, "source", "photos", "photos.json");
  await writeFile(photosPath, "[{\"src\":\"/photos/a.webp\"}]\n");

  const result = await publishSourceChanges({
    blogRoot,
    content: "更新生活照片",
    now: new Date("2025-11-29T08:09:10")
  });

  assert.equal(result.ok, true);
  assert.equal(result.noChanges, false);
  assert.match(result.output, /build ok/);
  assert.match(result.output, /git push origin main/);

  const latestMessage = await runProcess("git", ["log", "-1", "--pretty=%B"], { cwd: repo });
  assert.equal(latestMessage.output.trim(), "更新生活照片 - 2025-11-29 08:09:10");
  const remoteContent = await runProcess("git", [
    "show",
    "origin/main:blog/source/photos/photos.json"
  ], { cwd: repo });
  assert.match(remoteContent.output, /a\.webp/);
});

test("publishSourceChanges refuses empty commit content", async () => {
  const { blogRoot } = await fixture();
  await assert.rejects(
    publishSourceChanges({ blogRoot, content: " " }),
    /请填写提交内容/
  );
});
