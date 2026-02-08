import { ThemeColor, ThemeMode } from "@/types";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  THEME_COLOR_COOKIE_KEY,
  THEME_MODE_COOKIE_KEY
} from "./cookie.constant";

export default class CookieStore {
  // Auth
  static get accessToken(): string {
    return Cookies.get(ACCESS_TOKEN_COOKIE_KEY) || '';
  }
  static set accessToken(token: string) {
    Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token);
  }
  static get refreshToken(): string {
    return Cookies.get(REFRESH_TOKEN_COOKIE_KEY) || '';
  }
  static set refreshToken(token: string) {
    Cookies.set(REFRESH_TOKEN_COOKIE_KEY, token);
  }

  // Theme
  static get themeMode(): ThemeMode {
    return (Cookies.get(THEME_MODE_COOKIE_KEY) as ThemeMode) || ThemeMode.LIGHT;
  }
  static set themeMode(theme: ThemeMode) {
    Cookies.set(THEME_MODE_COOKIE_KEY, theme);
  }
  static get themeColor(): ThemeColor {
    return (Cookies.get(THEME_COLOR_COOKIE_KEY) as ThemeColor) || ThemeColor.DEFAULT;
  }
  static set themeColor(theme: ThemeColor) {
    Cookies.set(THEME_COLOR_COOKIE_KEY, theme);
  }
}
