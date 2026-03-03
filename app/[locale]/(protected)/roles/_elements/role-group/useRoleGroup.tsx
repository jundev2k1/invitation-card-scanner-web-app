import { Badge, Column, DropdownButton, TruncatedText, useFilter } from "@/components";
import { TranslateFn } from "@/i18n/type";
import { formatDateTime } from "@/lib/datetime/date.util";
import { SearchResult } from "@/types";
import { RouteUtil } from "@/utils/route";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface RoleGroupItem {
  id: string;
  name: string;
  description: string;
  roleCount: number;
  roles: string[];
  userCount: number;
  createdAt: string;
}

const mockData: SearchResult<RoleGroupItem> = {
  items: [
    {
      id: "1",
      name: "Group 1",
      description: "Description 1",
      roleCount: 3,
      roles: ["Role 1", "Role 2", "Role 3"],
      userCount: 10,
      createdAt: "2023-01-01",
    },
    {
      id: "2",
      name: "Group 2",
      description: "Description 2",
      roleCount: 2,
      roles: ["Role 4", "Role 5"],
      userCount: 5,
      createdAt: "2023-01-02",
    },
  ],
  count: 2,
  page: 1,
  pageSize: 20,
  totalCount: 2,
  totalPage: 1,
}

export const getRoleGroupColumns = (
  t: TranslateFn,
  redirectToDetail: (id: string) => void,
  onDeleteGroup: (id: string) => void
): Column<RoleGroupItem>[] => [
    {
      key: "id",
      label: t("role.group.table.columns.id"),
      className: "w-20",
      render: (_, item) => (
        <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
      ),
    },
    {
      key: "information",
      label: t("role.group.table.columns.information"),
      className: "min-w-[350px]",
      render: (_, item) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.name}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description || t("role.group.no_description")}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.roles.slice(0, 3).map((roleName) => (
              <Badge key={roleName} variant="outline" className="text-xs">
                {roleName}
              </Badge>
            ))}
            {item.roles.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.roles.length - 3}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("role.group.user_count", { count: item.userCount })}
          </p>
        </div>
      ),
    },
    {
      key: "roleCount",
      label: t("role.group.table.columns.roleCount"),
      className: "w-[140px] text-center",
      align: "center",
      render: (_, item) => (
        <Badge variant="secondary">{t("role.group.role_count", { count: item.roleCount })}</Badge>
      ),
    },
    {
      key: "createdAt",
      label: t("role.group.table.columns.createdAt"),
      className: "w-[180px]",
      render: (_, item) => (
        <span className="text-sm text-muted-foreground">
          {item.createdAt ? formatDateTime(new Date(item.createdAt)) : "—"}
        </span>
      ),
    },
    {
      key: "action",
      label: t("role.group.table.columns.action"),
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
            action: () => onDeleteGroup(item.id),
            className: "text-red-600",
          },
        ];
        return <DropdownButton options={options} />;
      },
    },
  ];

export const useRoleGroup = () => {
  const t = useTranslations('permission');
  const locale = useLocale();
  const router = useRouter();

  const {
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
  } = useFilter();

  const redirectToDetail = (id: string) => {
    router.push(RouteUtil.getRoleGroupRoute(locale));
  };
  const onDeleteGroup = (id: string) => {
    console.log('deleted', id);
  };

  const columns = getRoleGroupColumns(t, redirectToDetail, onDeleteGroup);

  return {
    columns,
    isLoading: false,
    data: mockData,
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange
  }
};
