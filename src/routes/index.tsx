import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../shared/components/Layout";
import { MyCardsPage } from "../pages/MyCardsPage";
import { AllCardsPage } from "../pages/AllCardsPage";
import { AddCardsPage } from "../pages/AddCardsPage";
import { CreateTradePage } from "../pages/CreateTradePage";
import { TradesPage } from "../pages/TradesPage";
import { MyTradesPage } from "../pages/MyTradesPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cartas/minhas-cartas" element={<MyCardsPage />} />
          <Route path="/cartas/explorar-cartas" element={<AllCardsPage />} />
          <Route path="/cartas/adicionar-cartas" element={<AddCardsPage />} />
          <Route path="/trocas" element={<TradesPage />} />
          <Route path="/trocas/minhas-trocas" element={<MyTradesPage />} />
          <Route path="/trocas/nova" element={<CreateTradePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
