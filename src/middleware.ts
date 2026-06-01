import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const token = req.cookies.get("token");

  // Keep existing auth logic
  const authPagePatterns = [
    /^\/auth\/login$/,
    /^\/auth\/register$/,
    /^\/auth\/forgot-password$/,
    /^\/auth\/reset-password$/,
    /^\/auth\/reset-success$/,
    /^\/auth\/verify-email\/.+$/,
    /^\/auth\/verify-otp$/,
  ];
  const requireAuthPatterns = [/^\/dashboard/, /^\/auth/];

  const isAuthPage = authPagePatterns.some((p) => p.test(pathName));
  const needsAuth = requireAuthPatterns.some((p) => p.test(pathName));

  if (needsAuth) {
    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (token && (pathName === "/" || isAuthPage)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    // For authenticated routes or auth pages, just return next
    return NextResponse.next();
  }
  
  // For other public routes, let next-intl handle locale logic
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Next.js internals (_next/*)
  // - Static files (with file extensions)
  matcher: [
    "/",
    "/(id|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts).*)",
  ],
};
