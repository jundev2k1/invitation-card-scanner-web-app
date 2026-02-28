"use client";
import { Toast } from "@/components";
import { useUpdateEventCard } from "@/services";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import z from "zod";

const updateEventMemberSchema = z.object({
  guestName: z.string()
    .nonempty({ message: "Guest name is required" })
    .max(50, { message: "Guest name must be at most 50 characters long" }),
  notes: z.string()
    .max(4000, { message: "Notes must be at most 4000 characters long" }),
});

export const useUpdateMember = (eventId: string, memberId: string, assignedRole: string) => {
  const t = useTranslations();
  const [value, setValue] = useState<string>(assignedRole);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { mutateAsync } = useUpdateEventCard();

  const onOpen = useCallback(() => { setEditMode(true); }, [editMode]);
  const onClose = useCallback(() => { setEditMode(false); }, [editMode]);
  const onCancel = useCallback(() => {
    setValue(assignedRole);
    onClose();
  }, [assignedRole]);

  const onSubmit = useCallback(async () => {
    Toast.showSuccess(t("common.messages.updateSuccess"));
    onClose();
  }, [eventId, memberId, assignedRole]);


  return {
    visible,
    setVisible,
    value,
    setValue,
    onCancel,
    editMode,
    onOpen,
    onSubmit,
  };
}