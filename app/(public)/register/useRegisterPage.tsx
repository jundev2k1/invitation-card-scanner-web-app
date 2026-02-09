import { Toast } from "@/app/components";
import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { RegisterRequest } from "@/services/auth/auth.type";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useRegisterPage = ({ isSubmitting = false }) => {
  if (CookieStore.accessToken) redirect("/");

  const registerButtonRef = useRef<HTMLButtonElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
      Toast.showSuccess("Register successfully.\nPlease wait for admin approval.");
      setTimeout(() => {
        redirect("/login");
      }, 500);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Enter key submit
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isSubmitting) {
        e.preventDefault();
        registerButtonRef.current?.click();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isSubmitting]);

  return {
    registerButtonRef,
    showPassword,
    setShowPassword,
    onSubmit
  }
}
