import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const stamps = await prisma.stamp.findMany({
    where: {
      category: {
        slug: "court-fee-stamps",
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
      tags: true,
      keyAttributes: true,
      physicalProperties: true,
      printingProduction: true,
      issuance: true,
      historicalContext: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json({ stamps });
}