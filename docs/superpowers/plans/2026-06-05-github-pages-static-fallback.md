# GitHub Pages Static Portfolio Fallback Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current GitHub Pages sauna timer page with a simple static portfolio fallback copied from the visible English content and visual style of `../tomasjanovec-web`.

**Architecture:** Keep the repository as direct GitHub Pages static hosting: one semantic `index.html`, one dedicated stylesheet at `assets/css/site.css`, and local hero image assets under `assets/images/`. Remove all sauna timer runtime files and references; no build step, package manager, router, or JavaScript is required.

**Tech Stack:** Static HTML5, CSS3, local image assets, GitHub Pages static file serving.

---

## Chunk 1: Static Page Replacement

### Task 1: Replace the Existing HTML With Static Portfolio Content

**Files:**
- Modify: `index.html`
- Reference: `../tomasjanovec-web/src/content/profile.ts`
- Reference: `../tomasjanovec-web/src/components/HeroCinematic.tsx`
- Reference: `../tomasjanovec-web/src/pages/HomePage.tsx`
- Reference: `../tomasjanovec-web/src/pages/CVPage.tsx`
- Reference: `docs/superpowers/specs/2026-06-05-github-pages-static-fallback-design.md`

- [ ] **Step 1: Re-read the approved spec and source content**

Run:

```bash
sed -n '1,220p' docs/superpowers/specs/2026-06-05-github-pages-static-fallback-design.md
sed -n '1,260p' ../tomasjanovec-web/src/content/profile.ts
sed -n '1,220p' ../tomasjanovec-web/src/components/HeroCinematic.tsx
sed -n '1,180p' ../tomasjanovec-web/src/pages/HomePage.tsx
sed -n '1,220p' ../tomasjanovec-web/src/pages/CVPage.tsx
```

Expected: The spec confirms a single English static page; the source content contains hero, hobbies, CV, timeline, languages, and contact data.

- [ ] **Step 2: Replace `index.html` with semantic static markup**

Use `apply_patch` to replace the current sauna timer page with static markup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="Tomáš Janovec - ML/AI specialist focused on computer vision, large language models, data science, and fullstack DevOps."
  />
  <title>Tomáš Janovec</title>
  <link rel="stylesheet" href="assets/css/site.css" />
