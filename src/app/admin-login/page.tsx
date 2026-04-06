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
  MailIcon,
} from "@/app/_components/auth-shell";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthPage>
      <AuthCard
        title="Admin Login"
        subtitle="Sign in to access the dashboard"
          >
        <div className="space-y-5">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="admin@example.com"
            leftElement={<MailIcon />}
          />
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            leftElement={<LockIcon />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
          <div className="flex items-center justify-end text-sm">

            <Link
              href="/forgot-password"
              className="font-semibold text-[#3377FF] underline underline-offset-4 hover:text-[#2b67e6]"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="button"
            className="w-full rounded-2xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Login
          </button>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
