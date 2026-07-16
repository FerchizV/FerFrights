# Build Plan: FerFrights

**Status:** Approved, in progress. Phases 0–2 complete; Phase 2.5 (design override) underway before Phase 3.

**Project location:** `C:\Users\ferch\Documents\Coding\FerFrights` (local disk).

Originally started in `G:\My Drive\Personal Projects\Horror Movie Website` (Google Drive Stream), but `npm install` reliably corrupted/failed there — Drive's virtual filesystem can't handle the tens of thousands of small file writes `node_modules` requires. The project was moved to local disk (briefly at `C:\Users\ferch\Documents\PersonalProjects\FerFrights`, then relocated by Fernanda to its current path above). Google Drive is no longer the sync layer for this project; git/GitHub (Phase 3) is. The old Drive folder still contains the original `About Me & Why Horror.gdoc` stub (a cloud-only file that can't be moved) — harmless to leave there, its content is already captured below.

## Context

This plan turns `PRD_Fernandas_Horror_Recs.md` into a concrete, phased build sequence. The project folder currently contains only planning material (PRD, raw brief docx, a design-reference HTML snapshot, and this plan) — no code, no `package.json`, not yet a git repo. The site: a bilingual (EN/ES) personal horror movie recommendation site, 3 pages, built with Next.js/Tailwind/plain JS, for a non-technical owner who will maintain movie content herself going forward via a plain JSON file.

## Decisions locked in during planning (beyond what the PRD already fixed)

| Decision | Resolution |
|---|---|
| Homepage tile style | ~~Card with tags — icon + title + genre tag pills inside a bounded card~~ **Superseded 2026-07-15**: bare, borderless icon + title (true Woset-style), genre tags hidden by default and revealed on hover only — see Phase 2.5 |
| Color palette | ~~Near-black background, blood-red accent~~ **Superseded 2026-07-15**: warm cream background, near-black text, red kept only as an accent (links, active tags) — see Phase 2.5 and PRD §5.2 |
| Hover treatment | ~~Red glow~~ **Superseded 2026-07-15**: subtle neutral shadow lift, no color |
| Ratings scope | **Show all available** — IMDb, Rotten Tomatoes, and Metacritic when OMDB returns them (same free API call already covers this); section still fully hidden if no data at all |
| About/Why Horror bio | **Real copy provided**, stored below — no placeholder needed |
| Top 3 current favorites | Obsession, Weapons, Talk to Me |
| Site name | **FerFrights** (finalized, replaces working title "Fernanda's Recs" everywhere) |
| Avatar art | Received — `FernandaDrawing.png` in the project root (hand-drawn line illustration, woman with long wavy hair at a Golden Gate Bridge viewpoint binocular stand). Will be copied into `public/images/avatar.png` during scaffolding. |
| Framework | Next.js **Pages Router** (not App Router) — every page here is interactive client-side; Pages Router avoids explaining server/client component splits to a non-technical owner and pairs more simply with static export for Netlify |
| Language state | Plain React Context + `useState` + localStorage — no i18n library, no Redux, appropriate for a 3-page site |
| Filter state | Selected tags live in the URL query string (`/?tags=slasher,zombie`) — makes "Back preserves filters" work for free via browser history, no manual state bookkeeping |

## About page content (final, to be placed in `data/about.json`)

**About Me box:**
> Hey there, I'm Fernanda, a 29-year-old horror movie aficionado and a professional marketer. I created this site because I love watching horror movies and sharing my thoughts about the best ones out there. Ever since I was little, I've loved writing, so I decided to use my creativity along with the help of AI to create this compilation of my best horror movie recommendations. As a proud Mexican, you can find my movie reviews both in English and Spanish; I love sharing my fervor in both languages. When I'm not at the movie theaters catching the latest release, you can find me at home playing board games or video games with my partner. When I'm not at home, another one of my passions is reading, preferably with a good London Fog in hand, or sitting at the beach with a cold beer by my side.

**Why Horror box:**
> What was the first horror movie I ever watched? I actually have no idea. But I do remember the impact films like Rec and The Grudge left on me. Yes, I was scared, but there was also this fun rush of experiencing the unknown. You can consider me a bit crazy since I enjoy and seek watching horror movies on my own... [full text as provided, continues through the "valuable messages" closing line]

**Top 3 current favorites:** Obsession, Weapons, Talk to Me

**Note:** the line "you can get in touch with me:" trailing into nothing was a lost link from the source doc — it reads naturally as the lead-in to the contact form below it, so no fix needed; the "Contact Me" button in the Identity box and the form itself satisfy that sentence.

**Still needed from Fernanda (not blocking the build):** OMDB API key, Formspree endpoint.

## Project structure

```
/pages
  _app.js          → wraps all pages with LanguageProvider, global styles
  _document.js     → html lang attr
  index.js         → homepage (grid + filters)
  about.js         → About page + contact form
  /movie
    [slug].js      → review page (getStaticPaths + getStaticProps)
/components
  Nav.js
  MovieCard.js
  TagPill.js
  FilterBar.js
  RatingsSection.js
  ContactForm.js
  /about
    IdentityBox.js
    AboutMeBox.js
    WhyHorrorBox.js
/context
  LanguageContext.js
/lib
  omdb.js
/data
  movies.json
  strings.json
  about.json
/public/images
  (icons, stills, avatar placeholder)
next.config.js
tailwind.config.js
.env.local (gitignored) / .env.example
HOW_TO_ADD_MOVIES.md
DEPLOYMENT.md
```

## Phase 0 — Scaffold + design foundation

1. Install and invoke Anthropic's official **frontend-design** Claude Code skill first — it forces an aesthetic-commitment brief (purpose/tone/constraints/differentiation) before any component markup is written, applied here to translate the PRD's already-fixed palette/type/tone into concrete component decisions (card shape, spacing, icon treatment, motion feel), not to re-derive colors that are already locked.
2. `create-next-app` (JS, no TypeScript), install Tailwind.
3. `next.config.js`: `output: 'export'`, `images: { unoptimized: true }` (required for static export on Netlify).
4. `tailwind.config.js` — encode the PRD's design system as reusable tokens: `colors.background` (#0a0a0a), `colors.accent` (#8B0000/#CC0000 glow), `colors.text` (#F5F0EB), `colors.tag.bg/text`; `fontFamily.heading`/`body` via `next/font/google` (Playfair Display + Inter/DM Sans, gets `font-display: swap` for free); custom `fadeInUp` keyframe + glow shadow utility for animations.
5. Stub `data/movies.json` (one heavily-commented example entry) and `data/strings.json` (empty en/es skeleton).

**Verify:** `npm run dev`, confirm a blank page renders the correct near-black background and serif heading font.

## Phase 1 — Homepage grid + movie data + one working review page

*(PRD's explicit checkpoint — pause here for visual sign-off before continuing)*

1. Fetch and parse the 3 source blog posts into `movies.json` entries; translate so every movie has both `review.en` and `review.es` from the start; assign each movie 1+ of the 6 fixed tag categories.
2. Since no per-movie icon art exists yet, use a clearly-labeled placeholder icon scheme (swappable per movie later, one file each).
3. Build `MovieCard.js` (icon + title + tag pills, bounded card per the tile-style decision above), `TagPill.js`, `Nav.js` (title + non-functional EN/ES stub).
4. `pages/index.js` — responsive grid, cards link to `/movie/[id]`.
5. `pages/movie/[slug].js` — `getStaticPaths`/`getStaticProps` (`fallback: false`), layout per rogerebert.com reference: title/year/runtime header, tag pills, hero still image, English review body, X-close top-right → `/`, "Back to all movies" text link at the bottom only. No ratings yet (deferred to Phase 3 with the rest of the external-service plumbing).

**Verify:** real grid with all movies from all 3 posts (not placeholders), click through to a review, confirm X and bottom-back both return home.

## Phase 2 — Tag filters + bilingual toggle

1. `FilterBar.js` — 6 fixed categories + always-visible "All" reset, OR-logic multi-select, state in URL query via `router.push(..., { shallow: true })`.
2. Review-page tag pills become links to `/?tags=<tag>`.
3. `context/LanguageContext.js` — Context + `useState('en')` + localStorage persistence, `t(key)` string lookup. Wire `Nav.js` toggle; swap all hardcoded UI strings to `t()`; review page renders `movie.review[lang]`.
4. Animations: card hover = `hover:scale-105` + glow shadow (Tailwind utilities, no JS); review entry = `animate-fade-in-up` CSS keyframe; filter reflow = `transition-all` (no FLIP library — an intentional simplicity trade-off).

**Verify:** EN/ES toggle changes nav + tags + review body instantly and persists on refresh; multi-tag filtering updates instantly with no reload; browser Back after filtering preserves filters; tag click from a review lands on a pre-filtered homepage.

## Phase 2.5 — Design override: cream palette + borderless tiles

After seeing Phase 1/2 built out, Fernanda decided the near-black/blood-red look was too heavy and asked for something closer to the light, cream aesthetic of the woset.world reference, plus tiles that are bare icon + name (no bounding card) with genre tags hidden until hover. See PRD §4.1/§5.2/§5.4 for the updated spec (original dark palette kept there, struck through, for reference).

1. `styles/globals.css` — swap the CSS custom properties: `--background` → warm cream (`#F3ECDF`), new `--surface` for hero-image containers and (later) form fields (`#E9E0CE`), `--foreground` → near-black (`#141414`). `--accent`/`--accent-glow` (blood red) unchanged — now used for links, active tag state, and small accents against the light background rather than as the page background. `--tag-bg`/`--tag-text` unchanged (dark red pill, off-white text — already high contrast regardless of page background).
2. Replace the `.glow-red` hover class with a neutral shadow-lift treatment (no color) — rename to something that describes what it does now, not red.
3. Regenerate the 33 placeholder icon SVGs (`public/images/icons/`) with a transparent background instead of the baked-in `#111111` card fill, so they sit directly on the page like true Woset icons; re-tint the glyph to the red accent.
4. `MovieCard.js` — remove the bounded `bg-surface` card container; icon + title sit directly on the page background. Genre tag pills move inside a wrapper that's hidden by default (`opacity-0`) and revealed with the rest of the hover state (`group-hover:opacity-100`), consistent with the "hover-only tags" decision.
5. Spot-check contrast: near-black text on cream easily clears WCAG AA (easier than the old off-white-on-near-black), and the red accent against cream still needs to clear AA for link/tag text — verify, don't just assume.

**Verify:** `npm run build` + `npm run lint` clean; homepage renders bare icons on a cream background with tags appearing only on hover; movie review pages, Nav, and all interactive states (links, active tag, X-close) read correctly against the new palette; no leftover references to the old dark/glow treatment.

## Phase 3 — About page, contact form, ratings, deployment

1. `pages/about.js` — 3-panel grid (stacks on mobile), real bio copy from `data/about.json` (content finalized above).
2. Avatar: `FernandaDrawing.png` copied to `public/images/avatar.png`, referenced in `IdentityBox.js`.
3. "Contact Me" button scrolls to `#contact-form`.
4. `ContactForm.js` — Name/Email/Message, AJAX POST to Formspree endpoint via env var, inline bilingual success/error states. Functional once Fernanda supplies her real endpoint; doesn't block anything else until then.
5. `lib/omdb.js` — server-side fetch in `getStaticProps` (key never reaches the browser). Show IMDb/RT/Metacritic whenever OMDB returns them; if the key is unset or OMDB returns no data, `RatingsSection` renders nothing — no empty placeholder.
6. Deployment: `netlify.toml` (build `npm run build`, publish `out`). **This phase requires `git init` + push to GitHub, which is a hard "always ask first" item per your CLAUDE.md — I will pause and confirm with you explicitly before doing this step, not just because it's in the plan.** Document required Netlify env vars in `DEPLOYMENT.md`.
7. `HOW_TO_ADD_MOVIES.md` — plain-English guide: copy the last `movies.json` entry as a template, fill in fields, tags must match one of the 6 fixed categories exactly, drop the still image into `public/images`, save and push; Netlify auto-rebuilds.

**Verify:** `npm run build` succeeds, serve `out` locally and click through all 3 routes; ratings appear/disappear correctly based on `OMDB_API_KEY` presence; About page stacks correctly on mobile; contact form works once the real endpoint is set; live Netlify URL matches local build.

## Open items still needed from Fernanda (non-blocking)

- OMDB API key (free, omdbapi.com)
- Formspree endpoint (free, formspree.io)