</head>
<body>
  <div class="site-shell">
    <div class="ambient-bg" aria-hidden="true">
      <div class="ambient-grid"></div>
      <div class="ambient-glow ambient-glow-a"></div>
      <div class="ambient-glow ambient-glow-b"></div>
    </div>

    <header class="top-nav">
      <a class="brand" href="#top" aria-label="Tomáš Janovec home">
        <span class="brand-dot"></span>
        <span>Tomáš Janovec</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a href="#top">Home</a>
        <a href="#hobbies">Hobbies</a>
        <a href="#cv">CV</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <main id="top" class="main-content">
      <section class="hero hero-stage" aria-label="Hero stage">
        <div class="hero-copy">
          <p class="hero-badge">Machine Learning &amp; AI</p>
          <h1>Tomáš Janovec</h1>
          <h2>Applied AI for real data and real outcomes</h2>
          <p class="hero-lead">Computer vision, large language models, data science, and fullstack DevOps.</p>
          <p class="hero-subtitle">ML/AI Specialist at CXI, Technical University of Liberec.</p>
          <p class="focus-line hero-focus-line">Computer Vision · Large Language Models · Data Science · Fullstack DevOps</p>

          <div class="hero-actions" role="group" aria-label="Primary actions">
            <a class="btn btn-primary" href="#cv">View CV</a>
            <a class="btn btn-ghost" href="mailto:tomas.janovec@tul.cz">Get in Touch</a>
          </div>
        </div>

        <figure class="hero-media">
          <picture>
            <source
              srcset="assets/images/tomas-hero-800.webp 800w, assets/images/tomas-hero-1280.webp 1280w"
              sizes="(max-width: 950px) 92vw, 48vw"
              type="image/webp"
            />
            <img
              src="assets/images/tomas-hero-fallback.jpg"
              width="1280"
              height="1760"
              alt="Tomáš Janovec sitting on a rock in front of a mountain peak near Kvalvika beach in Lofoten, Norway"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
        </figure>
      </section>

      <section id="hobbies" class="hobbies-panel" aria-labelledby="hobbies-title">
        <h2 id="hobbies-title">Hobbies</h2>
        <div class="hobbies-chips" aria-label="Hobbies list">
          <span>Gym</span>
          <span>Piano</span>
          <span>Guitar</span>
          <span>Electric Guitar</span>
          <span>Singing</span>
          <span>Rubik's Cube (speedcubing)</span>
          <span>Coffee enthusiast</span>
          <span>Sauna enthusiast</span>
        </div>
        <div class="hobbies-links">
          <a href="https://www.facebook.com/Votrokband/" target="_blank" rel="noreferrer">Votrok (Band)</a>
          <a href="https://open.spotify.com/track/6KqUDpdiLEFHS2BhAkOizm" target="_blank" rel="noreferrer">Corpses (Spotify)</a>
        </div>
      </section>

      <article id="cv" class="cv-page">
        <header class="cv-header">
          <h1>Curriculum Vitae</h1>
        </header>

        <section class="section-block" aria-labelledby="profile-title">
          <h2 id="profile-title">Profile</h2>
          <div class="section-body">
            <p class="cv-summary">ML/AI engineer focused on clear, production-minded solutions in data science and modern AI systems.</p>
          </div>
        </section>
      </article>

      <section id="contact" class="contact-strip" aria-labelledby="contact-title">
        <h2 id="contact-title">Connect</h2>
        <div class="contact-list">
          <a href="mailto:tomas.janovec@tul.cz">Email</a>
          <a href="https://github.com/tomyjany" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/thomas-janovec-7a1a97283/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://support.cxi.tul.cz/en/staff-directory/tomas.janovec" target="_blank" rel="noreferrer">Work (CXI)</a>
          <a href="https://www.fm.tul.cz/fakulta" target="_blank" rel="noreferrer">Study (TUL)</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">© Tomáš Janovec 2026</footer>
  </div>
</body>
</html>
```

Insert all remaining CV sections inside `<article id="cv" class="cv-page">`, after the Profile section and before the closing `</article>`. Do not append Work, Other experience, Education, or Languages outside the CV article.

Use this exact section list:

- `Work-related experience`
  - `2024 - Present` / `ML/AI Specialist` / `CXI, Technical University of Liberec`
  - `2025` / `AI for SIEM log querying` / `Rozjeď AI ve výrobě (CXI Liberec)`
  - `2025` / `Dean's Award for Outstanding Bachelor's Thesis` / `Faculty of Mechatronics, Informatics and Interdisciplinary Studies, TUL`
- `Other experience`
  - `2026` / `World Championship of Academic Kyykkä` / `Competition Participant`
  - `2023` / `Votrok - Single "Corpses"` / `Music Release`
  - `2020 - 2021` / `KSP(Z) Programming Competition` / `Successful Problem Solver`
  - `2015` / `Czech Open Speedcubing` / `Competition Participant`
- `Education`
  - `Current` / `Ing. Intelligent Systems (ongoing)` / `Technical University of Liberec`
  - `Completed` / `BSc Intelligent Systems (completed)` / `Technical University of Liberec`
  - `One Academic Year` / `Exchange Studies` / `Tampere University`
- `Languages`
  - `Czech: Native`
  - `English: Proficient`
  - `German: B1`
  - `Finnish: A2`

Include these exact timeline bullets and converted links:

- `ML/AI Specialist`
  - `Ongoing employment role focused on applied machine learning and AI systems.`
  - `Design and evaluation of applied large language model workflows.`
  - `Computer vision and data processing pipelines for real-world analytics tasks.`
  - Link label `CXI AI page` to `https://www.cxi.tul.cz/cs/systemova-integrace/modelovani-procesu-a-ai/`
  - Link label `Employee profile` to `https://support.cxi.tul.cz/en/staff-directory/tomas.janovec`
