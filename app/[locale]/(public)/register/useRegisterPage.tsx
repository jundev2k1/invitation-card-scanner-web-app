import { Toast } from "@/app/components";
import { RouteUtil } from "@/app/utils/route";
import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { RegisterRequest } from "@/services/auth/auth.type";
import { Sex } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "./register.schema";

export const useRegisterPage = () => {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (CookieStore.accessToken) {
      router.replace(RouteUtil.getDashboardRoute(locale));
    }
  }, [locale, router]);

  const registerButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      nickname: "",
      phoneNumber: "",
      sex: Sex.MALE,
      bio: "",
    }
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await authService.register(data);
      Toast.showSuccess("Register successfully.\nPlease wait for admin approval.");
      setTimeout(() => {
        router.push(RouteUtil.getLoginRoute(locale));
      }, 500);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Enter key submit
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !form.formState.isSubmitting) {
        e.preventDefault();
        registerButtonRef.current?.click();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [form.formState.isSubmitting]);

  const redirectToLoginPage = () => {
    router.push(RouteUtil.getLoginRoute(locale));
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    registerButtonRef,
    onSubmit,
    redirectToLoginPage
  }
}
