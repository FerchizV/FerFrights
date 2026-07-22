import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

function LogoBlock({ showTagline, t }) {
  return (
    <div className="flex flex-col items-center">
      <Link href="/" className="inline-block">
        <Image
          src="/images/logo.webp"
          alt="FerFrights"
          width={1400}
          height={372}
          className="h-14 w-auto sm:h-20"
          priority
        />
      </Link>
      {showTagline && (
        <p className="mt-4 max-w-xl text-center text-sm text-foreground/45 sm:text-base">
          {t("homeTagline")}
        </p>
      )}
    </div>
  );
}

export default function Header({ showTagline = false }) {
  const { t } = useLanguage();

  return (
    <header className="px-6 pt-4 pb-6 sm:px-10 sm:pt-8">
      {/* Mobile: About + language toggle get their own row so they never compete with the logo for space */}
      <div className="flex items-center justify-end gap-5 text-sm sm:hidden">
        <Link href="/about" className="text-foreground/70 transition-colors hover:text-foreground">
          {t("navAbout")}
        </Link>
        <LanguageToggle />
      </div>
      <div className="mt-3 sm:hidden">
        <LogoBlock showTagline={showTagline} t={t} />
      </div>

      {/* Desktop: single row, true 3-column centering regardless of side content width */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-4">
        <div />
        <LogoBlock showTagline={showTagline} t={t} />
        <div className="flex items-center justify-end gap-5 text-sm">
          <Link href="/about" className="text-foreground/70 transition-colors hover:text-foreground">
            {t("navAbout")}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