- `AI for SIEM log querying`
  - `Conference date and venue: May 29, 2025 (9:00-16:00), iQLANDIA Liberec.`
  - `Presented practical AI workflows for SIEM log querying: logs that speak, AI that understands.`
  - Link label `LinkedIn post by Jan Kočí` to `https://www.linkedin.com/posts/jan-koci-906278225_rozjedai-aivevyrobe-cxiliberec-ugcPost-7333446464980873217-yizy`
- `Dean's Award for Outstanding Bachelor's Thesis`
  - `Received "Cena děkana za vynikající bakalářskou práci" for bachelor thesis work.`
  - `Thesis: "System for Visual Processing of Video Recordings of Television Programmes" (2025).`
  - `Built an integrated video-mining pipeline with scene segmentation, OCR, person identification, and TV logo detection.`
  - Link label `Thesis record` to `https://theses.cz/id/evcjhi/?info`
  - Link label `BroadcastInsight / NewsVideoMiner (GitHub)` to `https://github.com/tomyjany/BroadcastInsight`
- `World Championship of Academic Kyykkä`
  - `Competed in the world championship weekend of Academic Kyykkä in Finland.`
  - Link label `Event information` to `https://kyykka.fi/news-item/yleista-infoa-kyykkaviikonlopusta-general-info-about-the-kyykka-weekend`
- `Votrok - Single "Corpses"`
  - `Performed as lead singer and lead guitarist on the single release.`
  - Link label `Listen on Spotify` to `https://open.spotify.com/track/6KqUDpdiLEFHS2BhAkOizm`
- `KSP(Z) Programming Competition`
  - `Recognized as a successful solver in the Czech KSP(Z) competition rounds.`
  - Link label `Competition website` to `https://ksp.mff.cuni.cz/z/`
- `Czech Open Speedcubing`
  - `Competed in Czech Open speedcubing.`
- `Ing. Intelligent Systems (ongoing)`
  - `Currently continuing graduate engineering studies.`
- `BSc Intelligent Systems (completed)`
  - `Bachelor's degree successfully completed.`
- `Exchange Studies`
  - `Completed one year of exchange studies in Finland.`

Use this structure for each timeline section:

```html
<section class="section-block" aria-labelledby="work-title">
  <h2 id="work-title">Work-related experience</h2>
  <div class="section-body">
    <ol class="timeline">
      <li>
        <p class="timeline-period">2024 - Present</p>
        <h3>ML/AI Specialist</h3>
        <p class="timeline-org">CXI, Technical University of Liberec</p>
        <ul>
          <li>Ongoing employment role focused on applied machine learning and AI systems.</li>
          <li>
            <a class="timeline-link" href="https://www.cxi.tul.cz/cs/systemova-integrace/modelovani-procesu-a-ai/" target="_blank" rel="noreferrer">CXI AI page</a>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</section>
```

Use this structure for the languages section:

```html
<section class="section-block" aria-labelledby="languages-title">
  <h2 id="languages-title">Languages</h2>
  <div class="section-body">
    <ul class="languages-list">
      <li>Czech: Native</li>
      <li>English: Proficient</li>
      <li>German: B1</li>
      <li>Finnish: A2</li>
    </ul>
  </div>
</section>
```

Expected: `index.html` no longer references `sauna.css`, `saunaTimer.js`, `#sauna`, or `#sauna-app`.

- [ ] **Step 3: Inspect static HTML for accidental sauna timer references**

Run:

