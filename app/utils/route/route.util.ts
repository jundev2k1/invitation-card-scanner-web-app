import { PageAction } from "@/types";

export class RouteUtil {
  private static readonly LOGIN = "/login";
  private static readonly DASHBOARD = "/dashboard";
  private static readonly USERS = "/users";
  private static readonly EVENTS = "/events";

  // Build with locale
  private static withLocale(locale: string, path: string) {
    return `/${locale}${path}`;
  }

  // =================
  // Public
  // =================
  public static getLoginRoute(locale: string) {
    return this.withLocale(locale, this.LOGIN);
  }

  public static getRegisterRoute(locale: string) {
    return this.withLocale(locale, "/register");
  }

  // =================
  // Protected
  // =================
  public static getDashboardRoute(locale: string) {
    return this.withLocale(locale, this.DASHBOARD);
  }

  public static getUserListRoute(locale: string) {
    return this.withLocale(locale, this.USERS);
  }

  public static getUserDetailUrl(
    locale: string,
    id: string,
    action?: PageAction
  ) {
    return this.withLocale(
      locale,
      `/users/${id}?action=${action || PageAction.VIEW}`
    );
  }

  public static getEventListRoute(locale: string) {
    return this.withLocale(locale, this.EVENTS);
  }

  public static getEventDetailUrl(locale: string, id: string) {
    return this.withLocale(locale, `/events/${id}`);
  }
}
