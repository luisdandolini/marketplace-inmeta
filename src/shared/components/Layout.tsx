import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="bg-surface rounded-xl border border-surface min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
