import { Toast } from "@/app/components";
import { api } from "@/lib/api-client/api";
import { CookieStore } from "@/lib/cookies";
import { useAuthStore } from '@/store';
import { HttpCode } from "@/types";
import { redirect } from "next/navigation";
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

api.interceptors.response.use((res) => res, (err) => {
  const status = err.response?.status;

  if (status === HttpCode.UNAUTHORIZED) {
    const accessToken = CookieStore.accessToken;
    const refreshToken = CookieStore.refreshToken;
    if (accessToken && refreshToken) {
      api.post('/auth/refresh', { accessToken, refreshToken }).then((response) => {
        if (response.status !== 200) throw new Error();

        CookieStore.accessToken = response.data.accessToken;
        CookieStore.refreshToken = response.data.refreshToken;
      }).catch(() => {
        useAuthStore.getState().logout();
        redirect('/login');
      });
    }
  }

  const resStatus = err.response?.data?.statusCode;
  const successCodes = [HttpCode.OK, HttpCode.ACCEPTED, HttpCode.CREATED, HttpCode.NO_CONTENT];
  if (!!resStatus && !successCodes.includes(resStatus)) {
    Toast.showError(err.response?.data.message);
  }
  return Promise.reject(err);
});
