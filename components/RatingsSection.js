export default function RatingsSection({ ratings }) {
  if (!ratings) return null;

  const { imdb, rottenTomatoes, metacritic } = ratings;
  if (!imdb && !rottenTomatoes && !metacritic) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/70">
      {imdb && <span>IMDb: {imdb}/10</span>}
      {rottenTomatoes && <span>Rotten Tomatoes: {rottenTomatoes}</span>}
      {metacritic && <span>Metacritic: {metacritic}</span>}
    </div>
  );
}
