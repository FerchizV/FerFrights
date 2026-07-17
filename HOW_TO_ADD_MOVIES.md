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
  "stillImage": "/images/icons/the-shining.svg",
  "review": {
    "en": "Your English review here...",
    "es": "Tu reseña en español aquí..."
  }
}
```

| Field | What to put |
|---|---|
| `id` | A short, all-lowercase, hyphen-separated version of the title (no spaces, no special characters). This becomes the movie's web address, e.g. `the-shining` → `ferfrights.com/movie/the-shining`. Must be unique — no two movies can share an `id`. |
| `title` | The movie's title, exactly as you want it displayed. |
| `year` | Release year, as a number (no quotes). |
| `runtime` | Runtime as text, e.g. `"144 min"`. |
| `tags` | One or more of the **6 fixed categories** below — must be spelled and capitalized **exactly** as shown, or filtering won't recognize it. |
| `posterImage` | Path to the movie's icon image (see "Adding the icon image" below). |
| `stillImage` | Path to a still image from the film for the review page's hero image. If you don't have one yet, you can point this at the same file as `posterImage` as a placeholder. |
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

## Adding the icon image

1. Drop your icon image file into the `public/images/icons/` folder.
2. Name the file exactly the same as your movie's `id`, e.g. `the-shining.webp` or `the-shining.png`.
3. Set `posterImage` in your new entry to match, e.g. `"/images/icons/the-shining.webp"`.

If your icon has a checkered background instead of a truly transparent one (a common issue with AI-generated icons), let Claude Code know — it can convert it the same way it did for the original 33 icons.

## Saving and publishing

1. Save `data/movies.json`. Double-check there's no missing comma between movie entries — every entry except the last one in the list needs a `,` after its closing `}`.
2. Ask Claude Code to run `npm run build` to make sure nothing is broken.
3. Commit and push to GitHub (ask Claude Code to do this, or do it yourself if you're comfortable with git).
4. Netlify automatically rebuilds the live site within a couple of minutes of the push — no extra steps needed.

## Common mistakes to avoid

- ❌ Forgetting a comma between two movie entries.
- ❌ Misspelling a tag (it must match one of the 6 categories exactly, including capitalization and the ` / `).
- ❌ Reusing an `id` that another movie already has.
- ❌ Forgetting to add both `review.en` and `review.es` — the site expects both.
