"use client";
import { PageContent, SearchTextbox } from "@/components";
import { useTranslations } from "next-intl";
import { CategoryManager } from "./_elements/CategoryManager";
import { useEventCategory } from "./useCategoryManager";

export default function EventCategoriesPage() {
  const t = useTranslations();
  const {
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
    breadcrumbs,
  } = useEventCategory();
  return (
    <PageContent
      title={t('eventCategory.title')}
      description={t('eventCategory.desc')}
      breadcrumbs={breadcrumbs}
      filters={
        <SearchTextbox
          value={filter.keyword}
          placeholder={t('event.list.filter.search.placeholder')}
          onTextChange={onKeywordChange}
        />
      }
    >
      <CategoryManager filter={filter} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
    </PageContent>
  );
}
