import { useLanguage } from "@/context/LanguageContext";
import about from "@/data/about.json";

export default function AboutMeBox() {
  const { lang, t } = useLanguage();

  return (
    <div className="rounded-xl bg-surface p-8">
      <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        {t("helloImPrefix")} {about.name}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-foreground/90">
        {about.aboutMe[lang]}
      </p>
    </div>
  );
}
