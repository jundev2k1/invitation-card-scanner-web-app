import { Language, ThemeColor, ThemeMode } from "@/types";
import Cookies from "js-cookie";
import { addMinutes } from "../datetime/date.util";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  LANGUAGE_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  THEME_COLOR_COOKIE_KEY,
  THEME_MODE_COOKIE_KEY
} from "./cookie.constant";

export default class CookieStore {
  // Auth
  static get accessToken(): string | null {
    return Cookies.get(ACCESS_TOKEN_COOKIE_KEY) || null;
  }
  static set accessToken(token: string | null) {
    if (!token)
      Cookies.remove(ACCESS_TOKEN_COOKIE_KEY);
    else {
      const expires = addMinutes(new Date, 15);
      Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token, { expires: expires });
    }
  }
  static get refreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_COOKIE_KEY) || null;
  }
  static set refreshToken(token: string | null) {
    if (!token)
      Cookies.remove(REFRESH_TOKEN_COOKIE_KEY);
    else
      Cookies.set(REFRESH_TOKEN_COOKIE_KEY, token, { expires: 7 });
  }

  // Language
  static get language(): Language {
    return Cookies.get(LANGUAGE_COOKIE_KEY) as Language || Language.ENGLISH;
  }
  static set language(language: Language) {
    Cookies.set("language", language);
  }

  // Theme
  static get themeMode(): ThemeMode {
    return Cookies.get(THEME_MODE_COOKIE_KEY) as ThemeMode || ThemeMode.LIGHT;
  }
  static set themeMode(theme: ThemeMode) {
    Cookies.set(THEME_MODE_COOKIE_KEY, theme);
  }
  static get themeColor(): ThemeColor {
    return Cookies.get(THEME_COLOR_COOKIE_KEY) as ThemeColor || ThemeColor.DEFAULT;
  }
  static set themeColor(theme: ThemeColor) {
    Cookies.set(THEME_COLOR_COOKIE_KEY, theme);
  }
}
