import stamps from "../stamps/stamps-fdc/mock-data";
import StampCard from "../components/StampCard/StampCard";

export default function FeaturedStamps() {
  const featuredStamps = stamps.filter((stamp) => stamp.featured).slice(0, 6);

  return (
    <section className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-heading text-brand-text sm:text-3xl">
          Featured Stamps
        </h2>

        <p className="mt-2 text-sm text-brand-muted">
          Discover a selection of notable commemorative stamps from the
          collection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {featuredStamps.map((stamp) => (
          <StampCard key={stamp.id} {...stamp} />
        ))}
      </div>
    </section>
  );
}
