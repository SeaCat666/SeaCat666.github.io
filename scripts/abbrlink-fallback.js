'use strict';

// abbrlink-fallback.js
// 解决 hexo-abbrlink 在部分 Node/Hexo 版本下不自动生成 abbrlink 的问题
// 作为独立回退，不依赖 hexo-abbrlink 插件的文件写入机制
// Priority: 16 (在 hexo-abbrlink 的 15 之后运行，仅填补遗漏)

const crc32 = (function() {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }

  return function(str) {
    let crc = 0xFFFFFFFF;
    for (let i = 0, L = str.length; i < L; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ str.charCodeAt(i)) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  };
})();

function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return (crc & 0xFFFF) >>> 0;
}

hexo.extend.filter.register('before_post_render', function(data) {
  if (data.layout === 'post' && !data.abbrlink) {
    const config = hexo.config.abbrlink || {};
    const alg = config.alg || 'crc16';
    const rep = config.rep || 'dec';
    const title = data.title || data.slug || '';

    let abbrlink = alg === 'crc32' ? crc32(title) : crc16(title);
    abbrlink = rep === 'hex' ? abbrlink.toString(16) : String(abbrlink);

    data.abbrlink = abbrlink;
    hexo.log.info('abbrlink-fallback: Generated [%s] for [%s]', abbrlink, title);
  }
  return data;
}, 16);
