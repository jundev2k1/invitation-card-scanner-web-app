import { CookieStore } from '@/lib/cookies';
import { ThemeColor, ThemeMode } from '@/types';
import { create } from 'zustand';

type ThemeState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: CookieStore.themeMode,
  setTheme: (theme: ThemeMode) => {
    CookieStore.themeMode = theme;
    set({ theme });
  },
  color: CookieStore.themeColor,
  setColor: (color: ThemeColor) => set({ color }),
}));
