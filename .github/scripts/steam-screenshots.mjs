import { execFile } from 'node:child_process';

const DISPLAY = 'imw=1600&imh=900&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true';
const REQUEST_GAP_MS = 5_000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Public requests only. Neither browser cookies nor Steam credentials are used.
function curlText(url) {
  return new Promise((resolve, reject) => {
    execFile(process.platform === 'win32' ? 'curl.exe' : 'curl', [
      '--silent', '--show-error', '--location', '--max-redirs', '5',
      '--proto', '=https', '--proto-redir', '=https',
      '--connect-timeout', '10', '--max-time', '25',
      '--user-agent', 'Mozilla/5.0', '--header', 'Accept-Language: en-US,en;q=0.9',
      '--write-out', '\n__STEAM_HTTP_STATUS__%{http_code}', url,
    ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, windowsHide: true }, (error, stdout) => {
      if (error) return reject(new Error(`Steam network request failed (curl ${error.code ?? 'error'})`));
      const markerText = '\n__STEAM_HTTP_STATUS__';
      const marker = stdout.lastIndexOf(markerText);
      if (marker < 0) return reject(new Error('Steam network response has no HTTP status'));
      resolve({ body: stdout.slice(0, marker), code: Number(stdout.slice(marker + markerText.length).trim()) });
    });
  });
}

async function requestText(url, fetchText, pause) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetchText(url);
      const body = typeof response === 'string' ? response : response?.body;
      const code = typeof response === 'string' ? 200 : Number(response?.code ?? response?.status);
      if (code !== 200) {
        const error = new Error(`Steam HTTP ${code || 'unknown'} request failed`);
        error.status = code;
        throw error;
      }
      if (typeof body !== 'string' || !body.trim()) throw new Error('Steam returned an empty response');
      return body;
    } catch (error) {
      failure = error;
      if (attempt < 2) await pause(error.status === 429 ? 20_000 : 2_000 * (attempt + 1));
    }
  }
  throw new Error(`Steam fetch failed: ${failure?.message ?? 'unknown error'}`, { cause: failure });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2];
}

function decodeEntities(text) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, key) => {
    if (key[0] !== '#') return named[key.toLowerCase()];
    const code = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  }).replace(/\s+/g, ' ').trim();
}

