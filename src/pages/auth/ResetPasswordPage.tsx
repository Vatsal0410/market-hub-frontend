/**
 * Reset Password Page
 */
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { authApi } from "../../api/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { Navbar } from "../../components/Navbar";
import { loginDecorations } from "../../assets/decorations";

const schema = z.object({
  newPassword: z.string().min(6, "Min 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as { resetToken: string }) || {};
  const resetToken = locationState.resetToken
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await authApi.resetPassword(data.newPassword, resetToken);
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error: unknown) {
      const e = error as AxiosError<{ message?: string }>;
      toast.error(e.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar mode="recovery" />
      <div className="min-h-screen bg-[#f9fafb] flex flex-col p-4 relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-16">
          {/* 1. Animated Color Blobs (Green Palette) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
            <div
              className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute -bottom-20 left-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          {/* 2. Background Dot Pattern (Overlay) */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "radial-gradient(#22c55e15 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* 3. Organic Decorations - Hidden on mobile */}
          <div className="hidden lg:block">
            <img
              alt="eggplant"
              src={loginDecorations.eggplant}
              className="absolute top-[5%] left-[3%] w-20 h-20 rotate-12 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-0"
            />
            <img
              alt="pineapple"
              src={loginDecorations.pineapple}
              className="absolute top-[15%] right-[3%] w-16 h-16 -rotate-12 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-200"
            />
            <img
              alt="beetroot"
              src={loginDecorations.beetroot}
              className="absolute bottom-[15%] left-[8%] w-28 h-28 rotate-y-45 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-400"
            />
            <img
              alt="pumpkin"
              src={loginDecorations.pumpkin}
              className="absolute bottom-[20%] right-[8%] w-24 h-24 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-600"
            />
          </div>

          {/* 4. Main Card */}
          <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 md:p-10 border border-gray-200 relative z-10 mt-12 md:mt-16">
            {/* Header */}
            <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#006e2f] mb-2">
                Reset Password
              </h1>
              <p className="text-gray-500 text-sm">
                Enter your new password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#22c55e] transition-colors" />
                  </div>
                  <input
                    {...register("newPassword")}
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all text-sm placeholder:text-gray-400"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#22c55e] transition-colors" />
                  </div>
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all text-sm placeholder:text-gray-400"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#22c55e] text-white rounded-xl font-semibold hover:bg-[#006e2f] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-[#006e2f] hover:text-[#22c55e] font-medium underline-offset-4 hover:underline inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};