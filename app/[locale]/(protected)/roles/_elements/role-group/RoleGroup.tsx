import { DataList, SearchTextbox } from "@/root/app/components";
import { useTranslations } from "next-intl";
import { useRoleGroup } from "./useRoleGroup";

export const RoleGroup = () => {
  const tRole = useTranslations('permission.role');
  const {
    columns,
    isLoading,
    data,
    filter,
    onKeywordChange,
    onPageChange,
    onPageSizeChange,
  } = useRoleGroup();
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-2">
          <SearchTextbox
            value={filter.keyword}
            onTextChange={onKeywordChange}
            placeholder={tRole("group.table.search_placeholder")}
          />
        </div>
      </div>
      <DataList
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={tRole("group.table.empty_placeholder")}
        page={filter.page}
        onPageChange={onPageChange}
        pageSize={filter.pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
