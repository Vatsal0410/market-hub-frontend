import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export const VerifiedRoute = () => {
  const { isAuthenticated, isVerified, isLoading, user } = useAuthStore();

  if (isLoading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isVerified) return <Navigate to="/verify-email" replace />;
  if(user?.role === "admin") return <Navigate to="/admin" replace />
  return <Outlet />;
};
