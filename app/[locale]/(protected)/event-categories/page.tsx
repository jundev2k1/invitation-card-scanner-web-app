"use client";
import { PageContent } from "@/components";
import { useTranslations } from "next-intl";
import { CategoryManager } from "./_elements/CategoryManager";
import { useEventCategory } from "./useCategoryManager";

export default function EventCategoriesPage() {
  const t = useTranslations();
  const {
    filter,
    breadcrumbs,
  } = useEventCategory();
  return (
    <PageContent
      title={t('eventCategory.title')}
      description={t('eventCategory.desc')}
      breadcrumbs={breadcrumbs}
    >
      <CategoryManager filter={filter} />
    </PageContent>
  );
}
