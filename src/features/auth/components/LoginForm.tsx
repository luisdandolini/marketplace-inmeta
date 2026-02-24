import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/authSchemas";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { Lock, Mail } from "lucide-react";

export const LoginForm = () => {
  const { mutate: login, isPending, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        icon={<Mail size={16} />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••"
        icon={<Lock size={16} />}
        error={errors.password?.message}
        {...register("password")}
      />

      {isError && (
        <span className="text-red-500 text-xs">E-mail ou senha inválidos</span>
      )}

      <Button type="submit" disabled={isPending} className="w-full" size={"lg"}>
        {isPending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};
