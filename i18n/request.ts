import { CookieStore } from '@/lib/cookies';
import { createTranslator } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'vi'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

async function getMessages(locale: Locale) {
  return {
    common: (await import(`../messages/common/${locale}.json`)).default,
    validate: (await import(`../messages/validate/${locale}.json`)).default,
    auth: (await import(`../messages/auth/${locale}.json`)).default,
    dashboard: (await import(`../messages/dashboard/${locale}.json`)).default,
    user: (await import(`../messages/user/${locale}.json`)).default,
    event: (await import(`../messages/event/${locale}.json`)).default,
    eventCategory: (await import(`../messages/event-categories/${locale}.json`)).default,
    permission: (await import(`../messages/permission/${locale}.json`)).default,
    settings: (await import(`../messages/settings/${locale}.json`)).default,
    dataTransfer: (await import(`../messages/data-transfer/${locale}.json`)).default
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  let resolvedLocale: Locale;

  if (locale && locales.includes(locale as Locale)) {
    resolvedLocale = locale as Locale;
  } else {
    resolvedLocale = CookieStore.language || defaultLocale;
  }

  const messages = await getMessages(resolvedLocale);
  return {
    locale: resolvedLocale,
    messages
  };
});

export async function getTranslator(locale?: string) {
  const resolvedLocale = locale && locales.includes(locale as any)
    ? locale as Locale
    : CookieStore.language || defaultLocale;
  const messages = await getMessages(resolvedLocale);;
  return createTranslator({ locale: resolvedLocale, messages });
}
