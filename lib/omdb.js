function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isLikelyMatch(data, title, year) {
  if (data.Response === "False") return false;
  if (normalizeTitle(data.Title) !== normalizeTitle(title)) return false;
  const returnedYear = parseInt(data.Year, 10);
  // Loose tolerance: festival vs. wide-release year gaps (e.g. The Witch
  // premiered 2015, OMDB lists 2016) are common and shouldn't cause a
  // rejection, but a large gap signals an unrelated same-titled film.
  if (Number.isNaN(returnedYear) || Math.abs(returnedYear - year) > 2) return false;
  return true;
}

async function lookupByTitle(apiKey, title) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  return res.json();
}

async function lookupByTitleAndYear(apiKey, title, year) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}&y=${year}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchRatings(title, year) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return null;

  try {
    // Title-only lookup first: OMDB's own popularity-based disambiguation
    // is more reliable than a year-qualified search here, since festival
    // vs. wide-release year mismatches can make the year-qualified query
    // silently match a completely unrelated film that happens to share
    // both the title and that specific year (confirmed for The Witch and
    // Insidious against this catalog).
    let data = await lookupByTitle(apiKey, title);
    if (!isLikelyMatch(data, title, year)) {
      data = await lookupByTitleAndYear(apiKey, title, year);
    }
    if (!isLikelyMatch(data, title, year)) return null;

    const ratings = {};
    if (data.imdbRating && data.imdbRating !== "N/A") {
      ratings.imdb = data.imdbRating;
    }
    for (const r of data.Ratings || []) {
      if (r.Source === "Rotten Tomatoes") ratings.rottenTomatoes = r.Value;
      if (r.Source === "Metacritic") ratings.metacritic = r.Value;
    }

    return Object.keys(ratings).length > 0 ? ratings : null;
  } catch {
    return null;
  }
}
