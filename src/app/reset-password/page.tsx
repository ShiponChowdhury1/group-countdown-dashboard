"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AuthCard,
  AuthPage,
  EyeIcon,
  EyeOffIcon,
  FormField,
  LockIcon,
} from "@/app/_components/auth-shell";

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          <button
            type="button"
            className="w-full rounded-xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Reset Password
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
