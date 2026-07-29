import { useLanguage } from "@/context/LanguageContext";

const REGION_FOR_LANG = { en: "US", es: "MX" };

export default function WhereToWatch({ providers }) {
  const { lang, t } = useLanguage();

  if (!providers) return null;

  const preferredRegion = REGION_FOR_LANG[lang] || "US";
  const region = providers[preferredRegion] ? preferredRegion : Object.keys(providers)[0];
  const data = providers[region];
  if (!data) return null;

  const groups = [
    { key: "flatrate", label: t("watchStream"), items: data.flatrate },
    { key: "rent", label: t("watchRent"), items: data.rent },
    { key: "buy", label: t("watchBuy"), items: data.buy },
  ].filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl bg-surface p-6">
      <h2 className="font-heading text-lg font-semibold text-foreground">{t("whereToWatchHeading")}</h2>
      <div className="mt-4 flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.key}>
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">{group.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((provider) => (
                // eslint-disable-next-line @next/next/no-img-element -- small decorative provider logo, not content
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                  className="h-10 w-10 rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-accent hover:text-accent-glow"
        >
          {t("watchMoreInfo")}
        </a>
      )}
      <p className="mt-2 text-xs text-foreground/40">{t("watchAttribution")}</p>
    </div>
  );
}
