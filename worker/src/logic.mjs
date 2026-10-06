/* Merge rules for Times Table Worlds saves, shared by the Worker and the test stand-in.
   A save carries the copy it started from (base). mergeState lays this page's changes since base
   onto the copy another device stored: counters move by the difference, records keep the higher
   value, unlocked characters are kept from both, and choices (character, world) follow this page. */
const isObj = o => o && typeof o === 'object' && !Array.isArray(o);
const num = v => (typeof v === 'number' && isFinite(v)) ? v : 0;
const clone = o => JSON.parse(JSON.stringify(o));
const delta = (a, b) => num(a) - num(b);

export const KIDS = ['charlie', 'riley', 'vera', 'cora', 'addie', 'amy', 'hallie'];

export function mergeState(mine, theirs, base) {
  mine = isObj(mine) ? mine : {}; theirs = isObj(theirs) ? theirs : {}; base = isObj(base) ? base : {};
  const out = clone(theirs);
  out.cur = Math.max(0, num(theirs.cur) + delta(mine.cur, base.cur));
  out.games = num(theirs.games) + Math.max(0, delta(mine.games, base.games));
  const ts = isObj(theirs.showdown) ? theirs.showdown : {}, ms = isObj(mine.showdown) ? mine.showdown : {}, bs = isObj(base.showdown) ? base.showdown : {};
  out.showdown = { wins: num(ts.wins) + Math.max(0, delta(ms.wins, bs.wins)), played: num(ts.played) + Math.max(0, delta(ms.played, bs.played)) };
  for (const k of ['stars', 'best', 'bossLv']) {
    out[k] = Object.assign({}, isObj(theirs[k]) ? theirs[k] : {});
    const m = isObj(mine[k]) ? mine[k] : {};
    for (const key in m) out[k][key] = Math.max(num(out[k][key]), num(m[key]));
  }
  out.skill = Object.assign({}, isObj(theirs.skill) ? theirs.skill : {}, isObj(mine.skill) ? mine.skill : {});
  out.facts = clone(isObj(theirs.facts) ? theirs.facts : {});
  const mf = isObj(mine.facts) ? mine.facts : {}, bf = isObj(base.facts) ? base.facts : {};
  for (const key in mf) {
    const m = isObj(mf[key]) ? mf[key] : {}, b = isObj(bf[key]) ? bf[key] : {}, t = isObj(out.facts[key]) ? out.facts[key] : (out.facts[key] = { r: 0, w: 0 });
    t.r = num(t.r) + Math.max(0, delta(m.r, b.r)); t.w = num(t.w) + Math.max(0, delta(m.w, b.w));
  }
  out.owned = [...new Set([...(Array.isArray(theirs.owned) ? theirs.owned : []), ...(Array.isArray(mine.owned) ? mine.owned : [])].filter(x => typeof x === 'string'))];
  out.char = Object.assign({}, isObj(theirs.char) ? theirs.char : {}, isObj(mine.char) ? mine.char : {});
  if ('look' in mine) out.look = mine.look;
  out.updated = Date.now();
  return out;
}

/* true when a save would throw away earned progress (stars, top scores, boss levels, unlocked characters) */
export function lowersProgress(next, cur) {
  if (!isObj(cur) || !isObj(next)) return false;
  for (const k of ['stars', 'best', 'bossLv']) {
    const c = isObj(cur[k]) ? cur[k] : {}, n = isObj(next[k]) ? next[k] : {};
    for (const key in c) if (num(n[key]) < num(c[key])) return true;
  }
  const owned = Array.isArray(next.owned) ? next.owned : [];
  for (const id of (Array.isArray(cur.owned) ? cur.owned : [])) if (!owned.includes(id)) return true;
  return false;
}
