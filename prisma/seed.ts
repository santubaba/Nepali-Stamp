import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import fs from "fs"
import path from "path"

async function main() {
  // ── Admin ─────────────────────────────────────────────
  const password = await hashPassword("123")

  const admin = await prisma.admin.upsert({
    where: { email: "admin@host.test" },
    update: {},
    create: {
      username: "admin",
      email: "admin@host.test",
      password,
    },
  })

  console.log(`Admin: ${admin.email}`)

  // ── Categories + Stamps ───────────────────────────────
  const categories = [
    { name: "Income Revenue Stamps", slug: "income-revenue-stamps" },
    { name: "Court Fee Stamps", slug: "court-fee-stamps" },
    { name: "Postal Money Order", slug: "postal-money-order" },
    { name: "Landlord Stamps", slug: "landlord-stamps" },
  ]

  for (const cat of categories) {
    const jsonPath = path.join(
      process.cwd(),
      "scripts",
      "output",
      `${cat.slug}.json`,
    )

    if (!fs.existsSync(jsonPath)) {
      console.log(`Skipping ${cat.slug} — no JSON file found`)
      continue
    }

    // Upsert category
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug },
    })

    console.log(`\nCategory: ${category.name}`)

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

    for (const stamp of data.stamps) {
      const record = await prisma.stamp.upsert({
        where: { slug: stamp.slug },
        update: {
          title: stamp.title,
          eyebrow: stamp.eyebrow ?? null,
          image: stamp.image ?? null,
          featured: stamp.featured ?? false,
          categoryId: category.id,
          tags: stamp.tags ?? undefined,
          keyAttributes: stamp.keyAttributes ?? undefined,
          physicalProperties: stamp.physicalProperties ?? undefined,
          printingProduction: stamp.printingProduction ?? undefined,
          issuance: stamp.issuance ?? undefined,
          historicalContext: stamp.historicalContext ?? undefined,
        },
        create: {
          title: stamp.title,
          slug: stamp.slug,
          eyebrow: stamp.eyebrow ?? null,
          image: stamp.image ?? null,
          featured: stamp.featured ?? false,
          categoryId: category.id,
          tags: stamp.tags ?? undefined,
          keyAttributes: stamp.keyAttributes ?? undefined,
          physicalProperties: stamp.physicalProperties ?? undefined,
          printingProduction: stamp.printingProduction ?? undefined,
          issuance: stamp.issuance ?? undefined,
          historicalContext: stamp.historicalContext ?? undefined,
        },
      })

      console.log(`  ✓ ${record.title}`)
    }
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })