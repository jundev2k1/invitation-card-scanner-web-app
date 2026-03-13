import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator
} from "@/components";
import { ChevronsRightIcon, InfoIcon, PlusIcon, RefreshIcon, SaveIcon } from "@/icons";
import { ModuleEnum } from "@/root/config/import-file";
import { cn } from "@/root/lib/utils";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { PreviewConfig } from "../../../_shared/preview/PreviewConfig";
import { SelectModule } from "../../select-module/SelectModule";
import { SortableExportItem } from "../SortableExportItem";
import { ExportConfig } from "./exportSettings.type";
import { useExportSettings } from "./useExportSettings";

export const ExportSettings = () => {
  const tTransfer = useTranslations("dataTransfer");
  const {
    isSettingChanges,
    isEmptySetting,
    formValues,
    configuredColumns,
    onSettingChange,
    onReset,
    onAddColumn,
    onFormatChange,
    onEditAlias,
    handleDragEnd,
    handleRemoveColumn,
    sensors,
  } = useExportSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tTransfer("export.title")}</CardTitle>
        <CardDescription>{tTransfer("export.desc")}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col min-h-160">
        <SelectModule
          mode="export"
          onModuleChange={(conf) => onSettingChange(conf as ExportConfig | null)}
        />

        <Separator className="my-4" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 grow min-h-80">
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">{tTransfer("export.available")}</h3>
            <div className="space-y-2 rounded-lg border p-4 h-full">
              {configuredColumns.map((field) => (
                <div
                  key={field.matchingKey}
                  className={cn("flex items-center justify-between rounded-md border bg-muted/40 p-3")}
                >
                  <div>
                    <div className="font-medium">{field.matchingKey}</div>
                    <div className="text-sm text-muted-foreground">
                      {tTransfer(`fields.${ModuleEnum[formValues?.module || ModuleEnum.EVENTS]}.${field.matchingKey}`)}
                    </div>
                  </div>
                  <Button
                    rightIcon={<ChevronsRightIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddColumn(field)}
                  >
                    {tTransfer("actions.add")}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{tTransfer("export.configured")}</h3>
              <div className="flex gap-2">
                <Button
                  leftIcon={<RefreshIcon />}
                  variant="secondary"
                  onClick={onReset}
                  disabled={!isSettingChanges}
                >
                  {tTransfer("actions.reset")}
                </Button>
                <PreviewConfig type="export" setting={formValues} disabled={!formValues} />
                <Button
                  leftIcon={<SaveIcon />}
                  disabled={!isSettingChanges}
                >
                  {tTransfer("actions.save")}
                </Button>
              </div>
            </div>

            {formValues && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formValues.columns.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {formValues.columns.map((col) => (
                      <SortableExportItem
                        key={col.id}
                        column={col}
                        onFormatChange={onFormatChange}
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
                  <p className="text-lg font-medium">{tTransfer("export.noSettingSelected")}</p>
                  <span className="text-sm">{tTransfer("export.pleaseSelectOrAddSetting")}</span>
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
                {tTransfer("export.addCustom")}
              </Button>
            )}
          </div>
        </div>

        {/* Helpful instruction block */}
        <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm mt-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                {tTransfer('export.howTo.title')}
              </p>
              <ul className="text-muted-foreground space-y-1.5 list-disc pl-5 text-sm">
                <li>{tTransfer('export.howTo.items.selection')}</li>
                <li>{tTransfer('export.howTo.items.multiExport')}</li>
                <li>{tTransfer('export.howTo.items.reorder')}</li>
                <li>{tTransfer('export.howTo.items.alias')}</li>
                <li>{tTransfer('export.howTo.items.formatting')}</li>
                <li>{tTransfer('export.howTo.items.customField')}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
