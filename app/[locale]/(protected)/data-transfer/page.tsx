"use client";

import { PageContent, TabItem, Tabs } from "@/components";
import { FileOutputIcon } from "@/icons";
import { FileInputIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ExportSettings } from "./_elements/export/setting/ExportSettings";
import { ImportSettings } from "./_elements/import/setting/ImportSettings";

export default function DataTransferPage() {
  const t = useTranslations("dataTransfer");
  const tabOptions: TabItem[] = [
    {
      value: 'export',
      label: (
        <span className="flex items-center gap-1">
          <FileOutputIcon />
          {t('tabs.export')}
        </span>
      ),
      content: <ExportSettings />
    },
    {
      value: 'import',
      label: (
        <span className="flex items-center gap-1">
          <FileInputIcon />
          {t('tabs.import')}
        </span>
      ),
      content: <ImportSettings />
    },
  ];

  return (
    <PageContent
      title={t("title")}
      description={t("desc")}
      breadcrumbs={[{ label: t("title") }]}
      noWrapper
    >
      {/* Tabs */}
      <Tabs
        items={tabOptions}
        defaultValue="export"
        listClassName="grid w-full max-w-md grid-cols-2 h-auto!"
        itemClassName="cursor-pointer px-12 py-3 text-center"
      />
    </PageContent>
  );
}
