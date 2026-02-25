import {
  Book,
  ChevronDown,
  ChevronsLeft,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  label: string;
  icon: ReactNode;
  path?: string;
  subItems?: SubItem[];
}

interface ItemProps {
  item: MenuItem;
  collapsed: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    icon: <LayoutDashboard className="w-4 h-4" />,
    path: "/",
  },
  {
    label: "Cartas",
    icon: <Book className="w-4 h-4" />,
    subItems: [
      { label: "Minhas Cartas", path: "/cartas/minhas-cartas" },
      { label: "Explorar Cartas", path: "/cartas/explorar-cartas" },
      { label: "Adicionar Cartas", path: "/cartas/adicionar-cartas" },
    ],
  },
];

export const Sidebar = () => {
  const { clearAuth, user } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function toggleMenu(menu: string) {
    setOpenMenu(openMenu === menu ? null : menu);
  }

  return (
    <aside
      className={`bg-surface text-text flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`p-4 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <Link to={"/"}>
            <img src="/app-icon.webp" alt="Logo" className="w-8 h-8" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-background p-1 rounded transition-colors"
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>

      <nav className="p-2 space-y-1 flex-1">
        {MENU_ITEMS.map((item) => (
          <div key={item.label}>
            <SidebarItem
              item={item}
              collapsed={collapsed}
              isOpen={openMenu === item.label}
              onClick={() => (item.subItems ? toggleMenu(item.label) : null)}
            />

            {!collapsed && item.subItems && openMenu === item.label && (
              <div className="ml-6 mt-1 space-y-1 border-l border-background pl-2">
                {item.subItems.map((sub) => (
                  <SidebarSubItem
                    key={sub.label}
                    label={sub.label}
                    path={sub.path}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 p-4 border-t border-background text-sm font-medium">
        <div className="flex-1 min-w-0">
          {!collapsed ? (
            <p className="truncate whitespace-nowrap transition-all duration-300">
              {user?.name}
            </p>
          ) : (
            <p className="text-center">{user?.name?.charAt(0).toUpperCase()}</p>
          )}
        </div>

        <button
          onClick={clearAuth}
          title="Sair"
          className="shrink-0 cursor-pointer hover:bg-background p-2 rounded transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-400" />
        </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ item, collapsed, isOpen, onClick }: ItemProps) => {
  const className =
    "cursor-pointer w-full flex items-center p-2 rounded hover:bg-background transition-colors group text-left";

  const content = (
    <>
      <div className="flex items-center gap-3 w-full">
        <span className="text-xl shrink-0">{item.icon}</span>
        <span
          className={`text-sm whitespace-nowrap transition-all duration-300 ${
            collapsed ? "opacity-0 w-0 invisible" : "opacity-100 w-auto visible"
          }`}
        >
          {item.label}
        </span>
      </div>
      {!collapsed && item.subItems && (
        <ChevronDown
          className={`w-4 h-4 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      )}
    </>
  );

  if (item.subItems) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to={item.path || "#"} className={className}>
      {content}
    </Link>
  );
};

const SidebarSubItem = ({ label, path }: { label: string; path: string }) => (
  <Link
    to={path}
    className="block p-2 text-xs text-text-muted rounded hover:bg-background hover:text-text cursor-pointer transition-colors"
  >
    {label}
  </Link>
);
