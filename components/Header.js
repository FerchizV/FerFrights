import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header({ showTagline = false }) {
  const { t } = useLanguage();

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 px-6 pt-8 pb-6 sm:px-10">
      <div />
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
      <div className="flex items-center justify-end gap-5 text-sm">
        <Link href="/about" className="text-foreground/70 transition-colors hover:text-foreground">
          {t("navAbout")}
        </Link>
        <LanguageToggle />
      </div>
    </header>
  );
}
