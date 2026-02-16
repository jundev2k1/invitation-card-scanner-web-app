"use client";
import { RouteUtil } from "@/app/utils/route";
import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useLoginPage = () => {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (CookieStore.accessToken) {
      router.replace(RouteUtil.getDashboardRoute(locale));
    }
  }, [locale, router]);

  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToRegisterPage = () => {
    router.push(RouteUtil.getRegisterRoute(locale));
  }

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ username, password });
      if (response.statusCode == 200) {
        CookieStore.accessToken = response.data!.accessToken;
        CookieStore.refreshToken = response.data!.refreshToken;

        router.push(RouteUtil.getDashboardRoute(locale));
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading) {
        loginButtonRef.current?.click();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isLoading]);

  return {
    isLoading,
    loginButtonRef,
    handleLogin,
    redirectToRegisterPage,
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
  };
};
