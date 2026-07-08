export default function AboutInfo() {
  const stats = [
    {
      value: "1,400+", // TODO: will implement with db later on.
      label: "Total records",
    },
    {
      value: "10",
      label: "Collection categories",
    },
    {
      value: "1881",
      label: "Earliest documented issue",
    },
    {
      value: "22",
      label: "Metadata fields per record",
    },
  ];

  return (
    <section className="bg-[var(--color-brand-secondary)] py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Left content */}
        <div className="text-[var(--color-brand-surface)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[var(--color-brand-accent)]" />
            <p className="font-[var(--font-meta)] text-xs uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">
              About The Archive
            </p>
          </div>

          <h2 className="mb-8 max-w-xl font-[var(--font-heading)] text-4xl leading-tight lg:text-5xl">
            Nepal&apos;s postal history,
            <br />
            documented in one place
          </h2>

          <div className="max-w-xl space-y-8 font-[var(--font-body)] text-base leading-8 text-white/65">
            <p>
              The Nepal Philatelic Archive is a structured, searchable reference
              database documenting Nepalese postal materials from 1881 to the
              present. Each record is built around a consistent metadata system
              accommodating everything from a single known field to thirty or
              more documented attributes.
            </p>

            <p>
              The archive serves philatelists, historians, researchers, and
              institutions. Records span postage stamps, envelopes, postcards,
              revenue stamps, court-fee stamps, postal money orders,
              commemoratives, service stamps, and other archival materials.
            </p>
          </div>

          <a
            href="/about"
            className="mt-14 inline-block font-[var(--font-meta)] text-sm text-[var(--color-brand-accent)] transition hover:translate-x-1"
          >
            Read the full project history →
          </a>
        </div>

        {/* Right cards */}
        <div className="grid gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[var(--radius-2xl)]
                border border-white/10
                bg-white/[0.02]
                p-8 backdrop-blur-sm"
              >
                <h3 className="font-[var(--font-heading)] text-5xl text-white">
                  {item.value}
                </h3>

                <p className="mt-2 font-[var(--font-body)] text-sm text-white/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-[var(--radius-2xl)]
            border border-white/10
            bg-white/[0.02]
            p-8"
          >
            <h3 className="font-[var(--font-heading)] text-5xl text-white">
              BS 1938 – present
            </h3>

            <p className="mt-2 font-[var(--font-body)] text-sm text-white/50">
              Date range covered in Bikram Sambat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
