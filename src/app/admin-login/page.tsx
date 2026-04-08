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
  MailIcon,
} from "@/app/_components/auth-shell";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const isValidUser = email.trim().toLowerCase() === "shipon@gmail.com";
    const isValidPassword = password === "123456";

    if (isValidUser && isValidPassword) {
      setError("");
      router.push("/dashboard");
      return;
    }

    setError("Invalid credentials. Use shipon@gmail.com / 123456 for testing.");
  };

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
            placeholder="shipon@gmail.com"
            leftElement={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="123456"
            leftElement={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {error}
            </p>
          ) : null}
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
            onClick={handleLogin}
            className="w-full rounded-2xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Login
          </button>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
