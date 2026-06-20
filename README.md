# wjjpku.github.io

This repository contains the Hexo source for `wjjpku.github.io`.

## Branches

- `main`: editable Hexo source. Work here.
- `backup/before-cleanup-20260620`: local backup of the pre-cleanup state.

## Workflow

```bash
cd blog
npm install
npm run build
```

Push changes to `main` to deploy. GitHub Actions builds the Hexo site and publishes `blog/public` to GitHub Pages.

For local preview:

```bash
cd blog
npm run server
```

## Notes

- Root-level generated files are intentionally not tracked on `main`.
- `blog/public`, `blog/.deploy_git`, `blog/node_modules`, and `blog/db.json` are ignored build/cache directories.
- The AnZhiYu theme is vendored under `blog/themes/anzhiyu` so a fresh clone can rebuild the site without a broken submodule.
