import BreadCrumb from "../breadcrumbs/page";
import {
  FiBook,
  FiHome,
  FiLayers,
  FiRefreshCw,
  FiUsers,
  FiAward,
  FiGlobe,
  FiCamera,
  FiList,
  FiGrid,
  FiBookOpen,
} from "react-icons/fi";

import { HiOutlineOfficeBuilding } from "react-icons/hi";

export default function AboutPage() {
  const timeline = [
    {
      year: "2006",
      sub: "Kathmandu",
      milestone: true,
      icon: <FiBook />,
      iconLabel: "The accidental discovery",
      title: "50 stamps hidden in a second-hand book",
      text: "As a student in Kathmandu, Santosh spent his free time in second-hand bookshops, searching for hidden literary gems. His real passion then was collecting old Nepalese coins and banknotes. One day, buying a stack of used books, he found something unexpected tucked deep inside: a small collection of about 50 stamps, unknown to the seller. That accidental discovery changed everything.",
    },
    {
      year: "2006",
      sub: "Sundhara, KTM",
      icon: <HiOutlineOfficeBuilding />,
      iconLabel: "First steps",
      title: "The General Post Office and a guiding voice",
      text: "With no internet access and no philatelic knowledge, Santosh walked to the General Post Office in Sundhara — the most logical place he could think of. Outside, a street vendor selling envelopes noticed his curiosity. She showed him souvenir collections priced at hundreds to thousands of rupees, which felt impossible on a student's allowance. But her real gift was the advice: go inside to the counter, where mint stamps are sold at affordable prices. That moment redirected his path entirely.",
      quote:
        "\"Those souvenir collections aren't official from the post office. If you want official stamps, go inside to the counter. You'll find mint stamps at affordable prices there, perfect for starting your own collection.\"",
    },
    {
      year: "2006–2014",
      sub: "Building slowly",
      icon: <FiLayers />,
      iconLabel: "The collecting years",
      title: "Post office visits, a growing pile, and a first realization",
      text: "For several years, visiting the post office became a routine — carefully picking out new stamps that fit a small budget and enjoying adding each piece to a growing pile. The collection grew in number, though it wasn't organized. Then, as internet access gradually became easier in Nepal, a new world opened up. Researching international stamp websites, Santosh began to see a sharp difference between casually collecting stamps and truly practicing philately.",
    },
    {
      year: "2014–2020",
      sub: "Turning point",
      icon: <FiRefreshCw />,
      iconLabel: "Unlearning and rebuilding",
      title: "From hoarding to genuine philately",
      text: "The deeper the research went, the clearer it became: he wasn't really collecting at all — he was hoarding stamps without proper care. This realization became a turning point. He began learning how to properly handle stamps, why condition matters, how to identify varieties, and how to organize a collection carefully. It was a process of unlearning everything and then patiently, meticulously relearning it all. By 2020, the collection was no longer a jumbled pile but a properly sorted, well-kept archive.",
    },
    {
      year: "2020",
      sub: "COVID period",
      icon: <FiUsers />,
      iconLabel: "Finding the community",
      title: "Discovering the Nepal Philatelic Society",
      text: "During the quiet time of the COVID pandemic, with more time at home and deeper online research, Santosh came across the Nepal Philatelic Society. Learning about its location, its members, and the community it represented felt like finding a missing piece of a puzzle. He joined their Facebook group and spent weeks quietly observing — scrolling through posts, absorbing the knowledge shared by dedicated philatelists who treated stamps not as casual collectibles but as carefully studied and preserved pieces of history.",
    },
    {
      year: "2020–2025",
      sub: "Learning",
      icon: <FiBook />,
      iconLabel: "Community and growth",
      title: "From collector to philatelist",
      text: "After months of quiet observation, he reached out and attended meetings in person. Every conversation with an experienced member, every gathering with seasoned philatelists, became a new lesson. The Society's traditions, shared wisdom, and depth of knowledge showed him how vast and complex the world of Nepalese philately truly was — not discouraging, but inspiring. His own carefully sorted collection, which he had been so proud of, was revealed as just the first step.",
    },
    {
      year: "2025",
      sub: "Milestone",
      milestone: true,
      icon: <FiAward />,
      iconLabel: "Formal membership",
      title: "Joining the Nepal Philatelic Society",
      text: "In 2025, the journey came full circle. Santosh became a formal member of the Nepal Philatelic Society — the community that had first shown him what it truly meant to be a philatelist. The membership marked the transition from a self-taught enthusiast to a recognized member of Nepal's philatelic community, where his love for stamps found an even deeper meaning.",
    },
    {
      year: "2026",
      sub: "Now",
      milestone: true,
      icon: <FiGlobe />,
      iconLabel: "Going digital",
      title: "The archive opens to the public",
      text: "With eighteen years of collecting, research, and community knowledge behind it, the archive goes public — giving anyone in Nepal and around the world access to a structured, searchable record of Nepal's postal history. What started as 50 stamps in a book is now 1,400 documented records across ten collections, with new material added as it is catalogued.",
    },
  ];

  return (
    <main className="min-h-screen bg-brand-secondary text-brand-text font-body">
      {/* Breadcrumb */}
      <div className="relative flex items-center top-6 left-6 md:top-20 md:left-20 w-fit text-brand-bg">
        <BreadCrumb className="text-brand-bg [&_a]:text-brand-bg/60 [&_a:hover]:text-brand-bg" />
      </div>

      {/* Page container */}
      <section className="px-6 py-10 md:px-20 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-5 mt-6 md:mt-15 lg:max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-brand-accent" />
              <p className="text-xs tracking-widest uppercase text-brand-accent md:text-sm font-meta">
                A COLLECTOR’S JOURNEY
              </p>
            </div>

            <h1 className="mb-4 text-3xl leading-tight font-heading md:text-5xl text-brand-bg">
              From 50 stamps found in a book to a national philatelic archive
            </h1>

            <p className="max-w-xl text-base leading-7 text-brand-bg/60 md:text-lg">
              This archive is the product of eighteen years of curiosity,
              patience, and a love for the tiny rectangles of history that
              Nepal’s postal system produced. What began by accident — a small
              collection hidden inside a second-hand book — became a lifelong
              pursuit and, eventually, this digital record.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="w-full lg:w-[480px] p-6 md:p-8 border bg-[#f5efeb0f] border-brand-border rounded-2xl">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 text-xl text-white rounded-full md:w-24 md:h-24 bg-brand-primary md:text-2xl font-heading">
                SG
              </div>

              <h2 className="mt-4 text-xl font-heading md:text-2xl text-brand-bg">
                Santosh Giri
              </h2>

              <p className="mt-1 text-sm text-brand-bg">
                Collector and founder · Nepal Philatelic Society member
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-brand-bg/60" />

            {/* Stats */}
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-brand-bg/60">Collection started</span>
                <span className="text-brand-bg">2006</span>
              </div>

              <div className="flex justify-between">
                <span className="text-brand-bg/60">Society membership</span>
                <span className="text-brand-bg">2025</span>
              </div>

              <div className="flex justify-between">
                <span className="text-brand-bg/60">Records in archive</span>
                <span className="text-brand-bg">1,400+</span>
              </div>

              <div className="flex justify-between">
                <span className="text-brand-bg/60">Contact</span>
                <span className="text-brand-bg">9898989898</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Container */}
      <section className="flex flex-col items-center px-6 py-8 text-center bg-brand-primary md:px-20 md:py-10">
        <div className="max-w-5xl text-xl leading-relaxed font-heading text-brand-bg md:text-3xl">
          &quot;Each tiny rectangle was a miniature window to another world — a
          burst of color, a snippet of history, a glimpse into a faraway land or
          a time long past.&quot;
        </div>

        <div className="mt-4 text-sm text-brand-bg/60 md:text-base">
          — Santosh Giri
        </div>
      </section>

      {/* Timeline */}
      <div className="px-6 py-10 border-t border-brand-border bg-brand-bg md:px-20 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="text-2xl font-bold font-heading text-brand-text md:text-3xl mb-2">
            The journey, year by year
          </div>

          <div className="text-sm md:text-base text-brand-muted">
            From accidental discovery to a structured national archive
          </div>
        </div>

        <div className="flex flex-col">
          {timeline.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              className="grid grid-cols-[70px_16px_1fr] md:grid-cols-[110px_24px_1fr] gap-x-4 md:gap-x-8 pb-10"
            >
              {/* Year */}
              <div className="pt-1">
                <div className="text-lg md:text-[22px] font-heading text-brand-primary">
                  {item.year}
                </div>

                <div className="text-xs md:text-sm text-brand-muted">
                  {item.sub}
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                rounded-full border-2 border-brand-bg mt-1
                ${
                  item.milestone
                    ? "w-4 h-4 md:w-5 md:h-5 bg-brand-primary"
                    : "w-2.5 h-2.5 md:w-3 md:h-3 bg-brand-accent"
                }
              `}
                />

                {index !== timeline.length - 1 && (
                  <div className="flex-1 w-px bg-brand-border" />
                )}
              </div>

              {/* Content */}
              <div className="pl-3 md:pl-6">
                {/* Label */}
                <div className="flex items-center gap-2 mb-2 text-[11px] md:text-sm font-meta uppercase tracking-[0.18em] text-brand-accent">
                  {item.icon}
                  {item.iconLabel}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl md:text-2xl font-heading text-brand-text">
                  {item.title}
                </h3>

                {/* Body */}
                <p className="text-base leading-7 md:text-lg md:leading-8 text-brand-muted">
                  {item.text}
                </p>

                {item.quote && (
                  <div className="p-4 md:p-5 mt-5 border-l-4 rounded-r-lg border-brand-accent bg-brand-surface">
                    <p className="text-sm md:text-base italic leading-7 text-brand-secondary">
                      {item.quote}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Band */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-brand-border bg-brand-secondary">
        <div className="flex flex-col items-center justify-center px-6 py-8 text-center border-r border-brand-bg/10">
          <div className="text-3xl font-heading text-brand-bg">18 years</div>
          <div className="mt-2 text-sm uppercase tracking-wider font-meta text-brand-bg/40">
            Active collecting
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-8 text-center border-brand-bg/10 md:border-r">
          <div className="text-3xl font-heading text-brand-bg">50 stamps</div>
          <div className="mt-2 text-sm uppercase tracking-wider font-meta text-brand-bg/40">
            Where it all started
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-8 text-center border-t border-r border-brand-bg/10 md:border-t-0 md:border-r">
          <div className="text-3xl font-heading text-brand-bg">1,400+</div>
          <div className="mt-2 text-sm uppercase tracking-wider font-meta text-brand-bg/40">
            Records documented
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-8 text-center border-t border-brand-bg/10 md:border-t-0">
          <div className="text-3xl font-heading text-brand-bg">2025</div>
          <div className="mt-2 text-sm uppercase tracking-wider font-meta text-brand-bg/40">
            NPS membership year
          </div>
        </div>
      </div>

      {/* Nepal Philatelic Society */}
      <section className="px-6 py-12 md:px-20 md:py-16 bg-brand-bg">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-heading text-brand-text">
            The Nepal Philatelic Society
          </h2>

          <p className="mt-2 text-sm md:text-base text-brand-muted">
            The community at the heart of this archive
          </p>
        </div>

        {/* Society Block */}
        <div className="overflow-hidden bg-white border rounded-2xl border-brand-border grid grid-cols-1 md:grid-cols-2 min-h-fit md:h-[500px] w-full">
          {/* Left */}
          <div className="p-6 md:p-15 border-b md:border-b-0 md:border-r border-brand-border bg-white">
            <h3 className="text-xl md:text-2xl font-heading text-brand-text font-semibold">
              A community built on shared knowledge
            </h3>

            <p className="mt-4 text-sm md:text-base leading-7 text-brand-secondary">
              The Nepal Philatelic Society brings together dedicated
              philatelists who treat stamps not as casual collectibles but as
              carefully studied and preserved pieces of history. Their
              collective knowledge — on printing varieties, provincial issues,
              postal routes, and historical context — has shaped how records in
              this archive are researched and documented.
            </p>

            <div className="inline-flex items-center px-4 py-2 mt-6 text-sm rounded-md bg-brand-primary text-brand-bg font-meta">
              Member since 2025
            </div>
          </div>

          {/* Right */}
          <div className="p-6 md:p-15 bg-brand-surface">
            <h3 className="text-xl md:text-2xl font-heading text-brand-text font-semibold">
              How the Society shaped this archive
            </h3>

            <p className="mt-4 text-sm md:text-base leading-7 text-brand-secondary">
              The discipline of proper philatelic practice — correct handling,
              condition assessment, variety identification, and systematic
              cataloguing — came directly from the Society's community. Without
              that knowledge, this archive would be a pile of scanned stamps
              rather than a structured reference system.
            </p>

            <p className="mt-5 text-sm md:text-base leading-7 text-brand-secondary">
              The archive is offered as a contribution to the broader community
              of Nepalese philatelic research — a public resource built on the
              same spirit of sharing that first welcomed Santosh into the
              Society.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="px-6 py-12 md:px-20 md:py-16 bg-brand-bg border-t border-brand-border">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-heading text-brand-text">
            How records are documented
          </h2>

          <p className="mt-2 text-sm md:text-base text-brand-muted">
            The methodology behind every entry in the archive
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-6 transition-all bg-white border rounded-2xl border-brand-border hover:shadow-sm h-80">
            <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-brand-surface text-brand-primary">
              <FiCamera size={22} />
            </div>

            <h3 className="text-xl font-heading font-semibold text-brand-text">
              High-resolution imaging
            </h3>

            <p className="mt-3 text-sm leading-7 text-brand-secondary">
              Every item is scanned at archival resolution, capturing front,
              back, and where relevant full sheet views, so fine printing detail
              is visible online.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 transition-all bg-white border rounded-2xl border-brand-border hover:shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-brand-surface text-brand-primary">
              <FiList size={22} />
            </div>

            <h3 className="text-xl font-heading font-semibold text-brand-text">
              Structured metadata
            </h3>

            <p className="mt-3 text-sm leading-7 text-brand-secondary">
              Each record is catalogued against a shared field system — size,
              paper, printer, perforation, denominations, and more — enabling
              consistent comparison across the archive.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 transition-all bg-white border rounded-2xl border-brand-border hover:shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-xl bg-brand-surface text-brand-primary">
              <FiBookOpen size={22} />
            </div>

            <h3 className="text-xl font-heading font-semibold text-brand-text">
              Cross-referenced research
            </h3>

            <p className="mt-3 text-sm leading-7 text-brand-secondary">
              Historical context is checked against postal archives, Stanley
              Gibbons, Scott catalogues, and Nepal Philatelic Society community
              knowledge. Sources are listed on each record.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
