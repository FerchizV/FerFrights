import Image from "next/image";
import Link from "next/link";
import TagPill from "./TagPill";

export default function MovieCard({ movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex flex-col items-center p-3 text-center"
    >
      <div className="hover-lift relative aspect-square w-full max-w-[140px] rounded-lg">
        <Image
          src={movie.posterImage}
          alt={`${movie.title} icon`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 40vw, 140px"
        />
      </div>
      <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">
        {movie.title}
      </h2>
      <div className="mt-2 flex max-h-0 flex-wrap justify-center gap-2 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-h-20 group-hover:opacity-100">
        {movie.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}
