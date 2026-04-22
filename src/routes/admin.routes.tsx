import { Route } from "react-router-dom";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

export const AdminRoutes = (
  <>
    <Route path="/admin" element={<AdminDashboardPage />} />
    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
  </>
);
