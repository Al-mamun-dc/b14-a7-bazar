import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  console.log("Requested page:", request.nextUrl.pathname);
  console.log("Session cookie:", sessionCookie ? "FOUND" : "NOT FOUND");

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path",
    "/detail",
    "/detail/:path",
    "/category",
    "/category/:path",
  ],
};