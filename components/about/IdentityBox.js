import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import about from "@/data/about.json";

export default function IdentityBox() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-full bg-surface">
        <Image
          src="/images/avatar.png"
          alt={`Illustrated portrait of ${about.name}`}
          fill
          className="object-cover"
          sizes="240px"
        />
      </div>
      <a
        href="#contact-form"
        className="hover-lift mt-6 rounded-full bg-accent px-6 py-2 text-sm font-medium text-tag-text transition-colors hover:bg-accent-glow"
      >
        {t("contactMe")}
      </a>
    </div>
  );
}
