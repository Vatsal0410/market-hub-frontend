import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { AppRoutes } from "./routes/AppRoutes";

export const App = () => {
  const { isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []); //change after you told remove initializeAuth

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <AppRoutes />
};
