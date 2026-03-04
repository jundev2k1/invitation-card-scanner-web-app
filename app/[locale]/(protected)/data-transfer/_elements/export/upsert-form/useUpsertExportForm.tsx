import { Toast } from "@/components";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ExportConfig, mockFetchExportConfigs, ModuleEnum } from "../../../type";
import { InsertExportFormProps } from "./UpsertExportForm";

const onFetchDetail = (id: string): Promise<ExportConfig | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = mockFetchExportConfigs.find(i => i.id == id);
      resolve(res || null);
    }, 300);
  })
};

interface ExportConfigForm {
  module: ModuleEnum;
  name: string;
  description?: string;
  includesActionColumn?: boolean;
}

export const useUpsertExportForm = ({ module, setting, onSuccess }: InsertExportFormProps) => {
  const tMessage = useTranslations('common.messages');
  const form = useForm<ExportConfigForm>();

  useEffect(() => {
    form.clearErrors();
    form.reset({
      module,
      name: setting?.name || '',
      description: setting?.description || '',
      includesActionColumn: setting?.includesActionColumn || false
    });
  }, [setting]);

  const onSubmit = async (data: ExportConfigForm) => {
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
