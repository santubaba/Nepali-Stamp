import {
  Archive,
  Badge,
  Gavel,
  ImageIcon,
  Mail,
  Map,
  RectangleHorizontal,
  Receipt,
  Shield,
  Star,
} from "lucide-react";

export const catalogues = [
  // Stamps & FDC
  {
    slug: "stamps-fdc",
    href: "/stamps/stamps-fdc",
    title: "Stamps & FDC",
    description:
      "Postage stamps and First Day Covers issued by Nepal Postal Services.",
    count: 620,
    era: "1881–2026",
    icon: RectangleHorizontal,
  },
  {
    slug: "service-stamps",
    href: "/stamps/service-stamps",
    title: "Service Stamps",
    description:
      "Official-use stamps issued for government departments and public services.",
    count: 44,
    era: "1960–2005",
    icon: Shield,
  },
  {
    slug: "commemoratives-special-covers",
    href: "/stamps/commemoratives-special-covers",
    title: "Commemoratives & Special Covers",
    description:
      "Commemorative stamps and special covers celebrating national events, personalities, and milestones.",
    count: 203,
    era: "1949–2026",
    icon: Star,
  },

  // Postal Stationery
  {
    slug: "envelopes",
    href: "/postal-stationery/envelopes",
    title: "Envelopes",
    description:
      "Postal stationery including stamped envelopes and first-day envelopes.",
    count: 184,
    era: "1881–2026",
    icon: Mail,
  },
  {
    slug: "postcards",
    href: "/postal-stationery/postcards",
    title: "Postcards",
    description:
      "Postal cards and picture postcards issued by Nepal Postal Services.",
    count: 97,
    era: "1907–2026",
    icon: ImageIcon,
  },
  {
    slug: "aerogrammes",
    href: "/postal-stationery/aerogrammes",
    title: "Aerogrammes",
    description:
      "Official aerogrammes issued for lightweight international correspondence.",
    count: 0,
    era: "Various",
    icon: Mail,
  },
  {
    slug: "money-order",
    href: "/postal-stationery/money-order",
    title: "Money Order",
    description:
      "Official postal money order forms and related financial postal documents.",
    count: 63,
    era: "1920–2010",
    icon: Receipt,
  },

  // Revenue
  {
    slug: "landlord-stamps",
    href: "/revenue/landlord-stamps",
    title: "Landlord Stamps",
    description:
      "Revenue stamps used in land ownership and property registration documents.",
    count: 112,
    era: "1901–2018",
    icon: Map,
  },
  {
    slug: "court-fee-stamps",
    href: "/revenue/court-fee-stamps",
    title: "Court-fee Stamps",
    description:
      "Judicial fee stamps affixed to legal documents and court filings.",
    count: 79,
    era: "1895–2022",
    icon: Gavel,
  },
  {
    slug: "income-revenue-stamps",
    href: "/revenue/income-revenue-stamps",
    title: "Income Revenue Stamps",
    description:
      "Fiscal stamps used for taxation and government income collection.",
    count: 148,
    era: "1890–2020",
    icon: Badge,
  },

  // Other Archive
  {
    slug: "published-books-literature",
    href: "/other-archive/published-books-literature",
    title: "Published Books & Literature",
    description:
      "Books, catalogues, journals, and other published literature related to Nepal Philately.",
    count: 0,
    era: "Various",
    icon: Archive,
  },
  {
    slug: "post-office-cancellation-marks",
    href: "/other-archive/post-office-cancellation-marks",
    title: "Post Office Cancellation Marks",
    description:
      "Postal cancellation marks used by post offices throughout Nepal.",
    count: 0,
    era: "Various",
    icon: Archive,
  },
  {
    slug: "administrative-bulletins",
    href: "/other-archive/administrative-bulletins",
    title: "Administrative Bulletins",
    description:
      "Official administrative circulars, notices, and postal bulletins.",
    count: 0,
    era: "Various",
    icon: Archive,
  },
  {
    slug: "franklin",
    href: "/other-archive/franklin",
    title: "Franklin Cancellations",
    description:
      "Franklin cancellation marks and related archival postal materials.",
    count: 0,
    era: "Various",
    icon: Archive,
  },
];