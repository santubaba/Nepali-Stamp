import Image from "next/image";
import Link from "next/link";

interface StampCardProps {
  id: number;
  slug: string;
  title: string;
  eyebrow?: string;
  year?: number;
  country?: string;
  description?: string;
  img: string;
  basePath: string;
}

export default function StampCard({
  slug,
  title,
  eyebrow,
  year,
  country,
  description,
  img,
  basePath,
}: StampCardProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="block overflow-hidden transition-all duration-200 bg-white border group border-brand-border rounded-xl hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/40"
    >
      {/* Image area */}
      <div className="relative w-full aspect-[4/5] border-b border-brand-border bg-brand-surface">
        <Image
          src={img}
          alt={title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info area */}
      <div className="p-3">
        <h2 className="text-sm font-medium leading-tight font-heading text-brand-text line-clamp-2">
          {title}
        </h2>

        {eyebrow && (
          <p className="mt-1.5 text-xs font-meta text-brand-primary line-clamp-1">
            {eyebrow}
          </p>
        )}

        {(year || country || description) && (
          <p className="mt-0.5 text-xs font-meta text-brand-muted line-clamp-1">
            {year && <span>{year}</span>}
            {year && (country || description) && <span> · </span>}
            {country && <span>{country}</span>}
            {country && description && <span> · </span>}
            {description && <span>{description}</span>}
          </p>
        )}
      </div>
    </Link>
  );
}