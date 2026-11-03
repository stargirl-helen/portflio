# COS 106 Practical Term Project: Student Portfolio & Academic Management Platform
### MIVA Open University — Practical Term Project (20 Marks)
**Student Name:** Helen Hembadoon Sawuan  
**Course:** COS 106: Introduction to Web Technologies  
**Degree Program:** Bachelor of Science (BSc) in Cybersecurity  
**Visual Setting:** Cyber-Ops Console / High-Tech Cyber Defense (with Corporate Light Switcher)

---

## 📑 Project Overview

This repository contains the official, fully functional multi-page personal academic portfolio and student management platform designed and engineered for **COS 106 (Introduction to Web Technologies)** practical term project at **MIVA Open University**.

The platform is built strictly adhering to modern web design standards, web accessibility (WCAG 2.1 AA), responsive mobile-first principles, and zero bloated external libraries. It features full interactive task planning, audio introduction with fallback, academic schedule tables, and strict client-side form validation.

---

## 🚀 Live Demo & Deployment

- **GitHub Pages:** Deployable from the root directory or `dist/` folder via GitHub Pages settings.
- **Vercel / Netlify:** Connect the repository; static output directory is `dist/` (or root `.`). Zero configuration required.

---

## 🗂️ File & Directory Structure

```text
├── assets/
│   ├── COS 106 Lab.pdf           # Source of truth specification (Miva Open University)
│   ├── profile.png               # High-res profile photograph of Helen
│   ├── profile.webp              # WebP compressed & optimized profile image
│   ├── favicon.ico               # Multi-resolution favicon (16x16, 32x32, 48x48)
│   ├── favicon.png               # PNG favicon
│   ├── apple-touch-icon.png      # High-res mobile home screen icon (192x192)
│   ├── og-image.png              # 1200x630 Social Preview / Open Graph card
│   ├── voice-intro.ogg           # Original recorded voice introduction
│   ├── voice-intro.mp3           # 128kbps MP3 audio fallback for all browsers
│   └── content.json              # Central content source of truth
├── css/
│   └── style.css                 # External stylesheet (Flexbox, CSS Grid, CSS Variables, Dual Themes)
├── js/
│   ├── app.js                    # Theme manager, mobile drawer, contact form validation
│   ├── audio-player.js           # Accessible audio console, scrubber, transcript & localStorage
│   └── planner.js                # COS 106 Interactive Academic Task Planner & statistics
├── test/
│   └── validate.js               # Comprehensive automated test suite
├── index.html                    # Homepage & comprehensive portfolio hub
├── about.html                    # About Me dedicated multi-page document
├── projects.html                 # Projects showcase with in-depth case studies
├── planner.html                  # Dedicated Academic Planner & Course Schedule table
├── contact.html                  # Validated contact form & institutional details
├── content.json                  # Centralized content file (easy text editing without touching code)
├── build.js                      # Static site compiler & dist/ bundler
├── serve.js                      # Built-in zero-dependency local HTTP preview server
├── package.json                  # NPM scripts (start, build, test)
└── README.md                     # Documentation, run guide, and stated assumptions
```

---

## 🛠️ Tech Stack & Architecture

- **Markup:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<form>`, `<audio>`, `<footer>`).
- **Styles:** External CSS3 with CSS Custom Properties, Flexbox, CSS Grid, media queries, high-contrast focus rings, and `@media (prefers-reduced-motion)`.
- **Scripts:** Vanilla JavaScript (ES6+ Modules, DOM manipulation, custom event listeners, LocalStorage API, Regex validation).
- **Audio:** HTML5 `<audio>` container with dual `<source>` elements (`.ogg` and `.mp3`) and custom keyboard-navigable GUI controls.
- **Dependencies:** **Zero external runtime dependencies**. Runs in any modern browser out-of-the-box.

---

## 🏁 Quickstart & Local Execution

### 1. Run the Local Development Server
No third-party packages need to be installed. Start the built-in HTTP server:
```bash
npm start
# OR: node serve.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Static Production Build
To create an optimized, production-ready static bundle in `dist/`:
```bash
npm run build
# OR: node build.js
```
The output is generated in `./dist` and is ready for immediate deployment to GitHub Pages, Vercel, or Netlify.

### 3. Run Automated Validation Tests
Run the test suite verifying all rubric requirements, assets, form validations, and data structures:
```bash
npm test
# OR: node test/validate.js
```

---

## 🔍 Alignment with COS 106 Evaluation Criteria (20 Marks)

