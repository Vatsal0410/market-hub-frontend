import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { authApi } from "../../api/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { Navbar } from "../../components/Navbar";
import registerImage from "../../assets/images/register.png";

const schema = z.object({
  fname: z.string().min(2, "First name required"),
  lname: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
  confirmPassword: z.string().min(6, "Min 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      const { data: res } = await authApi.register({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      });
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success(res.message || "Registered! Verify your email.");
      navigate("/verify-email", { state: { email: data.email } });
    } catch (error: unknown) {
      const e = error as AxiosError<{ message?: string }>;
      const message = e.response?.data?.message || e.message || "Error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <Navbar mode="signup" />

      <main className="grow flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
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

        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(#22c55e15 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative z-10 mt-12 md:mt-16">
          <div className="hidden lg:flex flex-col justify-center items-center p-8 md:p-12 bg-[#f3fcef] relative">
            <div className="relative z-10 text-center space-y-6">
              <img
                alt="Fresh grocery basket"
                src={registerImage}
                className="w-full max-w-sm mx-auto drop-shadow-2xl"
              />
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-[#006e2f] leading-tight">
                  Freshness delivered to your doorstep.
                </h1>
                <p className="text-base text-gray-600 max-w-xs mx-auto">
                  Join thousands of happy shoppers and get the best deals on organic groceries.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Start your fresh shopping journey today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fname"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    First Name
                  </label>
                  <input
                    {...register("fname")}
                    id="fname"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all outline-none"
                    placeholder="John"
                  />
                  {errors.fname && (
                    <p className="text-red-500 text-xs mt-1">{errors.fname.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lname")}
                    id="lname"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all outline-none"
                    placeholder="Doe"
                  />
                  {errors.lname && (
                    <p className="text-red-500 text-xs mt-1">{errors.lname.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>


              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#22c55e] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#22c55e] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#22c55e] text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-[#006e2f] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#006e2f] font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};