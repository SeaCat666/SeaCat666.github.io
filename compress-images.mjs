import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('source/img');
const files = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

// 1. 把所有封面图压缩为 .webp
for (const file of files) {
  const inputPath = path.join(imgDir, file);
  const stat = fs.statSync(inputPath);
  const ext = path.extname(file).toLowerCase();

  const baseName = path.basename(file, ext);
  const outputPath = path.join(imgDir, baseName + '.webp');

  // 如果 .webp 已存在且更小，跳过
  if (fs.existsSync(outputPath)) {
    const webpStat = fs.statSync(outputPath);
    if (webpStat.size < stat.size) {
      console.log(`⏭  ${file.padEnd(30)} → 已有 ${(webpStat.size / 1024).toFixed(0)} KB`);
      continue;
    }
  }

  const img = sharp(inputPath);
  const metadata = await img.metadata();
  let pipeline = img;

  // 宽图缩到 1920，防止移动端加载超大图
  if (metadata.width > 1920) {
    pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
  }

  // 首页封面给更高压缩率
  const quality = file.toLowerCase() === 'home.jpg' ? 70 : 80;

  await pipeline
    .webp({ quality, nearLossless: false })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  const ratio = ((1 - newSize / stat.size) * 100).toFixed(0);
  console.log(
    `✅ ${file.padEnd(30)} ${(stat.size / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(0)} KB (-${ratio}%)`
  );
}

// 2. 更新 _config.butterfly.yml 中所有图片路径，把 .jpg/.png 改为 .webp
const configPath = path.resolve('_config.butterfly.yml');
let config = fs.readFileSync(configPath, 'utf-8');

/** 将所有 /img/*.jpg|.png 替换为 .webp，如果 webp 文件存在 */
function replaceImgExt(text) {
  return text.replace(/(\/img\/[\w.-]+)\.(jpg|jpeg|png)/gi, (match, basePath) => {
    const webpFile = basePath + '.webp';
    const webpName = path.basename(webpFile);
    if (fs.existsSync(path.join(imgDir, webpName))) {
      return webpFile;
    }
    return match;
  });
}

const newConfig = replaceImgExt(config);
if (newConfig !== config) {
  fs.writeFileSync(configPath, newConfig);
  const changed = (newConfig.match(/\.webp/g) || []).length - (config.match(/\.webp/g) || []).length;
  console.log(`\n📝 配置更新: ${changed} 处引用改为 .webp`);
} else {
  console.log('\n⚠️  配置无需修改');
}

console.log('\n🎉 全部完成！运行 hexo clean && hexo g && hexo d 部署');
