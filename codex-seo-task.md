# Codex 任务：深海猫博客 SEO 全面优化

> 目标：百度、谷歌搜索"深海猫"能在第一页看到 https://www.deepseacat.cn
> 项目路径：`C:\Users\admin\Desktop\个人文件夹\hexo-blog\`

---

## ⚠️ 开始前

```bash
cd "C:\Users\admin\Desktop\个人文件夹\hexo-blog"
```

每完成一步用 `npx hexo g` 验证不报错再继续。所有命令在 Git Bash 下执行。

---

## 第 1 步：安装 SEO 插件

```bash
npm install hexo-abbrlink --save
npm install hexo-generator-robotstxt --save
npm install hexo-generator-baidu-sitemap --save
```

---

## 第 2 步：修改 `_config.yml`

### 2a. 站点元信息（第 1-11 行区域）

找到这三行：

```yaml
title: 深海猫
subtitle: '愿我们彼此好在未来'
description: '会早睡吗？'
keywords: 深海猫
author: 深海猫
```

改成：

```yaml
title: 深海猫
subtitle: '愿我们彼此好在未来'
description: '会早睡吗？'
keywords: 深海猫,深海猫博客,个人博客,编程,欧阳飞华,Hexo
author: 深海猫
```

### 2b. 永久链接（第 15 行）

```yaml
# 原来
permalink: :year/:month/:day/:title/
# 改成
permalink: posts/:abbrlink.html
```

紧接着在 `permalink_defaults:` 下面新增：

```yaml
# abbrlink 短链接
abbrlink:
  alg: crc32
  rep: hex
```

### 2c. 在 sitemap 配置后面追加 robotstxt 配置

找到：

```yaml
sitemap:
  path:
    - sitemap.xml
    - sitemap.txt
```

在它下面加：

```yaml
# 百度 sitemap
baidusitemap:
  path: baidusitemap.xml

# robots.txt
robotstxt:
  useragent: "*"
  allow: /
  disallow:
    - /page/
    - /js/
    - /css/
    - /fonts/
    - /img/
  sitemap: https://www.deepseacat.cn/sitemap.xml
```

---

## 第 3 步：修改 `_config.butterfly.yml`

### 3a. 首页显示摘要（第 108-110 行）

```yaml
# 原来
index_post_content:
  method: 3
  length: 500
# 改成
index_post_content:
  method: 2
  length: 150
```

method=2 让首页显示文字摘要，method=3 只显示标题（对 SEO 极不利）。

### 3b. 开启结构化数据

在 `Open_Graph_meta:` 配置区域下面加一行空行，然后插入：

```yaml
# 结构化数据（Schema.org JSON-LD，搜索引擎富文本片段）
structured_data: true
```

### 3c. 站点验证补上 Google

找到 `site_verification:` 这一块，在百度的上面加 Google：

```yaml
site_verification:
  - name: google-site-verification
    content: 「替换为你从 Google Search Console 拿到的验证字符串」
  - name: baidu-site-verification
    content: codeva-14gaoQwRwM
