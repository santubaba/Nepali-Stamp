"use client";

import {
  IconChevronDown,
  IconMenu2,
  IconSearch,
  IconX,
  IconRectangle,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { LanguageContext } from "@/app/context/LanguageContext";
export default function Navbar() {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    throw new Error("LanguageContext missing");
  }

  const { language, setLanguage } = languageContext;
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // mobile accordion only
  const [openDrawerMenu, setOpenDrawerMenu] = useState<string | null>(null);

  const toggleDrawerMenu = (key: string) => {
    setOpenDrawerMenu((prev) => (prev === key ? null : key));
  };

  const isActive = (href: string) => pathname === href;

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDrawerMenu(null);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();

    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const ctx = useContext(LanguageContext);

  if (!ctx) throw new Error("Missing provider");

  const { text } = ctx;
  const menus = [
    {
      key: "stampsFdc",
      title: text.navbar.stamps,
      path: "/stamps",

      items: [
        {
          label: text.stamps.stampsFdc,
          href: "/stamps/stamps-fdc",
        },
        {
          label: text.stamps.serviceStamps,
          href: "/stamps/service-stamps",
        },
        {
          label: text.stamps.commemoratives,
          href: "/stamps/commemoratives-special-covers",
        },
      ],
    },

    {
      key: "postalStationery",
      title: text.navbar.postalStationery,
      path: "/postal-stationery",

      items: [
        {
          label: text.postalStationery.envelopes,
          href: "/postal-stationery/envelopes",
        },
        {
          label: text.postalStationery.postcards,
          href: "/postal-stationery/postcards",
        },
        {
          label: text.postalStationery.aerogrammes,
          href: "/postal-stationery/aerogrammes",
        },
        {
          label: text.postalStationery.moneyOrder,
          href: "/postal-stationery/money-order",
        },
      ],
    },

    {
      key: "revenue",
      title: text.navbar.revenue,
      path: "/revenue",

      items: [
        {
          label: text.revenue.landlordStamps,
          href: "/revenue/landlord-stamps",
        },
        {
          label: text.revenue.courtFee,
          href: "/revenue/court-fee-stamps",
        },
        {
          label: text.revenue.incomeRevenue,
          href: "/revenue/income-revenue-stamps",
        },
      ],
    },

    {
      key: "otherArchive",
      title: text.navbar.otherArchive,
      path: "/other-archive",

      items: [
        {
          label: text.otherArchive.publishedBooks,
          href: "/other-archive/published-books-literature",
        },
        {
          label: text.otherArchive.cancellationMarks,
          href: "/other-archive/post-office-cancellation-marks",
        },
        {
          label: text.otherArchive.administrativeBulletins,
          href: "/other-archive/administrative-bulletins",
        },
        {
          label: text.otherArchive.franklin,
          href: "/other-archive/franklin",
        },
      ],
    },
  ];
  return (
    <>
      <nav className="relative z-[60] flex items-center justify-between h-16 px-4 border-b md:h-24 md:px-6 lg:px-15 border-brand-border bg-brand-bg">
        {/* logo */}

        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-16 h-16">
            <Image
              src="/stamps/Simplified Logo.svg"
              width={56}
              height={56}
              alt="Nepali Stamp Logo"
              className="object-contain"
              priority
            />
          </div>

          <span className="text-sm font-semibold md:text-base font-heading text-brand-text">
            Nepali Stamps
          </span>
        </Link>

        {/* desktop */}

        <div className="items-center justify-center flex-1 hidden gap-6 lg:flex xl:gap-8">
          <Link
            href="/"
            className={`h-24 flex items-center border-b-2 text-sm
              ${
                isActive("/")
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-brand-muted hover:text-brand-text"
              }`}
          >
            {text.navbar.home}
          </Link>

          {menus.map((menu) => (
            <div key={menu.key} className="relative h-24 group">
              <div
                className={`h-full flex items-center gap-1 border-b-2 cursor-default text-sm
                  ${
                    pathname.startsWith(menu.path)
                      ? "border-brand-primary text-brand-primary"
                      : "border-transparent text-brand-muted hover:text-brand-text"
                  }`}
              >
                {menu.title}

                <IconChevronDown
                  size={14}
                  className="transition-transform group-hover:rotate-180"
                />
              </div>

              <div className="absolute left-0 z-50 hidden pt-2 top-full group-hover:block min-w-52">
                <div className="p-1 border rounded-lg shadow-lg bg-brand-bg border-brand-border">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-sm
                        ${
                          pathname === item.href
                            ? "bg-brand-surface text-brand-primary font-medium"
                            : "text-brand-muted hover:bg-brand-surface hover:text-brand-primary"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/about"
            className={`h-24 flex items-center border-b-2 text-sm mr-5
              ${
                isActive("/about")
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-brand-muted hover:text-brand-text"
              }`}
          >
            {text.navbar.about}
          </Link>
        </div>

        {/* right section */}

        <div className="flex items-center gap-2 lg:gap-3">
          {/* desktop search */}

          <div className="hidden w-[220px] shrink md:block md:w-[320px] lg:w-48 xl:w-68
          ">
            <SearchBar />
          </div>

          {/* language */}

          <div className="flex overflow-hidden border rounded border-brand-border h-9">
            <button
              onClick={() => setLanguage("EN")}
              className={`px-3 text-sm
                ${
                  language === "EN"
                    ? "bg-brand-primary text-brand-bg"
                    : "text-brand-muted hover:text-brand-text transition-colors"
                }`}
            >
              EN
            </button>

            <div className="self-center w-px h-4 bg-brand-border" />

            <button
              onClick={() => setLanguage("NP")}
              className={`px-3 text-sm
                ${
                  language === "NP"
                    ? "bg-brand-primary text-brand-bg"
                    : "text-brand-muted hover:text-brand-text transition-colors"
                }`}
            >
              नेपाली
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <IconMenu2 size={20} />
          </button>
        </div>
      </nav>

      {/* mobile overlay */}

      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[70] bg-black/50 lg:hidden"
        />
      )}

      {/* mobile drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-brand-bg z-[80] overflow-y-auto transition-transform duration-300 lg:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-between h-16 p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded w-7 h-7 bg-brand-primary">
              <IconRectangle size={13} color="#F5EFEB" />
            </div>

            <span className="font-semibold font-heading text-brand-text">
              Nepali Stamps
            </span>
          </div>

          <button onClick={closeMenu}>
            <IconX size={18} />
          </button>
        </div>

        {/* mobile search */}

        <div className="p-5 border-b border-brand-border">
          <SearchBar/>
        </div>

        {/* body */}

        <div className="px-5 py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className={`block py-3 border-b border-brand-border
              ${
                pathname === "/"
                  ? "text-brand-primary font-medium"
                  : "text-brand-text hover:text-brand-primary"
              }`}
          >
            {text.navbar.home}
          </Link>

          {menus.map((menu) => (
            <div key={menu.key} className="border-b border-brand-border">
              <button
                aria-expanded={openDrawerMenu === menu.key}
                onClick={() => toggleDrawerMenu(menu.key)}
                className={`w-full flex justify-between items-center py-3
                    ${
                      pathname.startsWith(menu.path)
                        ? "text-brand-primary font-medium"
                        : "text-brand-text hover:text-brand-primary"
                    }`}
              >
                {menu.title}

                <IconChevronDown
                  size={16}
                  className={`transition-transform duration-300
                      ${openDrawerMenu === menu.key ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300
                    ${
                      openDrawerMenu === menu.key
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
              >
                <div className="pb-2 pl-4">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block py-2 text-sm
                            ${
                              pathname === item.href
                                ? "text-brand-primary font-small  "
                                : "text-brand-text hover:text-brand-primary"
                            }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/about"
            onClick={closeMenu}
            className={`block py-3
              ${
                pathname === "/about"
                  ? "text-brand-primary font-medium"
                  : "text-brand-text hover:text-brand-primary"
              }`}
          >
            {text.navbar.about}
          </Link>
        </div>
      </div>
    </>
  );
}
