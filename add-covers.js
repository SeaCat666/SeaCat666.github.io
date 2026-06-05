// 为 movies/index.md 的每个影视条目添加封面图
// V4: 使用 OMDb API (英文搜索) + 中英对照映射
const fs = require('fs');
const https = require('https');
const path = require('path');

const FILE = path.join(__dirname, 'source', 'movies', 'index.md');

// 中英对照表：中文标题 -> { eng, year }
const TITLE_MAP = {
  // 真人电影
  '星际穿越': { eng: 'Interstellar', year: '2014' },
  '挽救计划': { eng: 'Project Hail Mary', year: '2026' },
  '火星救援': { eng: 'The Martian', year: '2015' },
  '盗梦空间': { eng: 'Inception', year: '2010' },
  '银翼杀手2049': { eng: 'Blade Runner 2049', year: '2017' },
  '阿丽塔：战斗天使': { eng: 'Alita Battle Angel', year: '2019' },
  '超体': { eng: 'Lucy', year: '2014' },
  '头号玩家': { eng: 'Ready Player One', year: '2018' },
  '失控玩家': { eng: 'Free Guy', year: '2021' },
  '独行月球': { eng: 'Moon Man', year: '2022' },
  '刺杀小说家': { eng: "A Writer's Odyssey", year: '2021' },
  '菊次郎的夏天': { eng: 'Kikujiro', year: '1999' },
  '咒乐园': { eng: 'The Park', year: '2003' },
  '寄生兽': { eng: 'Parasyte', year: '2014' },
  '复仇者联盟': { eng: 'The Avengers', year: '2012' },
  '钢铁侠': { eng: 'Iron Man', year: '2008' },
  '美国队长': { eng: 'Captain America The First Avenger', year: '2011' },
  '雷神': { eng: 'Thor', year: '2011' },
  '银河护卫队': { eng: 'Guardians of the Galaxy', year: '2014' },
  '蚁人': { eng: 'Ant-Man', year: '2015' },
  '蜘蛛侠：英雄归来': { eng: 'Spider-Man Homecoming', year: '2017' },
  '奇异博士': { eng: 'Doctor Strange', year: '2016' },
  '黑豹': { eng: 'Black Panther', year: '2018' },
  '尚气': { eng: 'Shang-Chi', year: '2021' },
  '永恒族': { eng: 'Eternals', year: '2021' },
  '蝙蝠侠': { eng: 'Batman Begins', year: '2005' },
  '超人': { eng: 'Man of Steel', year: '2013' },
  '小丑': { eng: 'Joker', year: '2019' },
  '自杀小队': { eng: 'Suicide Squad', year: '2016' },
  '正义联盟（扎导版）': { eng: 'Justice League', year: '2021' },
  '闪电侠': { eng: 'The Flash', year: '2023' },
  '黑客帝国': { eng: 'The Matrix', year: '1999' },
  '饥饿游戏': { eng: 'The Hunger Games', year: '2012' },
  '流浪地球': { eng: 'The Wandering Earth', year: '2019' },
  '沙丘': { eng: 'Dune', year: '2021' },
  '阿凡达': { eng: 'Avatar', year: '2009' },
  '环太平洋': { eng: 'Pacific Rim', year: '2013' },
  '猩球崛起': { eng: 'Rise of the Planet of the Apes', year: '2011' },
  '毒液': { eng: 'Venom', year: '2018' },
  '哥斯拉': { eng: 'Godzilla', year: '2014' },
  '金刚：骷髅岛': { eng: 'Kong Skull Island', year: '2017' },
  '哥斯拉大战金刚': { eng: 'Godzilla vs Kong', year: '2021' },

  // 真人剧集
  '黑袍纠察队': { eng: 'The Boys', year: '2019' },
  '怪奇物语': { eng: 'Stranger Things', year: '2016' },
  '黑镜': { eng: 'Black Mirror', year: '2011' },
  '权力的游戏': { eng: 'Game of Thrones', year: '2011' },
  '绝命毒师': { eng: 'Breaking Bad', year: '2008' },
  '洛基': { eng: 'Loki', year: '2021' },
  '月光骑士': { eng: 'Moon Knight', year: '2022' },

  // 动画电影
  '千与千寻': { eng: 'Spirited Away', year: '2001' },
  '幽灵公主': { eng: 'Princess Mononoke', year: '1997' },
  '天空之城': { eng: 'Castle in the Sky', year: '1986' },
  '哈尔的移动城堡': { eng: "Howl's Moving Castle", year: '2004' },
  '红猪': { eng: 'Porco Rosso', year: '1992' },
  '侧耳倾听': { eng: 'Whisper of the Heart', year: '1995' },
  '龙猫': { eng: 'My Neighbor Totoro', year: '1988' },
  '你的名字': { eng: 'Your Name', year: '2016' },
  '天气之子': { eng: 'Weathering with You', year: '2019' },
  '秒速5厘米': { eng: '5 Centimeters per Second', year: '2007' },
  '言叶之庭': { eng: 'The Garden of Words', year: '2013' },
  '声之形': { eng: 'A Silent Voice', year: '2016' },
  '烟花': { eng: 'Fireworks', year: '2017' },
  '你好世界': { eng: 'Hello World', year: '2019' },
  '蜘蛛侠：平行宇宙': { eng: 'Spider-Man Into the Spider-Verse', year: '2018' },

  // 动画剧集
  '进击的巨人': { eng: 'Attack on Titan', year: '2013' },
  '鬼灭之刃': { eng: 'Demon Slayer', year: '2019' },
  '赛博朋克边缘行者': { eng: 'Cyberpunk Edgerunners', year: '2022' },
  '海贼王': { eng: 'One Piece', year: '1999' },
  'OVERLORD': { eng: 'Overlord', year: '2015' },
  '刃牙': { eng: 'Baki', year: '2018' },
  '拳愿阿修罗': { eng: 'Kengan Ashura', year: '2019' },
  '狐妖小红娘': { eng: 'Fox Spirit Matchmaker', year: '2015' },
  'JOJO的奇妙冒险': { eng: "JoJo's Bizarre Adventure", year: '2012' },
  '灵能百分百': { eng: 'Mob Psycho 100', year: '2016' },
  '一拳超人': { eng: 'One Punch Man', year: '2015' },
  '蜡笔小新': { eng: 'Shinchan', year: '1992' },
  '恶魔人 Crybaby': { eng: 'Devilman Crybaby', year: '2018' },
  '异世界舅舅': { eng: 'Uncle from Another World', year: '2022' },
  '瑞克和莫蒂': { eng: 'Rick and Morty', year: '2013' },
  '无敌少侠': { eng: 'Invincible', year: '2021' },
  '爱死亡和机器人': { eng: 'Love, Death & Robots', year: '2019' },
  '怪诞小镇': { eng: 'Gravity Falls', year: '2012' },
  '星蝶公主': { eng: 'Star vs the Forces of Evil', year: '2015' },
};

