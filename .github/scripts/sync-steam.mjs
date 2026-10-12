import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { fetchScreenshotSnapshot } from './steam-screenshots.mjs';

export const STEAM_ID = '76561198900457579';
const rootPath = fileURLToPath(new URL('../../', import.meta.url));
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };

export function refreshGames(previous, payload) {
  const response = payload?.response;
  requireValue(Array.isArray(response?.games) && response.games.length > 0 && response.game_count === response.games.length, 'Steam returned an empty or incomplete library; old data retained.');
  const names = new Map(previous.steamLibrary.map(game => [game.appId, game.name]));
  const seen = new Set();
  for (const game of response.games) {
    requireValue(Number.isSafeInteger(game.appid) && game.appid > 0 && !seen.has(game.appid), 'Steam returned an invalid or duplicate AppID.');
    requireValue(Number.isSafeInteger(game.playtime_forever) && game.playtime_forever >= 0 && typeof game.name === 'string' && game.name.trim().length > 0, 'Steam returned invalid game information.');
    seen.add(game.appid);
  }
  const steamLibrary = [...response.games].sort((a, b) => b.playtime_forever - a.playtime_forever || a.appid - b.appid).map(game => ({
    name: names.get(String(game.appid)) ?? game.name,
    hours: `${Math.round(game.playtime_forever / 60)}h`,
    appId: String(game.appid),
    storeUrl: `https://store.steampowered.com/app/${game.appid}`,
    imageUrl: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
  }));
  return { ...previous, steamLibrary };
}

function replaceOnce(html, expression, replacement, label) {
  const matches = [...html.matchAll(new RegExp(expression.source, 'g'))];
  requireValue(matches.length === 1, `Cannot locate exactly one ${label}; page left unchanged.`);
  return html.replace(expression, replacement);
}

function checkedShotUrl(value) {
  const url = new URL(value);
  requireValue(url.protocol === 'https:' && ['images.steamusercontent.com', 'steamuserimages-a.akamaihd.net'].includes(url.hostname) && !url.username && !url.password, 'Invalid screenshot image URL.');
  return escapeHtml(url.href);
}