```bash
rg -n "saunaTimer|sauna-app|timer-form|assets/css/sauna.css|assets/js/saunaTimer.js|id=\"sauna\"|href=\"#sauna\"|#sauna" index.html || true
```

Expected: No matches.

- [ ] **Step 4: Inspect important copied content, links, anchors, and no-script requirement**

Run:

```bash
rg -n "Applied AI|ML/AI Specialist|AI for SIEM log querying|Dean's Award|World Championship|Votrok - Single|KSP\\(Z\\)|Czech Open Speedcubing|Ing\\. Intelligent Systems|BSc Intelligent Systems|Exchange Studies|Czech: Native|English: Proficient|German: B1|Finnish: A2|Curriculum Vitae|Connect" index.html
rg -n "Ongoing employment role|Design and evaluation|Computer vision and data processing|Conference date and venue|Presented practical AI workflows|Received \"Cena děkana|System for Visual Processing|integrated video-mining pipeline|Competed in the world championship|lead singer and lead guitarist|successful solver|Currently continuing|Bachelor's degree successfully completed|Completed one year of exchange studies" index.html
rg -n "https://www\\.cxi\\.tul\\.cz|support\\.cxi\\.tul\\.cz|linkedin\\.com/posts/jan-koci|theses\\.cz|github\\.com/tomyjany/BroadcastInsight|kyykka\\.fi|open\\.spotify\\.com|ksp\\.mff\\.cuni\\.cz|href=\"#top\"|href=\"#hobbies\"|href=\"#cv\"|href=\"#contact\"" index.html
rg -n "<script" index.html || true
```

Expected: First command returns matches for every listed section and item sentinel. Second command returns matches for key copied bullet text. Third command returns matches for every required link and same-page anchor. Fourth command returns no matches.

- [ ] **Step 5: Leave the HTML change uncommitted until CSS and image assets exist**

Run:

```bash
git status --short
```

Expected: `index.html` is modified and uncommitted. Do not commit yet because the page references `assets/css/site.css` and local hero images that are added in Chunk 2.

## Chunk 2: Styling, Assets, and Timer File Removal

### Task 2: Add Local Hero Assets

**Files:**
- Create: `assets/images/tomas-hero-800.webp`
- Create: `assets/images/tomas-hero-1280.webp`
- Create: `assets/images/tomas-hero-fallback.jpg`
- Source: `../tomasjanovec-web/src/assets/images/tomas-hero-800.webp`
- Source: `../tomasjanovec-web/src/assets/images/tomas-hero-1280.webp`
- Source: `../tomasjanovec-web/src/assets/images/tomas-hero-fallback.jpg`

- [ ] **Step 1: Create the image directory**

Run:

```bash
mkdir -p assets/images
```

Expected: `assets/images` exists.

- [ ] **Step 2: Copy the optimized hero images**

Run:

```bash
cp ../tomasjanovec-web/src/assets/images/tomas-hero-800.webp assets/images/tomas-hero-800.webp
cp ../tomasjanovec-web/src/assets/images/tomas-hero-1280.webp assets/images/tomas-hero-1280.webp
cp ../tomasjanovec-web/src/assets/images/tomas-hero-fallback.jpg assets/images/tomas-hero-fallback.jpg
```

Expected: All three files exist in `assets/images/`.

- [ ] **Step 3: Verify copied assets exactly match the source files**

Run:

```bash
cmp -s ../tomasjanovec-web/src/assets/images/tomas-hero-800.webp assets/images/tomas-hero-800.webp
cmp -s ../tomasjanovec-web/src/assets/images/tomas-hero-1280.webp assets/images/tomas-hero-1280.webp
cmp -s ../tomasjanovec-web/src/assets/images/tomas-hero-fallback.jpg assets/images/tomas-hero-fallback.jpg
ls -lh ../tomasjanovec-web/src/assets/images/tomas-hero-800.webp assets/images/tomas-hero-800.webp
ls -lh ../tomasjanovec-web/src/assets/images/tomas-hero-1280.webp assets/images/tomas-hero-1280.webp
ls -lh ../tomasjanovec-web/src/assets/images/tomas-hero-fallback.jpg assets/images/tomas-hero-fallback.jpg
```

