/**
 * Production Static Build Script
 * Zero-dependency build runner for Helen Hembadoon Sawuan's Portfolio.
 * Compiles and outputs static production bundle into dist/ and public/ for Vercel/GitHub Pages.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

console.log('Starting static production build (3-Colour System)...');

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
    console.error(`Missing required file: ${file}`);
    missingCount++;
  }
}

if (missingCount > 0) {
  console.error(`\nBuild aborted: ${missingCount} required asset(s) missing.`);
  process.exit(1);
}

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

function buildToDirectory(targetDir) {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'css'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'js'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'assets'), { recursive: true });

  const rootFiles = ['index.html', 'about.html', 'projects.html', 'planner.html', 'contact.html', 'content.json'];
  for (const f of rootFiles) {
    const src = path.join(ROOT_DIR, f);
    const dest = path.join(targetDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  copyDir(path.join(ROOT_DIR, 'assets'), path.join(targetDir, 'assets'));
  copyDir(path.join(ROOT_DIR, 'css'), path.join(targetDir, 'css'));
  copyDir(path.join(ROOT_DIR, 'js'), path.join(targetDir, 'js'));
}

console.log('Generating dist/ directory...');
buildToDirectory(DIST_DIR);

console.log('Generating public/ directory (Vercel static fallback)...');
buildToDirectory(PUBLIC_DIR);

console.log('Build succeeded! Production bundles created at dist/ and public/');
const distItems = fs.readdirSync(DIST_DIR);
distItems.forEach(item => console.log(`   - ${item}`));
console.log('\nReady for deployment to GitHub Pages or Vercel!\n');
