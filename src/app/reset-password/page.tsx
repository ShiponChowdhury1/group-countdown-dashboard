"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AuthPage,
  EyeIcon,
  EyeOffIcon,
  FormField,
  LockIcon,
} from "@/app/_components/auth-shell";
import { useResetPasswordMutation } from "@/store/authApi";
import { useAppSelector } from "@/store/hooks";

export default function ResetPasswordPage() {
  const router = useRouter();

  // Email saved during the forgot-password step
  const forgotPasswordEmail = useAppSelector(
    (state) => state.auth.forgotPasswordEmail
  );

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!forgotPasswordEmail) {
      setError("Session expired. Please restart the forgot-password flow.");
      return;
    }

    try {
      const result = await resetPassword({
        email: forgotPasswordEmail,
        new_password: newPassword,
      }).unwrap();

      setSuccess(result.message);
      // Redirect to login after a short delay
      setTimeout(() => router.push("/admin-login"), 1200);
    } catch (err: unknown) {
      const apiError = err as {
        data?: { detail?: string; message?: string };
      };
      const message =
        apiError?.data?.detail ||
        apiError?.data?.message ||
        "Password reset failed. Please try again.";
      setError(message);
    }
  };

  return (
    <AuthPage>
      <AuthCard
        title="Reset Password"
        subtitle="Create a new password for your account"
      >
        <div className="space-y-5">
          <FormField
            id="new-password"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            leftElement={<LockIcon />}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          <FormField
            id="confirm-password"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Retype new password"
            leftElement={<LockIcon />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600">
              {success} Redirecting to login…
            </p>
          )}

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading || !!success}
            className="w-full rounded-xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? "Resetting…" : "Reset Password"}
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
