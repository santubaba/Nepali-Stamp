import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login" || 
    request.nextUrl.pathname === "/api/admin/login"
  ) {
    return NextResponse.next()
  }

  const isApiRequest =
    request.nextUrl.pathname.startsWith("/api/")

  const token = request.cookies.get("admin_token")?.value

  if (!token) {
    if (isApiRequest) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    )
  }

  try {
    await verifyToken(token)

    return NextResponse.next()
  } catch {
    if (isApiRequest) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    )
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:admin/:path*",
  ],
}