"use client";
import { CookieStore } from "@/lib/cookies";
import { useThemeStore } from "@/store";
import { Language, ThemeColor, ThemeMode } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ThemeColorStyles = Object.freeze({
  [ThemeColor.DEFAULT]: "#6b7280",
  [ThemeColor.RED]: "#ef4444",
  [ThemeColor.GREEN]: "#10b981",
  [ThemeColor.BLUE]: "#3b82f6",
  [ThemeColor.ORANGE]: "#f97316",
  [ThemeColor.YELLOW]: "#eab308",
  [ThemeColor.ROSE]: "#f43f5e",
  [ThemeColor.VIOLET]: "#8b5cf6",
});

export const useAppearanceSettings = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    theme,
    setTheme,
    language,
    setLanguage,
    color,
    setColor,
  } = useThemeStore();

  const updateThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
    CookieStore.themeMode = mode;
  };

  const updateThemeColor = (color: ThemeColor) => {
    setColor(color);
    CookieStore.themeColor = color;
  };

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    CookieStore.language = lang;

    if (!pathname) return;

    const segments = pathname.split("/");
    segments[1] = lang;

    const newPath = segments.join("/");
    const currentParams = searchParams.toString();
    const finalUrl = currentParams ? `${newPath}?${currentParams}` : newPath;
    router.push(finalUrl);
  };

  return {
    language,
    setLanguage: updateLanguage,
    theme,
    setMode: updateThemeMode,
    color,
    setColor: updateThemeColor,
  };
};
