function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isLikelyMatch(result, title, year) {
  if (!result || !result.title) return false;
  if (normalizeTitle(result.title) !== normalizeTitle(title)) return false;
  const releaseYear = result.release_date ? parseInt(result.release_date.slice(0, 4), 10) : NaN;
  // Loose tolerance: festival vs. wide-release year gaps are common (see
  // the same fix applied to lib/omdb.js) and shouldn't cause a rejection,
  // but a large gap signals an unrelated same-titled film.
  if (Number.isNaN(releaseYear) || Math.abs(releaseYear - year) > 2) return false;
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Next's static build runs getStaticProps for many pages concurrently,
// which can burst enough simultaneous connections to TMDB to get reset
// (ECONNRESET) rather than a clean rate-limit response. Retry with
// backoff instead of silently treating a dropped connection as "no match".
async function searchMovie(apiKey, title, attempt = 1) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(attempt * 400);
    return searchMovie(apiKey, title, attempt + 1);
  }
}

// Returns { url, isBackdrop } for the best-matching still/backdrop image
// from TMDB, or null if unavailable/no key set. Callers must show the
// TMDB attribution notice whenever this returns a non-null result —
// required by TMDB's API terms.
export async function fetchTmdbStill(title, year) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return null;

  try {
    const results = await searchMovie(apiKey, title);
    const match = results.find((r) => isLikelyMatch(r, title, year));
    if (!match) return null;

    const path = match.backdrop_path || match.poster_path;
    if (!path) return null;

    return {
      url: `https://image.tmdb.org/t/p/w1280${path}`,
      isBackdrop: Boolean(match.backdrop_path),
    };
  } catch {
    return null;
  }
}
