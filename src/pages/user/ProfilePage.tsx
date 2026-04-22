/**
 * Profile Page
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, MapPin, Loader2, Save, Lock, ArrowLeft } from "lucide-react";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const schema = z.object({
  fname: z.string().min(2, "Min 2 chars"),
  lname: z.string().min(2, "Min 2 chars"),
});

type FormData = z.infer<typeof schema>;

export const ProfilePage = () => {
  // const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fname: user?.fname || "",
      lname: user?.lname || "",
    },
  });

  const onSubmit = async (data: FormData) => {
  setLoading(true);
  try {
    const { data: res } = await authApi.updateProfile({
      fname: data.fname,
      lname: data.lname,
      // phone: (document.getElementById("phone") as HTMLInputElement)?.value,
      // address: (document.getElementById("address") as HTMLInputElement)?.value,
    });

    setAuth({
      ...res.data.user,
      fname: res.data.user?.fname,
      lname: res.data.user?.lname,
      isVerified: res.data.user?.isVerified ?? false,
    });

    toast.success("Profile updated successfully!");
  } catch (error: unknown) {
    const e = error as AxiosError<{ message?: string }>;
    toast.error(e.response?.data?.message || "Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="flex items-center gap-4">
              <Link
                to="/change-password"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </Link>
              <button
                onClick={() => useAuthStore.getState().logout()}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    {...register("fname")}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm bg-white/50 transition-all"
                    placeholder="John"
                  />
                  {errors.fname && <p className="text-red-500 text-xs mt-1">{errors.fname.message}</p>}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    {...register("lname")}
                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm bg-white/50 transition-all"
                    placeholder="Doe"
                  />
                  {errors.lname && <p className="text-red-500 text-xs mt-1">{errors.lname.message}</p>}
                </div>
              </div>
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={user?.email || ""}
                  disabled
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-gray-50 text-sm"
                />
              </div>
            </div>

            {/* Phone (static, no validation) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  defaultValue=""
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white/50 text-sm"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* Address (static, no validation) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  defaultValue=""
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white/50 text-sm"
                  placeholder="123 Main St, City"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {!loading && <Save className="w-5 h-5" />}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};