```

> 拿到 Google 验证码的步骤：打开 https://search.google.com/search-console → 添加资源 → 输入 `www.deepseacat.cn` → 选 HTML 标签验证 → 复制 `content="xxx"` 里的 xxx

### 3d. 增加全局关键词配置

在 `post_meta:` 区域之前插入：

```yaml
# 全局关键词（注入到每页 meta keywords）
keywords: 深海猫,技术博客,编程,Linux,Hexo
```

---

## 第 4 步：给 Butterfly 主题补 keywords meta 标签

打开 `themes/butterfly/layout/includes/head.pug`，找到：

```pug
meta(name="description" content=...
```

在它下面加这几行：

```pug
if page.keywords
  meta(name="keywords" content=page.keywords)
else if config.keywords
  meta(name="keywords" content=config.keywords)
```

---

## 第 5 步：拆分 inject 内联代码

### 5a. 创建独立 CSS 文件

把 `_config.butterfly.yml` 里 `inject.head:` 下面 `<style>` 标签内的全部 CSS（约 530 行，从 `/* ═══════...` 到 `</style>` 之前）提取出来，新建文件：

`source/css/custom.css`

内容就是那 530 行 CSS（去掉 `<style>` 和 `</style>` 标签）。

然后在 `_config.butterfly.yml` 的 `inject.head:` 里，把原来那一大坨替换成一行：

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
```

### 5b. 修复 inject.bottom 的重复代码

`_config.butterfly.yml` 的 `inject.bottom:` 部分当前有 JS 代码残留 bug。

找到这一段（大约在第 560-573 行位置，紧跟在 IP fetch 逻辑后面）：

```js
        }, 300)
      })
        }, 300)
      })
        }
        setTimeout(() => tryFetch([
          'https://freeipapi.com/api/json',
          'https://ipwhois.app/json/?lang=zh-CN',
          'https://geolocation-db.com/json/'
        ]), 200)
      })
```

**这段是上一版本残留的重复/死代码，全部删掉。** 保留前面完整的 IP fetch 逻辑（`fetch('/api/ip')` 那一段）和点赞逻辑即可。

### 5c.（可选，不做也能用）把 inject.bottom 里的 JS 也拆到 `source/js/custom.js`，inject 改为 `<script src="/js/custom.js"></script>`。

---

## 第 6 步：删除手动的 robots.txt

插件会自动生成 robots.txt，删掉手动的：

```bash
rm "C:\Users\admin\Desktop\个人文件夹\hexo-blog\source\robots.txt"
```

---

## 第 7 步：给每篇文章补齐 SEO front-matter

下面 5 篇文章 front-matter 都缺 `description`、`keywords`、`cover`、`abbrlink`。

格式模板（每篇根据实际内容填）：

```yaml
---
title: 文章标题
date: 2020-12-25 18:56:09
updated: 2026-06-29
tags:
  - 标签
categories: 分类
keywords:
  - 关键词1
  - 关键词2
  - 深海猫
description: 150字以内的文章摘要，必须包含"深海猫"一词，这是搜索结果展示的文字。
cover: /img/1.jpg
abbrlink: （hexo g 时自动生成）
---
```

需要修改的文章列表（都在 `source/_posts/` 下）：

1. `HelloWorld.md`
2. `博客长草了-聊点AI.md`
3. `关于我用yilia主题的一些事.md`
4. `双系统之今日无事可做.md`
5. `香港开卡开户买美股踩坑记录.md`

> 重点：description 里一定要自然包含"深海猫"，每篇的 description 不要雷同。

---

## 第 8 步：验证

全部改完后执行：

```bash
npx hexo clean && npx hexo g
```

确认：

- 无报错
- `public/sitemap.xml` 存在
- `public/baidusitemap.xml` 存在
- `public/robots.txt` 存在且包含 `Sitemap: https://www.deepseacat.cn/sitemap.xml`
- `public/css/custom.css` 存在
- 打开 `public/index.html`，搜索 `structured_data` 或 `application/ld+json` 确认结构化数据存在
- 打开 `public/index.html`，确认有 `<meta name="keywords"` 标签

---

## 第 9 步：搜索引擎手动提交

这一步需要你（人类）在浏览器操作，Codex 做不了(你可以尝试)：

### Google Search Console

1. 打开 https://search.google.com/search-console
2. 添加资源 → 网址前缀 → 输入 `https://www.deepseacat.cn`
3. 验证所有权（用 HTML 标签方式，拿到 code 填回第 3c 步）
4. 验证通过后 → 站点地图 → 提交 `sitemap.xml`

### 百度站长平台

1. 打开 https://ziyuan.baidu.com
2. 添加站点 → `www.deepseacat.cn`
3. 验证码已配好（`codeva-14gaoQwRwM`）
4. 提交 sitemap

### Bing Webmaster Tools

1. 打开 https://www.bing.com/webmasters
2. 可以直接导入 Google Search Console 数据，省事

---

## 执行顺序总结

```
第1步 → 第2步 → 第3步 → 第4步 → 第5步 → 第6步 → 第7步 → 第8步
                                                              ↓
                                                         第9步（人工）
```

每一步做完跑 `npx hexo g` 验证。全绿了再部署 `npx hexo d`。
