import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import TagPill from "@/components/TagPill";
import movies from "@/data/movies.json";
import { useLanguage } from "@/context/LanguageContext";

export default function MoviePage({ movie }) {
  const { lang, t } = useLanguage();

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
            <Link
              href="/"
              aria-label={t("closeAndReturnHome")}
              className="absolute right-0 top-0 text-3xl leading-none text-foreground/60 transition-colors hover:text-accent-glow"
            >
              &times;
            </Link>

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
            </header>

            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-surface">
              <Image
                src={movie.stillImage}
                alt={`Still image from ${movie.title}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            <article className="mt-8 text-base leading-relaxed text-foreground/90">
              <p>{movie.review[lang]}</p>
            </article>

            <div className="mt-12 border-t border-foreground/10 pt-6 text-center">
              <Link href="/" className="text-sm text-foreground/70 underline hover:text-accent-glow">
                {t("backToAllMovies")}
              </Link>
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
  return { props: { movie } };
}
