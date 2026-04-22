import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { authApi, type User } from "../../api/auth";

function Dashboard() {
  const { logout} = useAuthStore();

  const [data, setData] = useState<User | null>(null)
  const getProfile = async () => {
    setData(null)
    try {
      const res = await authApi.getProfile();
      setData(res.data.data.user);
    } catch {
      console.log("error")
    }
  }

  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">MarketHub</h1>
          {/* <h3>Welcome {user?.fname}</h3> */}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
          <button onClick={() => navigate("/profile")} className="">
            Profile
          </button>
        </div>
      </div>
      {/* <h4 className="mt-4 mb-2 text-lg font-bold ">Here is user object</h4>
      <pre className="bg-gray-200 p-4 rounded">
        {JSON.stringify(user, null, 2)}
      </pre>
      <h4 className="mt-4 mb-2 text-lg font-bold ">
        isAuthenticated: {isAuthenticated ? "true" : "false"}
      </h4> */}

      <button
        onClick={getProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 "
      >
        Get Profile
      </button>

      {data && (
        <div className="mt-4">
          <pre className="bg-gray-200 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
