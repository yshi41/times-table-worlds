/* Headless Chrome checks: node test.js ../index.html
   Every run talks to the in-memory stand-in in mockcloud.js, never to the real save service. */
const puppeteer = require('puppeteer-core');
const path = require('path'), fs = require('fs');
const { create } = require('./mockcloud.js');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const file = path.resolve(process.argv[2] || '../index.html');
const F = 'file:///' + file.replace(/\\/g, '/');
const wait = ms => new Promise(r => setTimeout(r, ms));
let n = 0, failed = 0;
const check = (ok, what) => { n++; if (!ok) { failed++; console.log('  FAIL', what); } };
const until = async (fn, ms = 20000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await fn()) return true; await wait(100); } return false; };

(async () => {
  const html = fs.readFileSync(file, 'utf8');
  check(!/localStorage|sessionStorage|indexedDB/.test(html), 'the page never mentions browser storage');
  check(/TT_CLOUD/.test(html), 'the page names the save service');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--mute-audio', '--disable-speech-api', '--disable-gpu'] });
  const errs = [];
  const newPage = async (mock, viewport) => {
    const p = await browser.newPage();
    /* the stand-in aborts requests on purpose (service down, real host blocked); those network notices are expected */
    p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::ERR_/.test(m.text())) errs.push('console: ' + m.text()); });
    await p.setViewport(viewport || { width: 1000, height: 780 });
    await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await mock.attach(p);
    /* browser storage is counted, and must stay at zero */
    await p.evaluateOnNewDocument(() => { window.__storageWrites = 0; for (const k of ['localStorage', 'sessionStorage']) { try { const s = window[k], set = s.setItem.bind(s); s.setItem = (...a) => { window.__storageWrites++; return set(...a); }; } catch (e) {} } });
    await p.goto(F); return p;
  };

  /* 1. loading: the player screen waits for the saves, then opens */
  const mock = create();
  mock.store.riley = { rev: 3, state: { cur: 100, stars: { 7: 1 }, best: { 7: 1234 }, bossLv: { 7: 2 }, facts: {}, skill: {}, owned: [], char: {}, look: null, games: 1, showdown: { wins: 0, played: 0 } } };
  let p = await newPage(mock);
  await until(() => p.evaluate(() => !document.querySelector('.profile-card').disabled));
  check(mock.stats.gets === 1, 'one GET loads every save'); check(mock.stats.realHits === 0, 'the real service is never called');
  check(await p.evaluate(() => document.querySelector('#saveNote').textContent.includes('save online')), 'the note says saves are online');
  check(await p.evaluate(() => document.querySelectorAll('.profile-card')[1].textContent.includes('100')), 'Riley\'s stored treats show on her card');
  await p.evaluate(() => document.querySelectorAll('.profile-card')[1].click()); await wait(300);
  check(await p.evaluate(() => document.querySelector('#tables .tbl:nth-child(7)').textContent.includes('Boss 2')), 'the 7s button shows the stored boss level');
  check(await p.evaluate(() => document.querySelectorAll('#tables .tbl:nth-child(7) .st.on').length === 1), 'the 7s button shows the stored star');

  /* 2. a run and a boss as Riley; another device saves in the meantime and the two copies merge */
  await p.click('#tables .tbl:nth-child(7)'); await wait(300);
  mock.store.riley = { rev: 4, state: Object.assign({}, mock.store.riley.state, { cur: 150, stars: { 7: 1, 8: 2 } }) };
  let gates = 0, lastQ = '';
  for (let i = 0; i < 1500; i++) {
    const s = await p.evaluate(() => { const G = window.__ttw.G; if (!G) return null; const g = G.gate; return { stage: G.stage, lane: G.ax.lane, gate: g && g.state === 'live' ? { ans: g.ans, q: g.q.x + 'x' + g.q.y } : null }; });
    if (!s || s.stage !== 'run') break;
    if (s.gate) { if (s.gate.q !== lastQ) { lastQ = s.gate.q; gates++; } if (s.lane < s.gate.ans) await p.keyboard.press('ArrowRight'); else if (s.lane > s.gate.ans) await p.keyboard.press('ArrowLeft'); }
    await wait(50);
  }
  check(gates === 9, 'a run is 9 gates (' + gates + ')');
  let wrongOnce = false;
  for (let i = 0; i < 1500; i++) {
    const s = await p.evaluate(() => { const G = window.__ttw.G; if (!G) return null; return { phase: G.phase, ans: G.q && G.q.ans, opts: G.opts }; });
    if (!s) break;
    if (s.phase === 'ask') { const idx = s.opts.indexOf(s.ans); if (!wrongOnce) { wrongOnce = true; await p.evaluate(i => window.__ttw.pick(i), (idx + 1) % 4); } else await p.keyboard.press(String(idx + 1)); }
    await wait(80);
  }
  await until(() => p.evaluate(() => !document.querySelector('#results').hidden));
  await until(() => p.evaluate(() => window.__ttw.net.idle()));
  const r = mock.store.riley.state;
  check(mock.store.riley.rev === 5, 'the save landed on top of the other device\'s (rev ' + mock.store.riley.rev + ')');
  check(mock.stats.merges === 1, 'the service merged it');
  check(r.stars[7] === 2 && r.stars[8] === 2, 'stars kept from both copies (' + JSON.stringify(r.stars) + ')');
  check(r.bossLv[7] === 3, 'the boss level went up');
  check(r.cur > 150, 'treats were added to the other device\'s total (' + r.cur + ')');
  check(r.best[7] > 1234, 'the top score is the new one');
  check(Object.values(r.facts).some(f => f.w === 1), 'the one wrong answer is in the fact log');
  check(await p.evaluate(() => window.__storageWrites) === 0, 'nothing was written to browser storage');
  check(await p.evaluate(() => { try { return localStorage.length === 0 && sessionStorage.length === 0; } catch (e) { return true; } }), 'browser storage is empty');

  /* 3. a showdown saves both kids */
  await p.click('#hubBtn'); await wait(300); await p.click('#duelBtn'); await wait(300); await p.click('#duelTables .tbl:nth-child(3)'); await wait(300);
  let lastRound = 0;
  for (let i = 0; i < 2000; i++) {
    const s = await p.evaluate(() => { const S2 = window.__ttw.S2; if (!S2) return null; return { phase: S2.phase, round: S2.round, ans: S2.q && S2.q.ans, a: S2.opts.a, b: S2.opts.b }; });
    if (!s || s.phase === 'end') break;
    if (s.phase === 'ask' && s.round !== lastRound) { lastRound = s.round; await wait(200); const ia = s.a.indexOf(s.ans), ib = s.b.indexOf(s.ans); if (s.round % 2) await p.keyboard.press(['w', 'a', 'd', 's'][ia]); else await p.keyboard.press(['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'][ib]); }
    await wait(80);
  }
  await until(() => p.evaluate(() => !document.querySelector('#duelEnd').hidden));
  await until(() => p.evaluate(() => window.__ttw.net.idle()));
  check(mock.store.riley.state.showdown.played === 1 && mock.store.charlie && mock.store.charlie.state.showdown.played === 1, 'both kids\' saves record the showdown');
  check(mock.store.charlie.state.cur > 0, 'the challenger earned treats');
  await p.close();

  /* 4. the saves come back on a fresh page, and a page that cannot reach the service waits */
  p = await newPage(mock);
  await until(() => p.evaluate(() => !document.querySelector('.profile-card').disabled));
  await p.evaluate(() => document.querySelectorAll('.profile-card')[1].click()); await wait(300);
  check(await p.evaluate(() => document.querySelectorAll('#tables .tbl:nth-child(7) .st.on').length === 2), 'a fresh page shows the two stars from the service');
  await p.close();
  const down = create(); down.ctl.down = true;
  p = await newPage(down); await wait(1500);
  check(await p.evaluate(() => document.querySelector('.profile-card').disabled && !document.querySelector('#saveRetry').hidden), 'with the service down the player screen waits and offers Try again');
  down.ctl.down = false; await p.click('#saveRetry');
  check(await until(() => p.evaluate(() => !document.querySelector('.profile-card').disabled), 8000), 'Try again loads the saves');
  await p.close();

  /* 5. phone width renders every screen without horizontal overflow */
  p = await newPage(create(), { width: 390, height: 800, hasTouch: true });
  await until(() => p.evaluate(() => !document.querySelector('.profile-card').disabled));
  const wide = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check(!wide, 'no sideways scroll at 390px');
  await p.close();

  check(errs.length === 0, 'no page errors: ' + errs.join(' | '));
  await browser.close();
  console.log(`${n - failed} of ${n} checks passed${failed ? ', ' + failed + ' FAILED' : ''}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