Expected: Each `cmp -s` command exits `0`; destination file sizes match the source file sizes.

### Task 3: Add the Static Site Stylesheet

**Files:**
- Create: `assets/css/site.css`
- Reference: `../tomasjanovec-web/src/styles/base.css`

- [ ] **Step 1: Copy the source visual system into `assets/css/site.css`**

Run:

```bash
mkdir -p assets/css
cp ../tomasjanovec-web/src/styles/base.css assets/css/site.css
```

Expected: `assets/css/site.css` exists and contains the same visual system as the source site.

Then use `apply_patch` to adapt the copied stylesheet for the static fallback:

- In `.top-nav`, change `grid-template-columns: 1fr auto auto;` to `grid-template-columns: 1fr auto;`.
- Delete the unused selector blocks for `.language-switch`, `.language-switch:hover`, `.language-chip`, `.language-chip:hover`, and `.language-chip.active`.
- Remove `.language-chip` from the grouped `:where(.btn, .nav-links a, .language-chip, .hobbies-links a, .contact-list a, .hero-media)` selector.
- Keep `.cv-header h1` as the CV title selector and keep the static HTML using `<h1>Curriculum Vitae</h1>` inside `.cv-header`.

Expected: The fallback stylesheet remains visually faithful to the source but no longer contains unused language-switch styling.

The copied stylesheet must provide these selector groups used by `index.html`:

- Root variables and font import.
- Body background, text, shell, ambient background.
- Top nav and brand.
- Hero layout, image, actions, focus line.
- Hobbies chips and links.
- CV header, section blocks, timeline, languages list.
- Contact strip.
- Footer.
- Focus-visible styles.
- Responsive breakpoints around `980px` and `640px`.
- Reduced motion override.

Expected: `rg -n "body|\\.site-shell|\\.top-nav|\\.hero|\\.hero-media|\\.hobbies-panel|\\.cv-page|\\.cv-header h1|\\.section-block|\\.timeline|\\.languages-list|\\.contact-strip|\\.site-footer" assets/css/site.css` returns matches for all major static page areas. `rg -n "language-switch|language-chip" assets/css/site.css || true` returns no matches.

- [ ] **Step 2: Inspect stylesheet for forbidden timer selectors**

Run:

```bash
rg -n "sauna|timer|#sauna-app|timer-card|timer-form" assets/css/site.css || true
```

Expected: No matches.

- [ ] **Step 3: Check that `index.html` points to the new stylesheet**

Run:

```bash
rg -n "assets/css/site.css|assets/css/sauna.css" index.html
```

Expected: One match for `assets/css/site.css`; no match for `assets/css/sauna.css`.

### Task 4: Remove Sauna Timer Runtime Files

**Files:**
- Delete: `assets/js/saunaTimer.js`
- Delete: `assets/css/sauna.css`

- [ ] **Step 1: Confirm the files are no longer referenced**

Run:

```bash
rg -n "assets/js/saunaTimer.js|assets/css/sauna.css|saunaTimer|sauna-app|timer-card|timer-form" index.html assets/css/site.css || true
```

Expected: No matches in runtime files that will remain after deletion.

- [ ] **Step 2: Delete the unreferenced sauna timer files**

Run:

```bash
rm assets/js/saunaTimer.js assets/css/sauna.css
```

Expected: The files are removed.

- [ ] **Step 3: Check runtime sauna references again**

Run:

```bash
rg -n "saunaTimer|sauna-app|timer-card|timer-form|assets/css/sauna.css|assets/js/saunaTimer.js" index.html assets || true
rg -n "sauna" index.html assets || true
```

