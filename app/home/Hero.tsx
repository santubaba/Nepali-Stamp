import Image from "next/image";
import Link from "next/link";
import { Search, SquareMenu } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-brand-bg border-b border-brand-border">
      <div className="mx-auto max-w-[1285px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          {/* Left Side */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-8 bg-brand-accent" />
              <span className="uppercase tracking-[0.2em] text-brand-accent">
                Nepal Philatelic Archive
              </span>
            </div>

            {/* Heading + Description */}
            <div className="max-w-xl">
              <h1 className="font-heading text-5xl leading-[01.05] text-brand-text md:text-6xl lg:text-7xl">
                Preserving
                <br />
                the philatelic
                <br />
                history of the
                <br />
                <span className="text-brand-primary">Himalayas</span>
              </h1>

              <p className="mt-8 max-w-md text-lg leading-9 text-brand-muted">
                A complete digital archive of Nepal's postal history from 1881 —
                stamps, envelopes, revenue documents, and more.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-14 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/collections/stamps"
                className="flex items-center justify-center gap-3 rounded-lg bg-brand-primary px-8 py-4 font-medium text-white transition hover:opacity-90"
              >
                <Search size={20} />
                Explore Stamps
              </Link>

              <Link
                href="/catalogue"
                className="flex items-center justify-center gap-3 rounded-lg border border-brand-border bg-white px-8 py-4 font-medium text-brand-secondary transition hover:bg-brand-surface"
              >
                <SquareMenu size={20} />
                Browse Catalogue
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative lg:pt-16">
            <div
              className="relative h-[430px] overflow-hidden rounded-3xl border border-brand-border bg-brand-surface p-8 sm:h-[420px]
                md:h-[460px]
                lg:h-[500px] lg:p-10"
            >
              {/* Top Left */}
              <div className="absolute left-2 top-0 rotate-[-10deg]">
                <Image
                  src="/stamps/1 Ana.jpg"
                  alt=""
                  width={140}
                  height={180}
                  className="w-28 md:w-36 lg:w-40 drop-shadow-xl"
                />
              </div>

              {/* Top Middle */}
              <div className="absolute left-[25%] top-1 rotate-[5deg] z-20">
                <Image
                  src="/stamps/2 Ana.jpg"
                  alt=""
                  width={280}
                  height={200}
                  className="w-40 md:w-56 lg:w-64 drop-shadow-2xl"
                />
              </div>

              {/* Top Right */}
              <div className="absolute right-[-15] top-[-50] rotate-[30deg]">
                <Image
                  src="/stamps/2p.jpg"
                  alt=""
                  width={130}
                  height={170}
                  className="w-28 md:w-36 lg:w-50 drop-shadow-lg"
                />
              </div>

              {/* Small Left */}
              <div className="absolute left-2 top-[40%] rotate-[-20deg]">
                <Image
                  src="/stamps/4 Ana.jpg"
                  alt=""
                  width={100}
                  height={130}
                  className="w-24 md:w-28 lg:w-32 drop-shadow-md"
                />
              </div>

              {/* Large Center */}
              <div className="absolute left-1/2 top-[30%] z-30 -translate-x-1/2 rotate-[5deg]">
                <Image
                  src="/stamps/4p.jpg"
                  alt=""
                  width={340}
                  height={230}
                  className="w-56 md:w-72 lg:w-80 drop-shadow-2xl"
                />
              </div>

              {/* Mid Left */}
              <div className="absolute left-1 bottom-28 rotate-[12deg]">
                <Image
                  src="/stamps/8p.jpg"
                  alt=""
                  width={130}
                  height={170}
                  className="w-28 md:w-36 lg:w-40 drop-shadow-lg"
                />
              </div>

              {/* Mid Right */}
              <div className="absolute right-0 top-[40%] rotate-[-12deg]">
                <Image
                  src="/stamps/16p.jpg"
                  alt=""
                  width={140}
                  height={180}
                  className="w-32 md:w-40 lg:w-44 drop-shadow-xl"
                />
              </div>

              {/* Bottom Left */}
              <div className="absolute left-[-20] bottom-2 top-95 rotate-[95deg]">
                <Image
                  src="/stamps/24p.jpg"
                  alt=""
                  width={110}
                  height={140}
                  className="w-24 md:w-32 lg:w-36 drop-shadow-md"
                />
              </div>

              {/* Bottom Center */}
              <div className="absolute left-[30%] bottom-1 rotate-[6deg]">
                <Image
                  src="/stamps/32p.jpg"
                  alt=""
                  width={200}
                  height={120}
                  className="w-24 md:w-32 lg:w-50 drop-shadow-lg"
                />
              </div>

              {/* Bottom Right */}
              <div className="absolute right-1 bottom-2 rotate-[15deg]">
                <Image
                  src="/stamps/Envelope.png"
                  alt=""
                  width={170}
                  height={120}
                  className="w-28 md:w-40 lg:w-60 drop-shadow-lg"
                />
              </div>

              {/* Extra Small Top */}
              <div className="absolute left-[65%] top-[10%] rotate-[5deg]">
                <Image
                  src="/stamps/first.jpg"
                  alt=""
                  width={90}
                  height={120}
                  className="w-20 md:w-24 lg:w-40 drop-shadow"
                />
              </div>

              {/* Extra Small Bottom */}
              <div className="absolute right-[28%] bottom-[18%] rotate-[18deg]">
                <Image
                  src="/stamps/third.jpg"
                  alt=""
                  width={90}
                  height={120}
                  className="w-20 md:w-24 lg:w-28 drop-shadow"
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 z-50 rounded-2xl bg-white px-6 py-5 shadow-2xl">
                <h3 className="text-4xl font-bold text-brand-primary">
                  1,400+
                </h3>

                <p className="mt-1 text-sm font-medium text-brand-secondary">
                  Records Documented
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
