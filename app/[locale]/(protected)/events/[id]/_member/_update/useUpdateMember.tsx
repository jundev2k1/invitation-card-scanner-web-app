"use client";
import { Toast } from "@/components";
import { UpdateEventCardRequest, useUpdateEventCard } from "@/services";
import { EventCardSearchItemDto } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const updateEventMemberSchema = z.object({
  guestName: z.string()
    .nonempty({ message: "Guest name is required" })
    .max(50, { message: "Guest name must be at most 50 characters long" }),
  notes: z.string()
    .max(4000, { message: "Notes must be at most 4000 characters long" }),
});

export const useUpdateMember = (eventId: string, detail: EventCardSearchItemDto, onClose: () => void) => {
  const t = useTranslations();
  const { mutateAsync } = useUpdateEventCard();
  const form = useForm<UpdateEventCardRequest>({
    resolver: zodResolver(updateEventMemberSchema),
    defaultValues: {
      guestName: detail.guestName,
      notes: detail.notes,
    },
  });

  const onSubmit = useCallback(async (data: UpdateEventCardRequest) => {
    await mutateAsync({ eventId, id: detail.id, data });

    Toast.showSuccess(t("common.messages.updateSuccess"));
    onClose();
  }, [eventId, detail.id]);

  return {
    form,
    onSubmit,
  };
}