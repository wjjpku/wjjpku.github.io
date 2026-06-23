#!/usr/bin/env node
import { chmod, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, "../..");
const appName = "Author Studio.app";
const target = path.resolve(process.argv[2] || path.join(os.homedir(), "Desktop", appName));
const contentsDir = path.join(target, "Contents");
const macosDir = path.join(contentsDir, "MacOS");
const resourcesDir = path.join(contentsDir, "Resources");
const launcherPath = path.join(macosDir, "Author Studio");
const plistPath = path.join(contentsDir, "Info.plist");

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

const launcher = `#!/bin/bash
set -u

BLOG_ROOT=${shellQuote(blogRoot)}
URL="http://127.0.0.1:4050/"
LOG_DIR="$HOME/Library/Logs"
LOG_FILE="$LOG_DIR/wjjpku-author-studio.log"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"

mkdir -p "$LOG_DIR"

if ! /usr/bin/curl -fsS "$URL" >/dev/null 2>&1; then
  (
    cd "$BLOG_ROOT" || exit 1
    exec npm run studio
  ) >>"$LOG_FILE" 2>&1 &

  for attempt in {1..40}; do
    if /usr/bin/curl -fsS "$URL" >/dev/null 2>&1; then
      break
    fi
    sleep 0.25
  done
fi

/usr/bin/open "$URL"
`;

const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>zh_CN</string>
  <key>CFBundleExecutable</key>
  <string>Author Studio</string>
  <key>CFBundleIdentifier</key>
  <string>io.github.wjjpku.author-studio</string>
  <key>CFBundleName</key>
  <string>Author Studio</string>
  <key>CFBundleDisplayName</key>
  <string>Author Studio</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>10.15</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
`;

await rm(target, { recursive: true, force: true });
await mkdir(macosDir, { recursive: true });
await mkdir(resourcesDir, { recursive: true });
await writeFile(launcherPath, launcher, "utf8");
await chmod(launcherPath, 0o755);
await writeFile(plistPath, plist, "utf8");

console.log(`Installed ${target}`);
