# COS 106 Practical Term Project: Student Portfolio & Academic Management Platform
### MIVA Open University — Practical Term Project (20 Marks)
**Student Name:** Helen Hembadoon Sawuan  
**Course:** COS 106: Introduction to Web Technologies  
**Degree Program:** Bachelor of Science (BSc) in Cybersecurity  
**Visual Style:** Three-Colour Minimalist System (Clean, Professional, Zero Emojis)

---

## Project Overview

This repository contains the official, fully functional personal academic portfolio and student management platform designed and engineered for **COS 106 (Introduction to Web Technologies)** practical term project (20 Marks) at **MIVA Open University**.

The website demonstrates complete proficiency in **HTML, CSS, and JavaScript** while adhering to:
- **Simplicity at its best:** A strict, refined **Three-Colour Palette** (Canvas Background, Text/Surface Neutral, and Sky Blue Accent).
- **Clean Professional Typography:** Zero emojis across all headings, cards, navigation, and interactive controls.
- **Reference-Only VN Policy:** The WhatsApp voice note assets were analyzed strictly as reference material to extract Helen's true background and academic profile; Helen's private voice recordings are **not** published publicly on the website. Instead, an ambient audio track (`audio.ogg` with `audio.mp3` fallback) provides accessible background sound with full user toggle control.
- **100% Curriculum Compliance:** Homepage, About Me, Projects (min 3), Academic Planner (Add, Complete, Delete tasks via JavaScript), Academic Course Timetable table, and Contact Page with strict JavaScript validation.

---

## The Three-Colour Palette

| Colour Role | Dark Mode (Default) | Light Mode | Purpose |
| :--- | :--- | :--- | :--- |
| **1. Base Canvas** | `#090d16` (Deep Midnight) | `#ffffff` (Pure White) | Clean, distraction-free foundation |
| **2. Surface & Text** | `#111827` & `#f8fafc` | `#f8fafc` & `#0f172a` | High-contrast readable cards and typography |
| **3. Single Accent** | `#0ea5e9` (Sky Blue / Cyan) | `#0284c7` (Ocean Blue) | Highlights, buttons, badges, and progress meters |

---

## Project Structure

```text
├── assets/
│   ├── COS 106 Lab.pdf           # Source of truth specification (Miva Open University)
│   ├── profile.png               # High-res profile photograph of Helen
│   ├── profile.webp              # WebP compressed & optimized profile image
│   ├── favicon.ico               # Multi-size favicon (16x16, 32x32, 48x48)
│   ├── favicon.png               # PNG favicon
│   ├── apple-touch-icon.png      # High-res mobile home screen icon (192x192)
│   ├── og-image.png              # 1200x630 Social Preview / Open Graph card
│   ├── audio.ogg                 # Ambient background audio loop
│   ├── audio.mp3                 # 128kbps MP3 audio fallback
│   ├── WhatsApp Ptt ... .ogg     # Reference voice notes (kept in assets for grader review)
│   └── content.json              # Central content source of truth
├── css/
│   └── style.css                 # 3-Colour external stylesheet (Flexbox, CSS Grid, Dual Themes)
├── js/
│   ├── app.js                    # Theme toggle, mobile drawer, contact form validation
│   ├── audio-player.js           # Ambient audio controller with localStorage sync
│   └── planner.js                # COS 106 Interactive Academic Task Planner & statistics
├── test/
│   └── validate.js               # Comprehensive automated test suite
├── index.html                    # Homepage & comprehensive portfolio hub
├── about.html                    # About Me dedicated page
├── projects.html                 # Projects showcase with 3 sample projects
├── planner.html                  # Interactive Academic Planner & Course Timetable table
├── contact.html                  # Validated contact form & direct communications
├── content.json                  # Centralized content file (easy text editing)
├── build.js                      # Static site compiler & dist/ bundler
├── serve.js                      # Built-in zero-dependency local HTTP preview server
├── package.json                  # NPM scripts (start, build, test)
└── README.md                     # Documentation, run guide, and stated assumptions
```

---

## Quickstart & Commands

### 1. Run the Local Development Server
```bash
npm start
# OR: node serve.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Static Production Build
```bash
npm run build
# OR: node build.js
```
Compiles the static output into `./dist/`, ready for immediate deployment to GitHub Pages or Vercel.

### 3. Run Automated Validation Tests
```bash
npm test
# OR: node test/validate.js
```

---

## Alignment with COS 106 Evaluation Criteria (20 Marks)

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **1. Homepage** | Student name, photograph, welcome message, navigation menu, and brief biography. | Implemented in [`index.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/index.html) |
| **2. About Me** | Educational background (MIVA Open University), career aspirations, technical skills, and hobbies. | Implemented in [`about.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/about.html) |
| **3. Projects Page** | 3 sample projects with descriptions, screenshots, technology badges, and simulated links. | Implemented in [`projects.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/projects.html) |
| **4. Academic Planner** | Interactive planner with JavaScript DOM manipulation: **Add tasks**, **Mark completed**, and **Delete tasks**. | Implemented in [`planner.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/planner.html) & [`js/planner.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/planner.js) |
| **5. Contact Page** | Form with Name, Email, Phone, Message and strict client-side JS validation. | Implemented in [`contact.html`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/contact.html) & [`js/app.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/app.js) |
| **HTML Tables** | Structured course timetable and continuous assessment scheme table. | Implemented in `planner.html` & `index.html#schedule` |
| **Multimedia** | Ambient audio control with `.ogg` and `.mp3` dual sources, mute memory in localStorage. Never autoplays. | Implemented in [`js/audio-player.js`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/js/audio-player.js) |
| **External CSS** | External CSS stylesheet with 3-colour scheme, flexbox, grid, animations, and mobile-friendly design. | Implemented in [`css/style.css`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/css/style.css) |
| **JavaScript** | Event handling, DOM manipulation, form validation, dynamic stats, arrays and functions. | Implemented in `js/` directory |

---

## Stated Assumptions

1. **Voice Note as Reference Only:** As instructed, the WhatsApp voice note (`.ogg`) was utilized as an authentic reference source to extract Helen's true identity, origin (Benue State, Nigeria), background (family of 5), and work-study focus. The raw WhatsApp audio is not published on the portfolio interface; instead, clean ambient background audio (`assets/audio.ogg` and `assets/audio.mp3`) is wired into the header sound toggle (`Sound: Off` &rarr; `Sound: On`).
2. **Three-Colour Simplicity & Zero Emojis:** The design is strictly restricted to three functional colors (Base Canvas, Text/Surface Neutral, and Sky Blue Accent) across both Dark and Light modes, using clean textual labels without emojis for maximum academic professionalism.
3. **Contact Validation Rules:** Client-side JavaScript enforces:
   - No input field is left empty.
   - Email follows valid RFC pattern (`name@domain.com`).
   - Phone number contains only digits (min 7 digits).

---

## Personalization Checklist for Submission

- **Contact Phone / Email:** Modify [`content.json`](file:///g:/My%20Drive/miva/OTHER%20STUDENTS/Helen/CSC%20106/content.json) with Helen's preferred contact info before final submission.
- **Student Email:** `h.dzauka6193@miva.edu.ng`
- **Hosting:** Run `npm run build` and push the repository to GitHub to activate GitHub Pages or Vercel.
