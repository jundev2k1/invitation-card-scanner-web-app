import {
  BaseFilter,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components";
import { PlusIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { CategoryTree } from "../category-tree/CategoryTree";
import { useCategoryTree } from "../hooks/useCategoryTree";
import { TreePagination } from "./TreePagination";

type TreeHookReturn = ReturnType<typeof useCategoryTree>;

interface TreePanelProps {
  tree: TreeHookReturn;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onAddRoot: () => void;
  onAddChild: (parentId: string) => void;
  selectedId: string | null;
  filter: BaseFilter;
  totalPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function TreePanel({
  tree,
  onView,
  onEdit,
  onAddRoot,
  onAddChild,
  selectedId,
  filter,
  totalPage,
  onPageChange,
  onPageSizeChange,
}: TreePanelProps) {
  const t = useTranslations("eventCategory");

  if (tree.roots.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h4 className="text-lg">
                {t("tree.title")}
              </h4>
              <div>
                <Button
                  leftIcon={<PlusIcon />}
                  onClick={onAddRoot}
                >
                  {t("actions.addRoot")}
                </Button>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("tree.title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <div className="grow">
          <CategoryTree
            nodes={tree.roots}
            expanded={tree.expanded}
            loading={tree.loading}
            toggleExpand={tree.toggleExpand}
            onView={onView}
            onEdit={onEdit}
            onAddChild={onAddChild}
            selectedId={selectedId}
          />
        </div>
        <div className="mt-20 flex justify-end">
          <TreePagination
            page={filter.page}
            totalPage={totalPage}
            pageSize={filter.pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
