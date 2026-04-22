/**
 * Login Page - MarketHub Design
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";
import { loginDecorations } from "../../assets/decorations";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { Navbar } from "../../components/Navbar";
import leavesIcon from "../../assets/images/leaves.png";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 chars"),
});

type FormData = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
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
      const { data: res } = await authApi.login(data);
      setAuth(res.data.user);
      toast.success("Login successful!");
    } catch (error: unknown) {
      const e = error as AxiosError<{ message?: string }>;
      if (e.response?.status === 403) {
        toast.error(e.response?.data?.message || "Email not verified");
        navigate("/verify-email");
      } else {
        toast.error(e.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <>
      <Navbar mode="login" />
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
          alt="cabbage"
          src={loginDecorations.cabbage}
          className="absolute top-[5%] left-[3%] w-20 h-20 rotate-12 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-0"
        />
        <img
          alt="apple"
          src={loginDecorations.apple}
          className="absolute top-[15%] right-[3%] w-16 h-16 -rotate-12 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-200"
        />
        <img
          alt="carrot"
          src={loginDecorations.carrot}
          className="absolute bottom-[15%] left-[8%] w-28 h-28 rotate-y-45 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-400"
        />
        <img
          alt="bananas"
          src={loginDecorations.bananas}
          className="absolute bottom-[20%] right-[8%] w-24 h-24 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-600"
        />
      </div>

      {/* 4. Main Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 md:p-10 border border-gray-200 relative mt-12 md:mt-16">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
            <img src={leavesIcon} alt="MarketHub" className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#006e2f] mb-2 ">MarketHub</h1>
          <p className="text-gray-500 text-sm">Welcome back! Please enter your details.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-[#22c55e] transition-colors" />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all text-sm placeholder:text-gray-400"
                placeholder="name@example.com"
                autoFocus
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-[#22c55e] transition-colors" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all text-sm placeholder:text-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" title="Forgot Password" className="text-sm text-[#006e2f] font-semibold hover:underline decoration-2 underline-offset-4">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#22c55e] text-white rounded-xl font-semibold hover:bg-[#006e2f] hover:shadow-lg hover:shadow-[#22c55e]/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Signing in..." : "Login"}
          </button>

{/* Register Link */}
          <div className="text-center pt-2">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#006e2f] font-bold hover:underline decoration-2 underline-offset-4">
                Register
              </Link>
            </p>
          </div>
        </form>
        </div>
        </div>
      </div>
    </>
  );
};