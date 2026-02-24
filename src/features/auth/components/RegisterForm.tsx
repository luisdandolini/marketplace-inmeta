import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useAuth";
import { registerSchema, type RegisterFormData } from "../schemas/authSchemas";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { Lock, Mail, User } from "lucide-react";

export const RegisterForm = () => {
  const { mutate: register, isPending, isError } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <Input
        label="Nome"
        type="text"
        placeholder="Seu nome"
        icon={<User size={16} />}
        error={errors.name?.message}
        {...registerField("name")}
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        icon={<Mail size={16} />}
        error={errors.email?.message}
        {...registerField("email")}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••"
        icon={<Lock size={16} />}
        error={errors.password?.message}
        {...registerField("password")}
      />

      {isError && (
        <span className="text-red-500 text-xs">
          Erro ao criar conta, tente novamente
        </span>
      )}

      <Button type="submit" disabled={isPending} className="w-full" size={"lg"}>
        {isPending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
};
