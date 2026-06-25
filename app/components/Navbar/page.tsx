"use client";

import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [language, setLanguage] = useState<"EN" | "NP">("EN");

  const pathName = usePathname();

  const isActive = (href: string) => pathName === href;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const homeText = {
    EN: "Home",
    NP: "गृहपृष्ठ",
  };

  const collectionText = {
    EN: "Collections",
    NP: "सङ्ग्रहहरू",
  };

  const revenueText = {
    EN: "Revenue",
    NP: "राजस्व",
  };

  const archiveText = {
    EN: "Archive",
    NP: "अभिलेख",
  };

  const aboutText = {
    EN: "About",
    NP: "बारेमा",
  };

  const collectionsDropdown = [
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
  ];

  const revenueDropdown = [
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
  ];

  const archiveDropdown = [
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
  ];

  /* prevent body scroll */

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  /* close menu when resizing */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-20 border-b border-brand-border">
        {/* Logo */}

        <div className="flex items-center gap-2 p-2 text-lg font-semibold font-heading">
          <div className="w-10 h-10 bg-brand-primary"></div>
          <Link href="/">Nepali Stamp</Link>
        </div>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-5 lg:gap-10">
          <Link
            href="/"
            className={`h-20 flex items-center border-b-2
            ${
              isActive("/")
                ? "text-brand-primary border-brand-primary"
                : "border-transparent"
            }`}
          >
            {homeText[language]}
          </Link>

          {[
            {
              title: collectionText[language],
              path: "/collections",
              data: collectionsDropdown,
            },
            {
              title: revenueText[language],
              path: "/revenue",
              data: revenueDropdown,
            },
            {
              title: archiveText[language],
              path: "/archive",
              data: archiveDropdown,
            },
          ].map((menu) => (
            <div key={menu.path} className="relative h-20 group">
              <Link
                href={menu.path}
                className={`h-full flex items-center gap-1 border-b-2
                ${
                  pathName.startsWith(menu.path)
                    ? "text-brand-primary border-brand-primary"
                    : "border-transparent"
                }`}
              >
                {menu.title}

                <IconChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </Link>

              <div className="absolute left-0 hidden pt-2 top-full group-hover:block">
                <div className="p-2 border rounded shadow min-w-44 bg-brand-bg border-brand-border">
                  {menu.data.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 rounded hover:text-brand-primary"
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
            className={`h-20 flex items-center border-b-2
            ${
              isActive("/about")
                ? "text-brand-primary border-brand-primary"
                : "border-transparent"
            }`}
          >
            {aboutText[language]}
          </Link>
        </div>

        {/* Right section */}

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded h-9">
            <button
              onClick={() => setLanguage("EN")}
              className={`p-2 h-9 ${
                language === "EN"
                  ? "bg-brand-primary text-brand-bg rounded-l"
                  : ""
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLanguage("NP")}
              className={`p-2 h-9 ${
                language === "NP"
                  ? "bg-brand-primary text-brand-bg rounded-r"
                  : ""
              }`}
            >
              नेपाली
            </button>
          </div>

          <button onClick={openMenu} className="md:hidden">
            <IconMenu2 />
          </button>
        </div>
      </nav>

      {/* overlay */}

      {isMenuOpen && (
        <div onClick={openMenu} className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* mobile sidebar */}

      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-brand-bg p-6 z-50 overflow-y-auto transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-lg">Menu</h2>

          <button onClick={openMenu}>
            <IconX />
          </button>
        </div>

        <div className="flex flex-col">
          <Link
            href="/"
            onClick={openMenu}
            className={`py-3 border-b border-brand-border ${
              isActive("/") ? "text-brand-primary font-medium" : ""
            }`}
          >
            {homeText[language]}
          </Link>

          {[
            {
              key: "collections",
              title: collectionText[language],
              data: collectionsDropdown,
            },
            {
              key: "revenue",
              title: revenueText[language],
              data: revenueDropdown,
            },
            {
              key: "archive",
              title: archiveText[language],
              data: archiveDropdown,
            },
          ].map((menu) => (
            <div key={menu.key} className="border-b border-brand-border">
              <button
                onClick={() => toggleDropdown(menu.key)}
                className={`w-full flex justify-between py-3 transition ${
                  pathName.startsWith(
                    menu.key === "collections"
                      ? "/collections"
                      : menu.key === "revenue"
                        ? "/revenue"
                        : "/archive",
                  )
                    ? "text-brand-primary"
                    : ""
                }`}
              >
                {menu.title}

                <IconChevronDown
                  className={`transition-transform ${
                    openDropdown === menu.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === menu.key && (
                <div className="pl-4 pb-3 flex flex-col gap-2">
                  {menu.data.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={openMenu}
                      className={`text-sm py-1 transition ${
                        pathName === item.href
                          ? "text-brand-primary font-medium"
                          : "text-brand-text"
                      }`}
                    >
                      {item.label[language]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/about"
            onClick={openMenu}
            className={`py-3 ${
              isActive("/about") ? "text-brand-primary font-medium" : ""
            }`}
          >
            {aboutText[language]}
          </Link>
        </div>
      </div>
    </>
  );
}
