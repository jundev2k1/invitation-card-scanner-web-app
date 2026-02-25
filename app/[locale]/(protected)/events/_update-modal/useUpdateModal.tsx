"use client";
import { Toast } from "@/app/components";
import { useUpdateEvent } from "@/services";
import { UpdateEventRequest } from "@/services/event/event.type";
import { EventDetailDto } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const updateModalSchema = z.object({
  categoryId: z.string().nullable(),
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(30, { message: "Title must be at most 30 characters long" }),
  description: z.string()
    .max(4000, { message: "Description must be at most 4000 characters long" }),
  startAt: z.date({ message: "Start date must be date type" }),
  endAt: z.date({ message: "End date must be date type" }).nullable(),
  locationName: z.string()
    .nonempty({ message: "Location name is required" })
    .max(50, { message: "Location name must be at most 50 characters long" }),
  address: z.string()
    .nonempty({ message: "Address is required" })
    .max(255, { message: "Address must be at most 255 characters long" }),
  mapUrl: z.string().url({ message: "Map URL must be a valid URL" }),
  thumbnailUrl: z.string(),
}).refine((data) => !data.endAt || data.endAt > data.startAt, {
  message: "End date must be after start date",
  path: ["endAt"],
});

export function useUpdateModal(detail: EventDetailDto | null) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<UpdateEventRequest>({
    resolver: zodResolver(updateModalSchema),
    defaultValues: {
      categoryId: detail?.categoryId || '',
      title: detail?.title || '',
      description: detail?.description || '',
      startAt: detail?.startAt || new Date(),
      endAt: detail?.endAt || null,
      locationName: detail?.locationName || '',
      address: detail?.address || '',
      mapUrl: detail?.mapUrl || '',
      thumbnailUrl: detail?.thumbnailUrl || '',
    },
  });
  const { mutateAsync } = useUpdateEvent();

  const onOpen = () => { setIsOpen(true); }

  const onClose = () => {
    form.reset();
    setIsOpen(false);
  }

  const onSubmit = async (data: UpdateEventRequest) => {
    if (!detail) return;
    
    const { categoryId, endAt, ...params } = data;
    await mutateAsync({
      id: detail.id,
      data: {
        categoryId: categoryId || null,
        endAt: endAt || null,
        ...params,
      }
    });

    onClose();
    Toast.showSuccess(t("common.messages.updateSuccess"));
  }

  return {
    isOpen,
    onOpen,
    onClose,
    form,
    onSubmit,
  };
}
