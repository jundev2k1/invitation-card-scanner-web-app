"use client";
import Providers from "@/root/app/providers";
import { useThemeStore } from "@/store";
import { ThemeColor, ThemeMode } from "@/types";
import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, color } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeClass = mounted
    ? `${theme} ${color}`
    : `${ThemeMode.LIGHT} ${ThemeColor.DEFAULT}`;
  return (
    <body className={themeClass}>
      <Providers>
        {children}
      </Providers>
    </body>
  );
}
