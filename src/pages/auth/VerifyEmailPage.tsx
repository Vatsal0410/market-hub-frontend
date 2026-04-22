/**
 * Verify Email Page
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, RefreshCw } from "lucide-react";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { Navbar } from "../../components/Navbar";
import { loginDecorations } from "../../assets/decorations";

const schema = z.object({
  otp: z.string().length(6, "6 digits required"),
});

type FormData = z.infer<typeof schema>;

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { setAuth } = useAuthStore();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await authApi.verifyEmail(data.otp);

      const profileRes = await authApi.getProfile();
      setAuth(profileRes.data.data.user);

      toast.success("Email verified!");
      navigate("/");
    } catch (error: unknown) {
      const e = error as AxiosError<{ message?: string }>;
      if (e.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(e.response?.data?.message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authApi.resendVerification();
      toast.success("OTP sent");
    } catch (error: unknown) {
      const e = error as AxiosError<{ message?: string }>;
      if (e.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(e.response?.data?.message || "Failed to resend");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Navbar mode="verification" />
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
              alt="carrot"
              src={loginDecorations.carrot}
              className="absolute top-[5%] left-[3%] w-20 h-20 rotate-12 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-0"
            />
            <img
              alt="bananas"
              src={loginDecorations.bananas}
              className="absolute top-[15%] right-[3%] w-16 h-16 -rotate-12 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-200"
            />
            <img
              alt="cabbage"
              src={loginDecorations.cabbage}
              className="absolute bottom-[15%] left-[8%] w-28 h-28 rotate-y-45 opacity-30 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-400"
            />
            <img
              alt="potatoes"
              src={loginDecorations.potatoes}
              className="absolute bottom-[20%] right-[8%] w-24 h-24 opacity-40 pointer-events-none z-10 animate-shake animate-infinite animate-duration-10000 animate-ease-linear animate-normal animate-fill-both delay-600"
            />
          </div>

          {/* 4. Main Card */}
          <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 md:p-10 border border-gray-200 relative z-10 mt-12 md:mt-16">
            {/* Header */}
            <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-[#22c55e]" />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#006e2f] mb-2">
                Verify Your Email
              </h1>
              <p className="text-gray-500 text-sm">
                We've sent a 6-digit code to your email
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <input
                  {...register("otp")}
                  maxLength={6}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] bg-gray-50/50 placeholder:text-gray-300 transition-all"
                  placeholder="------"
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-2 text-center">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#22c55e] text-white rounded-xl font-semibold hover:bg-[#006e2f] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </div>
            </form>

            {/* Resend */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-[#006e2f] hover:text-[#22c55e] font-medium text-sm disabled:opacity-50 inline-flex items-center gap-1"
              >
                {resending && <RefreshCw className="w-4 h-4" />}
                {resending ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};