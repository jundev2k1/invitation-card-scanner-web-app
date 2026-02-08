import axios, { AxiosResponseTransformer } from "axios";
import { handleDates } from "./http";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [
    ...(Array.isArray(axios.defaults.transformResponse)
      ? axios.defaults.transformResponse
      : [axios.defaults.transformResponse]
    ) as AxiosResponseTransformer[],
    handleDates,
  ],
});
