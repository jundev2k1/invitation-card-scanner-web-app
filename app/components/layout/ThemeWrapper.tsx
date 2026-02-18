"use client";
import { useAppStore } from "@/store/useAppStore";
import { ThemeColor, ThemeMode } from "@/types";
import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, color } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeClass = mounted
    ? `${theme} ${color}`
    : `${ThemeMode.LIGHT} ${ThemeColor.DEFAULT}`;
  return (
    <body className={themeClass}>
      {children}
    </body>
  );
}
