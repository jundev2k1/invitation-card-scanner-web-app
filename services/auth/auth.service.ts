import { api, baseQuery } from "@/lib/api-client";
import { LoginRequest, LoginResponse } from "./auth.type";

export const authService = {
  login: ({ username, password }: LoginRequest) =>
    baseQuery(api.post<LoginResponse>('/auth/login', { username, password })),

  register: (data: any) =>
    baseQuery(api.post('/auth/register', data)),

  logout: () => baseQuery(api.post('/auth/logout')),
};
