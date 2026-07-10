import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BreadCrumb from "@/app/breadcrumbs/page";
import { collections } from "./data";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <section className="border-b border-brand-border">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
          <BreadCrumb className="mb-6 " />
          <div className="mb-4 flex items-center gap-3 uppercase tracking-[0.18em] text-[11px] font-medium text-brand-accent">
            <span className="w-6 h-px bg-brand-accent" />
            Catalogue
          </div>

          <h1 className="text-3xl font-medium font-heading text-brand-text sm:text-4xl lg:text-5xl">
            Browse the Complete Catalogue
          </h1>

          <p className="max-w-2xl mt-4 text-sm leading-7 text-brand-muted sm:text-base">
            Select a collection to browse its records — stamps, envelopes,
            revenue documents, and more.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => {
            const Icon = collection.icon;

            return (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="overflow-hidden transition-all duration-300 bg-white border group rounded-xl border-brand-border hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg"
              >
                <div className="relative flex items-center justify-center h-32 border-b border-brand-border bg-brand-surface sm:h-36">
                  <Icon
                    size={42}
                    className="transition-transform duration-300 text-brand-primary/20 group-hover:scale-110"
                  />

                  <span className="absolute right-3 top-3 rounded-md border border-brand-border bg-brand-bg/90 px-2 py-1 text-[11px] text-brand-muted backdrop-blur">
                    {collection.count} records
                  </span>
                </div>

                <div className="flex h-[190px] flex-col justify-between p-5">
                  <div>
                    <h2 className="text-xl font-heading text-brand-text">
                      {collection.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                      {collection.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <span className="flex items-center gap-1 text-sm font-medium transition-all text-brand-primary group-hover:gap-2">
                      Browse
                      <ArrowRight size={16} />
                    </span>

                    <span className="text-xs text-brand-muted">
                      {collection.era}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
