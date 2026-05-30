#!/usr/bin/env node
// deploy.js — runs after hexo deploy to sync public/ to repo root
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const publicDir = path.join(root, 'public');

function cpDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    // skip dotfiles (except .nojekyll)
    if (e.name.startsWith('.') && e.name !== '.nojekyll') continue;
    if (e.isDirectory()) {
      cpDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// Step 1: Copy public/ to root
console.log('Copying public/ to repo root...');
cpDir(publicDir, root);

// Step 2: Remove stale deploy dirs/filess not in public
const stale = ['live2dw', 'assets', 'categories', '404.html', 'content.json'];
stale.forEach(f => {
  const p = path.join(root, f);
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
});

// Step 3: Commit and push
console.log('Committing and pushing...');
execSync('git add -A', { cwd: root, stdio: 'inherit' });
execSync('git add --force .nojekyll', { cwd: root, stdio: 'inherit' });
try {
  execSync('git commit -m "deploy: ' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '"', { cwd: root, stdio: 'inherit' });
} catch {
  // nothing to commit — fine
}
execSync('git push origin master', { cwd: root, stdio: 'inherit' });

console.log('Deploy complete!');
