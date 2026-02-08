import { api } from "@/lib/api-client/api";
import { CookieStore } from "@/lib/cookies";
import { useAuthStore } from '@/store';

api.interceptors.request.use((config) => {
  const token = CookieStore.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use((res) => res, (err) => {
  const status = err.response?.status;
  if (status === 401) {
    const accessToken = CookieStore.accessToken;
    const refreshToken = CookieStore.refreshToken;
    if (accessToken && refreshToken) {
      api.post('/auth/refresh', { accessToken, refreshToken }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          CookieStore.accessToken = response.data.accessToken;
          CookieStore.refreshToken = response.data.refreshToken;
        } else {
          useAuthStore.getState().logout();

          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
      });
    }
  }
  return Promise.reject(err);
});
