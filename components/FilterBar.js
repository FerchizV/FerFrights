import { useRouter } from "next/router";
import TagPill from "./TagPill";
import { TAGS } from "@/lib/tags";
import { useLanguage } from "@/context/LanguageContext";

export default function FilterBar({ selectedSlugs }) {
  const router = useRouter();
  const { t } = useLanguage();

  function toggleTag(slug) {
    const next = selectedSlugs.includes(slug)
      ? selectedSlugs.filter((s) => s !== slug)
      : [...selectedSlugs, slug];

    const query = { ...router.query };
    if (next.length === 0) {
      delete query.tags;
    } else {
      query.tags = next.join(",");
    }
    router.push({ pathname: "/", query }, undefined, { shallow: true });
  }

  function reset() {
    router.push("/", undefined, { shallow: true });
  }

  return (
    <div className="flex flex-wrap gap-2 px-6 pb-8 sm:px-10">
      <button
        type="button"
        onClick={reset}
        aria-pressed={selectedSlugs.length === 0}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          selectedSlugs.length === 0
            ? "bg-accent text-tag-text"
            : "bg-tag-bg text-tag-text hover:bg-accent"
        }`}
      >
        {t("filterAll")}
      </button>
      {TAGS.map(({ tag, slug }) => (
        <TagPill
          key={slug}
          tag={tag}
          active={selectedSlugs.includes(slug)}
          onClick={() => toggleTag(slug)}
        />
      ))}
    </div>
  );
}
