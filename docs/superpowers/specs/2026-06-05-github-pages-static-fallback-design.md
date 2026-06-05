# GitHub Pages Static Portfolio Fallback Design

## Context

The current GitHub Pages repository is a minimal static page with an embedded profile summary plus a sauna timer implemented by `assets/js/saunaTimer.js` and `assets/css/sauna.css`.

The source website in `../tomasjanovec-web` is a React/Vite CV website with:

- A dark cinematic portfolio visual style.
- A hero section with optimized local portrait assets.
- Home and CV routes.
- English and Czech content via a language switch.
- Static profile, CV timeline, hobbies, languages, and contact data in `src/content/profile.ts`.

The requested GitHub Pages version should be a simple fallback if the primary website goes down. It should mainly transfer the static visible website content and completely remove the sauna timer.

## Goals

- Replace the sauna timer page with a static portfolio fallback.
- Keep the implementation simple: no React, Vite, build step, package manager, or GitHub Actions workflow.
- Preserve the main visual identity of `../tomasjanovec-web`: dark background, top navigation, cinematic hero image, sharp section dividers, compact CV timeline, hobbies, contact strip, and footer.
- Copy the optimized hero image assets into this repository and reference them locally.
- Use English content as the static default.
- Keep the page deployable directly by GitHub Pages from repository files.

## Non-Goals

- Do not preserve React Router behavior or separate `/cv` route.
- Do not preserve the language switch.
- Do not add dynamic interactivity beyond normal links.
- Do not introduce a new framework, bundler, or dependency.
- Do not keep any sauna timer UI, JavaScript, CSS, or page section.

## Proposed User Experience

The fallback site will be a single static `index.html` page.

At the top, a compact navigation bar shows the Tomáš Janovec brand and anchor links to the page sections. The first viewport presents the same portfolio identity as the source site: ML/AI badge, name, headline, short lead text, focus line, calls to view the CV section and email contact, and the local hero image.

Below the hero, the page includes static sections for hobbies, profile summary, work-related experience, other experience, education, languages, and contact links. This preserves the important content from the source Home and CV pages without requiring route handling.

## Content Source

Use the English content from `../tomasjanovec-web/src/content/profile.ts`:

- `hero`
- `focusLine`
- `hobbies`
- `cv`
- `workExperience`
- `otherExperience`
- `education`
- `languages`
- `externalLinks`

Markdown-style links inside timeline bullets should become normal external anchor links with `target="_blank"` and `rel="noreferrer"`.

## Implementation Units

### Static HTML

`index.html` owns the document structure and all static content. It will contain semantic sections:

- Header navigation.
- Hero.
- Hobbies.
- CV profile summary.
- Work experience timeline.
- Other experience timeline.
- Education timeline.
- Languages.
- Contact links.
- Footer.

Anchor links should point to same-page section IDs such as `#cv`, `#contact`, and `#hobbies`.

### Stylesheet

Create a dedicated stylesheet for the fallback site, likely `assets/css/site.css`.

It should adapt the existing source style from `../tomasjanovec-web/src/styles/base.css` to plain HTML classes. It should preserve the visual character while remaining smaller and static-page focused.

### Assets

Copy these source assets into this repository, for example under `assets/images/`:

- `tomas-hero-800.webp`
- `tomas-hero-1280.webp`
- `tomas-hero-fallback.jpg`

The hero should use a `<picture>` element with WebP sources and JPG fallback.

### Removed Sauna Timer Files

Remove the timer from the fallback surface:

- Delete the sauna section from `index.html`.
- Stop referencing `assets/js/saunaTimer.js`.
- Stop referencing `assets/css/sauna.css`.
- Delete the sauna-specific JS and CSS files if they are no longer referenced.

## Error Handling and Edge Cases

- The site must still show usable text content if the hero image fails to load.
- External links should open safely in a new tab with `rel="noreferrer"` where appropriate.
- The page must remain readable without JavaScript because the fallback does not require JavaScript.
- The design must respond cleanly on narrow mobile widths without overlapping text or media.
- GitHub Pages should not require route fallback handling because the site is a single page.

## Testing and Verification

Verify the implementation by:

- Opening `index.html` locally or serving the directory with a simple static server.
- Checking that no sauna timer UI appears.
- Checking that no sauna timer CSS or JS is referenced.
- Checking that the hero image loads from local assets.
- Checking that same-page anchors work.
- Checking that external links and mail link are correct.
- Checking responsive layout at desktop and mobile widths.
- Running a repository search for `sauna` to ensure only intentional historical references remain, if any.

## Risks

- A manual static copy can drift from the React source website over time. This is acceptable because the fallback is intentionally simple.
- The visual style may not be pixel-perfect because React components and route behavior are being flattened into one static document.
- Using English only drops the Czech language variant. This is an intentional simplification for the fallback.

## Acceptance Criteria

- `index.html` displays the static portfolio fallback instead of the sauna timer page.
- The sauna timer section, script, and stylesheet are gone from the deployed page.
- The page contains the hero, CV content, hobbies, languages, contact links, and footer from the English source content.
- The site works on GitHub Pages without a build step.
- The implementation uses local image assets and has no runtime dependency on `../tomasjanovec-web`.
