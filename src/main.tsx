import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/lib/queryClient";
import { ToastProvider } from "./shared/components/ToastContext";
import { AppRoutes } from "./routes";
import "./index.css";

const savedTheme = JSON.parse(
  localStorage.getItem("theme") || '{"state":{"theme":"dark"}}',
);
document.documentElement.classList.add(savedTheme.state.theme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