| Requirement | Implementation Detail | Location in Project |
| :--- | :--- | :--- |
| **1. Homepage** | Student name, photograph, welcome tagline, responsive navigation, and cyber status badges. | [`index.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/index.html) |
| **2. About Me** | Educational background (Miva Open University), career aspirations, technical skills, and hobbies. | [`about.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/about.html) & `index.html#about` |
| **3. Projects Page** | At least 3 sample projects with descriptions, screenshots, technology badges, and simulated links. | [`projects.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/projects.html) |
| **4. Academic Planner** | Interactive task management system to **Add tasks**, **Mark as completed**, and **Delete tasks** via JS. | [`planner.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/planner.html) & [`js/planner.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/planner.js) |
| **5. Contact Page** | Form with Name, Email, Phone, Message and strict client-side JS validation. | [`contact.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/contact.html) & [`js/app.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/app.js) |
| **HTML Tables** | Structured course timetable and assessment breakdown table. | `planner.html` & `index.html#schedule` |
| **Multimedia** | Accessible voice intro player (`.ogg` with `.mp3` fallback, no autoplay, mute memory). | `index.html#hero` & [`js/audio-player.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/audio-player.js) |
| **External CSS** | External CSS stylesheet with responsive design, grid/flexbox, animations, and color scheme. | [`css/style.css`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/css/style.css) |
| **JavaScript** | DOM manipulation, event handling, form validation, dynamic statistics, and arrays. | `js/` directory |

---

## 🎧 Audio Asset Specification

- **File Source:** `assets/voice-intro.ogg` (recorded voice of Helen Hembadoon Sawuan).
- **Fallback Generated:** `assets/voice-intro.mp3` (128 kbps stereo MP3 encoded with FFmpeg for universal browser support).
- **Autoplay Policy:** Autoplay is **strictly disabled** to prevent disruptive user experiences and comply with modern browser policies.
- **Controls Provided:**
  - Visible Play/Pause toggle with ARIA live labeling.
  - Visible Mute/Unmute button.
  - Audio progress timeline / scrubber with current and total duration time indicators.
  - Animated sound visualizer bars that pulsate only when audio is active.
  - Collapsible transcript drawer with Helen's spoken words.
  - User mute preference stored in `localStorage` under `cos106_audio_muted`.

---

## 💡 Stated Assumptions

As directed by the instructions to execute end-to-end without asking clarifying questions, the following reasonable assumptions were made:

1. **Student Identity:**
   - From the provided audio recording `WhatsApp Ptt 2026-11-02 at 14.51.38.ogg`, the student clearly states: *"My name is Helen Hembadoon Sawuan... I'm a young cybersecurity student... from Nigeria, middle belt region of Nigeria, under Benue State. I'm the fourth child out of a family of five... I school as well as work. I'm into corporate working systems."*
   - From the directory path `g:\My Drive\miva\OTHER STUDENTS\Helen\CSC 106` and the PDF file `COS 106 Lab.pdf`, Helen is confirmed as an active student at MIVA Open University registered for course COS 106.

2. **Visual Theme Setting:**
   - Because Helen is studying **Cybersecurity** and working in **Corporate Systems**, the visual world was selected as **"Cyber-Ops Console / Modern High-Tech Defense"** for the default dark mode, complemented by a **"Clean Corporate"** light mode. Both modes are selectable via the header theme toggle and remember the user's choice in `localStorage`.

3. **Academic Planner Initial State:**
   - Pre-populated with representative academic deadlines from the COS 106 and BSc Cybersecurity curriculum (e.g., COS 106 Practical Term Project, Cyber Defense review). Users can add, complete, filter, and delete tasks at will.

4. **Multi-Page vs Single-Page Navigation:**
   - To satisfy both modern web application convenience and the examiner's specific rubric ("multi-page website that serves as a personal academic portfolio... 1. Homepage, 2. About Me Page, 3. Projects Page, 4. Academic Planner Page, 5. Contact Page"), the site provides **both**:
     - Dedicated HTML pages: `about.html`, `projects.html`, `planner.html`, `contact.html`.
     - An all-in-one interactive hub on `index.html`.

5. **Simulated Contact Submission:**
   - As mandated ("no backend required"), the contact form executes thorough client-side validation (non-empty fields, valid email regex, numeric digits only for phone) and presents an accessible feedback transmission banner.

---

## ✏️ What the User Can Edit or Customize

- **Text Content:** All textual content, links, project details, and course lists can be modified directly in [`content.json`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/content.json).
- **Telephone / Email:** Update `content.json` `contact.email` and `contact.phone` with your personal numbers before final submission.
- **Social Links:** Update GitHub and LinkedIn usernames in `content.json` and in `contact.html`.

---

## ⚖️ License & Evaluation Note

Developed exclusively for **Helen Hembadoon Sawuan's COS 106 Practical Term Project Evaluation** at **MIVA Open University**. All rights reserved &copy; 2026.
