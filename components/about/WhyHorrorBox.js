import { useLanguage } from "@/context/LanguageContext";
import about from "@/data/about.json";

export default function WhyHorrorBox() {
  const { lang, t } = useLanguage();

  return (
    <div className="rounded-xl bg-surface p-8 sm:p-12">
      <h2 className="font-heading text-2xl font-semibold text-foreground">
        {t("whyHorrorHeading")}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90">
        {about.whyHorror[lang]}
      </p>
    </div>
  );
}
