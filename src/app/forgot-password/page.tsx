"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AuthPage,
  FormField,
  MailIcon,
} from "@/app/_components/auth-shell";
import { useSendOtpMutation } from "@/store/authApi";
import { setForgotPasswordEmail } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const result = await sendOtp({ email: email.trim() }).unwrap();
      // Save email in Redux so subsequent steps can use it
      dispatch(setForgotPasswordEmail(email.trim()));
      setSuccess(result.message);
      // Navigate to OTP verification page
      setTimeout(() => router.push("/verify-email"), 800);
    } catch (err: unknown) {
      const apiError = err as {
        data?: { detail?: string; message?: string };
        error?: string;
      };
      const message =
        apiError?.data?.detail ||
        apiError?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendOtp();
  };

  return (
    <AuthPage>
      <AuthCard
        title="Forgot Password"
        subtitle="Type your email to receive a verification code"
      >
        <div className="space-y-6">
          <FormField
            id="reset-email"
            label="Email"
            type="email"
            placeholder="admin@example.com"
            leftElement={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600">
              {success}
            </p>
          )}

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full rounded-xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? "Sending OTP…" : "Send OTP"}
          </button>

          <Link
            href="/admin-login"
            className="block text-center text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
