# 博客 SEO 优化 — 全部改动清单

> 在新电脑上按这个清单逐项操作即可复现。

---

## 一、安装 3 个插件

```bash
cd "你的hexo-blog路径"
npm install hexo-abbrlink --save
npm install hexo-generator-robotstxt --save
npm install hexo-generator-baidu-sitemap --save
```

---

## 二、`_config.yml` 改动（6 处）

### 1. 关键词扩展（第 8 行）
```yaml
# 原来
keywords: 深海猫
# 改成
keywords: 深海猫,深海猫博客,个人博客,编程,欧阳飞华,Hexo
```

### 2. 永久链接短链化（第 15-19 行）
```yaml
# 原来
permalink: :year/:month/:day/:title/
# 改成
permalink: posts/:abbrlink.html
```
紧接着 `permalink_defaults:` 下面新增：
```yaml
abbrlink:
  alg: crc32
  rep: hex
```

### 3. skip_render（第 35-37 行）
```yaml
# 原来
skip_render:
# 改成
skip_render:
  - vercel.json
  - excalidraw.log
```

### 4. 百度 sitemap（第 92-94 行，sitemap 配置后面）
```yaml
baidusitemap:
  path: baidusitemap.xml
```

### 5. robots.txt 插件配置（第 96-107 行）
```yaml
robotstxt:
  useragent: "*"
  allow:
    - /
  disallow:
    - /page/
    - /js/
    - /css/
    - /fonts/
    - /img/
  sitemap: https://www.deepseacat.cn/sitemap.xml
```

---

## 三、`_config.butterfly.yml` 改动（6 处）

### 1. 首页显示摘要（第 111-113 行）
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

### 2. 全局关键词（第 73-74 行，在 error_img 和 404 配置之间）
```yaml
keywords: 深海猫,技术博客,编程,Linux,Hexo
```

### 3. 站点验证（第 297-300 行）
```yaml
site_verification:
  - name: google-site-verification
    content: REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE
  - name: baidu-site-verification
    content: codeva-14gaoQwRwM
```
> ⚠️ Google 验证码需要去 GSC 拿到真实值替换 `REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE`

### 4. 开启结构化数据（第 410 行附近，在 Open_Graph_meta 后面）
```yaml
structured_data:
  enable: true
  alternate_name:
    - 深海猫
```

### 5. inject.head 拆分（第 313-315 行）
```yaml
# 原来：540 行内联 <style> CSS
# 改成一行：
inject:
  head:
    - <link rel="stylesheet" href="/css/custom.css">
```

### 6. inject.bottom 修重复 JS（第 560-573 行区域）
删除这段残留的重复/死代码：
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

---

## 四、文件操作（3 新建 + 1 删除）

### 新建：`source/css/custom.css`
把 `_config.butterfly.yml` 的 `inject.head` 里原来那 540 行 `<style>` 标签内的 CSS（去掉 `<style>` 和 `</style>` 标签）写入这个文件。

### 新建：`scripts/abbrlink-fallback.js`
Codex 创建的兼容脚本，解决当前 Node/Hexo 版本下 hexo-abbrlink 不自动生成 abbrlink 值的问题。

### 删除：`source/robots.txt`
插件 `hexo-generator-robotstxt` 会自动生成，删掉手动版。

### 删除：`source/excalidraw.log`
误提交的日志文件。

---

## 五、主题文件改动（1 处）

### `themes/butterfly/layout/includes/head.pug`
在 `meta(name="description"` 后面、`Open_Graph` include 之前插入：
```pug
- var metaKeywords = page.keywords || theme.keywords || config.keywords
if metaKeywords
  meta(name="keywords" content=Array.isArray(metaKeywords) ? metaKeywords.join(',') : metaKeywords)
```

---

## 六、5 篇文章 front-matter 补齐

每篇补了 `categories`、`keywords`、`description`、`cover`、`abbrlink`：

| 文件 | abbrlink |
|------|----------|
| `HelloWorld.md` | 77770c79 |
| `博客长草了-聊点AI.md` | 47e900ac |
| `关于我用yilia主题的一些事.md` | c1572dbd |
| `双系统之今日无事可做.md` | 15167387 |
| `香港开卡开户买美股踩坑记录.md` | edfa2f0e |

---

## 七、部署验证

```bash
NODE_OPTIONS="--max-old-space-size=8192" npx hexo clean && npx hexo g && npx hexo d
```

确认：
- `public/sitemap.xml` 存在，URL 干净（无 vercel.json、无旧格式文章链接）
- `public/baidusitemap.xml` 存在
- `public/robots.txt` 存在，含 `Sitemap: https://www.deepseacat.cn/sitemap.xml`
- `public/css/custom.css` 存在
- 首页有 `<meta name="keywords">` 和 `<script type="application/ld+json">`

---

## 八、待人工操作

1. **Google Search Console** → 拿到验证码 → 替换 `_config.butterfly.yml` 第 299 行的占位值 → 重新 `hexo g && hexo d`
2. **GSC** → 站点地图 → 提交 `sitemap.xml`
3. **百度站长** → 提交 sitemap
