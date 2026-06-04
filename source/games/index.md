---
title: 游戏记录
date: 2026-06-02 22:00:00
type: games
comments: true
---

<style>
.game-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
.game-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 12px;
  background: var(--card-bg, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--hr-border, #eee);
  line-height: 1.5;
}
.game-item .game-rank-num {
  flex-shrink: 0; width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px; font-size: 13px; font-weight: 700; color: #fff;
  background: var(--theme-color, #49B1F5);
}
.game-item .game-body { flex: 1; min-width: 0; }
.game-item .game-title { font-weight: 600; font-size: 14px; }
.game-item .game-meta { font-size: 12px; color: var(--second-text, #888); margin-top: 2px; }
.game-item .game-comment { font-size: 13px; color: var(--text-prew, #555); margin-top: 4px; font-style: italic; }
.game-item .game-rating { flex-shrink: 0; font-size: 13px; color: #f0c040; }
.steam-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; margin-bottom: 20px; }
.steam-card { border-radius: 8px; overflow: hidden; background: var(--card-bg, #2a2a2a); transition: transform 0.2s; }
.steam-card:hover { transform: translateY(-3px); }
.steam-card a { text-decoration: none; color: inherit; display: block; }
.steam-card img { width: 100%; height: 85px; object-fit: cover; display: block; }
.steam-info { padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; }
.steam-name { font-size: 13px; font-weight: 500; }
.steam-hours { font-size: 11px; opacity: 0.6; }
@media (prefers-color-scheme: dark) {
  .game-item { background: var(--card-bg, #2a2a2a); border-color: var(--hr-border, #333); }
  .game-item .game-comment { color: var(--second-text, #aaa); }
}
</style>

## 🎮 游戏记录

### ⭐ 我最喜爱的游戏

<div class="game-list">

<div class="game-item">
  <div class="game-rank-num">1</div>
  <div class="game-body">
    <div class="game-title">我的世界 · Minecraft</div>
    <div class="game-meta">2015年至今</div>
    <div class="game-comment">很多人不懂像素沙盒为什么好玩——Minecraft 的乐趣全靠想象力。装Java、搭服、写插件做mod，这些门槛反而是IT启蒙。我也是，初中想手撕MC的源码，从此开始自学编程。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">2</div>
  <div class="game-body">
    <div class="game-title">黎明杀机 · Dead by Daylight</div>
    <div class="game-meta">2000h+</div>
    <div class="game-comment">追逐与杀戮的极致体验。因过于暴力血腥无法在国内正常宣传，被第五人格抄袭后补票买版权，热度早已被抢光。2026年2月23日达成全角色全技能，堪比破解版。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">3</div>
  <div class="game-body">
    <div class="game-title">像素生存者 2 · Pixel Survival Game 2</div>
    <div class="game-meta">2016年至今</div>
    <div class="game-comment">小学被朋友带入坑，一款极其简陋的ARPG，组队刷副本做装备。说不出为什么就是喜欢。氪金约3500元，其他游戏没有一款超过1000。4.5分扣在实在太简陋。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐½</div>
</div>

<div class="game-item">
  <div class="game-rank-num">4</div>
  <div class="game-body">
    <div class="game-title">鹅鸭杀 · Goose Goose Duck</div>
    <div class="game-meta">300h+</div>
    <div class="game-comment">激情推理。最早爱玩的是 Among Us 太空狼人杀，可惜不照顾中国玩家，被鹅鸭杀取而代之。300小时里230小时是连续肝的，数不清多少通宵。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐½</div>
</div>

<div class="game-item">
  <div class="game-rank-num">5</div>
  <div class="game-body">
    <div class="game-title">泰拉瑞亚 · Terraria</div>
    <div class="game-meta">400h+</div>
    <div class="game-comment">2D横板像素劝退不少人，常被说看不懂。无需解释，通宵挖矿肝疼过自然懂。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">6</div>
  <div class="game-body">
    <div class="game-title">反恐精英 2 · Counter-Strike 2</div>
    <div class="game-meta">900h+</div>
    <div class="game-comment">最纯粹的FPS，没有技能没有大招，30分钟肾上腺素拉满。不碰瓦。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">7</div>
  <div class="game-body">
    <div class="game-title">Apex 英雄 · Apex Legends</div>
    <div class="game-meta">375h+</div>
    <div class="game-comment">论打击感，没有对手。TTK长，枪法说话。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">8</div>
  <div class="game-body">
    <div class="game-title">炉石传说：酒馆战棋 · Hearthstone Battlegrounds</div>
    <div class="game-meta">800h+</div>
    <div class="game-comment">自走棋里最对味的一款。比金铲铲更像麻将，凑三连的快感无与伦比。800h+，还在酒馆里坐着。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">9</div>
  <div class="game-body">
    <div class="game-title">黑神话：悟空 · Black Myth: Wukong</div>
    <div class="game-meta">200h+</div>
    <div class="game-comment">瑕不掩瑜，但瑕有点多。国产最强不假，半成品也不假。六周目200h，希望游科把坑填完。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐</div>
</div>

<div class="game-item">
  <div class="game-rank-num">10</div>
  <div class="game-body">
    <div class="game-title">部落冲突 · Clash of Clans</div>
    <div class="game-meta">初中时期</div>
    <div class="game-comment">纯粹的情怀位。初中时光，每天上线收资源打部落战，简单的快乐。</div>
  </div>
  <div class="game-rating">⭐⭐⭐⭐⭐</div>
</div>

</div>

### 🔥 Steam 游戏库

<div class="steam-grid">
<div class="steam-card"><a href="https://store.steampowered.com/app/381210" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/header.jpg" loading="lazy" alt="黎明杀机"><div class="steam-info"><span class="steam-name">黎明杀机</span><span class="steam-hours">2394h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/730" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg" loading="lazy" alt="反恐精英 2"><div class="steam-info"><span class="steam-name">反恐精英 2</span><span class="steam-hours">801h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1172470" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg" loading="lazy" alt="Apex 英雄"><div class="steam-info"><span class="steam-name">Apex 英雄</span><span class="steam-hours">375h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/105600" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg" loading="lazy" alt="泰拉瑞亚"><div class="steam-info"><span class="steam-name">泰拉瑞亚</span><span class="steam-hours">327h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1568590" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1568590/header.jpg" loading="lazy" alt="鹅鸭杀"><div class="steam-info"><span class="steam-name">鹅鸭杀</span><span class="steam-hours">299h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/578080" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg" loading="lazy" alt="绝地求生"><div class="steam-info"><span class="steam-name">绝地求生</span><span class="steam-hours">260h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/431960" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/431960/header.jpg" loading="lazy" alt="壁纸引擎"><div class="steam-info"><span class="steam-name">壁纸引擎</span><span class="steam-hours">260h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/2358720" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg" loading="lazy" alt="黑神话：悟空"><div class="steam-info"><span class="steam-name">黑神话：悟空</span><span class="steam-hours">155h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/322330" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg" loading="lazy" alt="饥荒联机版"><div class="steam-info"><span class="steam-name">饥荒联机版</span><span class="steam-hours">131h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/588650" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg" loading="lazy" alt="死亡细胞"><div class="steam-info"><span class="steam-name">死亡细胞</span><span class="steam-hours">89h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/292030" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg" loading="lazy" alt="巫师 3"><div class="steam-info"><span class="steam-name">巫师 3</span><span class="steam-hours">83h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1721470" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1721470/header.jpg" loading="lazy" alt="波比的游戏时间"><div class="steam-info"><span class="steam-name">波比的游戏时间</span><span class="steam-hours">79h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/322170" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg" loading="lazy" alt="几何冲刺"><div class="steam-info"><span class="steam-name">几何冲刺</span><span class="steam-hours">78h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/367520" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg" loading="lazy" alt="空洞骑士"><div class="steam-info"><span class="steam-name">空洞骑士</span><span class="steam-hours">75h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1030300" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030300/header.jpg" loading="lazy" alt="空洞骑士：丝之歌"><div class="steam-info"><span class="steam-name">空洞骑士：丝之歌</span><span class="steam-hours">71h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/553850" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg" loading="lazy" alt="地狱潜者 2"><div class="steam-info"><span class="steam-name">地狱潜者 2</span><span class="steam-hours">66h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/3590" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/header.jpg" loading="lazy" alt="植物大战僵尸"><div class="steam-info"><span class="steam-name">植物大战僵尸</span><span class="steam-hours">66h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1174180" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg" loading="lazy" alt="荒野大镖客 2"><div class="steam-info"><span class="steam-name">荒野大镖客 2</span><span class="steam-hours">62h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/945360" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg" loading="lazy" alt="在我们之中"><div class="steam-info"><span class="steam-name">在我们之中</span><span class="steam-hours">62h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/219740" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/219740/header.jpg" loading="lazy" alt="饥荒"><div class="steam-info"><span class="steam-name">饥荒</span><span class="steam-hours">60h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/242760" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg" loading="lazy" alt="森林"><div class="steam-info"><span class="steam-name">森林</span><span class="steam-hours">59h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1245620" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" loading="lazy" alt="艾尔登法环"><div class="steam-info"><span class="steam-name">艾尔登法环</span><span class="steam-hours">56h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1190460" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1190460/header.jpg" loading="lazy" alt="死亡搁浅"><div class="steam-info"><span class="steam-name">死亡搁浅</span><span class="steam-hours">56h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/774171" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/774171/header.jpg" loading="lazy" alt="Muse Dash"><div class="steam-info"><span class="steam-name">Muse Dash</span><span class="steam-hours">47h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/495420" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/495420/header.jpg" loading="lazy" alt="腐烂国度 2"><div class="steam-info"><span class="steam-name">腐烂国度 2</span><span class="steam-hours">45h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/550" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/header.jpg" loading="lazy" alt="求生之路 2"><div class="steam-info"><span class="steam-name">求生之路 2</span><span class="steam-hours">42h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1203220" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg" loading="lazy" alt="永劫无间"><div class="steam-info"><span class="steam-name">永劫无间</span><span class="steam-hours">42h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/477160" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/477160/header.jpg" loading="lazy" alt="人类一败涂地"><div class="steam-info"><span class="steam-name">人类一败涂地</span><span class="steam-hours">33h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1868140" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/header.jpg" loading="lazy" alt="潜水员戴夫"><div class="steam-info"><span class="steam-name">潜水员戴夫</span><span class="steam-hours">33h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/500" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/500/header.jpg" loading="lazy" alt="求生之路"><div class="steam-info"><span class="steam-name">求生之路</span><span class="steam-hours">33h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1012880" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1012880/header.jpg" loading="lazy" alt="60秒重制版"><div class="steam-info"><span class="steam-name">60秒重制版</span><span class="steam-hours">30h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/304930" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/header.jpg" loading="lazy" alt="未转变者"><div class="steam-info"><span class="steam-name">未转变者</span><span class="steam-hours">29h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1222140" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg" loading="lazy" alt="底特律：变人"><div class="steam-info"><span class="steam-name">底特律：变人</span><span class="steam-hours">28h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1091500" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg" loading="lazy" alt="赛博朋克 2077"><div class="steam-info"><span class="steam-name">赛博朋克 2077</span><span class="steam-hours">26h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1281930" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1281930/header.jpg" loading="lazy" alt="tModLoader"><div class="steam-info"><span class="steam-name">tModLoader</span><span class="steam-hours">25h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/733070" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/733070/header.jpg" loading="lazy" alt="数独宇宙"><div class="steam-info"><span class="steam-name">数独宇宙</span><span class="steam-hours">24h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/620" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/header.jpg" loading="lazy" alt="传送门 2"><div class="steam-info"><span class="steam-name">传送门 2</span><span class="steam-hours">24h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1817070" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg" loading="lazy" alt="漫威蜘蛛侠重制版"><div class="steam-info"><span class="steam-name">漫威蜘蛛侠重制版</span><span class="steam-hours">24h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/504230" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/504230/header.jpg" loading="lazy" alt="蔚蓝"><div class="steam-info"><span class="steam-name">蔚蓝</span><span class="steam-hours">23h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/413150" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg" loading="lazy" alt="星露谷物语"><div class="steam-info"><span class="steam-name">星露谷物语</span><span class="steam-hours">22h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/223470" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/223470/header.jpg" loading="lazy" alt="夺命邮差 2"><div class="steam-info"><span class="steam-name">夺命邮差 2</span><span class="steam-hours">22h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/218620" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/header.jpg" loading="lazy" alt="收获日 2"><div class="steam-info"><span class="steam-name">收获日 2</span><span class="steam-hours">22h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1426210" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/header.jpg" loading="lazy" alt="双人成行"><div class="steam-info"><span class="steam-name">双人成行</span><span class="steam-hours">21h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/4000" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/header.jpg" loading="lazy" alt="盖瑞模组"><div class="steam-info"><span class="steam-name">盖瑞模组</span><span class="steam-hours">20h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1817190" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817190/header.jpg" loading="lazy" alt="蜘蛛侠：迈尔斯"><div class="steam-info"><span class="steam-name">蜘蛛侠：迈尔斯</span><span class="steam-hours">20h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1237970" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/header.jpg" loading="lazy" alt="泰坦陨落 2"><div class="steam-info"><span class="steam-name">泰坦陨落 2</span><span class="steam-hours">19h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/250900" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/250900/header.jpg" loading="lazy" alt="以撒的结合：重生"><div class="steam-info"><span class="steam-name">以撒的结合：重生</span><span class="steam-hours">16h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1850570" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/header.jpg" loading="lazy" alt="死亡搁浅导演剪辑版"><div class="steam-info"><span class="steam-name">死亡搁浅导演剪辑版</span><span class="steam-hours">16h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1372110" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1372110/header.jpg" loading="lazy" alt="JOJO 全明星大乱斗 R"><div class="steam-info"><span class="steam-name">JOJO 全明星大乱斗 R</span><span class="steam-hours">14h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/346110" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/header.jpg" loading="lazy" alt="方舟：生存进化"><div class="steam-info"><span class="steam-name">方舟：生存进化</span><span class="steam-hours">12h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/108600" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg" loading="lazy" alt="僵尸毁灭工程"><div class="steam-info"><span class="steam-name">僵尸毁灭工程</span><span class="steam-hours">11h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/700330" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/700330/header.jpg" loading="lazy" alt="SCP：秘密实验室"><div class="steam-info"><span class="steam-name">SCP：秘密实验室</span><span class="steam-hours">11h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/6880" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/6880/header.jpg" loading="lazy" alt="正当防卫"><div class="steam-info"><span class="steam-name">正当防卫</span><span class="steam-hours">10h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/10150" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10150/header.jpg" loading="lazy" alt="虐杀原形"><div class="steam-info"><span class="steam-name">虐杀原形</span><span class="steam-hours">10h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/20900" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/20900/header.jpg" loading="lazy" alt="巫师增强版"><div class="steam-info"><span class="steam-name">巫师增强版</span><span class="steam-hours">10h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/230410" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/header.jpg" loading="lazy" alt="Warframe"><div class="steam-info"><span class="steam-name">Warframe</span><span class="steam-hours">10h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/240720" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/240720/header.jpg" loading="lazy" alt="掘地求升"><div class="steam-info"><span class="steam-name">掘地求升</span><span class="steam-hours">10h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1326470" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1326470/header.jpg" loading="lazy" alt="森林之子"><div class="steam-info"><span class="steam-name">森林之子</span><span class="steam-hours">9h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/414700" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/414700/header.jpg" loading="lazy" alt="逃生 2"><div class="steam-info"><span class="steam-name">逃生 2</span><span class="steam-hours">9h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/582010" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582010/header.jpg" loading="lazy" alt="怪物猎人：世界"><div class="steam-info"><span class="steam-name">怪物猎人：世界</span><span class="steam-hours">9h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/1304930" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1304930/header.jpg" loading="lazy" alt="逃生：试炼"><div class="steam-info"><span class="steam-name">逃生：试炼</span><span class="steam-hours">9h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/400" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/header.jpg" loading="lazy" alt="传送门"><div class="steam-info"><span class="steam-name">传送门</span><span class="steam-hours">7h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/493520" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/493520/header.jpg" loading="lazy" alt="GTFO"><div class="steam-info"><span class="steam-name">GTFO</span><span class="steam-hours">7h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/2495450" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2495450/header.jpg" loading="lazy" alt="冬日回忆"><div class="steam-info"><span class="steam-name">冬日回忆</span><span class="steam-hours">6h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/313120" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/313120/header.jpg" loading="lazy" alt="深海搁浅"><div class="steam-info"><span class="steam-name">深海搁浅</span><span class="steam-hours">6h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/553640" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553640/header.jpg" loading="lazy" alt="ICEY"><div class="steam-info"><span class="steam-name">ICEY</span><span class="steam-hours">6h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/648350" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648350/header.jpg" loading="lazy" alt="侏罗纪世界：进化"><div class="steam-info"><span class="steam-name">侏罗纪世界：进化</span><span class="steam-hours">5h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/206440" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/206440/header.jpg" loading="lazy" alt="去月球"><div class="steam-info"><span class="steam-name">去月球</span><span class="steam-hours">4h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/466240" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/466240/header.jpg" loading="lazy" alt="欺诈游戏"><div class="steam-info"><span class="steam-name">欺诈游戏</span><span class="steam-hours">4h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/2567870" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg" loading="lazy" alt="链在一起"><div class="steam-info"><span class="steam-name">链在一起</span><span class="steam-hours">4h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/2835570" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2835570/header.jpg" loading="lazy" alt="Buckshot Roulette"><div class="steam-info"><span class="steam-name">Buckshot Roulette</span><span class="steam-hours">3h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/924970" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/924970/header.jpg" loading="lazy" alt="Back 4 Blood"><div class="steam-info"><span class="steam-name">Back 4 Blood</span><span class="steam-hours">2h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/939400" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/939400/header.jpg" loading="lazy" alt="拣爱"><div class="steam-info"><span class="steam-name">拣爱</span><span class="steam-hours">3h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/2527500" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2527500/header.jpg" loading="lazy" alt="MiSide"><div class="steam-info"><span class="steam-name">MiSide</span><span class="steam-hours">2h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/255710" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/255710/header.jpg" loading="lazy" alt="城市：天际线"><div class="steam-info"><span class="steam-name">城市：天际线</span><span class="steam-hours">1h</span></div></a></div>
<div class="steam-card"><a href="https://store.steampowered.com/app/239140" target="_blank" rel="noopener"><img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/header.jpg" loading="lazy" alt="消逝的光芒"><div class="steam-info"><span class="steam-name">消逝的光芒</span><span class="steam-hours">0h</span></div></a></div>
</div>

> Steam 数据通过 API 获取，共 76 款游戏。
