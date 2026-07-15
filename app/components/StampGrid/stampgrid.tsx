import StampCard from "@/app/components/StampCard/StampCard";

type Stamp = {
  id: number;
  slug: string;
  title: string;
  year: number;
  country: string;
  description: string;
  img: string;
};

type StampGridProps = {
  stamps: Stamp[];
};

export default function StampGrid({ stamps }: StampGridProps) {
  if (stamps.length === 0) {
    return (
      <div className="py-16 text-sm text-center font-meta text-brand-muted">
        No stamps found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {stamps.map((stamp) => (
        <StampCard key={stamp.id} {...stamp} />
      ))}
    </div>
  );
}
