import { LayersIcon, ShieldUserIcon } from "@/icons";
import { TranslateFn } from "@/root/i18n/type";
import { useTranslations } from "next-intl";
import { RoleGroup } from "./_elements/role-group/RoleGroup";
import { RoleList } from "./_elements/role-list/RoleList";


export enum TabNames {
  LIST = "LIST",
  GROUP = "GROUP",
}

const getBreadcrumbs = (t: TranslateFn) => [
  { label: t('roles_list.title') },
];

const getTabItems = (t: TranslateFn) => [
  {
    label: (
      <div className="flex items-center gap-2">
        <ShieldUserIcon className="h-4 w-4" />
        {t("tabs.list")}
      </div>
    ),
    value: TabNames.LIST,
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("list.title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t("list.desc")}</p>
        <RoleList />
      </div>
    ),
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <LayersIcon className="h-4 w-4" />
        {t("tabs.group")}
      </div>
    ),
    value: TabNames.GROUP,
    content: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("group.title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t("group.desc")}</p>
        <RoleGroup />
      </div>
    ),
  },
];

export const useRolePage = () => {
  const tPerm = useTranslations('permission');
  const tPermRole = useTranslations('permission.role');
  const breadcrumbs = getBreadcrumbs(tPerm);
  const tabContents = getTabItems(tPermRole);

  return {
    breadcrumbs,
    tabContents
  }
};