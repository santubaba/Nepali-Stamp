import Image from "next/image";
import Link from "next/link";
import { Search, SquareMenu } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-brand-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-brand-accent">
                Nepal Philatelic Archive
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-heading text-5xl leading-none text-brand-text md:text-6xl lg:text-7xl">
                Preserving
                <br />
                the philatelic
                <br />
                history of the
                <br />
                <span className="text-brand-primary">Himalayas</span>
              </h1>

              <p className="max-w-lg text-lg leading-9 text-brand-muted">
                A complete digital archive of Nepal's postal history from 1881 —
                stamps, envelopes, revenue documents, and more.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
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
          {/* Right Side */}
          <div className="relative">
            <div className="relative h-[430px] overflow-hidden rounded-3xl border border-brand-border bg-brand-surface sm:h-[540px] md:h-[620px] lg:h-[680px]">
              {/* Top Left */}
              <div className="absolute left-2 top-8 rotate-[-15deg]">
                <Image
                  src="/stamps/1 Ana.jpg"
                  alt=""
                  width={140}
                  height={180}
                  className="w-28 md:w-36 lg:w-40 drop-shadow-xl"
                />
              </div>

              {/* Top Middle */}
              <div className="absolute left-[34%] top-3 rotate-[5deg] z-20">
                <Image
                  src="/stamps/2 Ana.jpg"
                  alt=""
                  width={280}
                  height={200}
                  className="w-40 md:w-56 lg:w-64 drop-shadow-2xl"
                />
              </div>

              {/* Top Right */}
              <div className="absolute right-3 top-10 rotate-[14deg]">
                <Image
                  src="/stamps/2p.jpg"
                  alt=""
                  width={130}
                  height={170}
                  className="w-28 md:w-36 lg:w-40 drop-shadow-lg"
                />
              </div>

              {/* Small Left */}
              <div className="absolute left-10 top-[34%] rotate-[8deg]">
                <Image
                  src="/stamps/4 Ana.jpg"
                  alt=""
                  width={100}
                  height={130}
                  className="w-24 md:w-28 lg:w-32 drop-shadow-md"
                />
              </div>

              {/* Large Center */}
              <div className="absolute left-1/2 top-[30%] z-30 -translate-x-1/2 rotate-[2deg]">
                <Image
                  src="/stamps/4p.jpg"
                  alt=""
                  width={340}
                  height={230}
                  className="w-56 md:w-72 lg:w-80 drop-shadow-2xl"
                />
              </div>

              {/* Mid Left */}
              <div className="absolute left-24 bottom-28 rotate-[-7deg]">
                <Image
                  src="/stamps/8p.jpg"
                  alt=""
                  width={130}
                  height={170}
                  className="w-28 md:w-36 lg:w-40 drop-shadow-lg"
                />
              </div>

              {/* Mid Right */}
              <div className="absolute right-8 top-[45%] rotate-[12deg]">
                <Image
                  src="/stamps/16p.jpg"
                  alt=""
                  width={140}
                  height={180}
                  className="w-32 md:w-40 lg:w-44 drop-shadow-xl"
                />
              </div>

              {/* Bottom Left */}
              <div className="absolute left-50 bottom-8 rotate-[-12deg]">
                <Image
                  src="/stamps/24p.jpg"
                  alt=""
                  width={110}
                  height={140}
                  className="w-24 md:w-32 lg:w-36 drop-shadow-md"
                />
              </div>

              {/* Bottom Center */}
              <div className="absolute left-[42%] bottom-4 rotate-[6deg]">
                <Image
                  src="/stamps/32p.jpg"
                  alt=""
                  width={120}
                  height={150}
                  className="w-24 md:w-32 lg:w-36 drop-shadow-lg"
                />
              </div>

              {/* Bottom Right */}
              <div className="absolute right-2 bottom-6 rotate-[15deg]">
                <Image
                  src="/stamps/Envelope.png"
                  alt=""
                  width={170}
                  height={120}
                  className="w-28 md:w-40 lg:w-44 drop-shadow-lg"
                />
              </div>

              {/* Extra Small Top */}
              <div className="absolute left-[65%] top-[18%] rotate-[-18deg]">
                <Image
                  src="/stamps/first.jpg"
                  alt=""
                  width={90}
                  height={120}
                  className="w-20 md:w-24 lg:w-28 drop-shadow"
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
