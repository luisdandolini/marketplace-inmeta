import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">{label}</label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 bg-background text-text transition-colors w-full
              ${icon ? "pl-10" : ""}
              ${isPassword ? "pr-10" : ""}
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-surface focus:ring-primary"
              }`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
            >
              {showPassword ? (
                <EyeOff className="cursor-pointer" size={16} />
              ) : (
                <Eye className="cursor-pointer" size={16} />
              )}
            </button>
          )}
        </div>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    );
  },
);
