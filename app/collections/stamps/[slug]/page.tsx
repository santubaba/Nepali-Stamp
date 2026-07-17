import stamps from "../mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import BreadCrumb from "@/app/breadcrumbs/page";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StampDetail({ params }: PageProps) {
  const { slug } = await params;

  const stamp = stamps.find((stamp) => stamp.slug === slug);
  if (!stamp) {
    notFound();
  }
  console.log(stamp);
  return (
    <div>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex items-center gap-20">
        <div className="flex items-center bg-white h-120 w-100">
          <Image src={stamp?.img} alt={stamp?.title} width={400} height={350} />
        </div>

        <div className="inline-flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-brand-accent" />
            <h2 className="text-brand-accent">Stamp Record</h2>
          </div>
          <div>
            <h1 className="text-[35px] font-heading">{stamp?.title}</h1>
          </div>
          <div className="flex gap-10">
            <div className="p-2 border rounded border-brand-border bg-brand-border text-brand-secondary">{stamp?.country}</div>
            <div>{stamp?.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
