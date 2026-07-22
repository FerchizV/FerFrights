import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
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
        <Header showTagline />
        <FilterBar selectedSlugs={selectedSlugs} count={filteredMovies.length} />
        <div className="px-6 pb-16 sm:px-10">
          <div className="flex flex-wrap justify-center gap-5 transition-all duration-300">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="w-36 sm:w-40">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
