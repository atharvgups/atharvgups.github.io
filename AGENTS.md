# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Jekyll static site** (personal portfolio) with a **Node + Gulp** build toolchain (Sass, JS lint/uglify, image minification, BrowserSync). There is no backend, database, or API — "end to end" just means building and viewing the rendered site.

### Toolchain versions (non-obvious)
- Node must be pinned to **v10.13.0** (see `.nvmrc`). The old toolchain (`node-sass`@4, `gulp-imagemin`@6, Gulp 4) does NOT build on modern Node. The VM also has a `/exec-daemon/node` shim (Node 22) that sits ahead of nvm in `PATH`, so you must explicitly prepend the Node 10 bin dir before running any `npm`/`gulp` command:
  ```
  export PATH="$HOME/.nvm/versions/node/v10.13.0/bin:$PATH"
  ```
- Ruby/Jekyll gems are installed **globally** (there is no `Gemfile`): `jekyll`, `sass`, `bundler`, `jekyll-minifier`, `jekyll-sitemap`. Jekyll resolves to a system `ruby` (3.2.x) on PATH and works with Node 10 prepended.

### Commands (run with the Node 10 PATH prepended)
- Install JS deps: `npm install`
- Build site: `npm run build` → `gulp build` (sass → scripts(lint) → images → jekyll-build), output in `_site/`.
- Lint JS: the `scripts` gulp task runs ESLint (`npx gulp scripts`). There is no standalone test suite.
- Dev server: `npm start` → `gulp serve --watch`. Serves `_site/` via BrowserSync at **http://localhost:3000** (UI on 3001). Editing `_includes/*.html`, `*.yml`, or `_scss`/`_scripts` triggers a Jekyll rebuild + live reload.

### Gotchas
- The `serve` task only runs `jekyll-dev` before serving; CSS/JS come from the committed `css/`/`js/` dirs (gulp writes builds to both `_site/` and the root `css/`/`js/`). Run `npm run build` first if styles/scripts look stale.
- `npm install` under npm 6 (Node 10) may rewrite `package-lock.json` into an older lockfile format — avoid committing that incidental churn.
