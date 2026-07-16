import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tagToKey, tagToSlug } from "@/lib/tags";

export default function TagPill({ tag, linkToFilter, onClick, active }) {
  const { t } = useLanguage();
  const key = tagToKey(tag);
  const label = key ? t(key) : tag;

  const base = "inline-block rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors";
  const activeClasses = "bg-accent text-tag-text";
  const inactiveClasses = "bg-tag-bg text-tag-text hover:bg-accent";

  if (linkToFilter) {
    return (
      <Link href={`/?tags=${tagToSlug(tag)}`} className={`${base} ${inactiveClasses}`}>
        {label}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${active ? activeClasses : inactiveClasses}`}
      >
        {label}
      </button>
    );
  }

  return <span className={`${base} ${inactiveClasses}`}>{label}</span>;
}
