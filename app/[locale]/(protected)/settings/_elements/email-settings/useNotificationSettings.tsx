import { useForm } from "react-hook-form";

interface NotificationSettingsRequest {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  fromEmail: string;
  zaloOAID: string;
  zaloOAToken: string;
  enableZalo: boolean;
}

const defaultFormValues = {
  smtpHost: "",
  smtpPort: "",
  smtpUser: "",
  smtpPass: "",
  fromEmail: "",
  zaloOAID: "",
  zaloOAToken: "",
  enableZalo: false,
}

export const useNotificationSettings = () => {
  const form = useForm<NotificationSettingsRequest>({
    defaultValues: defaultFormValues
  });
  const handleSave = async () => {
    console.log("Save Email Settings:", form);
  };
  return {
    isLoading: false,
    form,
    handleSave,
  };
}
