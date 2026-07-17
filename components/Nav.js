import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Nav() {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="text-2xl font-semibold tracking-wide text-foreground">
        {t("siteName")}
      </Link>
      <div className="flex items-center gap-5 text-sm">
        <Link href="/about" className="text-foreground/70 transition-colors hover:text-foreground">
          {t("navAbout")}
        </Link>
        <LanguageToggle />
      </div>
    </nav>
  );
}
