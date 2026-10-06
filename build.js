/* Builds the game from src/ plus the Spelling Worlds palettes, scenes and characters.
   The Spelling Worlds code is read from that repo's last commit (git show HEAD:index.html) by named
   anchors, never by line number, because that working copy may be mid-edit.
   Outputs: index.html (GitHub Pages, saves to the Worker) and, when a path is given, the artifact
   body for claude.ai (saves to the artifact's db). */
const fs = require('fs'), path = require('path'), cp = require('child_process');
const D = __dirname, SW = path.join(D, '..', 'spelling-worlds');
const WORKER = 'https://times-table-saves.yshi41.workers.dev';
const src = cp.execSync('git show HEAD:index.html', { cwd: SW, maxBuffer: 1 << 26 }).toString();
const L = src.split(/\r?\n/);
const at = (re, from = 0) => { for (let i = from; i < L.length; i++) if (re.test(L[i])) return i; throw new Error('anchor not found: ' + re); };
const span = (a, b, inclEnd) => { const i = at(a), j = at(b, i + 1); return L.slice(i, inclEnd ? j + 1 : j).join('\n'); };
const css = '/* from Spelling Worlds: world palettes, ambient bubbles, scenes, character moods */\n' + span(/^:root\{/, /^\.axo-name\{/, true);
/* worlds and level lists; each world's scene drawing (buildScene itself is the game's own); the character
   helpers and DRAW table; the characters of every world. Outfit pieces, store and level logic stay behind. */
const parts = [[/^var RAINBOW=/, /^SLOTS\.feet=/, true], [/^function lagoonTop\(/, /^function buildScene\(/], [/^var axoCount=0/, /^function axoSVG\(/], [/^DRAW\.axolotl=/, /^function lagoonPieces\(/], [/^function bwBow\(/, /^function bowsPieces\(/], [/^function bbPearls\(/, /^function bobaPieces\(/], [/^function birdSVG\(/, /^function birdsPieces\(/]];
const js = '/* from Spelling Worlds: worlds, scenes and characters */\nvar CUR_WORLD=\'lagoon\';function world(){return CUR_WORLD;}\n' + parts.map(p => { const s = span(p[0], p[1], p[2]); new Function(s); return s; }).join('\n');
let body = fs.readFileSync(path.join(D, 'src', 'template.html'), 'utf8');
body = body.replace('/*@@SW_CSS@@*/', () => css).replace('/*@@SW_JS@@*/', () => js).replace('/*@@GAME_JS@@*/', () => fs.readFileSync(path.join(D, 'src', 'game.js'), 'utf8'));
for (const m of body.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(m[1]);
if (/localStorage|sessionStorage|indexedDB/.test(body)) throw new Error('browser storage must never be used: progress lives only on the save service');

/* GitHub Pages: a complete document; the title moves into the head */
const title = (body.match(/<title>.*?<\/title>/) || [''])[0];
const pagesBody = body.replace(title + '\n', '');
const icon = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#9BDCE0"/><text x="32" y="44" font-family="Arial Rounded MT Bold,Arial,sans-serif" font-weight="700" font-size="36" text-anchor="middle" fill="#E8809B">×</text></svg>');
const pages = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + title + '\n<meta name="theme-color" content="#9BDCE0">\n<link rel="icon" href="' + icon + '">\n'
  + '<script>window.TT_CLOUD=window.TT_CLOUD||\'' + WORKER + '\';</script>\n'
  + '<style>:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif;background:#CFF0F1;color:#173A42}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n' + pagesBody + '\n</body>\n</html>\n';
fs.writeFileSync(path.join(D, 'index.html'), pages);
console.log('index.html', pages.length, 'bytes');
const artifact = process.argv[2];
if (artifact) { fs.writeFileSync(artifact, body); console.log('artifact', artifact, body.length, 'bytes'); }
