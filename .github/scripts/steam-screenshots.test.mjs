import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchScreenshotSnapshot } from './steam-screenshots.mjs';

const steamId = '76561198900457579';
const oldUrl = 'https://images.steamusercontent.com/ugc/1/OLD/?imw=1600&imh=900';
const display = 'imw=1600&imh=900&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true';
const noPause = async () => {};

function listing(items, { end = false } = {}) {
  return `<html><head><title>Steam Community :: Deep :: Screenshots</title></head><body>
    <form id="BatchScreenshotManagement" action="https://steamcommunity.com/profiles/${steamId}/screenshotsaction">
    ${items.map(({ appid = '10', fileid, desc }) => `<a class="profile_media_item" data-appid="${appid}" data-publishedfileid="${fileid}">
      <div class="imgWallItem">${desc === undefined ? '' : `<div class="imgWallHoverDescription "><q class="ellipsis">${desc}</q></div>`}</div></a>`).join('')}
    ${end ? '<div id="EndOfInfiniteContent"></div>' : ''}</form></body></html>`;
}

function detail(fileid) {
  return `<html><head><title>Steam Community :: Screenshot</title></head><body><img id="ActualMedia" src="https://images.steamusercontent.com/ugc/${fileid}/HASH/?imw=5000&amp;imh=5000&amp;ima=fit"></body></html>`;
}

function fixture(pages, details = {}) {
  const calls = [];
  const fetchText = async url => {
    calls.push(url);
    const parsed = new URL(url);
    const response = parsed.pathname.includes('/screenshots/')
      ? pages[Number(parsed.searchParams.get('p'))]
      : details[parsed.searchParams.get('id')];
    if (response instanceof Error) throw response;
    if (response === undefined) throw new Error(`Unexpected fixture request: ${url}`);
    return response;
  };
  return { fetchText, calls };
}

test('rescans a complete cached index, discovers new screenshots and removes deleted ones', async () => {
  const index = [{ appid: '10', fileid: '100', desc: 'old description' }, { appid: '20', fileid: '99', desc: 'deleted' }];
  const cache = { 100: oldUrl, 99: oldUrl };
  const { fetchText, calls } = fixture({
    1: listing([{ appid: '20', fileid: '101', desc: 'new image' }, { fileid: '100', desc: 'edited description' }]),
    2: listing([], { end: true }),
  }, { 101: detail('101') });
  const result = await fetchScreenshotSnapshot({ steamId, index, cache, fetchText, pause: noPause });
  assert.deepEqual(result.index, [{ appid: '20', fileid: '101', desc: 'new image' }, { appid: '10', fileid: '100', desc: 'edited description' }]);
  assert.deepEqual(result.cache, { 101: `https://images.steamusercontent.com/ugc/101/HASH/?${display}`, 100: oldUrl });
  assert.deepEqual(result.shots, {
    20: [{ url: `https://images.steamusercontent.com/ugc/101/HASH/?${display}`, desc: 'new image' }],
    10: [{ url: oldUrl, desc: 'edited description' }],
  });
  assert.equal(calls.filter(url => url.includes('/filedetails/')).length, 1);
  assert.deepEqual(index, [{ appid: '10', fileid: '100', desc: 'old description' }, { appid: '20', fileid: '99', desc: 'deleted' }]);
  assert.deepEqual(cache, { 100: oldUrl, 99: oldUrl });
});

test('uses this scan description even when a cached screenshot no longer has a caption', async () => {
  const { fetchText, calls } = fixture({ 1: listing([{ fileid: '100' }], { end: true }) });
  const result = await fetchScreenshotSnapshot({ steamId, index: [{ appid: '10', fileid: '100', desc: 'removed caption' }], cache: { 100: oldUrl }, fetchText, pause: noPause });
  assert.equal(result.shots['10'][0].desc, '');
  assert.equal(calls.length, 1);
});

test('scans all pages beyond the former twenty-page cutoff until Steam marks completion', async () => {
  const pages = {};
  const cache = {};
  for (let page = 1; page <= 23; page++) {
    pages[page] = listing([{ fileid: String(page) }], { end: page === 23 });
    cache[page] = oldUrl;
  }
  const { fetchText, calls } = fixture(pages);
  const result = await fetchScreenshotSnapshot({ steamId, cache, fetchText, pause: noPause });
  assert.equal(result.index.length, 23);
  assert.equal(result.index.at(-1).fileid, '23');
  assert.equal(calls.length, 23);
});

