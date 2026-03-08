import NextAuth from "next-auth"; // 1. Import NextAuth
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// 2. Initialize the middleware-compatible auth function
const { auth } = NextAuth(authConfig); 

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user; 

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/login";

  if (isApiAuthRoute) return NextResponse.next();

  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};