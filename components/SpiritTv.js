import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import movies from "@/data/movies.json";

const CYCLE_INTERVAL_MS = 90;
const SEARCH_DURATION_MS = 1600;

function TvIcon({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 10 L32 20 L44 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10" y="18" width="44" height="30" rx="4" stroke="currentColor" strokeWidth="3" />
      <rect x="17" y="25" width="30" height="16" rx="1.5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 48 L20 54 M40 48 L44 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function SpiritTv() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState("searching"); // searching | revealed
  const [displayTitle, setDisplayTitle] = useState("");
  const [chosenMovie, setChosenMovie] = useState(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  function clearTimers() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  function openTv() {
    const target = movies[Math.floor(Math.random() * movies.length)];
    setChosenMovie(target);
    setPhase("searching");
    setOpen(true);

    intervalRef.current = setInterval(() => {
      const random = movies[Math.floor(Math.random() * movies.length)];
      setDisplayTitle(random.title);
    }, CYCLE_INTERVAL_MS);

    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setDisplayTitle(target.title);
      setPhase("revealed");
    }, SEARCH_DURATION_MS);
  }

  function closeTv() {
    clearTimers();
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        clearTimers();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => clearTimers, []);

  return (
    <>
      <div className="group fixed bottom-6 left-6 z-40 inline-flex flex-col items-center">
        <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-medium text-tag-text opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
          {t("shuffleHint")}
        </span>
        <button
          type="button"
          onClick={openTv}
          aria-label={t("shuffleHint")}
          className="hover-lift flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-surface text-foreground transition-colors hover:text-accent"
        >
          <TvIcon className="h-8 w-8" />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
          onClick={closeTv}
        >
          <div
            className="animate-fade-in-up w-full max-w-sm rounded-xl bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeTv}
                aria-label={t("shuffleClose")}
                className="text-2xl leading-none text-foreground/60 transition-colors hover:text-accent-glow"
              >
                &times;
              </button>
            </div>

            <div className="tv-static-bg relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-[#0a0a0a] px-4">
              <p
                className={`text-center font-heading text-lg font-semibold text-[#f5f0eb] sm:text-xl ${
                  phase === "searching" ? "tv-flicker" : ""
                }`}
              >
                {displayTitle}
              </p>
            </div>

            <p className="mt-4 text-center text-sm text-foreground/70">
              {phase === "searching" ? t("shuffleSearching") : t("shuffleReveal")}
            </p>

            {phase === "revealed" && chosenMovie && (
              <div className="mt-4 flex justify-center">
                <Link
                  href={`/movie/${chosenMovie.id}`}
                  className="hover-lift rounded-full bg-accent px-6 py-2 text-sm font-medium text-tag-text transition-colors hover:bg-accent-glow"
                >
                  {t("shuffleCta")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
