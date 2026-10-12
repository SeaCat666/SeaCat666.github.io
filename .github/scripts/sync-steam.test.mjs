import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sync = await import('./sync-steam.mjs').catch(error => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') return {};
  throw error;
});
const old = { topGames: [{ title: 'Keep my review' }], steamLibrary: [{ appId: '730', name: '反恐精英 2', hours: '1h', storeUrl: 'https://store.steampowered.com/app/730', imageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg' }] };
const response = { response: { game_count: 2, games: [{ appid: 730, name: 'Counter-Strike 2', playtime_forever: 119 }, { appid: 10, name: 'A <new> & game', playtime_forever: 200 }] } };
const html = '<header>Untouched</header><span class="collection-meta">Steam · 01 款</span><button id="vault-tab-games"><span class="vault-tab-count">1</span></button><span class="vault-tab-count" id="vault-shot-count">1 张</span><ul class="vault-list" id="vault-list" aria-label="Steam 游戏列表"><li>old game</li></ul><div class="vault-shots" id="vault-shots"><figure>old shot</figure></div><figcaption class="vault-caption"><h3>Steam 截图</h3><p class="vault-meta"><span>1 张</span><a href="https://steamcommunity.com/">Original album</a></p></figcaption><footer>Untouched</footer>';

test('refresh games uses actual minutes, preserves Chinese names and personal reviews', () => {
  assert.equal(typeof sync.refreshGames, 'function', 'Steam refresh is not implemented');
  const games = sync.refreshGames(old, response);
  assert.deepEqual(games.topGames, old.topGames);
  assert.deepEqual(games.steamLibrary.map(game => [game.appId, game.name, game.hours]), [['10', 'A <new> & game', '3h'], ['730', '反恐精英 2', '2h']]);
  assert.equal(old.steamLibrary[0].hours, '1h');
});

test('private, incomplete, duplicate or malformed Steam responses are rejected', () => {
  assert.equal(typeof sync.refreshGames, 'function');
  for (const invalid of [{ response: {} }, { response: { game_count: 0, games: [] } }, { response: { game_count: 3, games: response.response.games } }, { response: { game_count: 2, games: [response.response.games[0], response.response.games[0]] } }, { response: { game_count: 1, games: [{ appid: 730, playtime_forever: -1 }] } }]) {
    assert.throws(() => sync.refreshGames(old, invalid));
  }
});

test('game and screenshot markup escapes remote text, updates counts and preserves surrounding page', () => {
  assert.equal(typeof sync.renderPage, 'function');
  const games = sync.refreshGames(old, response);
  const shots = { '730': [{ url: 'https://images.steamusercontent.com/ugc/123/ABC/?imw=1600&imh=900', desc: '<script>alert(1)</script> & "quoted"' }] };
  const page = sync.renderPage(html, games, shots);
  assert.ok(page.startsWith('<header>Untouched</header>'));
  assert.ok(page.endsWith('<footer>Untouched</footer>'));
  assert.ok(page.includes('Steam · 02 款'));
  assert.ok(page.includes('<span class="vault-tab-count">2</span>'));
  assert.ok(page.includes('A &lt;new&gt; &amp; game'));
  assert.ok(page.includes('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quoted&quot;'));
  assert.ok(!page.includes('<script>alert(1)</script>'));
  assert.ok(page.includes('Original album'));
  assert.equal((page.match(/class="vault-entry"/g) || []).length, 2);
  assert.equal((page.match(/class="vault-shot-item"/g) || []).length, 1);
});

test('unexpected page layout or unsafe image URL blocks publishing', () => {
  assert.equal(typeof sync.renderPage, 'function');
  assert.throws(() => sync.renderPage(html.replace('id="vault-list"', 'id="other"'), old, {}));
  assert.throws(() => sync.renderPage(html, old, { '730': [{ url: 'javascript:alert(1)', desc: '' }] }));
});

test('failed screenshot fetch leaves all committed page and data bytes unchanged', async () => {
  assert.equal(typeof sync.syncSteam, 'function');
  const root = await mkdtemp(join(tmpdir(), 'steam-sync-test-'));
  try {
    await mkdir(join(root, '.github/data'), { recursive: true });
    await mkdir(join(root, 'games'));
    const files = { '.github/data/games.json': JSON.stringify(old), '.github/data/steam-shots.index.json': '[]', '.github/data/steam-shots.cache.json': '{}', 'games/index.html': html };
    for (const [file, value] of Object.entries(files)) await writeFile(join(root, file), value);
    await assert.rejects(sync.syncSteam({ root, key: 'test-key', fetchLibrary: async () => response, fetchShots: async () => { throw new Error('rate limited'); } }));
    for (const [file, value] of Object.entries(files)) assert.equal(await readFile(join(root, file), 'utf8'), value);
  } finally { await rm(root, { recursive: true, force: true }); }
});