Expected: First command has no matches. Second command may match only the static hobby text `Sauna enthusiast` in `index.html`; it must not match timer UI, timer CSS, or timer JavaScript.

- [ ] **Step 4: Commit the complete static fallback**

Run:

```bash
git add index.html assets/css/site.css assets/images/tomas-hero-800.webp assets/images/tomas-hero-1280.webp assets/images/tomas-hero-fallback.jpg assets/js/saunaTimer.js assets/css/sauna.css
git commit -m "feat: add static portfolio fallback"
```

Expected: Commit succeeds with HTML, stylesheet, image additions, and sauna file deletions together so no intermediate commit has broken local references.

## Chunk 3: Verification and Cleanup

### Task 5: Verify the Static Site Locally

**Files:**
- Inspect: `index.html`
- Inspect: `assets/css/site.css`
- Inspect: `assets/images/*`

- [ ] **Step 1: Check repository status**

Run:

```bash
git status --short
```

Expected: Clean working tree before verification-only checks, unless a follow-up fix is needed.

- [ ] **Step 2: Search for sauna timer implementation remnants**

Run:

```bash
rg -n "saunaTimer|sauna-app|timer-card|timer-form|assets/css/sauna.css|assets/js/saunaTimer.js|id=\"sauna\"" index.html assets || true
rg -n "sauna" index.html assets || true
```

Expected: First command has no runtime matches. Second command may match only the static hobby text `Sauna enthusiast` in `index.html`.

- [ ] **Step 3: Check local references**

Run:

```bash
rg -n "assets/css/site.css|assets/images/tomas-hero-800.webp|assets/images/tomas-hero-1280.webp|assets/images/tomas-hero-fallback.jpg" index.html
```

Expected: Matches for the stylesheet and all three local hero assets.

- [ ] **Step 4: Start a local static server**

Run:

```bash
python3 -m http.server 8000
```

Expected: Server starts at `http://localhost:8000/`. Keep the session running for visual/browser checks, then stop it when done. If port `8000` is already in use, retry with `python3 -m http.server 8001`.

- [ ] **Step 5: Fetch the served page**

In another shell while the server is running, run:

```bash
PORT=8000
curl -I http://localhost:${PORT}/
curl -I http://localhost:${PORT}/assets/css/site.css
curl -I http://localhost:${PORT}/assets/images/tomas-hero-800.webp
curl -I http://localhost:${PORT}/assets/images/tomas-hero-1280.webp
curl -I http://localhost:${PORT}/assets/images/tomas-hero-fallback.jpg
```

Expected: Each command returns HTTP `200 OK`. If Step 4 used port `8001`, set `PORT=8001` before running the `curl` commands.

- [ ] **Step 6: Visually check desktop and mobile widths**

Open `http://localhost:8000/` in a browser or use available screenshot tooling.

Check:

- Desktop around `1440px` wide: hero text and image sit side by side; no text overlaps.
- Mobile around `375px` wide: hero image stacks above text; nav wraps cleanly; timeline and chips stay readable.
- No sauna timer UI appears anywhere.
- Same-page links for Home, CV, Hobbies, Contact, View CV, and Get in Touch work where present. The email action opens a `mailto:` URL.
- External links and `mailto:` link point to the intended URLs.

Expected: The page is readable and visually close to the source website at both widths, with no overlapping content and no sauna timer UI.

- [ ] **Step 7: Stop the local static server**

Stop the `python3 -m http.server 8000` process.

Expected: No long-running server remains.

- [ ] **Step 8: Commit any verification fixes**

If verification required CSS or HTML fixes, run:

```bash
git add -A index.html assets
git commit -m "fix: polish static fallback layout"
```

Expected: Commit succeeds only if fixes were needed. Skip this step if no changes were made.

- [ ] **Step 9: Final status check**

Run:

```bash
git status --short
```

Expected: Clean working tree.
