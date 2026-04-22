import { Routes, Route } from "react-router-dom";

import { PublicRoutes } from "./public.routes";
import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";
import { PublicRoute } from "../components/routes/PublicRoute";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";
import { VerifiedRoute } from "../components/routes/VerifiedRoute";
import { Layout } from "../components/Layout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>{PublicRoutes}</Route>

        {/* PROTECTED (AUTH ONLY) */}
        <Route element={<ProtectedRoute />}>
          {/* verified users only (optional layer) */}
          <Route element={<VerifiedRoute />}>
            {/* USER ROUTES */}
            {UserRoutes}
          </Route>

          {/* ADMIN ROUTES */}
          {AdminRoutes}
        </Route>
      </Route>
    </Routes>
  );
};