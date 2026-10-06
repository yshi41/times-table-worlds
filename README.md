# Times Table Worlds

A times-table game for the kids, in the Spelling Worlds worlds. Live at https://yshi41.github.io/times-table-worlds/

Three ways to play: a lane run (steer into the right answer), a boss battle after every run, and a two-player
Sibling Showdown. Facts go from 1×1 to 9×9. Progress saves online only, through the Worker in `worker/`;
nothing is ever kept in the browser.

## Layout

- `index.html` is the built page that GitHub Pages serves. Do not edit it by hand.
- `src/template.html` and `src/game.js` are the sources. `node build.js` rebuilds `index.html`
  (and, with a path argument, the body of the claude.ai artifact copy).
  The build copies the palettes, scenes and characters from the sibling `spelling-worlds` repo's last commit.
- `worker/` is the save service (Cloudflare Worker + D1, tables `tt_saves` and `tt_history` in the
  Spelling Worlds database). Deploy from `worker/` with wrangler and `CLOUDFLARE_API_TOKEN` set.
- `test/` holds the headless Chrome checks: `npm install` in `test/`, then `node test.js ../index.html`.
  They run against an in-memory stand-in for the save service and never touch the real saves.