function validateDocument(html) {
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '';
  if (/sign\s*in|login|登录|登入/i.test(title) || /<(?:form|div)\b[^>]*\bid\s*=\s*["'](?:loginForm|login_form)["']/i.test(html)) {
    throw new Error('Steam returned a login page');
  }
  if (!/<\/body\s*>/i.test(html) || !/<\/html\s*>/i.test(html)) throw new Error('Steam returned truncated or invalid HTML');
  if (/This profile is private|class\s*=\s*["'][^"']*profile_private_info/i.test(html)) throw new Error('Steam screenshots are private');
}

function trustedListingImage(anchor) {
  // Captions are user content; even HTML-like image/style text inside them is
  // never a screenshot source. Read only the media tags in this same anchor.
  const media = anchor
    .replace(/<div\b[^>]*\bclass\s*=\s*["'][^"']*\bimgWallHoverDescription\b[^"']*["'][^>]*>[\s\S]*?<\/div\s*>/gi, '')
    .replace(/<q\b[^>]*>[\s\S]*?<\/q\s*>/gi, '');
  const allowedHosts = new Set(['images.steamusercontent.com', 'steamuserimages-a.akamaihd.net']);
  for (const [tag] of media.matchAll(/<(?:div|img|span)\b[^>]*>/gi)) {
    const style = decodeEntities(attribute(tag, 'style') ?? '');
    const background = style.match(/background-image\s*:\s*url\(\s*(["']?)(.*?)\1\s*\)/i)?.[2];
    const src = /^<img\b/i.test(tag) ? attribute(tag, 'src') : undefined;
    for (const candidate of [background, src]) {
      if (!candidate) continue;
      try {
        const url = new URL(decodeEntities(candidate));
        if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname) || url.username || url.password || !/^\/ugc\/[^/]+\/[^/]+\/?$/.test(url.pathname)) continue;
        return `${url.origin}${url.pathname}?${DISPLAY}`;
      } catch { /* An invalid attribute is not a reliable media URL. */ }
    }
  }
  return undefined;
}

function parseListing(html, steamId) {
  validateDocument(html);
  const form = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form\s*>/gi)]
    .find(match => attribute(match[0].slice(0, match[0].indexOf('>') + 1), 'id') === 'BatchScreenshotManagement')?.[0];
  if (!form || !form.includes(`/profiles/${steamId}/screenshotsaction`)) throw new Error('Invalid Steam screenshots listing');
  const anchors = [...form.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi)];
  const items = [];
  const images = new Map();
  for (const [anchor] of anchors) {
    const tag = anchor.slice(0, anchor.indexOf('>') + 1);
    const fileid = attribute(tag, 'data-publishedfileid');
    if (fileid === undefined) continue;
    const appid = attribute(tag, 'data-appid');
    if (!/^\d+$/.test(fileid) || !/^\d+$/.test(appid ?? '')) throw new Error('Invalid Steam screenshot identifiers');
    const caption = anchor.match(/<div\b[^>]*\bclass\s*=\s*["'][^"']*\bimgWallHoverDescription\b[^"']*["'][^>]*>\s*<q\b[^>]*>([\s\S]*?)<\/q>/i)?.[1] ?? '';
    items.push({ appid, fileid, desc: decodeEntities(caption.replace(/<[^>]*>/g, '')) });
    const image = trustedListingImage(anchor);
    if (image) images.set(fileid, image);
  }
  const end = /\bid\s*=\s*["']EndOfInfiniteContent["']/i.test(form);
  if (!items.length && !end) throw new Error('Incomplete Steam pagination: empty page without an end marker');
  return { items, end, images };
}

function largeImage(html) {
  validateDocument(html);
  const image = html.match(/https:\/\/images\.steamusercontent\.com\/ugc\/[^"'\s)]+?\?imw=5000[^"'\s)]*/)?.[0];
  if (!image) throw new Error('Steam screenshot detail is missing its large image');
  return `${decodeEntities(image).split('?')[0]}?${DISPLAY}`;
}

/**
 * Build one complete public screenshot snapshot. The caller commits returned data
 * only after this resolves; failures never mutate input objects or write files.
 * fetchText may return HTML or { body, code/status }; pause is injectable for tests.
 */
export async function fetchScreenshotSnapshot({ steamId, index = [], cache = {}, fetchText = curlText, pause = sleep }) {
  if (!/^\d{17}$/.test(String(steamId))) throw new TypeError('A valid SteamID64 is required');
  if (!Array.isArray(index) || !cache || typeof cache !== 'object' || Array.isArray(cache)) throw new TypeError('Invalid Steam screenshot cache');
  const nextIndex = [];
  const seen = new Set();
  const listingImages = new Map();
  // A generous guard prevents a changed Steam page from causing an endless job.
  // Reaching it is a failure, never a successful partial snapshot.
  let complete = false;
  for (let page = 1; page <= 10_000; page++) {
    const html = await requestText(`https://steamcommunity.com/profiles/${steamId}/screenshots/?p=${page}`, fetchText, pause);
    const { items, end, images } = parseListing(html, String(steamId));
    for (const item of items) {
      if (seen.has(item.fileid)) throw new Error('Incomplete Steam pagination: duplicate or repeated screenshot page');
      seen.add(item.fileid);
      nextIndex.push(item);
      if (images.has(item.fileid)) listingImages.set(item.fileid, images.get(item.fileid));
    }
    if (end) { complete = true; break; }
    await pause(REQUEST_GAP_MS);
  }
  if (!complete) throw new Error('Incomplete Steam pagination: page limit reached');
  if (!nextIndex.length) throw new Error('Steam returned an empty public screenshot library');

  const nextCache = {};
  const shots = {};
  for (const item of nextIndex) {
    let url = cache[item.fileid] || listingImages.get(item.fileid);
    if (!url) {
      await pause(REQUEST_GAP_MS);
      const html = await requestText(`https://steamcommunity.com/sharedfiles/filedetails/?id=${item.fileid}`, fetchText, pause);
      url = largeImage(html);
    }
    nextCache[item.fileid] = url;
    (shots[item.appid] ??= []).push({ url, desc: item.desc });
  }
  return { index: nextIndex, cache: nextCache, shots };
}
