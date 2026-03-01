"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormSwitch,
  FormTextArea,
  FormTextBox,
  IconButton
} from "@/components";
import { XIcon } from "@/icons";
import { PageAction } from "@/types";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { findNodeById } from "../mockCategories";
import { useInsertCategory } from "./useInsertCategory";
import { useUpdatetCategory } from "./useUpdateCategory";

interface DetailCardProps {
  action: PageAction | null;
  selectedId: string | null;
  parentIdForInsert: string | null;
  onClose: () => void;
}

export function DetailCard({ action, selectedId, parentIdForInsert, onClose }: DetailCardProps) {
  const t = useTranslations("eventCategory");
  const { form, onSubmit } = action == PageAction.CREATE
    ? useInsertCategory()
    : useUpdatetCategory();

  if (!action) {
    return (
      <Card className="h-full flex items-center justify-center text-muted-foreground">
        <p>{t("form.selectOrAdd")}</p>
      </Card>
    );
  }

  const node = selectedId ? findNodeById(selectedId) : null;
  const isInsert = action === PageAction.CREATE;

  const title =
    action === PageAction.VIEW ? t("card.view.title") :
      action === PageAction.EDIT ? t("card.edit.title") :
        t("card.insert.title");

  const canEdit = action !== PageAction.VIEW;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <IconButton
            icon={<XIcon />}
            variant="ghost"
            size="icon" onClick={onClose}
          />
        </div>
        {isInsert && parentIdForInsert && (
          <p className="text-sm text-muted-foreground">
            {t("card.insert.underParent")}: {findNodeById(parentIdForInsert)?.name || t("placeholder.root")}
          </p>
        )}
      </CardHeader>

      <CardContent className="">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <FormTextBox
                name="name"
                label={t("card.fields.name.label")}
                placeholder={t("card.fields.slug.placeholder")}
                readOnly={!canEdit}
              />

              <FormTextBox
                name="slug"
                label={t("card.fields.slug.label")}
                placeholder={t("card.fields.slug.placeholder")}
                readOnly={!canEdit}
              />

              <FormTextArea
                name="description"
                label={t("card.fields.description.label")}
                defaultValue={node?.description || ""}
                readOnly={!canEdit}
                rows={4}
                placeholder={t("card.fields.description.placeholder")}
              />

              <FormTextBox
                name="imageUrl"
                label={t("card.fields.imageUrl.label")}
                placeholder={t("card.fields.imageUrl.placeholder")}
                readOnly={!canEdit}
              />

              <FormSwitch
                name="status"
                label={t("card.fields.status.label")}
                disabled={!canEdit}
              />
            </div>
            {canEdit && (
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  {t("actions.cancel")}
                </Button>
                <Button>
                  {action === PageAction.EDIT ? t("actions.save") : t("actions.create")}
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
