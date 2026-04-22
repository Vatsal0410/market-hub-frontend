import { useAuthStore } from "../../stores/authStore";

function AdminDashboardPage() {
  return (
    <div>
      <div>
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => useAuthStore.getState().logout()}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
