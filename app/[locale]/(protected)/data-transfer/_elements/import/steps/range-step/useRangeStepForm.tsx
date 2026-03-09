import { TranslateFn } from "@/root/i18n/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { RangeStepFormValues } from "../../setting/importSettings.type";

export const extract = (pos: string | null) => {
  if (!pos) return null;
  const match = pos.match(/^([A-Z]+)([0-9]+)$/);
  if (!match || match.length !== 3) return null;
  return { c: match[1], r: parseInt(match[2], 10) };
};

export const columnToNumber = (col: string): number => {
  const upperCol = col.toUpperCase();
  let result = 0;
  for (let i = 0; i < upperCol.length; i++) {
    const charCode = upperCol.charCodeAt(i) - 64;
    result = result * 26 + charCode;
  }
  return result;
};

export const createRangeSchema = (tValidateMsg: TranslateFn) =>
  z.object({
    rangeStart: z.string()
      .regex(/^$|^[A-Z]+[0-9]+$/, tValidateMsg('invalidFormat'))
      .nullable(),
    rangeEnd: z.string()
      .regex(/^$|^[A-Z]+[0-9]+$/, tValidateMsg('invalidFormat'))
      .nullable(),
    autoScaleY: z.boolean()
  }).superRefine((data, ctx) => {
    // If rangeStart and rangeEnd are null, autoScaleY must be true
    if ((data.rangeStart === null || data.rangeEnd === null) && !data.autoScaleY) {
      ctx.addIssue({
        code: "custom",
        message: tValidateMsg('mustEnableAutoScaleForAll'),
        path: ['autoScaleY'],
      });
      return;
    }
    if (!data.rangeStart || !data.rangeEnd) {
      if (!data.autoScaleY) {
        ctx.addIssue({
          code: "custom",
          message: tValidateMsg('mustEnableAutoScaleForAll'),
          path: ['autoScaleY'],
        });
      }
      return;
    }

    const s = extract(data.rangeStart);
    const e = extract(data.rangeEnd);
    if (!s || !e) return;

    // Check if rangeStart and rangeEnd are the same
    if (data.rangeStart === data.rangeEnd) {
      ctx.addIssue({
        code: "custom",
        message: tValidateMsg('rangeCannotBeEqual'),
        path: ['rangeEnd'],
      });
    }

    // Check if rangeStart and rangeEnd are in the same row
    if (data.autoScaleY && s.r !== e.r) {
      ctx.addIssue({
        code: "custom",
        message: tValidateMsg('mustBeSameRow'),
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
  rangeStepForm: RangeStepFormValues;
  onRangeFormChange: (data: RangeStepFormValues) => void;
}

export const useRangeStepForm = ({ rangeStepForm, onRangeFormChange }: ImportRangeStepForm) => {
  const tValidateMsg = useTranslations('dataTransfer.import.validate.messages');
  const form = useForm<RangeStepForm>({
    resolver: zodResolver(createRangeSchema(tValidateMsg)),
    defaultValues: {
      rangeStart: rangeStepForm.rangeStart || null,
      rangeEnd: rangeStepForm.rangeEnd || null,
      autoScaleY: rangeStepForm.autoScaleY || true
    }
  });

  useEffect(() => {
    form.trigger(['autoScaleY', 'rangeStart', 'rangeEnd']);
  }, []);

  const watchedValues = form.watch();
  useEffect(() => {
    form.reset(watchedValues);
  }, [
    watchedValues.rangeStart,
    watchedValues.rangeEnd,
    watchedValues.autoScaleY,
  ]);

  // Handle submit
  const onFormSubmit = useCallback(({
    rangeStart,
    rangeEnd,
    autoScaleY
  }: {
    rangeStart?: string | null;
    rangeEnd?: string | null;
    autoScaleY?: boolean;
  }) => {
    let autoScaleFlg = autoScaleY === undefined ? form.getValues('autoScaleY') : autoScaleY;
    if (form.getValues('rangeStart') == null && form.getValues('rangeEnd') == null) {
      autoScaleFlg = true;
      form.setValue('autoScaleY', true);
    }

    onRangeFormChange?.({
      rangeStart: rangeStart === undefined ? rangeStepForm.rangeStart : rangeStart || null,
      rangeEnd: rangeEnd === undefined ? rangeStepForm.rangeEnd : rangeEnd || null,
      autoScaleY: autoScaleFlg
    });
    form.trigger(['autoScaleY', 'rangeStart', 'rangeEnd']);
  }, [rangeStepForm, onRangeFormChange]);

  return {
    form,
    onFormSubmit,
  };
};
