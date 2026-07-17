import { useLanguage } from "@/context/LanguageContext";
import about from "@/data/about.json";

export default function FavoritesBubble() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex max-w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border-2 border-accent bg-surface px-6 py-3 text-center text-sm">
      <span className="font-medium text-foreground/70">{t("topFavoritesLabel")}:</span>
      {about.topFavorites.map((title, i) => (
        <span key={title} className="flex items-center gap-x-3">
          {i > 0 && <span className="text-foreground/30">&middot;</span>}
          <span className="font-heading font-semibold text-accent">{title}</span>
        </span>
      ))}
    </div>
  );
}
