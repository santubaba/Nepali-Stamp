import bcrypt from "bcryptjs"
import {SignJWT, jwtVerify} from "jose"
import { cookies } from "next/headers"

export async function hashPassword(password:string) {
    return bcrypt.hash(password,14)
}

export async function verifyPassword(password:string, hashedPassword:string) {
    return bcrypt.compare(password,hashedPassword)
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function createToken(adminId: number, email: string) {
  return new SignJWT({
    adminId,
    email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(
    token,
    secret
  )

  return payload
}

export async function getAdminSession() {
  const cookieStore = await cookies()

  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    return null
  }

  try {
    return await verifyToken(token)
  } catch {
    return null
  }
}