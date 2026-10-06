/* Merge rules: node logic.test.js */
const assert = require('assert');
(async () => {
  const { mergeState, lowersProgress } = await import('../worker/src/logic.mjs');
  const base = { cur: 10, games: 1, stars: { 7: 1 }, best: { 7: 500 }, bossLv: { 7: 2 }, facts: { '3x7': { r: 1, w: 1 } }, owned: [], char: {}, showdown: { wins: 0, played: 0 } };
  const mine = { cur: 25, games: 2, stars: { 7: 2 }, best: { 7: 900 }, bossLv: { 7: 3 }, facts: { '3x7': { r: 3, w: 1 }, '4x7': { r: 1, w: 0 } }, owned: ['lagoon:turtle'], char: { lagoon: 'turtle' }, look: 'candy', showdown: { wins: 1, played: 1 } };
  const theirs = { cur: 40, games: 3, stars: { 7: 1, 8: 3 }, best: { 7: 700, 8: 1000 }, bossLv: { 7: 2, 8: 4 }, facts: { '3x7': { r: 2, w: 2 }, '8x8': { r: 1, w: 0 } }, owned: ['lagoon:frog'], char: { lagoon: 'frog', candy: 'cupcake' }, look: 'lagoon', showdown: { wins: 2, played: 3 } };
  const out = mergeState(mine, theirs, base);
  assert.strictEqual(out.cur, 55, 'treats move by this page\'s delta');
  assert.strictEqual(out.games, 4);
  assert.deepStrictEqual(out.stars, { 7: 2, 8: 3 });
  assert.deepStrictEqual(out.best, { 7: 900, 8: 1000 });
  assert.deepStrictEqual(out.bossLv, { 7: 3, 8: 4 });
  assert.deepStrictEqual(out.facts, { '3x7': { r: 4, w: 2 }, '4x7': { r: 1, w: 0 }, '8x8': { r: 1, w: 0 } });
  assert.deepStrictEqual(out.owned.sort(), ['lagoon:frog', 'lagoon:turtle']);
  assert.deepStrictEqual(out.char, { lagoon: 'turtle', candy: 'cupcake' });
  assert.strictEqual(out.look, 'candy');
  assert.deepStrictEqual(out.showdown, { wins: 3, played: 4 });
  /* a purchase on this page (cur down, owned up) survives a merge */
  const bought = mergeState({ cur: 0, owned: ['lagoon:seal'] }, { cur: 90, owned: [] }, { cur: 40, owned: [] });
  assert.strictEqual(bought.cur, 50); assert.deepStrictEqual(bought.owned, ['lagoon:seal']);
  /* a first save from a fresh page merges onto an existing copy without losing either */
  const first = mergeState({ cur: 12, stars: { 2: 1 } }, { cur: 30, stars: { 3: 2 } }, {});
  assert.strictEqual(first.cur, 42); assert.deepStrictEqual(first.stars, { 2: 1, 3: 2 });
  /* progress can never drop */
  assert.strictEqual(lowersProgress({ stars: { 7: 1 } }, { stars: { 7: 2 } }), true);
  assert.strictEqual(lowersProgress({ stars: { 7: 2 }, owned: [] }, { stars: { 7: 2 }, owned: ['lagoon:turtle'] }), true);
  assert.strictEqual(lowersProgress({ stars: { 7: 2 }, cur: 0, owned: ['lagoon:turtle'] }, { stars: { 7: 2 }, cur: 500, owned: ['lagoon:turtle'] }), false, 'spending treats is allowed');
  assert.strictEqual(lowersProgress(out, theirs), false);
  console.log('logic: 17 checks ok');
})().catch(e => { console.error(e); process.exit(1); });
