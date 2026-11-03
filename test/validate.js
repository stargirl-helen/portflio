/**
 * COS 106 Comprehensive Portfolio & Asset Validation Suite
 * Asserts all rubric points, 3-colour system, assets, clean typography (no emojis), and JS validation requirements.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('🧪 Running COS 106 Portfolio Validation Suite (3-Colour Clean Minimalist)...\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// 1. Content JSON
test('content.json exists and contains structured CV & student data', () => {
  const contentPath = path.join(ROOT_DIR, 'content.json');
  assert(fs.existsSync(contentPath), 'content.json must exist');
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

  assert(content.hero, 'hero section must exist');
  assert.strictEqual(content.hero.name, 'Helen Hembadoon Sawuan');
  assert(content.about, 'about section must exist');
  assert(content.skills, 'skills section must exist');
  assert(content.projects, 'projects section must exist');
  assert(content.projects.items.length >= 3, 'minimum 3 projects required by COS 106 PDF');
  assert(content.planner, 'academic planner data must exist');
  assert(content.timetable, 'academic timetable data must exist');
  assert(content.contact, 'contact data must exist');
});

// 2. Assets presence
test('Mandatory assets exist (PDF, profile photo, favicons, OG image, ambient audio & MP3 fallback)', () => {
  const assets = [
    'assets/COS 106 Lab.pdf',
    'assets/profile.png',
    'assets/profile.webp',
    'assets/favicon.ico',
    'assets/favicon.png',
    'assets/og-image.png',
    'assets/audio.ogg',
    'assets/audio.mp3'
  ];

  for (const asset of assets) {
    const fullPath = path.join(ROOT_DIR, asset);
    assert(fs.existsSync(fullPath), `Asset ${asset} must exist`);
    const stats = fs.statSync(fullPath);
    assert(stats.size > 0, `Asset ${asset} must not be empty`);
  }
});

// 3. Audio & VN Policy Check
test('Audio uses ambient sound (never autoplays, has MP3 fallback), and WhatsApp VN is not publicly published', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

  // Verify no autoplay attribute on audio tag
  assert(!/<audio[^>]*\bautoplay\b/i.test(indexHtml), 'Audio element must NEVER have autoplay attribute');

  // Verify ambient audio sources
  assert(indexHtml.includes('src="assets/audio.ogg" type="audio/ogg"'), 'Must have audio.ogg source');
  assert(indexHtml.includes('src="assets/audio.mp3" type="audio/mpeg"'), 'Must have audio.mp3 fallback');

  // Verify VN transcript is NOT published on the page
  assert(!indexHtml.includes('voice-intro.ogg'), 'WhatsApp voice note audio should NOT be used on public page (reference only)');
  assert(!indexHtml.includes('fourth child out of a family of five, and that\'s all'), 'WhatsApp raw voice transcript should not be published on the page');
});

// 4. Emoji check: Ensure pages do not contain common emojis
test('Pages are clean and professional without emojis', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  assert(!emojiRegex.test(indexHtml), 'index.html must not contain emojis');
});

// 5. Semantic HTML & Tables
test('Semantic HTML5 requirements and tables (COS 106 requirement)', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const requiredTags = ['<header', '<nav', '<main', '<section', '<article', '<footer', '<table', '<thead', '<tbody', '<tr', '<th', '<td', '<form'];

  for (const tag of requiredTags) {
    assert(indexHtml.includes(tag), `index.html must include semantic tag ${tag}`);
  }
});

// 6. Contact Form Validation
test('Contact Form JavaScript validation enforces: no empty field, valid email, digits-only phone', () => {
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js/app.js'), 'utf8');

  assert(appJs.includes('emailRegex'), 'app.js must define email validation regex');
  assert(appJs.includes('^[0-9]'), 'app.js must enforce phone number containing digits only');
  assert(appJs.includes('cannot be empty'), 'app.js must validate non-empty inputs');
});

// 7. Academic Planner CRUD
test('Academic planner implements add task, toggle completion, delete task, and localStorage', () => {
  const plannerJs = fs.readFileSync(path.join(ROOT_DIR, 'js/planner.js'), 'utf8');

  assert(plannerJs.includes('handleAddTask'), 'Planner must support adding tasks');
  assert(plannerJs.includes('toggleTaskCompletion'), 'Planner must support marking tasks completed');
  assert(plannerJs.includes('deleteTask'), 'Planner must support deleting tasks');
  assert(plannerJs.includes('localStorage.setItem'), 'Planner must persist tasks to localStorage');
});

console.log(`\n========================================`);
console.log(`Validation Results: ${passedTests}/${totalTests} Tests Passed`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
