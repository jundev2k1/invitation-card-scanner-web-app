"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormTextArea,
  FormTextBox,
} from "@/components";
import { EventCardSearchItemDto } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useUpdateMember } from "./useUpdateMember";

type UpdateMemberProps = {
  eventId: string,
  detail: EventCardSearchItemDto,
  isOpen: boolean,
  onClose: () => void,
};

export const UpdateMember = React.memo(({ eventId, detail, isOpen, onClose }: UpdateMemberProps) => {
  const t = useTranslations();
  const { form, onSubmit } = useUpdateMember(eventId, detail, onClose);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[90vh] p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b text-foreground">
              <DialogTitle className="text-xl font-semibold text-accent-foreground">
                {t("event.cardList.update.title")}
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 pt-2 pb-6 h-[calc(90vh-140px)] overflow-y-auto">
              <div className="flex flex-col gap-4">
                <FormTextBox name="guestName" label={t('event.cardList.update.fields.guestName')} containerClassName="w-full" />
                <FormTextArea name="notes" label={t('event.cardList.update.fields.notes')} className="w-full min-h-50" />
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

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {t("common.actions.save")}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
});
