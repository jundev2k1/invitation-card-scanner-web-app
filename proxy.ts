import { NextRequest, NextResponse } from "next/server";
import { RouteUtil } from "./app/utils/route";
import { ACCESS_TOKEN_COOKIE_KEY } from "./lib/cookies";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_KEY);
  
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL(RouteUtil.getLoginRoute(), req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(RouteUtil.getDashboardRoute(), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
