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
        </div>
      </main>
    </>
  );
}
