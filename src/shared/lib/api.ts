import axios from "axios";
import { useAuthStore } from "../../features/auth/store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    const event = new CustomEvent("api-error", {
      detail: message || "Ocorreu um erro inesperado",
    });
    window.dispatchEvent(event);

    return Promise.reject(error);
  },
);