test('rejects a login page encountered midway without changing caller state', async () => {
  const index = [{ appid: '10', fileid: '100', desc: 'old' }];
  const cache = { 100: oldUrl };
  const before = JSON.stringify({ index, cache });
  const { fetchText } = fixture({ 1: listing([{ fileid: '101' }]), 2: '<html><title>Steam Community :: Sign In</title><div id="loginForm"></div></html>' });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, index, cache, fetchText, pause: noPause }), /login|sign in/i);
  assert.equal(JSON.stringify({ index, cache }), before);
});

test('retries a 429 response then rejects the entire snapshot', async () => {
  const { fetchText, calls } = fixture({ 1: { code: 429, body: 'Too Many Requests' } });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause }), /429/);
  assert.equal(calls.length, 3);
});

test('retries network errors on a later page and rejects partial discoveries', async () => {
  const cache = { 100: oldUrl };
  const { fetchText, calls } = fixture({ 1: listing([{ fileid: '100' }]), 2: new Error('network unavailable') });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, cache, fetchText, pause: noPause }), /network unavailable|failed/i);
  assert.equal(calls.length, 4);
  assert.deepEqual(cache, { 100: oldUrl });
});

test('can recover from temporary rate limiting without producing partial data', async () => {
  let attempts = 0;
  const fetchText = async () => ++attempts < 3 ? { status: 429, body: 'Rate limited' } : listing([{ fileid: '100' }], { end: true });
  const result = await fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause });
  assert.equal(attempts, 3);
  assert.equal(result.index.length, 1);
});

test('rejects an empty page without an explicit pagination end marker', async () => {
  const { fetchText } = fixture({ 1: listing([{ fileid: '100' }]), 2: listing([]) });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause }), /empty|incomplete/i);
});

test('rejects an anomalously empty public library rather than replacing existing data', async () => {
  const { fetchText } = fixture({ 1: listing([], { end: true }) });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause }), /empty|no public/i);
});

test('rejects a repeated pagination page rather than ending with a partial index', async () => {
  const { fetchText } = fixture({ 1: listing([{ fileid: '100' }]), 2: listing([{ fileid: '100' }], { end: true }) });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause }), /repeat|duplicate|incomplete/i);
});

test('rejects malformed or private listing pages', async () => {
  const { fetchText } = fixture({ 1: '<html><title>Steam Community :: Deep</title><div>This profile is private.</div></html>' });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause }), /private|screenshots|invalid/i);
});

test('rejects a new screenshot whose detail page cannot provide a large image without mutating cache', async () => {
  const index = Object.freeze([{ appid: '10', fileid: '100', desc: 'old' }].map(Object.freeze));
  const cache = Object.freeze({ 100: oldUrl });
  const { fetchText } = fixture({ 1: listing([{ fileid: '101' }, { fileid: '100' }], { end: true }) }, { 101: '<html><title>Steam Community :: Error</title><body>Item removed</body></html>' });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, index, cache, fetchText, pause: noPause }), /image|detail|removed/i);
  assert.deepEqual(cache, { 100: oldUrl });
});

test('rejects a login page returned for a new screenshot detail', async () => {
  const { fetchText } = fixture({ 1: listing([{ fileid: '101' }], { end: true }) }, { 101: '<html><title>Steam Community :: Sign In</title></html>' });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause }), /login|sign in/i);
});

test('reads descriptions and screenshot attributes independent of attribute order', async () => {
  const html = listing([{ fileid: '100', desc: '&lt;nice&gt; &amp; &#x1F431; &quot;中文&quot; &#39;猫&#39;' }], { end: true })
    .replace('data-appid="10" data-publishedfileid="100"', "data-publishedfileid='100' data-desired-aspect='1.7' data-appid='10'");
  const { fetchText } = fixture({ 1: html });
  const result = await fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause });
  assert.equal(result.index.length, 1);
  assert.equal(result.index[0].desc, '<nice> & 🐱 "中文" \'猫\'');
});

test('rejects truncated HTML even if screenshots were parsed', async () => {
  const { fetchText } = fixture({ 1: listing([{ fileid: '100' }], { end: true }).replace('</body></html>', '') });
  await assert.rejects(fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause }), /truncat|incomplete|invalid/i);
});

