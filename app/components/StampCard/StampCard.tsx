import Image from "next/image";

interface StampsProps {
  id:number,
  title: string;
  year: Date;
  country: string;
  metadata: string;
  img: string;
}

export default function StampCard(info: StampsProps) {
  return (
    <main className="m-2">
      <div className="p-3 transition-all bg-white border shadow-sm w-44 rounded-xl border-brand-border hover:-translate-y-1 hover:shadow-md">
        <Image
          src={info.img}
          alt={info.title}
          width={160}
          height={200}
          className="object-cover w-full h-auto border rounded-lg border-brand-border"
        />

        <div className="mt-3">
          <h2 className="text-base font-bold leading-tight font-heading text-brand-text">
            {info.title}
          </h2>

          <p className="mt-2 text-sm font-meta text-brand-muted">
            {info.country} • {info.year.getFullYear()}
          </p>

          <p className="mt-1 text-sm font-meta text-brand-secondary">
            {info.metadata}
          </p>
        </div>
      </div>
    </main>
  );
}
