import { TranslateFn } from "@/root/i18n/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const extract = (pos: string | null) => {
  if (!pos) return null;
  const match = pos.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  return { c: match[1], r: parseInt(match[2], 10) };
};

export const createRangeSchema = (t: TranslateFn) =>
  z.object({
    rangeStart: z.string()
      .regex(/^$|^[A-Z]+[0-9]+$/, t('messages.invalidFormat'))
      .nullable(),
    rangeEnd: z.string()
      .regex(/^$|^[A-Z]+[0-9]+$/, t('messages.invalidFormat'))
      .nullable(),
    autoScaleY: z.boolean()
  }).superRefine((data, ctx) => {
    // If rangeStart and rangeEnd are null, autoScaleY must be true
    if ((data.rangeStart === null || data.rangeEnd === null) && !data.autoScaleY) {
      ctx.addIssue({
        code: "custom",
        message: t('messages.mustEnableAutoScaleForAll'),
        path: ['autoScaleY'],
      });
      return;
    }
    if (!data.rangeStart || !data.rangeEnd) return;

    const s = extract(data.rangeStart);
    const e = extract(data.rangeEnd);
    if (!s || !e) return;

    // Check if rangeStart and rangeEnd are the same
    if (data.rangeStart === data.rangeEnd) {
      ctx.addIssue({
        code: "custom",
        message: t('messages.rangeCannotBeEqual'),
        path: ['rangeEnd'],
      });
    }

    // Check if rangeStart and rangeEnd are in the same row
    if (data.autoScaleY && s.r !== e.r) {
      ctx.addIssue({
        code: "custom",
        message: t('messages.mustBeSameRow'),
        path: ['rangeEnd'],
      });
    }
  });

interface RangeStepForm {
  rangeStart: string | null;
  rangeEnd: string | null;
  autoScaleY: boolean;
}

interface ImportRangeStepForm {
  start: string | null;
  end: string | null;
  onStartChange?: (start: string | null) => void;
  onEndChange?: (end: string | null) => void;
  autoScaleYState?: boolean;
  onAutoScaleYChange?: (autoScaleY: boolean) => void;
}

export const useRangeStepForm = ({
  start,
  onStartChange,
  end,
  onEndChange,
  autoScaleYState,
  onAutoScaleYChange,
}: ImportRangeStepForm) => {
  const tRange = useTranslations('dataTransfer.import.range');

  const form = useForm<RangeStepForm>({
    resolver: zodResolver(createRangeSchema(tRange)),
    defaultValues: {
      rangeStart: start || null,
      rangeEnd: end || null,
      autoScaleY: autoScaleYState || true
    }
  });

  // Sync with props
  useEffect(() => {
    form.setValue('autoScaleY', autoScaleYState || false, { shouldValidate: true });
    form.setValue('rangeStart', start, { shouldValidate: true });
    form.setValue('rangeEnd', end, { shouldValidate: true });
  }, [start, end, autoScaleYState, form]);

  // Handle submit
  const onFormSubmit = useCallback((data: RangeStepForm) => {
    onStartChange?.(data.rangeStart || null);
    onEndChange?.(data.rangeEnd || null);
    onAutoScaleYChange?.(data.autoScaleY);
  }, [start, end, onStartChange, onEndChange, onAutoScaleYChange]);

  return {
    form,
    onFormSubmit,
  };
};
