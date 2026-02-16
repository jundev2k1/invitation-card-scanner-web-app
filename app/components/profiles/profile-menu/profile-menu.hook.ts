'use client';
import { RouteUtil } from "@/app/utils/route";
import { CookieStore } from "@/lib/cookies";
import { authService, userService } from "@/services";
import { useAuthStore } from "@/store";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useProfileMenu = () => {
  const locale = useLocale();
  const router = useRouter();

  const { user, setUser } = useAuthStore();
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  useEffect(() => {
    if (user != null) return;

    userService.getProfile().then((res) => {
      if (res.data == null) return;

      const { id, nickName, email, avatarUrl, role } = res.data;
      setUser({ id, nickname: nickName, email, avatar: avatarUrl, role });
    });
  }, []);

  const handleLogout = () => {
    if (CookieStore.accessToken && CookieStore.refreshToken)
      authService.logout();

    CookieStore.accessToken = null;
    CookieStore.refreshToken = null;
    router.push(RouteUtil.getLoginRoute(locale));
  };

  return {
    user,
    isOpenSetting,
    setIsOpenSetting,
    handleLogout,
  };
};
