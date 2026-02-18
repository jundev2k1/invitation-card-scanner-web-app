import { defaultLocale, locales } from "@/i18n/request";
import { Locale } from "next-intl";
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { RouteUtil } from "./app/utils/route";
import { ACCESS_TOKEN_COOKIE_KEY, LANGUAGE_COOKIE_KEY } from "./lib/cookies";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: false
});

function hasLocalePrefix(pathname: string): boolean {
  return locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

function resolveLocaleFromCookie(req: NextRequest): Locale {
  const cookieLocale = req.cookies.get(LANGUAGE_COOKIE_KEY)?.value;
  return locales.some(l => l === cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : defaultLocale;
}

function stripLocalePrefix(pathname: string, locale: Locale): string {
  const stripped = pathname.replace(`/${locale}`, '');
  return stripped || '/';
}

function extractLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/')[1];
  return locales.some(l => l === segment as Locale)
    ? (segment as Locale)
    : defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Enforce locale prefix
  if (!hasLocalePrefix(pathname)) {
    const locale = resolveLocaleFromCookie(req);
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Let next-intl handle locale context  
  const intlResponse = intlMiddleware(req);

  // Auth Guard
  const locale = extractLocaleFromPath(pathname);
  const cleanPath = stripLocalePrefix(pathname, locale);
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    cleanPath.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.includes(cleanPath);

  if (cleanPath === "/" || cleanPath === "") {
    if (token) {
      return NextResponse.redirect(new URL(RouteUtil.getDashboardRoute(locale), req.url));
    }
    else {
      return NextResponse.redirect(new URL(RouteUtil.getLoginRoute(locale), req.url));
    }
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(
      new URL(RouteUtil.getLoginRoute(locale), req.url)
    );
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(
      new URL(RouteUtil.getDashboardRoute(locale), req.url)
    );
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)']
};
