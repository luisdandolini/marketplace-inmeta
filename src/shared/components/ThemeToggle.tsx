import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../features/theme/store/themeStore";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  const handleToggle = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    document
      .startViewTransition(() => {
        toggleTheme();
      })
      .ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
  };

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer p-2 rounded-lg hover:bg-background transition-colors text-text-muted hover:text-text"
      title={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