test('spaces public listing and new detail requests to reduce Steam burst rate limiting', async () => {
  const pauses = [];
  const { fetchText } = fixture({ 1: listing([{ fileid: '101' }]), 2: listing([], { end: true }) }, { 101: detail('101') });
  const result = await fetchScreenshotSnapshot({ steamId, fetchText, pause: async ms => pauses.push(ms) });
  assert.equal(result.index.length, 1);
  assert.equal(pauses.length, 2);
  assert.ok(pauses.every(ms => ms >= 5_000), 'Public requests must be spaced by at least five seconds');
});

test('uses a new screenshot background image from its listing anchor without requesting details', async () => {
  const html = listing([{ appid: '20', fileid: '101', desc: 'new background' }], { end: true })
    .replace('<div class="imgWallItem">', '<div class="imgWallItem" style="background-image: url(\'https://images.steamusercontent.com/ugc/123/ABC/?imw=640&amp;imh=360\');">');
  const { fetchText, calls } = fixture({ 1: html }, { 101: detail('101') });
  const result = await fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause });
  assert.equal(calls.length, 1, 'No screenshot detail page should be requested');
  assert.deepEqual(result.index, [{ appid: '20', fileid: '101', desc: 'new background' }]);
  assert.equal(result.cache['101'], `https://images.steamusercontent.com/ugc/123/ABC/?${display}`);
});

test('uses a new screenshot img src from the approved legacy Steam image CDN', async () => {
  const html = listing([{ fileid: '101' }], { end: true })
    .replace('</a>', '<img style="width:100%" src="https://steamuserimages-a.akamaihd.net/ugc/123/ABC/?imw=1024&amp;imh=576"></a>');
  const { fetchText, calls } = fixture({ 1: html }, { 101: detail('101') });
  const result = await fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause });
  assert.equal(calls.length, 1);
  assert.equal(result.shots['10'][0].url, `https://steamuserimages-a.akamaihd.net/ugc/123/ABC/?${display}`);
});

test('preserves an existing cached original image even when the listing has a different thumbnail base', async () => {
  const html = listing([{ fileid: '100' }], { end: true })
    .replace('</a>', '<img src="https://images.steamusercontent.com/ugc/123/DIFFERENT/?imw=512"></a>');
  const { fetchText, calls } = fixture({ 1: html });
  const result = await fetchScreenshotSnapshot({ steamId, cache: { 100: oldUrl }, fetchText, pause: noPause });
  assert.equal(calls.length, 1);
  assert.equal(result.cache['100'], oldUrl);
});

test('falls back to the new screenshot detail when listing URLs are untrusted', async () => {
  const badUrls = [
    'https://images.steamusercontent.com.evil.example/ugc/123/ABC/',
    'https://evil.example/ugc/123/ABC/',
    'https://images.steamusercontent.com/other/123/ABC/',
    'https://user:password@images.steamusercontent.com/ugc/123/ABC/',
    'http://images.steamusercontent.com/ugc/123/ABC/',
  ];
  for (const url of badUrls) {
    const html = listing([{ fileid: '101' }], { end: true }).replace('</a>', `<img src="${url}"></a>`);
    const { fetchText, calls } = fixture({ 1: html }, { 101: detail('101') });
    const result = await fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause });
    assert.equal(calls.length, 2, `Untrusted listing URL must fall back to details: ${url}`);
    assert.equal(result.cache['101'], `https://images.steamusercontent.com/ugc/101/HASH/?${display}`);
  }
});

test('does not use image URLs injected into a screenshot description', async () => {
  const html = listing([{ fileid: '101', desc: '<img src="https://images.steamusercontent.com/ugc/123/DESCRIPTION/"><span style="background-image:url(\'https://images.steamusercontent.com/ugc/123/WRONG/\')">caption</span>' }], { end: true });
  const { fetchText, calls } = fixture({ 1: html }, { 101: detail('101') });
  const result = await fetchScreenshotSnapshot({ steamId, fetchText, pause: noPause });
  assert.equal(calls.length, 2);
  assert.equal(result.cache['101'], `https://images.steamusercontent.com/ugc/101/HASH/?${display}`);
  assert.equal(result.index[0].desc, 'caption');
});
