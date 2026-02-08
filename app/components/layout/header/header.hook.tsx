import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { redirect } from "next/navigation";
import { useState } from "react";

export const useHeader = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const handleLogout = () => {
    if (CookieStore.accessToken && CookieStore.refreshToken)
      authService.logout();

    CookieStore.accessToken = null;
    CookieStore.refreshToken = null;
    redirect("/login");
  };
  return {
    isOpenSetting,
    setIsOpenSetting,
    handleLogout,
  };
}
