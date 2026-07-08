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

export const collections = [
  {
    slug: "stamps",
    title: "Stamps",
    description:
      "Postage stamps issued by Nepal Postal Services, 1881 to present.",
    count: 620,
    era: "1881–2026",
    icon: RectangleHorizontal,
  },
  {
    slug: "envelopes",
    title: "Envelopes",
    description:
      "Postal stationery, franked covers, and first-day envelopes.",
    count: 184,
    era: "1881–2026",
    icon: Mail,
  },
  {
    slug: "postcards",
    title: "Postcards",
    description:
      "Postal cards and picture postcards from the Nepalese postal system.",
    count: 97,
    era: "1907–2026",
    icon: ImageIcon,
  },
  {
    slug: "postal-money-orders",
    title: "Postal Money Orders",
    description:
      "Official money order documents and related postal financial materials.",
    count: 63,
    era: "1920–2010",
    icon: Receipt,
  },
  {
    slug: "income-revenue-stamps",
    title: "Income Revenue Stamps",
    description:
      "Fiscal stamps used for taxation and government income collection.",
    count: 148,
    era: "1890–2020",
    icon: Badge,
  },
  {
    slug: "land-revenue-stamps",
    title: "Land Revenue Stamps",
    description:
      "Stamps used in land transaction and property registration documents.",
    count: 112,
    era: "1901–2018",
    icon: Map,
  },
  {
    slug: "court-fee-stamps",
    title: "Court-fee Stamps",
    description:
      "Judicial fee stamps affixed to legal documents and court filings.",
    count: 79,
    era: "1895–2022",
    icon: Gavel,
  },
  {
    slug: "commemoratives",
    title: "Commemoratives",
    description:
      "Special-issue stamps marking national events, figures, and milestones.",
    count: 203,
    era: "1949–2026",
    icon: Star,
  },
  {
    slug: "service-stamps",
    title: "Service Stamps",
    description:
      "Official use stamps for government departments and public services.",
    count: 44,
    era: "1960–2005",
    icon: Shield,
  },
  {
    slug: "other-archives",
    title: "Other Archives",
    description:
      "Miscellaneous postal ephemera, labels, and uncategorised archival material.",
    count: 38,
    era: "Various",
    icon: Archive,
  },
];