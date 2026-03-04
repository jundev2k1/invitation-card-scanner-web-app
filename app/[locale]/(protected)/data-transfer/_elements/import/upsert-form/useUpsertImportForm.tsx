import { Toast } from "@/components";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExportConfig, mockFetchExportConfigs, ModuleEnum } from "../../../type";
import { InsertExportFormProps as InsertImportFormProps } from "./UpsertImportForm";

const onFetchDetail = (id: string): Promise<ExportConfig | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = mockFetchExportConfigs.find(i => i.id == id);
      resolve(res || null);
    }, 300);
  })
};

interface ImportConfigForm {
  module: ModuleEnum;
  name: string;
  description?: string;

}

export const useUpsertImportForm = ({ module, setting, onSuccess }: InsertImportFormProps) => {
  const tMessage = useTranslations('common.messages');
  const form = useForm<ImportConfigForm>();

  useEffect(() => {
    form.clearErrors();
    form.reset({
      module,
      name: setting?.name || '',
      description: setting?.description || '',

    });
  }, [setting]);

  const onSubmit = async (data: ImportConfigForm) => {
    Toast.showSuccess(tMessage('createSuccess'));

    const newestData = await onFetchDetail('987fcdeb-1234-5678-9abc-def012345678');
    if (!newestData) return;

    onSuccess?.(newestData);
  }

  return {
    form,
    onSubmit,
  }
}
