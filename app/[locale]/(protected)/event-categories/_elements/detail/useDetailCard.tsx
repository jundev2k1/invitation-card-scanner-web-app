import { Toast } from "@/root/app/components";
import { CreateEventCategoryRequest, UpdateEventCategoryRequest, useCreateEventCategory, useDeleteEventCategory, useUpdateEventCategory } from "@/root/services";
import { EventCategorySearchItemDto, PageAction } from "@/root/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const insertEventCategorySchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  slug: z.string()
    .min(3, { message: "Slug must be at least 3 characters long" })
    .max(50, { message: "Slug must be at most 50 characters long" }),
  description: z.string()
    .max(4000, { message: "Description must be at most 4000 characters long" }),
});

interface EventCategoryInput {
  name: string;
  slug: string;
  description: string;
}

type useDetailCardProps = {
  selectedItem: EventCategorySearchItemDto | null,
  action: PageAction | null,
  nextId: string | null;
  onClose: () => void
};

export const useDetailCard = ({ selectedItem, action, nextId, onClose }: useDetailCardProps) => {
  const t = useTranslations();
  const { mutateAsync: createFn } = useCreateEventCategory();
  const { mutateAsync: updateFn } = useUpdateEventCategory();
  const { mutateAsync: deleteFn } = useDeleteEventCategory();
  const form = useForm<EventCategoryInput>({
    resolver: zodResolver(insertEventCategorySchema)
  });

  const isCreate = action === PageAction.CREATE;
  useEffect(() => {
    form.setValue('name', !isCreate ? selectedItem?.name || '' : '');
    form.setValue('slug', !isCreate ? selectedItem?.slug || '' : '');
    form.setValue('description', !isCreate ? selectedItem?.description || '' : '');
  }, [selectedItem, action, nextId]);

  const onSubmit = useCallback(async (data: EventCategoryInput) => {
    if (action === PageAction.CREATE) {
      // Handle create
      const request = {
        parentId: selectedItem?.id ?? "ROOT",
        cateId: nextId,
        name: data.name.trim(),
        slug: data.slug.trim(),
        description: data.description.trim(),
        sortOrder: selectedItem && selectedItem.items.length > 0
          ? Math.max(...selectedItem!.items.map(i => i.sortOrder)) + 1
          : 1,
      } as CreateEventCategoryRequest;
      await createFn(request);
      Toast.showSuccess(t('common.messages.createSuccess'));
      onClose();
    } else {
      // Handle update
      const request = {
        name: data.name.trim(),
        slug: data.slug.trim(),
        description: data.description.trim(),
        sortOrder: selectedItem!.sortOrder,
      } as UpdateEventCategoryRequest;
      await updateFn({ id: selectedItem!.id, data: request });
      Toast.showSuccess(t('common.messages.updateSuccess'));
    }
  }, [selectedItem, nextId, action]);

  const onDelete = useCallback(async () => {
    if (action !== PageAction.VIEW || !selectedItem)
      return;

    const count = selectedItem.items.length;
    if (count > 0
      ? !window.confirm(t('eventCategory.card.messages.confirmDelete', { count }))
      : !window.confirm(t('common.messages.confirmDelete'))
    ) return;

    await deleteFn(selectedItem!.id);
    Toast.showSuccess(t('common.messages.deleteSuccess'));
    onClose();
  }, [selectedItem]);

  return {
    form,
    onSubmit,
    onDelete,
  };
};
