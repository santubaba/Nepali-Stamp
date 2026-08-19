import { prisma } from "@/lib/prisma"
import { verifyPassword, createToken } from "@/lib/auth"
import { cookies } from "next/headers"

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

  const token = await createToken(admin.id, admin.email)

  const cookieStore = await cookies()

  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  return Response.json({
    message: "Login successful",
  })
}