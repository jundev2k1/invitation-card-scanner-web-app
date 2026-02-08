import { CookieStore } from '@/lib/cookies';
import { Language, ThemeColor, ThemeMode } from '@/types';
import { create } from 'zustand';

type ThemeState = {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
};

export const useAppStore = create<ThemeState>((set) => ({
  language: CookieStore.language,
  setLanguage: (language: Language) => set({ language }),
  theme: CookieStore.themeMode,
  setTheme: (theme: ThemeMode) => {
    CookieStore.themeMode = theme;
    set({ theme });
  },
  color: CookieStore.themeColor,
  setColor: (color: ThemeColor) => set({ color }),
}));
