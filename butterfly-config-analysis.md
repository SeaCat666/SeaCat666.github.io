# Butterfly 主题配置分析报告

> 主题默认配置: `themes/butterfly/_config.yml`
> 用户自定义: `_config.butterfly.yml`
> 未在自定义文件中列出的项，使用主题默认值。

---

## 一、已在自定义配置中启用且配置完成（无需操作）

这些功能你在自定义配置中显式启用并配置完毕，已处于工作状态。

### 导航栏
| 配置项 | 值 |
|---|---|
| `nav.logo` | /img/猫.png |
| `nav.display_title` | true |
| `nav.display_post_title` | true |
| `nav.fixed` | true |
| menu | 首页、时间轴、分类、标签、关于、友链 |

### 社交
- GitHub: `fab fa-github` → https://github.com/SeaCat666

### 图片/头像
| 配置项 | 值 |
|---|---|
| favicon | /img/favicon.ico（**与默认不同**，默认是 /img/猫.png） |
| avatar.img | /img/avatar.jpg |
| avatar.effect | false |

### 封面/背景图系列
| 配置项 | 值 |
|---|---|
| disable_top_img | false |
| tag_img | /img/tags.jpg |
| category_img | /img/categories.png |
| archive_img | /img/home.jpg |
| default_top_img | /img/home.jpg |
| index_img | /img/home.jpg |
| tag_per_img | butterfly, hexo 各指定图片 |
| footer_img | false |
| background | ['#f7f7f7'] |
| cover.index_enable/aside_enable/archives_enable | 全 true |

### 错误图片与 404 页面
- error_img.flink / post_page 均已配置
- error_404.enable: true, subtitle 已自定义, background 已自定义

### 文章元信息
- `post_meta.page` 和 `post_meta.post` 均已完整配置

### 首页副标题
- subtitle.enable: true, 三条子标题, effect: true, source: false

### 首页布局
- index_layout: 3（左右交替）
- index_post_content.method: 3, length: 500

### 目录
- toc.post/page/number/expand/style_simple/scroll_percent 全部配置

### 版权信息
- post_copyright.enable: true, license: CC BY-NC-SA 4.0

### 打赏（**已启用，与默认不同**）
- reward.enable: **true**（默认 false）
- 已配置微信和支付宝收款码

### 相关文章
- related_post.enable: true, limit: 6, date_type: created

### 分页
- post_pagination: 1

### 页脚
- footer.owner.enable: true, since: 2020
- footer.copyright.enable: true, version: true

### 侧边栏
- 全部 aside 卡片已启用：author / announcement / recent_post / newest_comments / categories / tags / archives / webinfo
- card_webinfo.runtime_date: 12/25/2020 18:56:09

### 代码块
| 配置项 | 值 | 说明 |
|---|---|---|
| code_blocks.theme | light | |
| code_blocks.macStyle | **true** | 默认 false |
| code_blocks.height_limit | **300** | 默认 false |
| code_blocks.word_wrap | **true** | 默认 false |

### 深色模式
- darkmode.enable: true, button: true, autoChangeMode: 1（跟随系统）

### 阅读模式
- readmode: true

### 搜索
- search.use: local_search, placeholder: 搜索文章...

### 分享
- share.use: sharejs, sites: facebook,x,wechat,weibo,qq

### 评论
- comments.use: **Twikoo**（默认 Utterances，已切换）
- comments.count: **true**（默认 false）
- twikoo.envId: https://twikoo-deepseacat.vercel.app

### 统计
- busuanzi.site_uv/pv/page_pv: 全 true

### 代码注入
- inject.bottom: 网易云音乐 APlayer（全局悬浮播放器）

### UI 圆角/过渡
- rounded_corners_ui: true
- mask.header/footer: true
- enter_transitions: true
- display_mode: light

### 其他
- hr_icon.enable: true
- lazyload.enable: true, native: true, field: site
- Open_Graph_meta.enable: true

---

## 二、未在自定义配置中覆盖，但主题默认 enable:true（已自动生效）

这些功能已在运行中，不需要额外操作。

| 功能 | 默认值 | 说明 |
|---|---|---|
| code_blocks.copy | true | 代码块复制按钮 |
| code_blocks.language | true | 代码块语言标识 |
| toc/post | true | 文章内目录 |
| toc/number | true | 目录编号 |
| toc/scroll_percent | true | 目录滚动百分比 |
| post_copyright | enable:true | 文章版权声明 |
| post_edit | enable:true | 在线编辑链接 |
| noticeOutdate | enable:true | 文章过期提醒（365 天） |
| translate | enable:true | 繁简转换 |
| readmode | true | 阅读模式 |
| rightside_scroll_percent | true | 回到顶部按钮显示滚动百分比 |
| rightside_config_animation | true | 右下角按钮动画 |
| copy | enable:true + copyright:true | 复制版权声明（150 字限制） |
| wordcount | enable:true | 字数统计、阅读时长、总字数 |
| aside 全部卡片 | enable:true | 侧边栏所有卡片默认启用 |
| theme_color | enable:true | 主题色已生效 |
| beautify | enable:true | 文章美化（标题前缀图标） |
| activate_power_mode | enable:true | 打字特效 |
| canvas_ribbon | enable:true | 彩带背景 |
| canvas_fluttering_ribbon | enable:true | 飘动彩带 |
| canvas_nest | enable:true | 线条粒子背景 |
| fireworks | enable:true | 鼠标点击烟花 |
| click_heart | enable:true | 鼠标点击爱心 |
| clickShowText | enable:true | 鼠标点击文字 |
| lightbox | fancybox | 图片灯箱 |
| series | enable:true | 文章系列功能 |
| mermaid | enable:true | Mermaid 图表 |
| chartjs | enable:true | Chart.js 图表 |
| note.style | flat | 笔记样式 |
| pjax | enable:true | PJAX 无刷新跳转 |
| aplayerInject | enable:true | APlayer 支持 |
| snackbar | enable:true | Toast 通知 |
| instantpage | true | Instant.page 预加载 |
| preloader | enable:true | 加载动画 |
| lazyload | enable:true | 图片懒加载 |
| pwa | enable:true | PWA 支持 |
| structured_data | enable:true | 结构化数据 |
| Open_Graph_meta | enable:true | OG 元标签 |

