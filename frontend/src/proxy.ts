import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(process.env.COOKIE_NAME as string)?.value;
  const role = request.cookies.get(
    process.env.ROLE_COOKIE_NAME as string,
  )?.value;

  const path = request.nextUrl.pathname;

  // Vendor route guard
  if (path.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "vendor") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Admin route guard
  if (path.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "admin" && role !== "super_admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Account route guard
  if (path.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Checkout route guard
  if (path.startsWith("/checkout")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "customer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Orders route guard
  if (path.startsWith("/orders")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "customer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Prevent logged-in users from visiting auth routes
  const isAuthroute =
    path === "/login" || path === "/register" || path === "/register-vendor";
  if (isAuthroute && token) {
    if (role === "vendor") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (role === "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/orders",
    "/account/:path*",
    "/account",
    "/login",
    "/register",
    "/register-vendor",
  ],
};
