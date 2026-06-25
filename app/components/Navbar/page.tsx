"use client";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [language, setLanguage] = useState<"EN" | "NP">("EN");
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  return (
    <>
      <nav className="flex items-center justify-between h-20 px-4 md:px-6 lg:px-20 border-b border-brand-border">
        {/* Logo */}
        <div className="flex items-center gap-2 p-2 text-lg font-semibold font-heading">
          <div className="w-10 h-10 bg-brand-primary"></div>
          <Link href="/">Nepali Stamp</Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-10">
          <Link
            href={"/"}
            className={`h-20 flex items-center border-b-2 transition
        ${
          isActive("/")
            ? "text-brand-primary border-brand-primary"
            : "text-brand-text border-transparent"
        }`}
          >
            {homeText[language]}
          </Link>

          {/* Collections */}
          <div className="relative h-20 group">
            <Link
              href={"/collections"}
              className={`h-full flex items-center gap-1 border-b-2 transition
          ${
            pathName.startsWith("/collections")
              ? "text-brand-primary border-brand-primary"
              : "text-brand-text border-transparent"
          }`}
            >
              {collectionText[language]}

              <IconChevronDown
                size={16}
                className="transition-transform group-hover:rotate-180"
              />
            </Link>

            <div className="absolute left-0 hidden pt-2 top-full group-hover:block">
              <div className="p-2 border rounded shadow min-w-40 border-brand-border bg-brand-bg">
                {collectionsDropdown.map((item) => (
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

          {/* Revenue */}
          <div className="relative h-20 group">
            <Link
              href={"/revenue"}
              className={`h-full flex items-center gap-1 border-b-2 transition
          ${
            pathName.startsWith("/revenue")
              ? "text-brand-primary border-brand-primary"
              : "text-brand-text border-transparent"
          }`}
            >
              {revenueText[language]}

              <IconChevronDown
                size={16}
                className="transition-transform group-hover:rotate-180"
              />
            </Link>

            <div className="absolute left-0 hidden pt-2 top-full group-hover:block">
              <div className="p-2 border rounded shadow min-w-40 border-brand-border bg-brand-bg">
                {revenueDropdown.map((item) => (
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

          {/* Archive */}
          <div className="relative h-20 group">
            <Link
              href={"/archive"}
              className={`h-full flex items-center gap-1 border-b-2 transition
          ${
            pathName.startsWith("/archive")
              ? "text-brand-primary border-brand-primary"
              : "text-brand-text border-transparent"
          }`}
            >
              {archiveText[language]}

              <IconChevronDown
                size={16}
                className="transition-transform group-hover:rotate-180"
              />
            </Link>

            <div className="absolute left-0 hidden pt-2 top-full group-hover:block">
              <div className="p-2 border rounded shadow min-w-40 border-brand-border bg-brand-bg">
                {archiveDropdown.map((item) => (
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

          <Link
            href={"/about"}
            className={`h-20 flex items-center border-b-2 transition
        ${
          isActive("/about")
            ? "text-brand-primary border-brand-primary"
            : "text-brand-text border-transparent"
        }`}
          >
            {aboutText[language]}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language */}
          <div className="flex items-center border rounded h-9">
            <button
              onClick={() => setLanguage("EN")}
              className={
                language === "EN"
                  ? "p-2 h-9 rounded-l bg-brand-primary text-brand-bg items-center flex"
                  : "p-2"
              }
            >
              EN
            </button>

            <button
              onClick={() => setLanguage("NP")}
              className={
                language === "NP"
                  ? "p-2 h-9 rounded-r bg-brand-primary text-brand-bg flex items-center"
                  : "p-2"
              }
            >
              नेपाली
            </button>
          </div>

          {/* Menu button */}
          <button onClick={openMenu} className="md:hidden">
            <IconMenu2 />
          </button>
        </div>
      </nav>

      {/* Dark overlay */}
      {isMenuOpen && (
        <div
          onClick={openMenu}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-brand-bg z-50 p-6 overflow-y-auto
  transition-transform duration-300 md:hidden
  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-lg">Menu</h2>

          <button onClick={openMenu}>
            <IconX />
          </button>
        </div>

        <div className="flex flex-col ">
          {/* Home */}
          <Link
            href="/"
            onClick={openMenu}
            className={`py-3 border-b border-brand-border
      ${isActive("/") ? "text-brand-primary" : ""}`}
          >
            {homeText[language]}
          </Link>

          {/* Collections */}
          <div className="border-b border-brand-border">
            <button
              onClick={() => toggleDropdown("collections")}
              className="w-full flex items-center justify-between py-3"
            >
              <span
                className={
                  pathName.startsWith("/collections")
                    ? "text-brand-primary"
                    : ""
                }
              >
                {collectionText[language]}
              </span>

              <IconChevronDown
                size={18}
                className={`transition-transform
          ${openDropdown === "collections" ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown === "collections" && (
              <div className="pl-4 pb-3 flex flex-col gap-2">
                {collectionsDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={openMenu}
                    className="py-1"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Revenue */}
          <div className="border-b border-brand-border">
            <button
              onClick={() => toggleDropdown("revenue")}
              className="w-full flex items-center justify-between py-3"
            >
              <span
                className={
                  pathName.startsWith("/revenue") ? "text-brand-primary" : ""
                }
              >
                {revenueText[language]}
              </span>

              <IconChevronDown
                size={18}
                className={`transition-transform
          ${openDropdown === "revenue" ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown === "revenue" && (
              <div className="pl-4 pb-3 flex flex-col gap-2">
                {revenueDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={openMenu}
                    className="py-1"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Archive */}
          <div className="border-b border-brand-border">
            <button
              onClick={() => toggleDropdown("archive")}
              className="w-full flex items-center justify-between py-3"
            >
              <span
                className={
                  pathName.startsWith("/archive") ? "text-brand-primary" : ""
                }
              >
                {archiveText[language]}
              </span>

              <IconChevronDown
                size={18}
                className={`transition-transform
          ${openDropdown === "archive" ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown === "archive" && (
              <div className="pl-4 pb-3 flex flex-col gap-2">
                {archiveDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={openMenu}
                    className="py-1"
                  >
                    {item.label[language]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <Link
            href="/about"
            onClick={openMenu}
            className={`py-3 
      ${isActive("/about") ? "text-brand-primary" : ""}`}
          >
            {aboutText[language]}
          </Link>
        </div>
      </div>
    </>
  );
}
