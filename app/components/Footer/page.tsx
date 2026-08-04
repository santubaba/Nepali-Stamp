"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconArrowUp,
} from "@tabler/icons-react";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
export default function Footer() {
  const { language, setLanguage, text } = useContext(LanguageContext)!;

  console.log("Footer Language", language);
  console.log("Footer render:", language, text.navbar.home);
  return (
    <>
      <footer className="px-6 py-10 bg-brand-text md:px-12 lg:px-16">
        {/* ================= MOBILE ================= */}
        <div className="flex flex-col md:hidden">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-20 h-20 shrink-0">
                <Image
                  src="/stamps/Simplified Logo.svg"
                  width={200}
                  height={275}
                  alt="Nepali Stamp Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <Link
                href="/"
                className="text-lg font-semibold text-brand-bg font-heading"
              >
                Nepali Stamp
              </Link>
            </div>

            <p className="leading-relaxed text-brand-bg/75 font-meta">
              A complete digital archive of Nepal's postal history from 1881 to
              the present day.
            </p>

            {/* Language */}
            <div className="inline-flex overflow-hidden border rounded w-fit border-brand-bg h-9">
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 text-sm font-body transition-colors ${
                  language === "EN"
                    ? "bg-[#2F2E2E] text-brand-bg"
                    : "text-brand-bg/80"
                }`}
              >
                EN
              </button>

              <div className="self-center w-px h-4 bg-brand-border/50" />

              <button
                onClick={() => setLanguage("NP")}
                className={`px-3 text-sm font-body transition-colors ${
                  language === "NP"
                    ? "bg-[#2F2E2E] text-brand-bg"
                    : "text-brand-bg/80"
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

          <div className="w-full h-px my-8 bg-brand-bg/30" />

          {/* Navigation */}
          <div className="grid grid-cols-2 border-b border-brand-bg/20">
            {/* Stamps & FDC */}
            <div className="px-3 py-6 border-b border-r border-brand-bg/20">
              <h3 className="mb-5 text-sm font-semibold uppercase text-brand-accent font-body">
                {text.navbar.stamps}
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75 font-body ">
                <Link href="/stamps/stamps-fdc">{text.stamps.stampsFdc}</Link>

                <Link href="/stamps/service-stamps">
                  {text.stamps.serviceStamps}
                </Link>

                <Link href="/stamps/commemoratives-special-covers">
                  {text.stamps.commemoratives}
                </Link>
              </div>
            </div>

            {/* Postal Stationery */}
            <div className="px-3 py-6 border-b border-brand-bg/20">
              <h3 className="mb-5 text-sm font-semibold uppercase text-brand-accent font-body">
                {text.navbar.postalStationery}
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75 font-body">
                <Link href="/postal-stationery/envelopes">
                  {text.postalStationery.envelopes}
                </Link>

                <Link href="/postal-stationery/postcards">
                  {text.postalStationery.postcards}
                </Link>

                <Link href="/postal-stationery/aerogrammes">
                  {text.postalStationery.aerogrammes}
                </Link>

                <Link href="/postal-stationery/money-order">
                  {text.postalStationery.moneyOrder}
                </Link>
              </div>
            </div>

            {/* Revenue */}
            <div className="px-3 py-6 border-r border-brand-bg/20">
              <h3 className="mb-5 text-sm font-semibold uppercase text-brand-accent font-body">
                {text.navbar.revenue}
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75 font-body">
                <Link href="/revenue/court-fee-stamps">
                  {text.revenue.courtFee}
                </Link>

                <Link href="/revenue/income-revenue-stamps">
                  {text.revenue.incomeRevenue}
                </Link>

                <Link href="/revenue/landlord-stamps">
                  {text.revenue.landlordStamps}
                </Link>
              </div>
            </div>

            {/* Other Archive */}
            <div className="px-3 py-6">
              <h3 className="mb-5 text-sm font-semibold uppercase text-brand-accent font-body">
                {text.navbar.otherArchive}
              </h3>

              <div className="flex flex-col gap-3 text-brand-bg/75 font-body">
                <Link href="/other-archive/published-books-literature">
                  {text.otherArchive.publishedBooks}
                </Link>

                <Link href="/other-archive/post-office-cancellation-marks">
                  {text.otherArchive.cancellationMarks}
                </Link>

                <Link href="/other-archive/administrative-bulletins">
                  {text.otherArchive.administrativeBulletins}
                </Link>

                <Link href="/other-archive/franklin">
                  {text.otherArchive.franklin}
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full h-px my-8 bg-brand-border/30" />

          {/* Follow */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase text-brand-accent font-body">
              FOLLOW US
            </h3>

            <div className="flex flex-wrap gap-4 font-body">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex items-center gap-2 text-brand-bg/75"
              >
                <div className="flex items-center justify-center border rounded-md w-11 h-11 border-brand-bg/30">
                  <IconBrandFacebook size={22} />
                </div>
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-2 text-brand-bg/75"
              >
                <div className="flex items-center justify-center border rounded-md w-11 h-11 border-brand-bg/30">
                  <IconBrandInstagram size={22} />
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full h-px my-8 bg-brand-bg/15" />

          {/* Bottom */}
          <div className="flex flex-col gap-4 text-sm text-brand-bg/40 font-body">
            <span>© 2026 Nepal Stamp. All rights reserved.</span>

            <div className="flex flex-wrap gap-3">
              <Link href="/privacy-policy">Privacy Policy</Link>

              <span>|</span>

              <Link href="/terms">Terms of Use</Link>

              <span>|</span>

              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="flex-col hidden gap-10 md:flex">
          {/* Top */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2.5fr_.8fr] lg:grid-cols-[1.5fr_3fr_1fr] gap-8 lg:gap-10">
            {/* Left */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3 text-lg font-semibold font-heading">
                <div className="flex items-center justify-center w-18 h-18 shrink-0">
                  <Image
                    src="/stamps/Simplified Logo Dark.svg"
                    width={200}
                    height={275}
                    alt="Nepali Stamp Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <Link href="/" className="text-brand-bg">
                  Nepali Stamp
                </Link>
              </div>

              <p className="leading-relaxed text-brand-bg/75 font-meta">
                A complete digital archive of Nepal's postal history — from the
                first 1881 issue to the present day.
              </p>

              <div className="w-full h-px bg-brand-bg/15" />

              <div className="inline-flex overflow-hidden border rounded w-fit border-brand-bg h-9">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-3 font-body ${
                    language === "EN"
                      ? "bg-[#2F2E2E] text-brand-bg"
                      : "text-brand-bg/80"
                  }`}
                >
                  EN
                </button>

                <div className="self-center w-px h-4 bg-brand-border/50" />

                <button
                  onClick={() => setLanguage("NP")}
                  className={`px-3 font-body ${
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
              {/* Stamps & FDCs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-sm font-semibold text-brand-accent font-body">
                    {text.navbar.stamps}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75 font-body">
                  <Link href="/stamps/stamps-fdc">{text.stamps.stampsFdc}</Link>
                  <Link href="/stamps/commemoratives-special-covers">
                    {text.stamps.commemoratives}
                  </Link>

                  <Link href="/stamps/service-stamps">
                    {text.stamps.serviceStamps}
                  </Link>
                </div>
              </div>

              {/* Revenue */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-sm font-semibold text-brand-accent font-body">
                    {text.navbar.revenue}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75 font-body">
                  <Link href="/revenue/landlord-stamps">
                    {text.revenue.landlordStamps}
                  </Link>

                  <Link href="/revenue/income-revenue-stamps">
                    {text.revenue.incomeRevenue}
                  </Link>

                  <Link href="/revenue/court-fee-stamps">
                    {text.revenue.courtFee}
                  </Link>
                </div>
              </div>

              {/* Postal Stationery */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-sm font-semibold text-brand-accent font-body">
                    {text.navbar.postalStationery}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75 font-body">
                  <Link href="/postal-stationery/envelopes">
                    {text.postalStationery.envelopes}
                  </Link>

                  <Link href="/postal-stationery/postcards">
                    {text.postalStationery.postcards}
                  </Link>

                  <Link href="/postal-stationery/aerogrammes">
                    {text.postalStationery.aerogrammes}
                  </Link>

                  <Link href="/postal-stationery/money-order">
                    {text.postalStationery.moneyOrder}
                  </Link>
                </div>
              </div>

              {/* Archives */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-brand-accent" />
                  <h3 className="text-sm font-semibold text-brand-accent font-body">
                    {text.navbar.otherArchive}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-brand-bg/75 font-body">
                  <Link href="/other-archive/published-books-literature">
                    {text.otherArchive.publishedBooks}
                  </Link>

                  <Link href="/other-archive/post-office-cancellation-marks">
                    {text.otherArchive.cancellationMarks}
                  </Link>

                  <Link href="/other-archive/administrative-bulletins">
                    {text.otherArchive.administrativeBulletins}
                  </Link>

                  <Link href="/other-archive/franklin">
                    {text.otherArchive.franklin}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Social */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-brand-accent" />
                <h3 className="text-sm font-semibold uppercase text-brand-accent font-body">
                  FOLLOW US
                </h3>
              </div>

              <div className="flex flex-col gap-3  text-brand-bg/75 font-body">
                <div className="flex flex-col gap-3 text-brand-bg/75">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex-start"
                  >
                    <IconBrandFacebook size={45} stroke={1.2}/>
                  </Link>

                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex-start"
                  >
                    <IconBrandInstagram size={45} stroke={1.2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-brand-bg/15" />

          {/* Bottom */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-brand-bg/40 font-body">
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
              className="flex items-center justify-center gap-2 transition-colors border w-44 h-14 border-brand-bg/30 rounded-xl text-brand-bg/50 hover:text-brand-bg font-body"
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
