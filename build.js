/**
 * Production Static Build Script
 * Zero-dependency build runner for Helen Hembadoon Sawuan's Portfolio.
 * Compiles and outputs static production bundle into dist/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

console.log('🚀 Starting static production build (3-Colour System)...');

// Required source assets
const requiredAssets = [
  'content.json',
  'index.html',
  'about.html',
  'projects.html',
  'planner.html',
  'contact.html',
  'css/style.css',
  'js/app.js',
  'js/audio-player.js',
  'js/planner.js',
  'assets/profile.png',
  'assets/profile.webp',
  'assets/audio.ogg',
  'assets/audio.mp3',
  'assets/favicon.ico',
  'assets/favicon.png',
  'assets/og-image.png',
  'assets/COS 106 Lab.pdf'
];

let missingCount = 0;
for (const file of requiredAssets) {
  const fullPath = path.join(ROOT_DIR, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing required file: ${file}`);
    missingCount++;
  }
}

if (missingCount > 0) {
  console.error(`\nBuild aborted: ${missingCount} required asset(s) missing.`);
  process.exit(1);
}

// Prepare dist/
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'js'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'assets'), { recursive: true });

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Copying assets, pages, and stylesheets to dist/...');
copyDir(path.join(ROOT_DIR, 'assets'), path.join(DIST_DIR, 'assets'));
copyDir(path.join(ROOT_DIR, 'css'), path.join(DIST_DIR, 'css'));
copyDir(path.join(ROOT_DIR, 'js'), path.join(DIST_DIR, 'js'));

const rootFiles = ['index.html', 'about.html', 'projects.html', 'planner.html', 'contact.html', 'content.json'];
for (const f of rootFiles) {
  const src = path.join(ROOT_DIR, f);
  const dest = path.join(DIST_DIR, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

console.log('✨ Build succeeded! Production bundle created at dist/');
const distItems = fs.readdirSync(DIST_DIR);
distItems.forEach(item => console.log(`   - ${item}`));
console.log('\nReady for deployment to GitHub Pages or Vercel!\n');
