import "@/styles/globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/context/LanguageContext";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${playfairDisplay.variable} ${inter.variable}`}>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
      <Analytics />
    </div>
  );
}
