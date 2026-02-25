import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Carregando...",
}: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 gap-3">
      <Loader2 size={24} className="text-primary animate-spin" />
      <p className="text-text-muted text-sm">{message}</p>
    </div>
  );
};
