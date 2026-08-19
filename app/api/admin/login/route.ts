import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json()
  const admin = await prisma.admin.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!admin) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    )
  }

  const passwordValid = await verifyPassword(
    body.password,
    admin.password
  )

  if (!passwordValid){
    return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
    )
  }
  return Response.json({
    message: "Login successful",
  })
}