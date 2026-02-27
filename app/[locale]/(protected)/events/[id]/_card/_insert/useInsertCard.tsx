"use client";
import { Toast } from "@/components";
import { useCreateEventCard } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface CreateEventCardRequest {
  guestName: string;
  notes: string
}

const insertEventCardSchema = z.object({
  guestName: z.string()
    .nonempty({ message: "Guest name is required" })
    .max(50, { message: "Guest name must be at most 50 characters long" }),
  notes: z.string()
    .max(4000, { message: "Notes must be at most 4000 characters long" }),
});

export const useInsertCard = (eventId: string) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutateAsync } = useCreateEventCard();
  const form = useForm<CreateEventCardRequest>({
    resolver: zodResolver(insertEventCardSchema),
    defaultValues: {
      guestName: "",
      notes: "",
    },
  });

  const onOpen = useCallback(() => { setIsOpen(true); }, [isOpen]);
  const onClose = useCallback(() => {
    form.reset();
    setIsOpen(false);
  }, [isOpen]);

  const onSubmit = useCallback(async (data: CreateEventCardRequest) => {
    await mutateAsync({ eventId, data });

    Toast.showSuccess(t("common.messages.createSuccess"));
    onClose();
  }, [isOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    form,
    onSubmit,
  };
}