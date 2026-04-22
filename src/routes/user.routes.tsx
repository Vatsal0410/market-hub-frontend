import { Route } from "react-router-dom";
import { ChangePasswordPage } from "../pages/user/ChangePasswordPage";
import { ProfilePage } from "../pages/user/ProfilePage";
import Dashboard from "../pages/user/Dashboard";

export const UserRoutes = (
  <>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/change-password" element={<ChangePasswordPage />} />
  </>
);
