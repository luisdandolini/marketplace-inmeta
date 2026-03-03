import { useNavigate } from "react-router-dom";
import { Button } from "../shared/components/Button";
import { Home } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-8xl font-black text-primary">404</h1>
      <div>
        <h2 className="text-2xl font-bold text-text">Página não encontrada</h2>
        <p className="text-text-muted mt-2">
          A página que você está procurando não existe ou foi removida.
        </p>
      </div>
      <Button onClick={() => navigate("/")} icon={<Home size={16} />}>
        Voltar para o início
      </Button>
    </div>
  );
};
