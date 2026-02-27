import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(next);
        set({ theme: next });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.add(state.theme);
        }
      },
    },
  ),
);
