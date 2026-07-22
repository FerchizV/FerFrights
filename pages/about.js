import Head from "next/head";
import Header from "@/components/Header";
import IdentityBox from "@/components/about/IdentityBox";
import AboutMeBox from "@/components/about/AboutMeBox";
import WhyHorrorBox from "@/components/about/WhyHorrorBox";
import FavoritesBubble from "@/components/about/FavoritesBubble";
import ContactForm from "@/components/ContactForm";

export default function About() {
  return (
    <>
      <Head>
        <title>About — FerFrights</title>
        <meta
          name="description"
          content="Meet Fernanda, the horror movie fan behind FerFrights, and get in touch."
        />
      </Head>
      <main className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-5xl px-6 pb-16 sm:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:gap-10">
            <IdentityBox />
            <AboutMeBox />
          </div>

          <div className="mt-8">
            <WhyHorrorBox />
          </div>

          <div className="mt-8">
            <FavoritesBubble />
          </div>

          <div className="mt-10">
            <ContactForm />
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 border-t border-foreground/10 pt-8 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- static third-party logo asset, not content */}
            <img src="/images/tmdb-logo.svg" alt="TMDB" className="h-4 w-auto opacity-70" />
            <p className="max-w-md text-xs text-foreground/50">
              This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
