import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-surface border-b border-background px-6 py-4 flex items-center justify-between">
      <Link to="/">
        <img
          src="/app-icon.webp"
          alt="Logo"
          className="w-8 h-8 object-contain"
        />
      </Link>

      <nav className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/login">
          <Button variant="outline" size="sm">
            Entrar
          </Button>
        </Link>
        <Link to="/register">
          <Button size="sm">Criar conta</Button>
        </Link>
      </nav>
    </header>
  );
};
