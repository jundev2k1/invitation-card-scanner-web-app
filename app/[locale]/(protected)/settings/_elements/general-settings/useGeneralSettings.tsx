import { useForm } from "react-hook-form";

interface GeneralSettingsForm {
  siteName: string;
  slogan: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  keywords: string;
  ogImageUrl: string;
  timezone: string;
  currency: string;
  supportEmail: string;
}

const defaultFormValues = {
  siteName: "",
  slogan: "",
  description: "",
  logoUrl: "",
  faviconUrl: "",
  keywords: "",
  ogImageUrl: "",
  timezone: "",
  currency: "VND",
  supportEmail: "",
}

export const useGeneralSettings = () => {
  const form = useForm<GeneralSettingsForm>({
    defaultValues: defaultFormValues
  });

  const handleSave = async () => {
    console.log("Save General Settings:", form);
  };
  return {
    isLoading: false,
    form,
    handleSave,
  };
};
