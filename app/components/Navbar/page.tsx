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
      <nav className="relative z-30 flex items-center justify-between h-16 px-4 border-b md:h-20 md:px-6 lg:px-20 border-brand-border bg-brand-bg">
        {/* logo */}

        <Link href="/" className="flex items-center">
          <div className="flex items-center justify-center rounded w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/stamps/nepali-stamps-logo.webp"
              width={200}
              height={275}
              alt="Nepali Stamp Logo"
              className="w-full h-full object-contain"
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
            className={`h-20 flex items-center border-b-2 text-sm
              ${
                isActive("/")
                  ? "border-brand-primary text-brand-primary"
                  : "border-transparent text-brand-muted hover:text-brand-text"
              }`}
          >
            {text.navbar.home}
          </Link>

          {menus.map((menu) => (
            <div key={menu.key} className="relative h-20 group">
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
            className={`h-20 flex items-center border-b-2 text-sm mr-5
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

          <form
            onSubmit={handleSearch}
            className="
            hidden
            md:flex
            items-center
            flex-1
            max-w-[220px]
            md:max-w-[320px]
            lg:w-40
            xl:w-56
            h-10
            px-3
            bg-brand-surface
            border
            border-brand-border
            rounded-lg
            shrink
          "
          >
            <IconSearch size={16} className="text-brand-muted shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stamps..."
              className="flex-1 min-w-0 px-2 text-sm bg-transparent outline-none placeholder:text-brand-muted"
            />

            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                <IconX size={15} />
              </button>
            )}
          </form>

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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* mobile drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-brand-bg z-50 overflow-y-auto transition-transform duration-300 lg:hidden
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
          <form
            onSubmit={handleSearch}
            className="flex items-center px-3 border rounded-lg h-11 bg-brand-surface border-brand-border"
          >
            <IconSearch size={16} className="text-brand-muted" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stamps..."
              className="flex-1 px-2 text-sm bg-transparent outline-none"
            />

            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                <IconX size={15} />
              </button>
            )}
          </form>
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
