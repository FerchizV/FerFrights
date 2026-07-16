import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";
import MovieCard from "@/components/MovieCard";
import FilterBar from "@/components/FilterBar";
import movies from "@/data/movies.json";
import { slugToTag } from "@/lib/tags";

export default function Home() {
  const router = useRouter();
  const tagsParam = typeof router.query.tags === "string" ? router.query.tags : "";
  const selectedSlugs = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
  const selectedTags = selectedSlugs.map(slugToTag);

  const filteredMovies =
    selectedTags.length === 0
      ? movies
      : movies.filter((movie) => movie.tags.some((tag) => selectedTags.includes(tag)));

  return (
    <>
      <Head>
        <title>FerFrights — The Best Horror Movies to Watch</title>
        <meta
          name="description"
          content="Fernanda's personal collection of horror movie recommendations — supernatural, slashers, zombies, and everything in between."
        />
      </Head>
      <main className="min-h-screen">
        <Nav />
        <FilterBar selectedSlugs={selectedSlugs} />
        <div className="px-6 pb-16 sm:px-10">
          <div className="grid grid-cols-2 gap-5 transition-all duration-300 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
