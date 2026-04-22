import { useAuthStore } from "../../stores/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

    if(isLoading) return null

    if(isAuthenticated) {
        return <Navigate to="/dashboard" replace/>
    }
    return <Outlet />

};