---

## 三、未在自定义配置中覆盖，且主题默认 enable:false（可考虑开启）

以下功能目前处于关闭状态，如果你感兴趣可以启用。

| 功能 | 默认值 | 说明 |
|---|---|---|
| code_blocks.height_limit | false（未设置高度限制） | 设置像素值后可限制代码块高度并滚动 |
| code_blocks.word_wrap | false | 代码块自动换行 |
| code_blocks.shrink | false | 代码块默认收缩 |
| code_blocks.fullpage | false | 代码块全屏按钮 |
| toc.expand | false | 目录默认展开所有层级 |
| toc.style_simple | false | 简单目录样式 |
| rightside_item_order | enable:false | 自定义右下角按钮顺序 |
| anchor.auto_update | false | 滚动时 URL 根据标题 ID 更新 |
| anchor.click_to_scroll | false | 点击标题滚动并更新锚点 |
| photofigcaption | false | 图片下方显示 figcaption |
| reward.enable | false | 打赏（**你已显式启用**，此处仅作记录） |
| noticeOutdate | 已启用 | 见第二类 |
| search.local_search.pagination.enable | false | 搜索结果显示分页 |
| comments.lazyload | false | 评论懒加载 |
| comments.card_post_count | false | 首页文章卡片显示评论数 |
| chat.* | use:空 | 所有在线聊天服务未配置 |
| baidu_analytics | 空 | 百度统计 |
| google_analytics | 空 | Google Analytics |
| cloudflare_analytics | 空 | Cloudflare Analytics |
| microsoft_clarity | 空 | Microsoft Clarity |
| umami_analytics | enable:false | Umami 分析 |
| google_tag_manager | 空 | Google Tag Manager |
| google_adsense | enable:false | Google 广告 |
| ad.* | 空 | 手动广告插入 |
| abcjs | enable:false | ABC 音乐记谱法 |
| canvas_ribbon.mobile | false | 彩带背景在移动端关闭 |
| canvas_fluttering_ribbon.mobile | false | 飘动彩带在移动端关闭 |
| copy.copyright.limit_count | 150 | 复制超过此字数才附加版权（可调整） |
| activate_power_mode.mobile | false | 打字特效在移动端关闭 |

---

## 四、自定义配置中与主题默认值不同的项（已显式修改）

以下是你明确修改过的关键配置（不完全统计，重点展示行为差异）：

| 配置项 | 主题默认 | 自定义值 | 影响 |
|---|---|---|---|
| favicon | /img/猫.png | **/img/favicon.ico** | 网页图标不同 |
| error_404.subtitle | '找不到页面了 ~(>_<)~' | **自定义文字** | 404 页面文案不同 |
| error_404.background | /img/404.jpg | **/img/error-page.png** | 404 背景图不同 |
| reward.enable | false | **true** | 已开启打赏功能 |
| reward.text | 空 | **老板大气！** | 打赏文案 |
| reward.QR_code | 空 | **微信 + 支付宝** | 已配置收款码 |
| code_blocks.macStyle | false | **true** | 代码块带 Mac 风格按钮 |
| code_blocks.height_limit | false | **300** | 代码块高度限制 300px |
| code_blocks.word_wrap | false | **true** | 代码块自动换行 |
| post_edit.url | GitHub 仓库路径 | **已配置** | 在线编辑链接 |
| comments.use | Utterances | **Twikoo** | 评论系统从 GitHub Issues 改为 Twikoo |
| comments.count | false | **true** | 文章页显示评论数 |
| twikoo.envId | 空 | **https://twikoo-deepseacat.vercel.app** | Twikoo 后端地址 |
| card_post_series | enable:true（默认未显式修改） | **未在自定义中覆盖** | 默认启用，如果你想让侧边栏不显示文章系列，需显式关闭 |
| rightside_bottom | 未设置 | **未覆盖** | 默认无偏移 |

---

## 五、建议关注的潜在功能

以下功能值得考虑是否要启用或调整：

1. **comments.count 已开启** — 但 `card_post_count` 仍为 false（首页文章卡片不显示评论数），可考虑同步开启。
2. **搜索分页** — `search.local_search.pagination.enable: false`，如果文章较多，搜索结果显示分页体验更好。
3. **移动端背景特效** — `canvas_ribbon.mobile: false`、`canvas_fluttering_ribbon.mobile: false`、`activate_power_mode.mobile: false`，移动端默认关闭了部分特效，如果你希望移动端也有，可以开启。
4. **code_blocks.fullpage** — 当前 false，若代码块较长可开启全屏查看按钮。
5. **chat 服务** — 当前未配置任何在线聊天（Chatra/Tidio/Crisp），如果你需要访客可以直接联系你，可以考虑开启。
6. **umami_analytics** — 如果你自建了 Umami 分析服务，可以配置替代 Google Analytics。
