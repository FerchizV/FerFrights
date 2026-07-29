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
async function fetchJsonWithRetry(url, attempt = 1) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(attempt * 400);
    return fetchJsonWithRetry(url, attempt + 1);
  }
}

async function searchMovie(apiKey, title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;
  const data = await fetchJsonWithRetry(url);
  return data.results || [];
}

async function fetchWatchProvidersById(apiKey, tmdbId) {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers?api_key=${apiKey}`;
  const data = await fetchJsonWithRetry(url);
  return data.results || {};
}

// TMDB's watch-provider data is sourced from JustWatch and keyed by region.
// We only care about US (English) and MX (Spanish) to match the site's
// bilingual audience. A region is only kept if it actually has something
// to show — no empty streaming/rent/buy sections.
function pickRegionProviders(resultsByRegion) {
  const picked = {};
  for (const code of ["US", "MX"]) {
    const entry = resultsByRegion[code];
    const hasAny = entry && (entry.flatrate?.length || entry.rent?.length || entry.buy?.length);
    if (hasAny) {
      picked[code] = {
        link: entry.link,
        flatrate: entry.flatrate || [],
        rent: entry.rent || [],
        buy: entry.buy || [],
      };
    }
  }
  return Object.keys(picked).length > 0 ? picked : null;
}

// Returns { still: {url,isBackdrop}|null, watchProviders: {US?, MX?}|null }.
// Callers must show the TMDB attribution notice whenever `still` is
// non-null, and the JustWatch attribution whenever `watchProviders` is
// non-null — both required by TMDB's API terms.
export async function fetchTmdbData(title, year) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return { still: null, watchProviders: null };

  try {
    const results = await searchMovie(apiKey, title);
    const match = results.find((r) => isLikelyMatch(r, title, year));
    if (!match) return { still: null, watchProviders: null };

    const imagePath = match.backdrop_path || match.poster_path;
    const still = imagePath
      ? { url: `https://image.tmdb.org/t/p/w1280${imagePath}`, isBackdrop: Boolean(match.backdrop_path) }
      : null;

    let watchProviders = null;
    try {
      const resultsByRegion = await fetchWatchProvidersById(apiKey, match.id);
      watchProviders = pickRegionProviders(resultsByRegion);
    } catch {
      watchProviders = null;
    }

    return { still, watchProviders };
  } catch {
    return { still: null, watchProviders: null };
  }
}
