import { PageAction } from "@/types";
import { redirect } from "next/navigation";

export class RouteUtil {
  // =========================
  // Public Routes
  // =========================

  // Login
  private static readonly LOGIN = "/login";
  public static getLoginRoute() { return this.LOGIN };
  public static redirectToLogin() { redirect(this.LOGIN); };
  private static readonly REGISTER = "/register";
  public static getRegisterRoute() { return this.REGISTER };
  public static redirectToRegister() { redirect(this.REGISTER); };

  // =========================
  // Protected Routes
  // =========================

  // Dashboard Route
  private static readonly DASHBOARD = "/dashboard";
  public static getDashboardRoute() { return this.DASHBOARD };
  public static redirectToDashboard() { redirect(this.DASHBOARD); };

  // Users Route
  private static readonly USERS = "/users";
  public static getUserListRoute() { return this.USERS };
  public static redirectToUserList() { redirect(this.USERS); };
  public static getUserDetailUrl(id: string, action?: PageAction) { return `/users/${id}?action=${action || PageAction.VIEW}`; }
  public static redirectToUserDetail(id: string, action?: PageAction) { redirect(this.getUserDetailUrl(id, action)); };

  // Event Categories Route
  private static readonly EVENT_CATEGORIES = "/event-categories";
  public static getEventCategoryListRoute() { return this.EVENT_CATEGORIES };

  // Events Route
  private static readonly EVENTS = "/events";
  public static getEventListRoute() { return this.EVENTS };
  public static getEventDetailUrl(id: string) { return `/events/${id}`; }
}
