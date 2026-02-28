import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import type { LoginRequest, RegisterRequest } from "../types";
import { useToast } from "../../../shared/components/ToastContext";

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      navigate("/");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      navigate("/login");
      setTimeout(() => {
        showToast("Conta criada com sucesso! Faça login para continuar.");
      }, 200);
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return { logout };
};
