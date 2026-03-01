import {
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

type TreeHookReturn = ReturnType<typeof useCategoryTree>;

interface TreePanelProps {
  tree: TreeHookReturn;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onAddRoot: () => void;
  onAddChild: (parentId: string) => void;
  selectedId: string | null;
}

export function TreePanel({
  tree,
  onView,
  onEdit,
  onAddRoot,
  onAddChild,
  selectedId,
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
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
