/**
 * Normalize URLs produced by the legacy Baidu sitemap generator.
 *
 * The plugin concatenates `config.url + config.root + post.path`. Hexo adds a
 * leading slash to explicit post permalinks, which otherwise produces URLs
 * such as `https://www.deepseacat.cn//same-clay/index.html`.
 */

'use strict'

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

hexo.extend.filter.register('after_generate', async () => {
  const sitemapPath = hexo.config.baidusitemap?.path || 'baidusitemap.xml'
  const sitemapStream = hexo.route.get(sitemapPath)

  if (!sitemapStream) return

  const chunks = []
  for await (const chunk of sitemapStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const sitemap = Buffer.concat(chunks).toString('utf8')
  const siteUrl = String(hexo.config.url || '').replace(/\/+$/, '')
  if (!siteUrl) return

  const normalized = sitemap
    .replace(new RegExp(`${escapeRegExp(siteUrl)}/+`, 'g'), `${siteUrl}/`)
    .replace(/\/index\.html(?=<\/loc>)/g, '/')
  if (normalized !== sitemap) hexo.route.set(sitemapPath, normalized)
})
