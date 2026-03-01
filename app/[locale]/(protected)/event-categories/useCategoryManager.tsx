import { useFilter } from "@/root/app/components";
import { RouteUtil } from "@/root/app/utils/route";
import { TranslateFn } from "@/root/i18n/type";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

const getBreadcrumbs = (t: TranslateFn, locale: string) => [
  { label: t('dashboard.title'), href: RouteUtil.getDashboardRoute(locale) },
  { label: t('eventCategory.title') },
];

export const useEventCategory = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { filter } = useFilter();

  const breadcrumbs = useMemo(() => getBreadcrumbs(t, locale), [locale]);
  return {
    breadcrumbs,
    filter
  };
}
