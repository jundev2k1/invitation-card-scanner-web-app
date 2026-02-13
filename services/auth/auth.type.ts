import { Sex } from "@/types";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  sex: Sex;
  bio: string;
};

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
};
