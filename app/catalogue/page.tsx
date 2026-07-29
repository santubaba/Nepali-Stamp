"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BreadCrumb from "@/app/breadcrumbs/page";
import { catalogues } from "./data";

const viewOptions = [
  { value: "Grid", label: "Grid View", Icon: LayoutGrid },
  { value: "List", label: "List View", Icon: List },
] as const;

const selectItemClass = cn(
  "cursor-pointer rounded-sm py-3 transition-colors",
  "data-[highlighted]:bg-brand-primary/10",
  "data-[state=checked]:bg-brand-primary data-[state=checked]:text-white",
);

export default function CollectionsPage() {
  const [view, setView] = useState<"Grid" | "List">("Grid");
  return (
    <main className="min-h-screen bg-brand-bg">
      <section className="border-b border-brand-border">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
          <BreadCrumb className="mb-6" />

          <div className="mb-4 flex items-center gap-3 uppercase tracking-[0.18em] text-[11px] font-medium text-brand-accent">
            <span className="w-6 h-px bg-brand-accent" />
            Catalogue
          </div>

          <h1 className="text-3xl font-medium font-heading text-brand-text sm:text-4xl lg:text-5xl">
            Browse the Complete Catalogue
          </h1>

          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
              Select a collection to browse its records — stamps, envelopes,
              revenue documents, and more.
            </p>

            <Select
              value={view}
              onValueChange={(value) => setView(value as "Grid" | "List")}
            >
              <SelectTrigger
                className={cn(
                  "w-44 h-11 rounded-lg border border-brand-border bg-brand-surface",
                  "text-brand-secondary font-medium shadow-sm transition-colors",
                  "hover:border-brand-primary/30 hover:bg-white",
                  "focus:ring-2 focus:ring-brand-primary/20",
                  "data-[state=open]:border-brand-primary",
                )}
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="rounded-lg border border-brand-border bg-white shadow-xl overflow-hidden">
                {viewOptions.map(({ value, label, Icon }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className={selectItemClass}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-10">
        <div
          className={
            view === "Grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {catalogues.map((catalogue) => {
            const Icon = catalogue.icon;

            return (
              <Link
                key={catalogue.slug}
                href={catalogue.href}
                className={`overflow-hidden transition-all duration-300 bg-white border rounded-xl border-brand-border group hover:border-brand-primary/40 hover:shadow-lg ${
                  view === "Grid"
                    ? "hover:-translate-y-1"
                    : "flex items-center p-5"
                }`}
              >
                {view === "Grid" ? (
                  <>
                    <div className="relative flex items-center justify-center h-32 border-b border-brand-border bg-brand-surface sm:h-36">
                      <Icon
                        size={42}
                        className="transition-transform duration-300 text-brand-primary/20 group-hover:scale-110"
                      />

                      <span className="absolute right-3 top-3 rounded-md border border-brand-border bg-brand-bg/90 px-2 py-1 text-[11px] text-brand-muted backdrop-blur">
                        {catalogue.count} records
                      </span>
                    </div>

                    <div className="flex h-[190px] flex-col justify-between p-5">
                      <div>
                        <h2 className="text-xl font-heading text-brand-text">
                          {catalogue.title}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-brand-muted">
                          {catalogue.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <span className="flex items-center gap-1 text-sm font-medium transition-all text-brand-primary group-hover:gap-2">
                          Browse
                          <ArrowRight size={16} />
                        </span>

                        <span className="text-xs text-brand-muted">
                          {catalogue.era}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center flex-shrink-0 w-24 h-24 rounded-xl bg-brand-surface">
                      <Icon
                        size={40}
                        className="transition-transform duration-300 text-brand-primary/30 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 px-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-heading text-brand-text">
                            {catalogue.title}
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-brand-muted">
                            {catalogue.description}
                          </p>
                        </div>

                        <span className="text-sm text-brand-muted whitespace-nowrap">
                          {catalogue.count} records
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <span className="text-sm text-brand-muted">
                          {catalogue.era}
                        </span>

                        <span className="flex items-center gap-1 text-sm font-medium transition-all text-brand-primary group-hover:gap-2">
                          Browse
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
