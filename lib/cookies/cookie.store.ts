import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, THEME_COLOR_COOKIE_KEY, THEME_MODE_COOKIE_KEY } from "./cookie.constant";
import { ThemeColor, ThemeMode } from "./cookie.type";

export default class CookieStore {
  // Auth
  static get accessToken() {
    return Cookies.get(ACCESS_TOKEN_COOKIE_KEY);
  }
  static set setAccessToken(token: string) {
    Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token);
  }
  static get refreshToken() {
    return Cookies.get(REFRESH_TOKEN_COOKIE_KEY);
  }
  static set setRefreshToken(token: string) {
    Cookies.set(REFRESH_TOKEN_COOKIE_KEY, token);
  }

  // Theme
  static get themeMode(): ThemeMode {
    return Cookies.get(THEME_MODE_COOKIE_KEY) as ThemeMode;
  }
  static set setThemeMode(theme: ThemeMode) {
    Cookies.set(THEME_MODE_COOKIE_KEY, theme);
  }
  static get themeColor(): ThemeColor {
    return Cookies.get(THEME_COLOR_COOKIE_KEY) as ThemeColor;
  }
  static set setThemeColor(theme: ThemeColor) {
    Cookies.set(THEME_COLOR_COOKIE_KEY, theme);
  }
}
