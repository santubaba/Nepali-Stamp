import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const CATEGORY_ROUTES: Record<string, string> = {
  "income-revenue-stamps": "/revenue/income-revenue-stamps",
  "court-fee-stamps": "/revenue/court-fee-stamps",
  "landlord-stamps": "/revenue/landlord-stamps",
  "money-order": "/postal-stationery/money-order",
  "postcards": "/postal-stationery/postcards",
  "stamps-fdc": "/stamps/stamps-fdc",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const stamps = await prisma.stamp.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { eyebrow: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      eyebrow: true,
      image: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    take: 8,
    orderBy: { title: "asc" },
  });

  const results = stamps.map((stamp) => {
    const categorySlug = stamp.category?.slug ?? "";
    const baseRoute = CATEGORY_ROUTES[categorySlug] ?? "/";

    // stamps-fdc has individual detail pages
    const route =
      categorySlug === "stamps-fdc"
        ? `${baseRoute}/${stamp.slug}`
        : baseRoute;

    return {
      id: stamp.id,
      title: stamp.title,
      slug: stamp.slug,
      eyebrow: stamp.eyebrow,
      image: stamp.image,
      categoryName: stamp.category?.name ?? "",
      categorySlug,
      route,
    };
  });

  return NextResponse.json({ results });
}