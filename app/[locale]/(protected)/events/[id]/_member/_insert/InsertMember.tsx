"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TextArea
} from "@/components";
import { FilePlusIcon } from "@/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { UserSuggestionInput } from "../../../../users/_shared";
import { useInsertMember } from "./useInsertMember";

type InsertCardProps = {
  eventId: string,
};

export const InsertMember = React.memo(({ eventId }: InsertCardProps) => {
  const t = useTranslations();
  const {
    isOpen,
    onOpen,
    onClose,
    memberId,
    onMemberChange,
    assignedRole,
    onRoleChange,
    onSubmit,
  } = useInsertMember(eventId);
  return (
    <>
      <Button
        variant="outline"
        className="dark:text-muted-foreground"
        leftIcon={<FilePlusIcon />}
        disabled={isOpen}
        onClick={onOpen}
      >
        {t("event.memberList.actions.add")}
      </Button>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm h-[90vh] p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b text-foreground">
            <DialogTitle className="text-xl font-semibold text-accent-foreground">
              {t("event.memberList.insert.title")}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pt-2 pb-6 h-[calc(90vh-140px)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <UserSuggestionInput
                label={t('event.memberList.insert.fields.memberInfo')}
                value={memberId}
                onValueChange={onMemberChange}
              />
              <TextArea
                label={t('event.memberList.insert.fields.memberRole')}
                className="w-full min-h-50"
                value={assignedRole}
                onChange={(e) => onRoleChange(e.target.value)}
              />
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

            <Button type="submit">
              {t("common.actions.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});