// 提取所有 movie-item 块
function extractMovieItems(html) {
  const items = [];
  const startTag = '<div class="movie-item">';
  let searchFrom = 0;

  while (true) {
    const startIdx = html.indexOf(startTag, searchFrom);
    if (startIdx === -1) break;

    let pos = startIdx + startTag.length;
    let depth = 1;

    while (depth > 0 && pos < html.length) {
      const nextOpen = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) { pos = nextClose + 6; break; }
        pos = nextClose + 6;
      }
    }

    if (depth === 0) {
      const fullHtml = html.substring(startIdx, pos);
      const inner = fullHtml.slice(startTag.length, fullHtml.length - 6);
      const titleMatch = inner.match(/<div class="movie-title">([^<]+)<\/div>/);
      if (titleMatch) {
        items.push({
          title: titleMatch[1].trim(),
          fullHtml: fullHtml,
          startIdx: startIdx,
          endIdx: pos,
        });
      }
    }
    searchFrom = pos;
  }
  return items;
}

function omdbSearch(title, year) {
  return new Promise((resolve) => {
    const q = encodeURIComponent(title);
    const y = year ? `&y=${year}` : '';
    const url = `https://www.omdbapi.com/?t=${q}${y}&apikey=trilogy`;

    https.get(url, {
      headers: { 'Accept': 'application/json' },
      timeout: 10000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.Poster && json.Poster !== 'N/A') {
            resolve(json.Poster);
          } else {
            // 不带年份重试
            if (year) {
              const url2 = `https://www.omdbapi.com/?t=${q}&apikey=trilogy`;
              https.get(url2, { headers: { 'Accept': 'application/json' }, timeout: 10000 }, (res2) => {
                let d2 = '';
                res2.on('data', chunk => d2 += chunk);
                res2.on('end', () => {
                  try {
                    const j2 = JSON.parse(d2);
                    resolve((j2.Poster && j2.Poster !== 'N/A') ? j2.Poster : '');
                  } catch (e) { resolve(''); }
                });
              }).on('error', () => resolve(''));
            } else {
              resolve('');
            }
          }
        } catch (e) { resolve(''); }
      });
    }).on('error', () => resolve(''));
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const content = fs.readFileSync(FILE, 'utf-8');

  const fmEndIdx = content.indexOf('\n---\n', 4);
  const frontMatter = content.substring(0, fmEndIdx + 4);
  const body = content.substring(fmEndIdx + 4);

  console.log('Parsing...');
  const items = extractMovieItems(body);
  console.log(`Found ${items.length} items\n`);

  const coverMap = {};
  let found = 0;
  let failed = [];

  for (let i = 0; i < items.length; i++) {
    const title = items[i].title;
    if (coverMap[title]) { found++; continue; }

    const mapping = TITLE_MAP[title];
    if (!mapping) {
      console.log(`[${i + 1}/${items.length}] ${title} -> NO MAPPING`);
      failed.push(title);
      continue;
    }

    process.stdout.write(`[${i + 1}/${items.length}] ${title} -> ${mapping.eng} ... `);

    const posterUrl = await omdbSearch(mapping.eng, mapping.year);
    if (posterUrl) {
      coverMap[title] = posterUrl;
      found++;
      console.log('OK');
    } else {
      coverMap[title] = '';
      failed.push(title);
      console.log('not found');
    }

    await sleep(500);
  }

  console.log(`\n=== Results: ${found}/${items.length} found ===`);
  if (failed.length > 0) {
    console.log(`Failed (${failed.length}): ${failed.join(', ')}`);
  }

  // 替换 HTML (从后往前)
  let newBody = body;
  let replaced = 0;
  const sortedItems = [...items].sort((a, b) => b.startIdx - a.startIdx);

  for (const item of sortedItems) {
    const coverUrl = coverMap[item.title];
    if (!coverUrl) continue;
    if (item.fullHtml.includes('movie-cover')) continue;

    const newHtml = item.fullHtml.replace(
      /(<div class="movie-badge[^"]*">[^<]*<\/div>)\s*/,
      `$1\n  <img class="movie-cover" src="${coverUrl}" alt="${item.title}" loading="lazy">\n  `
    );

    if (newHtml !== item.fullHtml) {
      newBody = newBody.substring(0, item.startIdx) + newHtml + newBody.substring(item.endIdx);
      replaced++;
    }
  }

  // 更新 CSS
  const newStyle = `<style>
.movie-section { margin-bottom: 30px; }
.movie-section h3 { margin-bottom: 10px; font-size: 16px; }
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
.movie-badge.movie { background: #f44336; }
.movie-badge.series { background: #4caf50; }
.movie-badge.amovie { background: #e91e63; }
.movie-badge.aseries { background: #2196f3; }
.movie-item .movie-cover {
  flex-shrink: 0; width: 60px; height: 85px;
  object-fit: cover; border-radius: 4px;
  background: var(--hr-border, #eee);
}
.movie-item .movie-body { flex: 1; min-width: 0; }
.movie-item .movie-title { font-weight: 600; font-size: 14px; }
.movie-item .movie-meta { font-size: 12px; color: var(--second-text, #888); margin-top: 2px; }
.movie-item .movie-comment { font-size: 13px; color: var(--text-prew, #555); margin-top: 4px; font-style: italic; }
.movie-item .movie-rating { flex-shrink: 0; font-size: 13px; color: #f0c040; }
@media (prefers-color-scheme: dark) {
  .movie-item { background: var(--card-bg, #2a2a2a); border-color: var(--hr-border, #333); }
  .movie-item .movie-comment { color: var(--second-text, #aaa); }
  .movie-item .movie-cover { background: var(--hr-border, #333); }
}
</style>`;

  const oldStyle = newBody.match(/<style>[\s\S]*?<\/style>/);
  if (oldStyle) {
    newBody = newBody.replace(oldStyle[0], newStyle);
  }

  fs.writeFileSync(FILE, frontMatter + newBody, 'utf-8');
  console.log(`\nDone! ${replaced} items updated with covers.`);
}

main().catch(console.error);
