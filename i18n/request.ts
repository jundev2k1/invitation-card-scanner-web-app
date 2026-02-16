import { CookieStore } from '@/lib/cookies';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'vi'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  let resolvedLocale: Locale;

  if (locale && locales.includes(locale as Locale)) {
    resolvedLocale = locale as Locale;
  } else {
    resolvedLocale = CookieStore.language || defaultLocale;
  }

  return {
    locale: resolvedLocale,
    messages: {
      common: (await import(`../messages/common/${resolvedLocale}.json`)).default,
      auth: (await import(`../messages/auth/${resolvedLocale}.json`)).default,
      dashboard: (await import(`../messages/dashboard/${resolvedLocale}.json`)).default,
      user: (await import(`../messages/user/${resolvedLocale}.json`)).default
    }
  };
});
