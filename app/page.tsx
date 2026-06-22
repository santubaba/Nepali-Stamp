export default function Home() {
  return (
    <>
      <div className="bg-brand-bg text-brand-text min-h-screen p-10">
      <h1 className="text-brand-primary text-3xl font-heading">
        Tailwind test
      </h1>

      <div className="bg-brand-surface border border-brand-border p-4 mt-4 rounded-lg font-body">
        If you see colors, it works
      </div>

      <button className="bg-brand-accent text-black px-4 py-2 mt-4 rounded-md font-meta">
        Button
      </button>
    </div>
    </>
  );
}
