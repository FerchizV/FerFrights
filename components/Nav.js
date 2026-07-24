import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Nav() {
  const { t } = useLanguage();

  return (
    <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="inline-block">
        <Image src="/images/logo.webp" alt="FerFrights" width={1400} height={372} className="h-8 w-auto" />
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
