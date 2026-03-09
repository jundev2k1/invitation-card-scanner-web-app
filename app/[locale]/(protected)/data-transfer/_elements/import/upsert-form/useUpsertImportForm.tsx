import { Toast } from "@/components";
import { ImportConfig } from "@/root/config/import-file";
import { TranslateFn } from "@/root/i18n/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { mockFetchImportConfigs } from "../../../type";
import { ConfigInfoFormValues } from "../setting/importSettings.type";
import { InsertImportFormProps } from "./UpsertImportForm";

const onFetchDetail = (id: string): Promise<ImportConfig | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = mockFetchImportConfigs.find(i => i.id == id);
      resolve(res || null);
    }, 300);
  })
};

const createConfigInfoSchema = (tValidate: TranslateFn) => {
  return z.object({
    name: z.string().nonempty({ message: tValidate('common.required') }).max(255, { message: tValidate('length.maxLength', { max: 255 }) }),
    description: z.string().max(4000, { message: tValidate('length.maxLength', { max: 4000 }) }),
  })
};

export const useUpsertImportForm = ({ module, formValues, onInsertSuccess, onConfigInfoChange }: InsertImportFormProps) => {
  const tMessage = useTranslations('common.messages');
  const tValidate = useTranslations('validate');
  const schema = createConfigInfoSchema(tValidate);
  const form = useForm<ConfigInfoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formValues?.configInfo.name || '',
      description: formValues?.configInfo.description || '',
    }
  });

  useEffect(() => {
    form.clearErrors();
    form.reset({
      name: formValues?.configInfo.name || '',
      description: formValues?.configInfo.description || '',
    });
  }, [module, formValues, onInsertSuccess]);

  const onSubmit = useCallback(async (data: ConfigInfoFormValues) => {
    if (!formValues || !formValues.id) {
      // Handle create config and refetch config
      const newestData = await onFetchDetail('550e8400-e29b-41d4-a716-446655440000');
      if (!newestData) return;

      onInsertSuccess({
        module,
        id: newestData.id,
        configInfo: {
          name: newestData.configInfo.name || '',
          description: newestData.configInfo.description || '',
        },
        uploadStep: null,
        rangeStep: null,
        mappingStep: null
      });
      Toast.showSuccess(tMessage('createSuccess'));
    } else {
      // Handle update form if successful
      onConfigInfoChange?.({ name: data.name, description: data.description });
      Toast.showSuccess(tMessage('updateSuccess'));
    }
  }, [module, formValues, onInsertSuccess]);

  return {
    form,
    onSubmit,
  }
}
