import stamps from "../mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import BreadCrumb from "@/app/breadcrumbs/page";
import Link from "next/link";
import StampCard from "@/app/components/StampCard/StampCard";
import { ArrowLeft } from "lucide-react";
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
      <div className="mx-auto flex items-center gap-3 px-4 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8">
        <Link
          href="/collections/stamps"
          className="flex shrink-0 items-center justify-center rounded-full p-1 text-brand-secondary transition hover:bg-brand-surface hover:text-brand-primary"
          aria-label="Back to Stamps"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="min-w-0 flex-1 overflow-hidden">
          <BreadCrumb
            className="
              text-sm md:text-base
              whitespace-nowrap
              [&_a]:text-brand-text/60
              [&_a:hover]:text-brand-text
            "
          />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
          {/* Stamp Image */}
          <div className="flex w-full justify-center lg:w-[430px] lg:flex-shrink-0">
            <div className="flex w-full max-w-[430px] items-center justify-center rounded-xl border border-brand-border bg-white p-6">
              <Image
                src={stamp.img}
                alt={stamp.title}
                width={380}
                height={320}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Stamp Content */}
          <div className="flex w-full max-w-[520px] flex-col gap-5">
            {/* Header */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="h-px w-10 bg-brand-accent" />
                <h2 className="text-brand-accent">Stamp Record</h2>
              </div>

              <h1 className="font-heading text-[35px] leading-tight text-brand-text">
                {stamp.title}
              </h1>
            </div>

            {/* Stamp Meta */}
            <div className="flex flex-wrap gap-2">
              <div className="rounded border border-brand-border bg-brand-surface px-3 py-1 text-sm text-brand-secondary">
                {stamp.country}
              </div>

              <div className="rounded border border-brand-border bg-brand-surface px-3 py-1 text-sm text-brand-secondary">
                {stamp.year}
              </div>
            </div>

            {/* Stamp Info */}
            <section className="overflow-hidden rounded-md border border-brand-border bg-white">
              {stamp.details?.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[170px_1fr] border-b border-brand-border last:border-b-0"
                >
                  <div className="bg-brand-surface px-4 py-2 text-sm text-brand-secondary">
                    {label}
                  </div>

                  <div className="px-4 py-2 text-sm text-brand-text">
                    {value}
                  </div>
                </div>
              ))}
            </section>

            {/* Stamp Description */}
            <div>
              <h2 className="mb-2 text-xl font-heading text-brand-secondary">
                Historical Background
              </h2>

              <p className="leading-7 text-brand-secondary">
                {stamp.description}
              </p>
            </div>

            {/* Stamp Second Meta */}
            <div className="flex flex-wrap gap-2">
              {stamp.meta?.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded border border-brand-border bg-brand-surface px-3 py-1 text-xs text-brand-secondary"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Related Stamps Section */}
      {stamp.related && stamp.related.length > 0 && (
        <section className="mx-auto mt-16 border-t border-brand-border px-12 py-8">
          <h2 className="mb-6 font-heading text-xl font-semibold">
            Related Stamps
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {stamp.related.map((related) => (
              <div key={related.id} className="mx-auto w-full max-w-[220px]">
                <StampCard {...related} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
