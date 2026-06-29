"use client";

import {
  IconChevronDown,
  IconMenu2,
  IconSearch,
  IconX,
  IconRectangle,
} from "@tabler/icons-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [language, setLanguage] = useState<"EN" | "NP">("EN");

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

  const t = {
    home: {
      EN: "Home",
      NP: "गृहपृष्ठ",
    },

    collections: {
      EN: "Collections",
      NP: "सङ्ग्रहहरू",
    },

    revenue: {
      EN: "Revenue",
      NP: "राजस्व",
    },

    archive: {
      EN: "Archive",
      NP: "अभिलेख",
    },

    about: {
      EN: "About",
      NP: "बारेमा",
    },
  };

  const menus = [
    {
      key: "collections",
      title: t.collections[language],
      path: "/collections",

      items: [
        {
          label: {
            EN: "Stamps",
            NP: "टिकट",
          },
          href: "/collections/stamps",
        },

        {
          label: {
            EN: "Envelopes",
            NP: "खामहरू",
          },
          href: "/collections/envelopes",
        },

        {
          label: {
            EN: "Postcards",
            NP: "पोस्टकार्डहरू",
          },
          href: "/collections/postcards",
        },

        {
          label: {
            EN: "Commemoratives",
            NP: "स्मारकहरू",
          },
          href: "/collections/commemoratives",
        },

        {
          label: {
            EN: "Service Stamps",
            NP: "सेवा टिकटहरू",
          },
          href: "/collections/service-stamps",
        },
      ],
    },

    {
      key: "revenue",
      title: t.revenue[language],
      path: "/revenue",

      items: [
        {
          label: {
            EN: "Income Revenue Stamps",
            NP: "आय राजस्व टिकट",
          },

          href: "/revenue/income-revenue-stamps",
        },

        {
          label: {
            EN: "Land Revenue Stamps",
            NP: "भूमि राजस्व टिकट",
          },

          href: "/revenue/land-revenue-stamps",
        },

        {
          label: {
            EN: "Court-fee Stamps",
            NP: "अदालत शुल्क टिकट",
          },

          href: "/revenue/court-fee-stamps",
        },
      ],
    },

    {
      key: "archive",
      title: t.archive[language],
      path: "/archive",

      items: [
        {
          label: {
            EN: "Postal Money Order",
            NP: "हुलाक मनी अर्डर",
          },

          href: "/archive/postal-money-order",
        },

        {
          label: {
            EN: "Other Archives",
            NP: "अन्य अभिलेख",
          },

          href: "/archive/other-archives",
        },
      ],
    },
  ];

  return (
    <>
      <nav className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 lg:px-20 border-b border-brand-border bg-brand-bg relative z-30">
        {/* logo */}

        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-primary rounded flex items-center justify-center">
            <IconRectangle size={14} color="#F5EFEB" />
          </div>

          <span className="text-sm md:text-base font-semibold font-heading text-brand-text">
            Nepali Stamps
          </span>
        </Link>

        {/* desktop */}

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
          <Link
            href="/"
            className={`h-20 flex items-center border-b-2 text-sm
            ${
              isActive("/")
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            {t.home[language]}
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
                  className="group-hover:rotate-180 transition-transform"
                />
              </div>

              <div className="absolute top-full left-0 hidden group-hover:block pt-2 min-w-52 z-50">
                <div className="bg-brand-bg border border-brand-border rounded-lg shadow-lg p-1">
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
                      {item.label[language]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/about"
            className={`h-20 flex items-center border-b-2 text-sm
            ${
              isActive("/about")
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            {t.about[language]}
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
    lg:w-44
    xl:w-64
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
              className="flex-1 min-w-0 px-2 bg-transparent text-sm outline-none placeholder:text-brand-muted"
            />

            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                <IconX size={15} />
              </button>
            )}
          </form>

          {/* language */}

          <div className="flex border border-brand-border rounded overflow-hidden h-9">
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

            <div className="w-px h-4 bg-brand-border self-center" />

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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* mobile drawer */}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-brand-bg z-50 overflow-y-auto transition-transform duration-300 lg:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}

        <div className="flex justify-between items-center p-5 border-b border-brand-border h-16">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-primary rounded flex items-center justify-center">
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
            className="flex items-center h-11 px-3 bg-brand-surface border border-brand-border rounded-lg"
          >
            <IconSearch size={16} className="text-brand-muted" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stamps..."
              className="flex-1 px-2 bg-transparent outline-none text-sm"
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
            {t.home[language]}
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
                <div className="pl-4 pb-2">
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
                      {item.label[language]}
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
            {t.about[language]}
          </Link>
        </div>
      </div>
    </>
  );
}
