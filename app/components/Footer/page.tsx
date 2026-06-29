import Link from "next/link";
import { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconArrowUp,
} from "@tabler/icons-react";
export default function Footer() {
  const [language, setLanguage] = useState<"EN" | "NP">("EN");
  return (
    <>
      <footer className="bg-brand-text font-meta px-6 md:px-12 lg:px-16 py-10">
        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-sm" />

              <Link
                href="/"
                className="text-brand-bg text-lg font-semibold font-body"
              >
                Nepali Stamp
              </Link>
            </div>

            <p className="text-brand-bg/75 leading-relaxed">
              A complete digital archive of Nepal's postal history from 1881 to
              the present day.
            </p>

            {/* Language */}
            <div className="inline-flex w-fit border border-brand-bg rounded overflow-hidden h-9">
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 text-sm transition-colors ${
                  language === "EN"
                    ? "bg-[#2F2E2E] text-brand-bg"
                    : "text-brand-bg/80"
                }`}
              >
                EN
              </button>

              <div className="w-px h-4 bg-brand-border/50 self-center" />

              <button
                onClick={() => setLanguage("NP")}
                className={`px-3 text-sm transition-colors ${
                  language === "NP"
                    ? "bg-[#2F2E2E] text-brand-bg"
                    : "text-brand-bg/80"
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-brand-bg/30 my-8" />

          {/* Navigation */}
          <div className="grid grid-cols-2 border-b border-brand-bg/20">
            {/* Collections */}
            <div className="p-6 border-r border-b border-brand-bg/20">
              <h3 className="text-brand-accent text-sm font-semibold uppercase mb-5">
                Collections
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75">
                <Link href="/collections/stamps">Stamps</Link>
                <Link href="/collections/envelopes">Envelopes</Link>
                <Link href="/collections/postcards">Postcards</Link>
                <Link href="/collections/commemoratives">Commemoratives</Link>
                <Link href="/collections/service-stamps">Service Stamps</Link>
              </div>
            </div>

            {/* Revenue */}
            <div className="p-6 border-b border-brand-bg/20">
              <h3 className="text-brand-accent text-sm font-semibold uppercase mb-5">
                Revenue
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75">
                <Link href="/revenue/income-revenue-stamps">
                  Income Revenue
                </Link>

                <Link href="/revenue/land-revenue-stamps">Land Revenue</Link>

                <Link href="/revenue/court-fee-stamps">Court-fee Stamps</Link>
              </div>
            </div>

            {/* Archives */}
            <div className="p-6 border-r border-brand-bg/20">
              <h3 className="text-brand-accent text-sm font-semibold uppercase mb-5">
                Archives
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75">
                <Link href="/archives/postal-money-order">
                  Postal Money Order
                </Link>

                <Link href="/archives/other">Other Archives</Link>
              </div>
            </div>

            {/* Archive */}
            <div className="p-6">
              <h3 className="text-brand-accent text-sm font-semibold uppercase mb-5">
                Archive
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75">
                <Link href="/about-project">About Project</Link>

                <Link href="/catalog">Browse Catalog</Link>

                <Link href="/search">Search Records</Link>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-brand-border/30 my-8" />

          {/* Follow */}
          <div className="flex flex-col gap-5">
            <h3 className="text-brand-accent text-sm font-semibold uppercase">
              FOLLOW US
            </h3>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex items-center gap-2 text-brand-bg/75"
              >
                <div className="w-11 h-11 border border-brand-bg/30 rounded-md flex items-center justify-center">
                  <IconBrandFacebook size={22} />
                </div>
                Facebook
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-2 text-brand-bg/75"
              >
                <div className="w-11 h-11 border border-brand-bg/30 rounded-md flex items-center justify-center">
                  <IconBrandInstagram size={22} />
                </div>
                Instagram
              </Link>
            </div>
          </div>

          <div className="w-full h-px bg-brand-bg/15 my-8" />

          {/* Bottom */}
          <div className="flex flex-col gap-4 text-sm text-brand-bg/40">
            <span>© 2026 Nepal Stamp. All rights reserved.</span>

            <div className="flex gap-3 flex-wrap">
              <Link href="/privacy-policy">Privacy Policy</Link>

              <span>|</span>

              <Link href="/terms">Terms of Use</Link>

              <span>|</span>

              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex flex-col gap-10">
          {/* Top */}
          <div className="grid grid-cols-[1.5fr_3fr_1fr] gap-10">
            {/* Left */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2 text-lg font-semibold font-body">
                <div className="w-10 h-10 bg-brand-primary" />

                <Link href="/" className="text-brand-bg">
                  Nepali Stamp
                </Link>
              </div>

              <p className="text-brand-bg/75 leading-relaxed">
                A complete digital archive of Nepal's postal history — from the
                first 1881 issue to the present day.
              </p>

              <div className="w-full h-px bg-brand-bg/15" />
              <div className="inline-flex w-fit border border-brand-bg rounded overflow-hidden h-9">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-3 ${
                    language === "EN"
                      ? "bg-[#2F2E2E] text-brand-bg"
                      : "text-brand-bg/80"
                  }`}
                >
                  EN
                </button>

                <div className="w-px h-4 bg-brand-border/50 self-center" />

                <button
                  onClick={() => setLanguage("NP")}
                  className={`px-3 ${
                    language === "NP"
                      ? "bg-[#2F2E2E] text-brand-bg"
                      : "text-brand-bg/80"
                  }`}
                >
                  नेपाली
                </button>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="grid grid-cols-3 gap-10">
              {/* Collections */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-brand-accent text-sm font-semibold">
                    Collections
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75">
                  <Link href="/collections/stamps">Stamps</Link>
                  <Link href="/collections/envelopes">Envelopes</Link>
                  <Link href="/collections/postcards">Postcards</Link>
                  <Link href="/collections/commemoratives">Commemoratives</Link>
                  <Link href="/collections/service-stamps">Service Stamps</Link>
                </div>
              </div>

              {/* Revenue */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-brand-accent text-sm font-semibold">
                    Revenue
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75">
                  <Link href="/revenue/income-revenue-stamps">
                    Income Revenue Stamps
                  </Link>

                  <Link href="/revenue/land-revenue-stamps">
                    Land Revenue Stamps
                  </Link>

                  <Link href="/revenue/court-fee-stamps">Court-fee Stamps</Link>
                </div>
              </div>

              {/* Archives */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-brand-accent text-sm font-semibold">
                    Archives
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75">
                  <Link href="/archives/postal-money-order">
                    Postal Money Order
                  </Link>

                  <Link href="/archives/other">Other Archives</Link>
                </div>
              </div>
            </div>

            {/* Right Social */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-brand-accent" />
                <h3 className="text-brand-accent text-sm font-semibold uppercase">
                  FOLLOW US
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-brand-bg/75">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <div className="w-11 h-11 border border-brand-bg rounded-md flex items-center justify-center">
                    <IconBrandFacebook size={30} />
                  </div>

                  <span>Facebook</span>
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-3"
                >
                  <div className="w-11 h-11 border border-brand-bg rounded-md flex items-center justify-center">
                    <IconBrandInstagram size={30} />
                  </div>

                  <span>Instagram</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-brand-bg/15" />

          {/* Bottom */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm text-brand-bg/40">
              <span>© 2026 Nepal Stamp. All rights reserved.</span>

              <span>|</span>

              <Link href="/privacy-policy">Privacy Policy</Link>

              <span>|</span>

              <Link href="/contact">Contact</Link>
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="w-44 h-14 border border-brand-bg/30 rounded-xl text-brand-bg/50 hover:text-brand-bg transition-colors flex items-center justify-center gap-2"
            >
              <IconArrowUp size={16} />
              Back To Top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
