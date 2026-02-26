import { useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

export const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full">
        <div className="bg-surface rounded-xl border border-surface min-h-full p-4 md:p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(false)}
              className="block md:hidden"
            >
              <Menu className="w-4 h-4 text-text" />
            </button>

            <Breadcrumb />
          </div>

          <div className="border-t border-background my-4" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
