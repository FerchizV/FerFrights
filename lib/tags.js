export const TAGS = [
  { tag: "Supernatural / Paranormal", slug: "supernatural", key: "tagSupernatural" },
  { tag: "Zombie / Creature", slug: "zombie", key: "tagZombie" },
  { tag: "Slasher / Gore", slug: "slasher", key: "tagSlasher" },
  { tag: "Psychological / Thriller", slug: "psychological", key: "tagPsychological" },
  { tag: "International / Foreign Language", slug: "international", key: "tagInternational" },
  { tag: "Sci-Fi Horror", slug: "scifi", key: "tagSciFi" },
];

export function tagToSlug(tag) {
  return TAGS.find((t) => t.tag === tag)?.slug ?? tag;
}

export function slugToTag(slug) {
  return TAGS.find((t) => t.slug === slug)?.tag ?? slug;
}

export function tagToKey(tag) {
  return TAGS.find((t) => t.tag === tag)?.key ?? null;
}
