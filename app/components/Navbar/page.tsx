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
import { useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { LanguageContext } from "@/app/context/LanguageContext";

export default function Navbar() {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext missing");
  }

  const { language, setLanguage, text } = languageContext;

  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDrawerMenu, setOpenDrawerMenu] = useState<string | null>(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  /*
   * --------------------------------------------------------------------------
   * Refs
   * --------------------------------------------------------------------------
   */

  const navRef = useRef<HTMLElement>(null);

  const desktopDropdownRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  const mobileMenuItemsRef = useRef<HTMLDivElement>(null);

  const mobileAccordionRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  /*
   * --------------------------------------------------------------------------
   * Menu data
   * --------------------------------------------------------------------------
   */

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

  /*
   * --------------------------------------------------------------------------
   * Helpers
   * --------------------------------------------------------------------------
   */

  const isActive = (href: string) => pathname === href;

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDrawerMenu(null);
  };

  const toggleDrawerMenu = (key: string) => {
    setOpenDrawerMenu((prev) => (prev === key ? null : key));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();

    if (!trimmed) return;

    closeMenu();

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  /*
   * --------------------------------------------------------------------------
   * Prevent body scrolling when mobile drawer is open
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /*
   * --------------------------------------------------------------------------
   * Close mobile menu when switching to desktop
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setOpenDrawerMenu(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * --------------------------------------------------------------------------
   * Navbar entrance animation
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const elements = nav.querySelectorAll(".navbar-entrance");

    const ctx = gsap.context(() => {
      gsap.set(nav, {
        opacity: 0,
        y: -10,
      });

      gsap.set(elements, {
        opacity: 0,
        y: -6,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      tl.to(nav, {
        opacity: 1,
        y: 0,
        duration: 0.45,
      });

      tl.to(
        elements,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
        },
        "-=0.2",
      );
    }, nav);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * --------------------------------------------------------------------------
   * Desktop dropdown animation
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    Object.entries(desktopDropdownRefs.current).forEach(
      ([key, dropdown]) => {
        if (!dropdown) return;

        const items = dropdown.querySelectorAll(
          ".desktop-dropdown-item",
        );

        gsap.killTweensOf([dropdown, items]);

        if (key === openDesktopMenu) {
          gsap.set(dropdown, {
            display: "block",
            opacity: 0,
            y: -8,
          });

          gsap.set(items, {
            opacity: 0,
            y: -4,
          });

          const tl = gsap.timeline({
            defaults: {
              ease: "power2.out",
            },
          });

          tl.to(dropdown, {
            opacity: 1,
            y: 0,
            duration: 0.2,
          });

          tl.to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              stagger: 0.035,
            },
            "-=0.1",
          );
        } else {
          gsap.to(dropdown, {
            opacity: 0,
            y: -5,
            duration: 0.12,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(dropdown, {
                display: "none",
              });
            },
          });
        }
      },
    );
  }, [openDesktopMenu]);

  /*
   * --------------------------------------------------------------------------
   * Mobile drawer animation
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    const drawer = mobileDrawerRef.current;
    const overlay = mobileOverlayRef.current;
    const menuContainer = mobileMenuItemsRef.current;

    if (!drawer || !overlay) return;

    const menuItems =
      menuContainer?.querySelectorAll(".mobile-menu-item");

    gsap.killTweensOf([drawer, overlay, menuItems]);

    if (isMenuOpen) {
      /*
       * Initial state
       */

      gsap.set(drawer, {
        xPercent: 100,
      });

      gsap.set(overlay, {
        opacity: 0,
        pointerEvents: "auto",
      });

      gsap.set(menuItems || [], {
        opacity: 0,
        x: 12,
      });

      /*
       * Opening animation
       */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(drawer, {
        xPercent: 0,
        duration: 0.4,
      });

      tl.to(
        overlay,
        {
          opacity: 1,
          duration: 0.3,
        },
        "<",
      );

      if (menuItems?.length) {
        tl.to(
          menuItems,
          {
            opacity: 1,
            x: 0,
            duration: 0.25,
            stagger: 0.04,
          },
          "-=0.16",
        );
      }
    } else {
      /*
       * Closing animation
       */

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.in",
        },
      });

      if (menuItems?.length) {
        tl.to(menuItems, {
          opacity: 0,
          x: 8,
          duration: 0.12,
          stagger: 0.02,
        });
      }

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.18,
          onComplete: () => {
            gsap.set(overlay, {
              pointerEvents: "none",
            });
          },
        },
        "<",
      );

      tl.to(
        drawer,
        {
          xPercent: 100,
          duration: 0.3,
        },
        "-=0.05",
      );
    }
  }, [isMenuOpen]);

  /*
   * --------------------------------------------------------------------------
   * Mobile accordion animation
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    Object.entries(mobileAccordionRefs.current).forEach(
      ([key, accordion]) => {
        if (!accordion) return;

        const items = accordion.querySelectorAll(
          ".mobile-submenu-item",
        );

        const isOpen = key === openDrawerMenu;

        gsap.killTweensOf([accordion, items]);

        if (isOpen) {
          /*
           * Get the real content height.
           */

          gsap.set(accordion, {
            height: "auto",
            opacity: 1,
          });

          const height = accordion.scrollHeight;

          gsap.set(accordion, {
            height: 0,
            opacity: 0,
          });

          gsap.to(accordion, {
            height,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(accordion, {
                height: "auto",
              });
            },
          });

          gsap.fromTo(
            items,
            {
              opacity: 0,
              x: -8,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.22,
              stagger: 0.035,
              ease: "power2.out",
              delay: 0.04,
            },
          );
        } else {
          gsap.to(items, {
            opacity: 0,
            x: -5,
            duration: 0.1,
            stagger: 0.015,
          });

          gsap.to(accordion, {
            height: 0,
            opacity: 0,
            duration: 0.22,
            ease: "power2.inOut",
          });
        }
      },
    );
  }, [openDrawerMenu]);

  /*
   * --------------------------------------------------------------------------
   * Render
   * --------------------------------------------------------------------------
   */

  return (
    <>
      {/* ================================================================== */}
      {/* Navbar */}
      {/* ================================================================== */}

      <nav
        ref={navRef}
        className="relative z-30 flex items-center justify-between h-16 px-4 border-b md:h-24 md:px-6 lg:px-15 border-brand-border bg-brand-bg"
      >
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3 navbar-entrance"
        >
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

        {/* ================================================================ */}
        {/* Desktop Navigation */}
        {/* ================================================================ */}

        <div className="items-center justify-center flex-1 hidden gap-6 lg:flex xl:gap-8">
          {/* Home */}

          <Link
            href="/"
            className={`navbar-entrance h-24 flex items-center border-b-2 text-sm ${
              isActive("/")
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            {text.navbar.home}
          </Link>

          {/* Dropdown Menus */}

          {menus.map((menu) => {
            const isOpen = openDesktopMenu === menu.key;

            return (
              <div
                key={menu.key}
                className="relative h-24"
                onMouseEnter={() =>
                  setOpenDesktopMenu(menu.key)
                }
                onMouseLeave={() =>
                  setOpenDesktopMenu(null)
                }
              >
                {/* Trigger */}

                <div
                  className={`navbar-entrance h-full flex items-center gap-1 border-b-2 cursor-default text-sm ${
                    pathname.startsWith(menu.path)
                      ? "border-brand-primary text-brand-primary"
                      : "border-transparent text-brand-muted hover:text-brand-text"
                  }`}
                >
                  {menu.title}

                  <IconChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown */}

                <div
                  ref={(element) => {
                    desktopDropdownRefs.current[menu.key] =
                      element;
                  }}
                  className="absolute left-0 z-50 hidden top-full min-w-52"
                  style={{
                    paddingTop: "8px",
                    opacity: 0,
                  }}
                >
                  <div className="p-1 border rounded-lg shadow-lg bg-brand-bg border-brand-border">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`desktop-dropdown-item block px-3 py-2 rounded-md text-sm ${
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
            );
          })}

          {/* About */}

          <Link
            href="/about"
            className={`navbar-entrance h-24 flex items-center border-b-2 text-sm mr-5 ${
              isActive("/about")
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-brand-muted hover:text-brand-text"
            }`}
          >
            {text.navbar.about}
          </Link>
        </div>

        {/* ================================================================ */}
        {/* Right Section */}
        {/* ================================================================ */}

        <div className="flex items-center gap-2 lg:gap-3 navbar-entrance">
          {/* Desktop Search */}

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
            <IconSearch
              size={16}
              className="text-brand-muted shrink-0"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search stamps..."
              className="flex-1 min-w-0 px-2 text-sm bg-transparent outline-none placeholder:text-brand-muted"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <IconX size={15} />
              </button>
            )}
          </form>

          {/* Language */}

          <div className="flex overflow-hidden border rounded border-brand-border h-9">
            <button
              type="button"
              onClick={() => setLanguage("EN")}
              className={`px-3 text-sm ${
                language === "EN"
                  ? "bg-brand-primary text-brand-bg"
                  : "text-brand-muted hover:text-brand-text transition-colors"
              }`}
            >
              EN
            </button>

            <div className="self-center w-px h-4 bg-brand-border" />

            <button
              type="button"
              onClick={() => setLanguage("NP")}
              className={`px-3 text-sm ${
                language === "NP"
                  ? "bg-brand-primary text-brand-bg"
                  : "text-brand-muted hover:text-brand-text transition-colors"
              }`}
            >
              नेपाली
            </button>
          </div>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <IconMenu2 size={20} />
          </button>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* Mobile Overlay */}
      {/* ================================================================== */}

      <div
        ref={mobileOverlayRef}
        onClick={closeMenu}
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        style={{
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ================================================================== */}
      {/* Mobile Drawer */}
      {/* ================================================================== */}

      <div
        ref={mobileDrawerRef}
        className="fixed top-0 right-0 z-50 h-full w-72 bg-brand-bg overflow-y-auto lg:hidden"
      >
        {/* Header */}

        <div className="flex items-center justify-between h-16 p-5 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded w-7 h-7 bg-brand-primary">
              <IconRectangle
                size={13}
                color="#F5EFEB"
              />
            </div>

            <span className="font-semibold font-heading text-brand-text">
              Nepali Stamps
            </span>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Mobile Search */}

        <div className="p-5 border-b border-brand-border mobile-menu-item">
          <form
            onSubmit={handleSearch}
            className="flex items-center px-3 border rounded-lg h-11 bg-brand-surface border-brand-border"
          >
            <IconSearch
              size={16}
              className="text-brand-muted"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search stamps..."
              className="flex-1 px-2 text-sm bg-transparent outline-none"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <IconX size={15} />
              </button>
            )}
          </form>
        </div>

        {/* Mobile Navigation */}

        <div
          ref={mobileMenuItemsRef}
          className="px-5 py-4"
        >
          {/* Home */}

          <Link
            href="/"
            onClick={closeMenu}
            className={`mobile-menu-item block py-3 border-b border-brand-border ${
              pathname === "/"
                ? "text-brand-primary font-medium"
                : "text-brand-text hover:text-brand-primary"
            }`}
          >
            {text.navbar.home}
          </Link>

          {/* Accordion Menus */}

          {menus.map((menu) => {
            const isOpen = openDrawerMenu === menu.key;

            return (
              <div
                key={menu.key}
                className="border-b border-brand-border mobile-menu-item"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    toggleDrawerMenu(menu.key)
                  }
                  className={`w-full flex justify-between items-center py-3 ${
                    pathname.startsWith(menu.path)
                      ? "text-brand-primary font-medium"
                      : "text-brand-text hover:text-brand-primary"
                  }`}
                >
                  {menu.title}

                  <IconChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion */}

                <div
                  ref={(element) => {
                    mobileAccordionRefs.current[menu.key] =
                      element;
                  }}
                  className="overflow-hidden"
                  style={{
                    height: 0,
                    opacity: 0,
                  }}
                >
                  <div className="pb-2 pl-4">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`mobile-submenu-item block py-2 text-sm ${
                          pathname === item.href
                            ? "text-brand-primary font-medium"
                            : "text-brand-text hover:text-brand-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* About */}

          <Link
            href="/about"
            onClick={closeMenu}
            className={`mobile-menu-item block py-3 ${
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