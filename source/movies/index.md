---
title: 影视清单
date: 2026-06-01 16:33:00
type: movies
comments: true
---

<style>
.movie-list { display: flex; flex-direction: column; gap: 10px; }
.movie-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 12px;
  background: var(--card-bg, #f8f9fa);
  border-radius: 8px;
  border: 1px solid var(--hr-border, #eee);
  line-height: 1.5;
}
.movie-item .movie-badge {
  flex-shrink: 0; width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px; font-size: 13px; color: #fff;
}
.movie-item .movie-badge.movie { background: #f44336; }
.movie-item .movie-badge.series { background: #4caf50; }
.movie-item .movie-badge.amovie { background: #e91e63; }
.movie-item .movie-badge.aseries { background: #2196f3; }
.movie-item .movie-body { flex: 1; min-width: 0; }
.movie-item .movie-title { font-weight: 600; font-size: 14px; }
.movie-item .movie-meta { font-size: 12px; color: var(--second-text, #888); margin-top: 2px; }
.movie-item .movie-comment { font-size: 13px; color: var(--text-prew, #555); margin-top: 4px; font-style: italic; }
.movie-item .movie-rating { flex-shrink: 0; font-size: 13px; color: #f0c040; }
@media (prefers-color-scheme: dark) {
  .movie-item { background: var(--card-bg, #2a2a2a); border-color: var(--hr-border, #333); }
  .movie-item .movie-comment { color: var(--second-text, #aaa); }
}
</style>

## 🎬 影视收藏

<div class="movie-list">

<div class="movie-item">
  <div class="movie-badge movie">🎬</div>
  <div class="movie-body">
    <div class="movie-title">等你来填</div>
    <div class="movie-meta">真人·电影</div>
    <div class="movie-comment">等你来写短评</div>
  </div>
  <div class="movie-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="movie-item">
  <div class="movie-badge series">📺</div>
  <div class="movie-body">
    <div class="movie-title">等你来填</div>
    <div class="movie-meta">真人·剧集</div>
    <div class="movie-comment">等你来写短评</div>
  </div>
  <div class="movie-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="movie-item">
  <div class="movie-badge amovie">🎬</div>
  <div class="movie-body">
    <div class="movie-title">等你来填</div>
    <div class="movie-meta">动画·电影</div>
    <div class="movie-comment">等你来写短评</div>
  </div>
  <div class="movie-rating">⭐⭐⭐⭐⭐</div>
</div>

<div class="movie-item">
  <div class="movie-badge aseries">📺</div>
  <div class="movie-body">
    <div class="movie-title">等你来填</div>
    <div class="movie-meta">动画·剧集</div>
    <div class="movie-comment">等你来写短评</div>
  </div>
  <div class="movie-rating">⭐⭐⭐⭐⭐</div>
</div>

</div>
