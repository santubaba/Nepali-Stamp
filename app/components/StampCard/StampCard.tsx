import Image from "next/image";
import Link from "next/link";

interface StampCardProps {
  id: number;
  slug: string; // needed for the detail page link
  title: string;
  year: number; // plain number — DB returns Int, not Date
  country: string;
  description: string; // renamed from metadata — more honest about what it is
  img: string; // R2 public URL — Phase 5 wires this from DB
}

export default function StampCard({
  slug,
  title,
  year,
  country,
  description,
  img,
}: StampCardProps) {
  return (
    <Link
      href={`/stamps/stamps-fdc/${slug}`}
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

        <p className="mt-1.5 text-xs font-meta text-brand-primary">{year}</p>

        <p className="mt-0.5 text-xs font-meta text-brand-muted line-clamp-1">
          {country} · {description}
        </p>
      </div>
    </Link>
  );
}
