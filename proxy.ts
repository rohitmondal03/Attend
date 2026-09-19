import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ROUTES } from "./lib/routes";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthRoute = request.nextUrl.pathname.startsWith(ROUTES.signin);
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // Logged in and trying to visit /signin → send them to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  // Not logged in and trying to visit a protected route → send them to signin
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(ROUTES.signin, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/signin"], // adjust /signin to match your actual ROUTES.signin path
};
