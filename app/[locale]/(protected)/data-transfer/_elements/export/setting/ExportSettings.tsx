import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator
} from "@/components";
import { ChevronsRightIcon, PlusIcon, RefreshIcon, SaveIcon } from "@/icons";
import { cn } from "@/root/lib/utils";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { PreviewConfig } from "../../../_shared/preview/PreviewConfig";
import { ExportConfig } from "../../../type";
import { SelectModule } from "../../select-module/SelectModule";
import { SortableExportItem } from "../SortableExportItem";
import { useExportSettings } from "./useExportSettings";

export const ExportSettings = () => {
  const t = useTranslations("dataTransfer");
  const {
    isSettingChanges,
    isEmptySetting,
    configuredColumns,
    availableFields,
    onSettingChange,
    onReset,
    onAddColumn,
    onEditAlias,
    handleDragEnd,
    handleRemoveColumn,
    sensors,
  } = useExportSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("export.title")}</CardTitle>
        <CardDescription>{t("export.desc")}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col min-h-160">
        <SelectModule 
          mode="export" 
          onModuleChange={(conf) => onSettingChange(conf as ExportConfig | null)} 
        />

        <Separator className="my-4" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 grow">
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{t("export.available")}</h3>
            <div className="space-y-2 rounded-lg border p-4 h-full">
              {availableFields.map((field) => (
                <div
                  key={field.id}
                  className={cn("flex items-center justify-between rounded-md border bg-muted/40 p-3")}
                >
                  <div>
                    <div className="font-medium">{field.matchingKey}</div>
                    <div className="text-sm text-muted-foreground">{field.alias}</div>
                  </div>
                  <Button
                    rightIcon={<ChevronsRightIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddColumn(field)}
                  >
                    {t("actions.add")}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t("export.configured")}</h3>
              <div className="flex gap-2">
                <Button
                  leftIcon={<RefreshIcon />}
                  variant="secondary"
                  onClick={onReset}
                  disabled={!isSettingChanges}
                >
                  {t("actions.reset")}
                </Button>
                <PreviewConfig type="export" setting={configuredColumns} disabled={!configuredColumns} />
                <Button 
                  leftIcon={<SaveIcon />} 
                  disabled={!isSettingChanges}
                >
                  {t("actions.save")}
                </Button>
              </div>
            </div>

            {configuredColumns && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={configuredColumns.columns.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {configuredColumns.columns.map((col) => (
                      <SortableExportItem
                        key={col.id}
                        column={col}
                        onEditAlias={onEditAlias}
                        onRemove={handleRemoveColumn}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {isEmptySetting && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="p-12 bg-gray-50 dark:bg-gray-800 border border-dashed rounded-lg text-center">
                  <p className="text-lg font-medium">{t("export.noSettingSelected")}</p>
                  <span className="text-sm">{t("export.pleaseSelectOrAddSetting")}</span>
                </div>
              </div>
            )}

            {!isEmptySetting && (
              <Button 
                leftIcon={<PlusIcon />} 
                variant="outline" 
                className="mt-4 w-full" 
                disabled
              >
                {t("export.addCustom")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
