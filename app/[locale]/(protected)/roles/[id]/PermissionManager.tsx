"use client";
import { PageContent, Tabs } from "@/components";
import { useTranslations } from "next-intl";
import { usePermissionManager } from "./usePermissionManager";

export const PermissionManager = ({ roleId }: { roleId: string }) => {
  const tPerm = useTranslations("permission");
  const { tabOptions, role } = usePermissionManager({ roleId });
  return (
    <PageContent
      title={tPerm("role_detail.pageTitle", { roleName: role.name })}
      description={tPerm("role_detail.pageDesc")}
      breadcrumbs={[
        { label: tPerm("roles_list.title"), href: "/roles" },
        { label: role.name },
      ]}
    >
      <Tabs items={tabOptions} />
    </PageContent>
  );
};
