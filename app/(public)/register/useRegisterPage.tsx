import { Toast } from "@/app/components";
import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { RegisterRequest } from "@/services/auth/auth.type";
import { Sex } from "@/types/enum/sex.enum";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useRegisterPage = () => {
  if (CookieStore.accessToken) redirect("/");

  const registerButtonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    nickname: "",
    phoneNumber: "",
    sex: Sex.MALE,
    bio: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSexChange = (value: Sex) => {
    setFormData((prev) => ({ ...prev, sex: value }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      nickname: "",
      phoneNumber: "",
      sex: Sex.MALE,
      bio: "",
    });
    setError(null);
    setShowPassword(false);
  };

  const handleRegister = async () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill in all required fields (username, email, password)");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.register(formData);

      // Handle success
      Toast.showSuccess("Register successfully.\nPlease wait for admin approval.");
      setTimeout(() => {
        redirect("/login");
      }, 500);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter key submit
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading) {
        e.preventDefault();
        registerButtonRef.current?.click();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isLoading]);

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    error,
    handleChange,
    handleSexChange,
    handleRegister,
    registerButtonRef,
    resetForm,
  }
}
