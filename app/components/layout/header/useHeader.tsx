import { CookieStore } from "@/lib/cookies";
import { authService } from "@/services";
import { redirect } from "next/navigation";

export const useHeader = () => {
  const handleLogout = () => {
    if (CookieStore.accessToken && CookieStore.refreshToken)
      authService.logout();

    CookieStore.accessToken = null;
    CookieStore.refreshToken = null;
    redirect("/login");
  };
  return { handleLogout };
}