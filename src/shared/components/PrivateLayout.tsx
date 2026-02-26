import { Breadcrumb } from "./Breadcrumb";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-surface rounded-xl border border-surface min-h-full p-6">
          <Breadcrumb />
          <div className="border-t border-background my-4" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};
