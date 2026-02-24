import { RegisterForm } from "../features/auth/components/RegisterForm";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl" />
      <div className="relative z-10 bg-surface p-8 rounded-xl flex flex-col items-center gap-6 w-full max-w-sm">
        <img
          src="/app-icon.webp"
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-2xl font-bold text-text">Criar conta</h1>
        <RegisterForm />
        <p className="text-sm text-text-muted">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};
