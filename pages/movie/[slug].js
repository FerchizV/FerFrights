import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "@/components/Nav";
import TagPill from "@/components/TagPill";
import RatingsSection from "@/components/RatingsSection";
import WhereToWatch from "@/components/WhereToWatch";
import movies from "@/data/movies.json";
import { useLanguage } from "@/context/LanguageContext";
import { fetchRatings } from "@/lib/omdb";
import { fetchTmdbData } from "@/lib/tmdb";

export default function MoviePage({ movie, ratings, stillImage, stillImageCredit, watchProviders }) {
  const { lang, t } = useLanguage();
  const router = useRouter();

  function goBackHome() {
    const cameFromHome = sessionStorage.getItem("ferfrights-came-from-home") === "1";
    if (cameFromHome && window.history.length > 1) {
      sessionStorage.removeItem("ferfrights-came-from-home");
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <title>{`${movie.title} (${movie.year}) — FerFrights`}</title>
        <meta name="description" content={movie.review.en.slice(0, 155)} />
      </Head>
      <main className="min-h-screen">
        <Nav />
        <div className="animate-fade-in-up px-6 pb-10 sm:px-10">
          <div className="relative mx-auto max-w-2xl">
            <button
              type="button"
              onClick={goBackHome}
              aria-label={t("closeAndReturnHome")}
              className="absolute right-0 top-0 text-3xl leading-none text-foreground/60 transition-colors hover:text-accent-glow"
            >
              &times;
            </button>

            <header className="pr-10">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {movie.title}
              </h1>
              <p className="mt-2 text-sm text-foreground/60">
                {movie.year} &middot; {movie.runtime}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} linkToFilter />
                ))}
              </div>
              <RatingsSection ratings={ratings} />
            </header>

            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-surface">
              <Image
                src={stillImage}
                alt={`Still image from ${movie.title}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            {stillImageCredit && (
              <p className="mt-2 text-right text-xs text-foreground/40">
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/70"
                >
                  {t("imageCreditTmdb")}
                </a>
              </p>
            )}

            <article className="mt-8 text-base leading-relaxed text-foreground/90">
              <p>{movie.review[lang]}</p>
            </article>

            <WhereToWatch providers={watchProviders} />

            <div className="mt-12 border-t border-foreground/10 pt-6 text-center">
              <button
                type="button"
                onClick={goBackHome}
                className="text-sm text-foreground/70 underline hover:text-accent-glow"
              >
                {t("backToAllMovies")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: movies.map((movie) => ({ params: { slug: movie.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = movies.find((m) => m.id === params.slug);
  const ratings = await fetchRatings(movie.title, movie.year);

  const { still, watchProviders } = await fetchTmdbData(movie.title, movie.year);
  const stillImage = still?.url ?? movie.stillImage;
  const stillImageCredit = Boolean(still);

  return { props: { movie, ratings, stillImage, stillImageCredit, watchProviders } };
}
