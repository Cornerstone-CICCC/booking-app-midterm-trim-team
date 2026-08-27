import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie name must match `COOKIE_NAME` in lib/auth.ts.
const SESSION_COOKIE = "trim_team_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.has(SESSION_COOKIE);

  if (pathname.startsWith("/dashboard") && !signedIn) {
    const login = new URL("/login", request.url);
    const response = NextResponse.redirect(login);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  }

  const response = NextResponse.next();
  if (pathname.startsWith("/dashboard") || pathname === "/login") {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  }
  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
