import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { Check, X, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    const handleApiError = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      showToast(customEvent.detail, "error");
    };
    window.addEventListener("api-error", handleApiError);
    return () => window.removeEventListener("api-error", handleApiError);
  }, [showToast]);

  const ICONS = {
    success: <Check size={14} strokeWidth={3} />,
    error: <X size={14} strokeWidth={3} />,
    warning: <AlertTriangle size={14} />,
  };

  const COLORS = {
    success: "bg-primary",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              ${COLORS[toast.type]}
              px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
              flex items-center gap-2 min-w-64
            `}
          >
            {ICONS[toast.type]}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
