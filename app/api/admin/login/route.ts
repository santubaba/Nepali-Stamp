import { prisma } from "@/lib/prisma"
import { verifyPassword, createToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { adminLoginSchema } from "@/lib/validations/admin"

export async function POST(request: Request) {
  const body = await request.json()
  const result = adminLoginSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      {
        message: "Invalid request",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
}

const { email, password } = result.data
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  if (!admin) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    )
  }

  const passwordValid = await verifyPassword(
    password,
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