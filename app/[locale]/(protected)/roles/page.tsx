"use client";
import { PageContent, Tabs } from "@/components";
import { useTranslations } from "next-intl";
import { TabNames, useRolePage } from "./useRolePage";

export default function RoleListPage() {
  const t = useTranslations("permission");
  const { breadcrumbs, tabContents } = useRolePage();
  return (
    <PageContent
      title={t('roles_list.title')}
      description={t('roles_list.description')}
      breadcrumbs={breadcrumbs}
    >
      <Tabs
        variant="line"
        items={tabContents}
        defaultValue={TabNames.LIST}
        listClassName="border-b mb-4 w-full inline-block"
        itemClassName="cursor-pointer px-6"
      />
    </PageContent>
  );
}
