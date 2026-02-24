"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormDateTimePicker,
  FormTextArea,
  FormTextBox,
  Separator,
  TextBox
} from "@/app/components";
import { PlusCircleIcon } from "@/app/components/icons";
import { EventStatus } from "@/types";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { useInsertModal } from "./useInsertModal";

export function InsertModal() {
  const t = useTranslations();
  const { isOpen, onOpen, onClose, form, onSubmit } = useInsertModal();

  return (
    <>
      <Button
        variant="outline"
        className="dark:text-muted-foreground"
        leftIcon={<PlusCircleIcon />}
        onClick={onOpen}
      >
        {t("common.actions.add")}
      </Button>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl h-[90vh] p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b text-foreground">
                <DialogTitle className="text-xl font-semibold text-accent-foreground">
                  {t("event.insert.title")}
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 pt-2 pb-6 h-[calc(90vh-140px)] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-3">
                  <FormTextBox name="categoryId" label={t('event.insert.fields.category')} containerClassName="w-full" disabled />
                  <TextBox name="status" label={t('event.insert.fields.status')} className="w-full" value={EventStatus.DRAFT} disabled />
                  <FormTextBox name="title" label={t('event.insert.fields.title')} containerClassName="md:col-span-2 w-full col" />
                  <FormDateTimePicker name="startAt" label={t('event.insert.fields.startAt')} />
                  <FormDateTimePicker name="endAt" label={t('event.insert.fields.endAt')} />
                  <FormTextBox name="locationName" label={t('event.insert.fields.location')} containerClassName="md:col-span-2 w-full col" />
                  <FormTextBox name="address" label={t('event.insert.fields.address')} containerClassName="md:col-span-2 w-full col" />
                  <FormTextBox name="mapUrl" label={t('event.insert.fields.mapUrl')} containerClassName="md:col-span-2 w-full col" />

                  <div className="col-span-2">
                    <Separator className="my-4" />
                    <FormTextArea name="description" label={t('event.insert.fields.description')} className="col-span-2 w-full" />
                  </div>
                </div>
              </div>

              <DialogFooter className="shrink-0 p-4 border-t">
                <Button variant="outline" onClick={onClose}>{t("common.actions.cancel")}</Button>
                <Button type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {t("common.actions.save")}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
