'use strict'

const fs = require('hexo-fs')
const front = require('hexo-front-matter')
const crc16 = require('hexo-abbrlink/lib/crc16')
const crc32 = require('hexo-abbrlink/lib/crc32')

const used = new Set()

function nextAvailable(value, rep) {
  let numeric = value >>> 0
  let abbrlink = rep === 'hex' ? numeric.toString(16) : String(numeric)

  while (used.has(abbrlink)) {
    numeric += 1
    abbrlink = rep === 'hex' ? numeric.toString(16) : String(numeric)
  }

  used.add(abbrlink)
  return abbrlink
}

hexo.extend.filter.register('before_post_render', function fillMissingAbbrlink(data) {
  if (data.layout !== 'post') return data

  if (data.abbrlink) {
    used.add(String(data.abbrlink))
    return data
  }

  const config = this.config.abbrlink || {}
  const alg = config.alg || 'crc16'
  const rep = config.rep || 'dec'
  const value = alg === 'crc32' ? crc32.str(data.title) : crc16(data.title)
  const abbrlink = nextAvailable(value, rep)

  data.abbrlink = abbrlink

  const parsed = front.parse(data.raw)
  parsed.abbrlink = abbrlink
  fs.writeFileSync(data.full_source, `---\n${front.stringify(parsed)}`, 'utf8')

  return data
}, 14)
