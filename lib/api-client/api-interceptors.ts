import { Toast } from "@/app/components";
import { RouteUtil } from "@/app/utils/route";
import { api } from "@/lib/api-client/api";
import { CookieStore } from "@/lib/cookies";
import { useAuthStore } from '@/store';
import { HttpCode } from "@/types";
import { AUTH_ROUTES } from "../routes";

api.interceptors.request.use((config) => {
  if (AUTH_ROUTES.some(r => config.url?.includes(r)))
    return config;

  const token = CookieStore.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err.response?.status;
    const originalRequest = err.config;

    if (status === HttpCode.UNAUTHORIZED && !originalRequest._retry) {
      const accessToken = CookieStore.accessToken;
      const refreshToken = CookieStore.refreshToken;

      if (!accessToken || !refreshToken) {
        useAuthStore.getState().logout();
        RouteUtil.redirectToLogin();
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post('/auth/refresh-token', {
          accessToken,
          refreshToken,
        });

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        CookieStore.accessToken = newAccessToken;
        CookieStore.refreshToken = newRefreshToken;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        CookieStore.accessToken = null;
        CookieStore.refreshToken = null;
        RouteUtil.redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const resStatus = err.response?.data?.statusCode;
    const successCodes = [
      HttpCode.OK,
      HttpCode.ACCEPTED,
      HttpCode.CREATED,
      HttpCode.NO_CONTENT,
      HttpCode.UNAUTHORIZED
    ];

    if (resStatus && !successCodes.includes(resStatus)) {
      Toast.showError(err.response?.data?.message || 'Unexpected error');
    }

    return Promise.reject(err);
  }
);
