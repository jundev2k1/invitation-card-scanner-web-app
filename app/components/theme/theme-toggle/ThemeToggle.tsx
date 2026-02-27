"use client";
import { MoonIcon, SunIcon } from "@/icons";
import { CookieStore } from "@/lib/cookies";
import { Button } from "@/shadcn/button";
import { useThemeStore } from "@/store";
import { ThemeMode } from "@/types";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore();
  const isDarkMode = theme === ThemeMode.DARK;

  const toggle = () => {
    CookieStore.themeMode = isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK;
    setTheme(isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggle}>
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
