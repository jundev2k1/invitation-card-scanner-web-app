import { CookieStore } from "@/lib/cookies";
import { useAppStore } from "@/store/useAppStore";
import { Language, ThemeColor, ThemeMode } from "@/types";

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
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    color,
    setColor,
  } = useAppStore();

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
