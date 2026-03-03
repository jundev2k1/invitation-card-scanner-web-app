import { Badge, Column, DropdownButton, TruncatedText, useFilter } from "@/components";
import { TranslateFn } from "@/i18n/type";
import { formatDateTime } from "@/lib/datetime/date.util";
import { SearchResult } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface RoleItem {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  userCount: number;
  createdAt: string;
}

const mockRoles: SearchResult<RoleItem> = {
  items: [
    {
      id: "admin",
      name: "Admin",
      description: "Full system access",
      isSystem: true,
      userCount: 3,
      createdAt: "2025-01-01"
    },
    {
      id: "event_manager",
      name: "Event Manager",
      description: "Manage events and cards",
      isSystem: false,
      userCount: 12,
      createdAt: "2025-02-10"
    },
    {
      id: "staff",
      name: "Staff",
      description: "Check-in and view only",
      isSystem: false,
      userCount: 45,
      createdAt: "2025-03-01"
    },
  ],
  count: 3,
  page: 1,
  pageSize: 20,
  totalCount: 3,
  totalPage: 1,
};

export const getRoleColumns = (
  t: TranslateFn,
  redirectToDetail: (id: string) => void,
  onDeleteRole: (id: string) => void
): Column<RoleItem>[] => [
    {
      key: "id",
      label: t("role.list.table.columns.id"),
      className: "w-20",
      render: (_, item) => (
        <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
      ),
    },
    {
      key: "information",
      label: t("role.list.table.columns.information"),
      className: "min-w-[300px]",
      render: (_, item) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.name}</span>
            {item.isSystem && (
              <Badge variant="secondary" className="text-xs">
                {t("role.system")}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description || t("role.no_description")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("role.user_count", { count: item.userCount })}
          </p>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: t("role.list.table.columns.createdAt"),
      className: "w-[180px]",
      render: (_, item) => (
        <span className="text-sm text-muted-foreground">
          {item.createdAt ? formatDateTime(new Date(item.createdAt)) : "—"}
        </span>
      ),
    },
    {
      key: "action",
      label: t("role.list.table.columns.action"),
      className: "w-[120px] text-right",
      align: "right",
      render: (_, item) => {
        const options = [
          {
            label: t("common.actions.view"),
            action: () => redirectToDetail(item.id),
          },
          {
            label: t("common.actions.delete"),
            action: () => onDeleteRole(item.id),
            className: "text-red-600",
            disabled: item.isSystem,
          },
        ];
        return <DropdownButton options={options} />;
      },
    },
  ];

export const useRoleList = () => {
  const t = useTranslations('permission');
  const locale = useLocale();
  const router = useRouter();

  const {
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
  } = useFilter();

  const redirectToDetail = useCallback((id: string) => {
    router.push(RouteUtil.getRoleDetailUrl(locale, id));
  }, [locale]);

  const onDeleteRole = useCallback((id: string) => {
    console.log('deleted', id);
  }, [locale]);

  const columns = getRoleColumns(t, redirectToDetail, onDeleteRole);

  return {
    columns,
    isLoading: false,
    data: mockRoles,
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
  }
};