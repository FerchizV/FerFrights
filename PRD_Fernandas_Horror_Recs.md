# PRD: Fernanda's Horror Movie Recommendation Website

**Project name:** Fernanda's Recs (working title)
**Version:** 1.0
**Last updated:** June 2026
**Owner:** Fernanda

---

## 1. Project Overview

A personal horror movie recommendation website built from Fernanda's existing blog posts. Visitors can browse a visually striking homepage of movie cards, click into individual film reviews, filter by genre/theme, and contact Fernanda. The site is bilingual (English/Spanish), mobile-first, and designed to be expanded with new movie entries over time.

**Primary goals:**
- Demonstrate that Fernanda can use AI to build a professional, beautiful website
- Serve as a living personal repository of her favorite horror films
- Become a site that horror fans consult regularly for recommendations

---

## 2. Target Users

- **Casual horror fans** looking for their next movie to watch
- **Horror enthusiasts** who want to read another opinion on films they've seen
- **Fernanda herself** — for personal reference and as a creative outlet
- **Friends and family** she shares the link with

---

## 3. Site Structure

The site has **three pages**:

| Page | Purpose |
|---|---|
| `/` — Homepage | Grid of movie cards with filter system |
| `/movie/[slug]` — Movie Review | Full review for a single film |
| `/about` — About Me | Fernanda's story + contact form |

---

## 4. Page-by-Page Requirements

### 4.1 Homepage

**Layout:**
- A grid of movie cards, inspired by the icon/poster grid at [woset.world](https://woset.world/pages/world)
- Each card shows: a custom icon (not a movie poster), movie title, and genre tags
- Cards are clean and minimal — no long text previews on the homepage

**Filter System:**
- Filter bar at the top of the grid (or as a sidebar on desktop)
- Filters are tag-based and multi-selectable (e.g. selecting "Supernatural" AND "International" shows films matching either or both)
- Filter categories:
  - Supernatural / Paranormal
  - Zombie / Creature
  - Slasher / Gore
  - Psychological / Thriller
  - International / Foreign Language
  - Sci-Fi Horror
- An "All" / reset filter option is always visible
- Filtering happens instantly on the page with no page reload

**Interaction:**
- Clicking a card navigates to that film's full review page
- Card hover state: subtle animation (e.g. slight scale, glow, or color shift — consistent with the horror aesthetic)

**Language toggle:**
- A visible EN / ES toggle in the navigation bar
- Switching language translates all UI text and movie review content

---

### 4.2 Movie Review Page

Each movie has its own dedicated page. Layout inspired by [rogerebert.com](https://www.rogerebert.com/collections/horror-movies).

**Content per movie:**
| Field | Notes |
|---|---|
| Movie title | Large heading |
| Year | Displayed near the title |
| Runtime | Displayed near the title |
| Genre tags | Clickable — returns user to homepage filtered by that tag |
| One still image from the film | Hero image at the top of the review |
| Fernanda's full review | Body text, written by Fernanda |
| Ratings | **Only shown if free API is available.** If not, no ratings are displayed. Do not show placeholder or empty rating slots. |

**Navigation:**
- An **X (close) icon** in the top-right corner of the review page returns the user to the homepage — no redundant "Back to all movies" text link at the top
- A "Back to all movies" text link at the **bottom** of the page only, for users who have scrolled through the full review

**Interaction:**
- Entry animation: the review page slides up or fades in when a card is clicked, inspired by the woset.world slide-up behavior

---

### 4.3 About Me Page

**Layout:** Three-panel / three-box layout (desktop: side by side; mobile: stacked vertically)

| Box | Content |
|---|---|
| Box 1 — Identity | Illustrated avatar (art-style portrait, not a real photo), Fernanda's name, and a "Contact Me" button that scrolls or jumps to the contact form |
| Box 2 — About Me | Short personal bio — not exclusively about horror. Who Fernanda is, where she's from, what she loves. |
| Box 3 — Why Horror | Why she loves horror movies. Her current top 3 favorite films. Why she built this website. |

**Contact Form (below the three boxes):**
- Fields: Name, Email, Message
- Submit button sends an email to Fernanda via **Formspree** (free tier)
- On success: show an inline confirmation message ("Thanks! I'll get back to you soon.")
- On failure: show a friendly error message
- Form must work on mobile

---

## 5. Design System

### 5.1 Visual Direction

- **Aesthetic:** Dramatic classic horror — not campy, not earth-toned
- **Feel:** Like a beautifully designed horror film poster. Minimalist but striking.
- **References:** woset.world (layout flow), rogerebert.com (review page structure)

### 5.2 Color Palette

| Role | Color |
|---|---|
| Background | Near-black (e.g. `#0a0a0a` or `#111111`) |
| Primary accent | Deep blood red (e.g. `#8B0000` or `#CC0000`) |
| Secondary / text | Off-white / warm white (e.g. `#F5F0EB`) |
| Hover / highlight | Brighter red or desaturated red glow |
| Tags | Off-white text on dark red pill/badge |

### 5.3 Typography

- **Headings:** A serif or display font with character — gothic, editorial, or slightly unsettling (e.g. Playfair Display, or a Google Fonts horror-adjacent serif)
- **Body text:** Clean, highly readable sans-serif (e.g. Inter or DM Sans)
- **Minimum body size:** 16px on mobile

### 5.4 Animations

- Card hover: subtle scale + red glow
- Movie page entry: slide-up or fade-in transition
- Filter changes: smooth instant reflow (no jarring jumps)
- Keep animations tasteful — they should feel cinematic, not distracting

### 5.5 Logo / Site Name

- Site name displayed in the nav: **"Fernanda's Recs"** (or a horror-themed variant Fernanda can rename)
- Optional: a small custom icon or symbol (e.g. an eye, a film reel, a candle)

---

## 6. Bilingual Support (EN / ES)

- All UI labels, navigation, and button text must be translated
- All movie review body text must have both an English and Spanish version
- The original Spanish blog posts should be translated to English (and vice versa where needed)
- Language preference should be stored in the browser session so it persists while navigating between pages
- The language toggle must be visible on every page (in the navigation bar)

---

## 7. Content

### 7.1 Initial Movie Content

All movies come from Fernanda's three existing blog posts:

| Blog Post | Language | URL |
|---|---|---|
| Scary Movies You Have to Watch | English | https://sinsognar.wordpress.com/2025/03/12/scary-movies-you-have-to-watch/ |
| 10 Películas de Terror para Asustarse | Spanish → translate to EN | https://sinsognar.wordpress.com/2020/10/29/10-peliculas-de-terror-para-asustarse/ |
| Las Mejores Películas de Miedo Según Fer | Spanish → translate to EN | https://sinsognar.wordpress.com/2017/06/30/las-mejores-peliculas-de-miedo-segun-fer/ |

At build time, Claude Code should scrape or be provided the text from these three posts and structure them into the movie data format.

### 7.2 Movie Data Structure

Each movie entry should be stored in a simple, editable data file (e.g. a JSON or Markdown file) so Fernanda can add new movies without touching code. Each entry includes:

```json
{
  "id": "the-shining",
  "title": "The Shining",
  "year": 1980,
  "runtime": "144 min",
  "tags": ["Psychological / Thriller", "Supernatural / Paranormal"],
  "posterImage": "/images/the-shining-poster.jpg",
  "stillImage": "/images/the-shining-still.jpg",
  "review": {
    "en": "English review text here...",
    "es": "Spanish review text here..."
  }
}
```

### 7.3 Adding New Movies

Claude Code must build a simple mechanism for Fernanda to add new movies. The preferred approach is:

- A clearly commented and formatted `movies.json` (or equivalent) data file
- Claude Code should include a `HOW_TO_ADD_MOVIES.md` file in plain English explaining exactly what to copy/paste and fill in to add a new movie
- Stretch goal: a simple local admin form that writes to the data file (only if it doesn't add significant complexity)

---

## 8. Technical Requirements

### 8.1 Stack

- **Framework:** Next.js (React) — good for static export + SEO + routing
- **Styling:** Tailwind CSS
- **Language:** JavaScript (not TypeScript — keep it simple)
- **Hosting:** Netlify (free tier, no custom domain needed at launch)
- **Contact form:** Formspree free tier (handles email delivery, no backend needed)
- **Ratings API:** Implement OMDB API (free tier, requires free API key) for IMDb scores. If the API is unavailable or the key is not set, ratings must be hidden completely — no empty placeholders.

### 8.2 Routing

- Homepage: `/`
- Movie pages: `/movie/[slug]` where slug is the URL-safe movie title
- About page: `/about`

### 8.3 Performance

- Images must be optimized (use Next.js `<Image>` component)
- Page load on mobile must feel fast — lazy load images below the fold
- No external fonts that block render (use `font-display: swap`)

### 8.4 Accessibility

- All images must have descriptive `alt` text
- Color contrast must meet WCAG AA minimum
- All interactive elements must be keyboard-navigable
- Form fields must have visible labels (not just placeholders)

### 8.5 SEO

- Each movie page has a unique `<title>` and `<meta description>`
- Homepage has a descriptive title tag (e.g. "Fernanda's Horror Recs — The Best Horror Movies to Watch")
- No noindex tags

---

## 9. What the Site Must NOT Do or Include

- ❌ No long scrolling list of all movies on the homepage — cards only, click to read
- ❌ No traditional blog layout (no date-sorted posts, no sidebar)
- ❌ No empty or placeholder rating widgets if the ratings API is unavailable
- ❌ No stock horror imagery that looks generic (campy skulls, generic ghosts)
- ❌ No auto-playing video or audio
- ❌ No real photo of Fernanda (use illustrated avatar only)
- ❌ No paid APIs or services at launch
- ❌ No custom domain at launch

---

## 10. Success Criteria

The site is working correctly when:

- [ ] A user can open the homepage on desktop and mobile and see all movie cards
- [ ] A user can click any card and read the full review
- [ ] A user can click "Back" and return to the homepage with their filters preserved
- [ ] A user can filter by one or more genre tags and see only matching movies
- [ ] A user can toggle between English and Spanish on any page
- [ ] A user can navigate to the About page and read Fernanda's bio
- [ ] A user can submit the contact form and Fernanda receives an email
- [ ] The site loads in under 3 seconds on a mobile connection
- [ ] Fernanda can add a new movie by editing the data file using the HOW_TO_ADD_MOVIES.md guide
- [ ] Friends and family Fernanda shares the link with can navigate it without help

---

## 11. Out of Scope (v1)

These features are explicitly deferred to a future version:

- User accounts or saved watchlists
- Comment sections
- Custom domain / DNS setup
- A visual admin dashboard for adding movies
- Search bar (beyond the tag filter)
- Social sharing buttons

---

## 12. Open Questions / Decisions Deferred

| Question | Status |
|---|---|
| Final site name / branding | To be decided by Fernanda before launch |
| Illustrated avatar style for About page | Fernanda to provide or commission |
| About Me and Why Horror body text | Fernanda to write (or provide notes for Claude to draft) |
| OMDB API key | Fernanda to register for free at omdbapi.com |
| Formspree form endpoint | Fernanda to register for free at formspree.io |

---

*This PRD is intended to be handed directly to Claude Code. Each section corresponds to a buildable feature. Start with Phase 1 (homepage + movie data structure + one review page), validate the design, then proceed to Phase 2 (filters + bilingual toggle) and Phase 3 (About page + contact form + deployment).*
