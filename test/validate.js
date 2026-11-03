/**
 * COS 106 Comprehensive Portfolio & Asset Validation Suite
 * Asserts all rubric points, PDF extractions, assets, and JS validation requirements.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
console.log('🧪 Running COS 106 Portfolio Validation Suite...\n');

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

// 1. Content JSON schema tests
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

// 2. Asset existence and optimization tests
test('Mandatory assets exist (PDF, optimized images, favicons, OG image, audio & MP3 fallback)', () => {
  const assets = [
    'assets/COS 106 Lab.pdf',
    'assets/profile.png',
    'assets/profile.webp',
    'assets/favicon.ico',
    'assets/favicon.png',
    'assets/og-image.png',
    'assets/voice-intro.ogg',
    'assets/voice-intro.mp3'
  ];

  for (const asset of assets) {
    const fullPath = path.join(ROOT_DIR, asset);
    assert(fs.existsSync(fullPath), `Asset ${asset} must exist`);
    const stats = fs.statSync(fullPath);
    assert(stats.size > 0, `Asset ${asset} must not be empty`);
  }
});

// 3. Audio requirement tests
test('Audio console implements visible controls, never autoplays, and provides MP3 fallback', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');

  // Verify no autoplay attribute
  assert(!indexHtml.includes('autoplay'), 'Audio element must NEVER autoplay');

  // Verify both OGG and MP3 source tags
  assert(indexHtml.includes('src="assets/voice-intro.ogg" type="audio/ogg"'), 'Must have OGG source');
  assert(indexHtml.includes('src="assets/voice-intro.mp3" type="audio/mpeg"'), 'Must have MP3 fallback');

  // Verify visible play and mute buttons
  assert(indexHtml.includes('id="audioPlayBtn"'), 'Must have visible play/pause button');
  assert(indexHtml.includes('id="audioMuteBtn"'), 'Must have mute toggle button');
  assert(indexHtml.includes('id="audioTimeline"'), 'Must have timeline scrubber');

  // Verify localStorage keys in audio-player.js
  const audioJs = fs.readFileSync(path.join(ROOT_DIR, 'js/audio-player.js'), 'utf8');
  assert(audioJs.includes('cos106_audio_muted'), 'Audio mute preference must persist in localStorage');
});

// 4. HTML semantic elements and table requirements
test('Semantic HTML5 requirements and tables (COS 106 requirement)', () => {
  const indexHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
  const requiredTags = ['<header', '<nav', '<main', '<section', '<article', '<footer', '<table', '<thead', '<tbody', '<tr', '<th', '<td', '<form'];

  for (const tag of requiredTags) {
    assert(indexHtml.includes(tag), `index.html must include semantic tag ${tag}`);
  }
});

// 5. Contact form validation tests (COS 106 requirement)
test('Contact Form JavaScript validation enforces: no empty field, valid email, digits-only phone', () => {
  const appJs = fs.readFileSync(path.join(ROOT_DIR, 'js/app.js'), 'utf8');

  // Check email regex existence
  assert(appJs.includes('emailRegex'), 'app.js must define email validation regex');

  // Check phone regex ensuring digits only
  assert(appJs.includes('^[0-9]'), 'app.js must enforce phone number containing digits only');

  // Check non-empty field validation
  assert(appJs.includes('cannot be empty'), 'app.js must validate non-empty inputs');
});

// 6. Academic Planner operations test (COS 106 requirement)
test('Academic planner implements add task, toggle completion, delete task, and localStorage', () => {
  const plannerJs = fs.readFileSync(path.join(ROOT_DIR, 'js/planner.js'), 'utf8');

  assert(plannerJs.includes('handleAddTask'), 'Planner must support adding tasks');
  assert(plannerJs.includes('toggleTaskCompletion'), 'Planner must support marking tasks completed');
  assert(plannerJs.includes('deleteTask'), 'Planner must support deleting tasks');
  assert(plannerJs.includes('localStorage.setItem'), 'Planner must persist tasks to localStorage');
});

// 7. Multi-page setup test
test('Multi-page HTML documents are present and link to external CSS', () => {
  const pages = ['index.html', 'about.html', 'projects.html', 'planner.html', 'contact.html'];
  for (const page of pages) {
    const filePath = path.join(ROOT_DIR, page);
    assert(fs.existsSync(filePath), `${page} must exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.includes('href="css/style.css"'), `${page} must link to external CSS stylesheet`);
  }
});

console.log(`\n========================================`);
console.log(`Validation Results: ${passedTests}/${totalTests} Tests Passed`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
