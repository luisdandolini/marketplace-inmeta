import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "minhas-cartas": "Minhas Cartas",
  "explorar-cartas": "Explorar Cartas",
  "adicionar-cartas": "Adicionar Cartas",
};

export const Breadcrumb = () => {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label =
      ROUTE_LABELS[segment] ??
      segment.charAt(0).toLocaleUpperCase() + segment.slice(1);

    return { path, label };
  });

  return (
    <nav className="flex items-center gap-1 text-sm text-text-muted mb-6">
      <span>Home</span>

      {crumbs.map((crumb) => (
        <div key={crumb.path} className="flex items-center gap-1">
          <ChevronRight size={14} />
          <p className="hover:text-text transition-colors">{crumb.label}</p>
        </div>
      ))}
    </nav>
  );
};
