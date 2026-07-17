import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full border px-3 py-1 transition-colors ${
          lang === "en"
            ? "border-accent/40 text-foreground"
            : "border-transparent text-foreground/50 hover:text-foreground/80"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        className={`rounded-full border px-3 py-1 transition-colors ${
          lang === "es"
            ? "border-accent/40 text-foreground"
            : "border-transparent text-foreground/50 hover:text-foreground/80"
        }`}
      >
        ES
      </button>
    </div>
  );
}
