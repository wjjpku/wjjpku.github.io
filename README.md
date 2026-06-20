# wjjpku.github.io

This repository separates the Hexo source from the generated GitHub Pages site.

## Branches

- `main`: editable Hexo source. Work here.
- `newhexo`: generated static site published by Hexo. Do not edit by hand.
- `backup/before-cleanup-20260620`: local backup of the pre-cleanup state.

## Workflow

```bash
cd blog
npm install
npm run build
npm run deploy
```

`npm run deploy` runs a clean Hexo build and publishes the generated files to the `newhexo` branch.

## Notes

- Root-level generated files are intentionally not tracked on `main`.
- `blog/public`, `blog/.deploy_git`, `blog/node_modules`, and `blog/db.json` are ignored build/cache directories.
- The AnZhiYu theme is vendored under `blog/themes/anzhiyu` so a fresh clone can rebuild the site without a broken submodule.
