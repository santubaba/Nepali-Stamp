import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"

async function main() {
  const password = await hashPassword("Admin@123")

  const admin = await prisma.admin.create({
    data: {
      username: "admin",
      email: "admin@localhost.test",
      password,
    },
  })

  console.log(`Admin created: ${admin.email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })