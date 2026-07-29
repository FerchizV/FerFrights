# How to Add a New Movie to FerFrights

All movies live in one file: `data/movies.json`. You don't need to touch any other file or write any code — just add a new entry to this list, following the pattern below.

## Step-by-step

1. Open `data/movies.json`.
2. Copy the **entire block** for any existing movie (from the opening `{` to the closing `},`) and paste it at the end of the list, just before the final `]`.
3. Fill in each field for your new movie:

```json
{
  "id": "the-shining",
  "title": "The Shining",
  "year": 1980,
  "runtime": "144 min",
  "tags": ["Psychological / Thriller", "Supernatural / Paranormal"],
  "posterImage": "/images/icons/the-shining.webp",
  "stillImage": "/images/stills/the-shining.webp",
  "review": {
    "en": "Your English review here...",
    "es": "Tu reseña en español aquí..."
  }
}
```

| Field | What to put |
|---|---|
| `id` | A short, all-lowercase, hyphen-separated version of the title (no spaces, no special characters). This becomes the movie's web address, e.g. `the-shining` → `ferfrights.com/movie/the-shining`. Must be unique — no two movies can share an `id`. |
| `title` | The movie's title, exactly as it's commonly known (this is also what's used to look up ratings, a still image, and streaming info automatically — see below). |
| `year` | Release year, as a number (no quotes). |
| `runtime` | Runtime as text, e.g. `"144 min"`. |
| `tags` | One or more of the **6 fixed categories** below — must be spelled and capitalized **exactly** as shown, or filtering won't recognize it. |
| `posterImage` | Path to the movie's icon image for the homepage (see "Adding the icon image" below). |
| `stillImage` | A backup image for the review page's hero photo, only used if the automatic lookup below doesn't find one. Fine to point this at the same file as `posterImage` if you don't have a real still handy. |
| `review.en` | Your review in English. |
| `review.es` | Your review in Spanish. |

### The 6 tag categories (use exactly as written)

- `Supernatural / Paranormal`
- `Zombie / Creature`
- `Slasher / Gore`
- `Psychological / Thriller`
- `International / Foreign Language`
- `Sci-Fi Horror`

A movie can have more than one tag — just list them all inside the `[ ]` brackets, separated by commas.

## What fills in automatically

You don't need to do anything for these — they're looked up by `title` and `year` the next time the site rebuilds:

- **Ratings** (IMDb, Rotten Tomatoes, Metacritic) — pulled from OMDB. Hidden entirely if no rating data exists for that title.
- **Hero image** — a proper still/backdrop image is pulled from TMDB, with a small "Image via TMDB" credit shown automatically. Falls back to your `stillImage` file if TMDB has no match.
- **Where to Watch** — streaming, rental, and purchase availability, pulled from TMDB (sourced from JustWatch, credited automatically). Shows English/US listings or Spanish/Mexico listings depending on the site language, and is hidden entirely if nothing's available in either.

Because of this, **getting `title` and `year` right matters more than it used to** — that's what these lookups match against. If a movie doesn't seem to be getting a rating, image, or streaming info after a rebuild, double-check the title is spelled the way it's commonly listed (not a nickname or alternate title) and the year matches its actual release year.

## Adding the icon image

1. Drop your icon image file into the `public/images/icons/` folder.
2. Name the file exactly the same as your movie's `id`, e.g. `the-shining.webp` or `the-shining.png`.
3. Set `posterImage` in your new entry to match, e.g. `"/images/icons/the-shining.webp"`.

If your icon has a checkered background instead of a truly transparent one (a common issue with AI-generated icons), let Claude Code know — it can convert it the same way it did for the original 33 icons.

## Saving and publishing

1. Save `data/movies.json`. Double-check there's no missing comma between movie entries — every entry except the last one in the list needs a `,` after its closing `}`.
2. Ask Claude Code to run `npm run build` to make sure nothing is broken, and to confirm the new movie's ratings/image/streaming info came through correctly.
3. Commit and push to GitHub (ask Claude Code to do this, or do it yourself if you're comfortable with git).
4. Vercel automatically rebuilds the live site within a couple of minutes of the push — no extra steps needed.

## Common mistakes to avoid

- ❌ Forgetting a comma between two movie entries.
- ❌ Misspelling a tag (it must match one of the 6 categories exactly, including capitalization and the ` / `).
- ❌ Reusing an `id` that another movie already has.
- ❌ Forgetting to add both `review.en` and `review.es` — the site expects both.
- ❌ Using an alternate title, nickname, or a `year` that doesn't match the actual release year — this can make the automatic ratings/image/streaming lookups fail to find the movie.
