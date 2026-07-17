export async function fetchRatings(title, year) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}&y=${year}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "False") return null;

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
