import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-background px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/app-icon.webp"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-text-muted text-sm">Cards Marketplace</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-text-muted text-sm hover:text-text transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/registro"
            className="text-text-muted text-sm hover:text-text transition-colors"
          >
            Criar conta
          </Link>
        </nav>

        <p className="text-text-muted text-xs">
          © {new Date().getFullYear()} Cards Marketplace. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};