export function renderPage(html, games, shots) {
  const names = new Map(games.steamLibrary.map(game => [game.appId, game.name]));
  const gameMarkup = games.steamLibrary.map(game => {
    requireValue(/^\d+$/.test(game.appId) && /^\d+h$/.test(game.hours), 'Invalid local game snapshot.');
    const artRoot = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appId}`;
    return `<li><a class="vault-entry" href="https://store.steampowered.com/app/${game.appId}" target="_blank" rel="noopener noreferrer"><img class="vault-entry-thumb" src="${artRoot}/library_600x900.jpg" data-thumb-fallback="${artRoot}/header.jpg" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="vault-entry-name">${escapeHtml(game.name)}</span><span class="vault-entry-hours">${game.hours}</span></a></li>`;
  }).join('');
  let shotCount = 0;
  const shotMarkup = Object.entries(shots).flatMap(([appId, list]) => {
    requireValue(/^\d+$/.test(appId) && Array.isArray(list), 'Invalid screenshot snapshot.');
    const gameName = names.get(appId) ?? '';
    return list.map(shot => {
      requireValue(typeof shot.desc === 'string', 'Invalid screenshot description.');
      shotCount++;
      const alt = shot.desc || `${gameName || 'Steam'} 游戏截图`;
      return `<figure class="vault-shot-item"><img class="vault-shot" src="${checkedShotUrl(shot.url)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">${gameName ? `<span class="vault-shot-game">${escapeHtml(gameName)}</span>` : ''}${shot.desc ? `<figcaption class="vault-shot-desc">${escapeHtml(shot.desc)}</figcaption>` : ''}</figure>`;
    });
  }).join('');
  requireValue(shotCount > 0, 'Steam screenshot gallery is empty; old page retained.');
  let result = replaceOnce(html, /(<ul class="vault-list" id="vault-list"[^>]*>)[\s\S]*?(<\/ul>)/, (_match, start, end) => start + gameMarkup + end, 'game list');
  result = replaceOnce(result, /(<div class="vault-shots" id="vault-shots">)[\s\S]*?(<\/div>)/, (_match, start, end) => start + shotMarkup + end, 'screenshot gallery');
  result = replaceOnce(result, /(<span class="collection-meta">)Steam · \d+ 款(<\/span>)/, (_match, start, end) => `${start}Steam · ${String(games.steamLibrary.length).padStart(2, '0')} 款${end}`, 'library count');
  result = replaceOnce(result, /(<button[^>]*id="vault-tab-games"[^>]*>[\s\S]*?<span class="vault-tab-count">)\d+(<\/span>)/, (_match, start, end) => start + games.steamLibrary.length + end, 'game tab count');
  result = replaceOnce(result, /(<span class="vault-tab-count" id="vault-shot-count">)\d+ 张(<\/span>)/, (_match, start, end) => start + shotCount + ' 张' + end, 'screenshot tab count');
  result = replaceOnce(result, /(<figcaption class="vault-caption">[\s\S]*?<p class="vault-meta"><span>)\d+ 张(<\/span>)/, (_match, start, end) => start + shotCount + ' 张' + end, 'screenshot caption count');
  return result;
}

async function fetchLibrary(key) {
  const url = new URL('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/');
  for (const [name, value] of Object.entries({ key, steamid: STEAM_ID, include_appinfo: '1', include_played_free_games: '1' })) url.searchParams.set(name, value);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (response.ok) return await response.json();
      if (response.status !== 429 && response.status < 500) break;
    } catch { /* Keep credential-bearing URLs out of error output. */ }
    if (attempt < 2) await new Promise(done => setTimeout(done, 2500 * (attempt + 1)));
  }
  throw new Error('Cannot retrieve the Steam library; check API availability, key and privacy settings.');
}

export async function syncSteam({ root = rootPath, key = process.env.STEAM_API_KEY, fetchLibrary: getLibrary = fetchLibrary, fetchShots = fetchScreenshotSnapshot, now = new Date() } = {}) {
  requireValue(typeof key === 'string' && key.length > 0, 'STEAM_API_KEY is missing.');
  const load = async path => JSON.parse((await readFile(resolve(root, path), 'utf8')).replace(/^\uFEFF/, ''));
  const previous = await load('.github/data/games.json');
  const index = await load('.github/data/steam-shots.index.json');
  const cache = await load('.github/data/steam-shots.cache.json');
  const originalHtml = await readFile(resolve(root, 'games/index.html'), 'utf8');
  const games = refreshGames(previous, await getLibrary(key));
  const snapshot = await fetchShots({ steamId: STEAM_ID, index, cache });
  const html = renderPage(originalHtml, games, snapshot.shots);
  const shotCount = Object.values(snapshot.shots).reduce((count, list) => count + list.length, 0);
  const files = {
    '.github/data/games.json': json(games),
    '.github/data/steam-shots.index.json': json(snapshot.index),
    '.github/data/steam-shots.cache.json': json(snapshot.cache),
    '.github/data/steam-shots.json': json(snapshot.shots),
    // Daily successful checks keep this public repository's schedule active even when playtime does not change.
    '.github/data/steam-sync-status.json': json({ checkedAt: now.toISOString(), steamId: STEAM_ID, games: games.steamLibrary.length, screenshots: shotCount }),
    'games/index.html': html,
  };
  // All fetches and layout validation finish before any file is modified.
  for (const [path, value] of Object.entries(files)) {
    const target = resolve(root, path);
    await writeFile(`${target}.tmp`, value, 'utf8');
    await rename(`${target}.tmp`, target);
  }
  return { games: games.steamLibrary.length, screenshots: shotCount, addedScreenshots: snapshot.index.filter(item => !index.some(old => old.fileid === item.fileid)).length, pageChanged: html !== originalHtml };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  syncSteam().then(result => console.log(JSON.stringify(result))).catch(error => {
    console.error(`Steam sync failed: ${error.message}`);
    process.exitCode = 1;
  });
}
