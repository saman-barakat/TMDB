import axios from "axios";
import { env } from "@/config/env";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiClient = axios.create({
  baseURL: env.tmdbBaseUrl,
  timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
  config.params = {
    api_key: env.tmdbApiKey,
    language: "en-US",
    ...config.params,
  };
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<{ status_message?: string }>(error)) {
      const message = error.response?.data?.status_message ?? error.message;
      return Promise.reject(new ApiError(message, error.response?.status));
    }
    return Promise.reject(error);
  },
);
