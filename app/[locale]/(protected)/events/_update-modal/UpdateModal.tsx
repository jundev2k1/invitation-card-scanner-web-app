"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormDateTimePicker,
  FormSelect,
  FormTextArea,
  FormTextBox,
  Separator,
} from "@/components";
import { PlusCircleIcon } from "@/icons";
import { EventDetailDto } from "@/types";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { FormCategorySelect } from "../../event-categories/_shared";
import { useUpdateModal } from "./useUpdateModal";

type UpdateModalProps = {
  detail: EventDetailDto | null
}

export function UpdateModal({ detail }: UpdateModalProps) {
  const t = useTranslations();
  const { isOpen, onOpen, onClose, form, onSubmit, statusOptions } = useUpdateModal(detail);

  return (
    <>
      <Button
        variant="default"
        className="dark:text-white"
        leftIcon={<PlusCircleIcon />}
        onClick={onOpen}
        disabled={!detail}
      >
        {t("common.actions.edit")}
      </Button>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl h-[90vh] p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b text-foreground">
                <DialogTitle className="text-xl font-semibold text-accent-foreground">
                  {t("event.update.title")}
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 pt-2 pb-6 h-[calc(90vh-140px)] overflow-y-auto">
                <div className="grid md:grid-cols-6 gap-3">
                  <FormCategorySelect
                    name="categoryId"
                    label={t('event.update.fields.category')}
                    containerClassName="md:col-span-4 w-full"
                  />

                  <FormSelect
                    name="status"
                    label={t('event.update.fields.status')}
                    className="w-full"
                    containerClassName="md:col-span-2 gap-0 mb-1 w-full"
                    options={statusOptions}
                  />

                  <FormDateTimePicker
                    name="startAt"
                    label={t('event.update.fields.startAt')}
                    containerClassName="md:col-span-3"
                  />

                  <FormDateTimePicker
                    name="endAt"
                    label={t('event.update.fields.endAt')}
                    containerClassName="md:col-span-3"
                    nullable
                  />

                  <FormTextBox
                    name="locationName"
                    label={t('event.update.fields.location')}
                    containerClassName="md:col-span-6 w-full col"
                  />

                  <FormTextBox
                    name="address"
                    label={t('event.update.fields.address')}
                    containerClassName="md:col-span-6 w-full col"
                  />

                  <FormTextBox
                    name="mapUrl"
                    label={t('event.update.fields.mapUrl')}
                    containerClassName="md:col-span-6 w-full col"
                  />

                  <div className="col-span-6">
                    <Separator className="my-4" />
                    <FormTextArea name="description" label={t('event.update.fields.description')} className="w-full" />
                  </div>
                </div>
              </div>

              <DialogFooter className="shrink-0 p-4 border-t">
                <Button
                  className="dark:text-muted-foreground"
                  variant="outline"
                  onClick={onClose}
                >
                  {t("common.actions.cancel")}
                </Button>
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
