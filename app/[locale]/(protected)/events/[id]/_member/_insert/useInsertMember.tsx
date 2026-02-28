"use client";
import { Toast } from "@/components";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

interface FormValues {
  memberId: string;
  assignedRole: string;
}

export const useInsertMember = (eventId: string) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<FormValues>({ memberId: "", assignedRole: "" });

  const onOpen = useCallback(() => { setIsOpen(true); }, [isOpen]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    setInput({ memberId: "", assignedRole: "" });
  }, [isOpen]);

  const onMemberChange = useCallback((memberId: string) => setInput((prev) => ({ ...prev, memberId })), []);
  const onRoleChange = useCallback((assignedRole: string) => setInput((prev) => ({ ...prev, assignedRole })), []);

  const onSubmit = useCallback(async () => {

    Toast.showSuccess(t("common.messages.createSuccess"));
    onClose();
  }, [isOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    memberId: input.memberId,
    onMemberChange,
    assignedRole: input.assignedRole,
    onRoleChange,
    onSubmit,
  };
}