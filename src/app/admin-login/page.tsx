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
import { useLoginMutation } from "@/store/authApi";
import { setCredentials } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      const result = await login({ email: email.trim(), password }).unwrap();
      dispatch(
        setCredentials({
          user: result.user,
          access: result.access,
          refresh: result.refresh,
        })
      );
      router.push("/dashboard");
    } catch (err: unknown) {
      const apiError = err as {
        data?: { detail?: string; message?: string; non_field_errors?: string[] };
        error?: string;
      };
      const message =
        apiError?.data?.detail ||
        apiError?.data?.message ||
        apiError?.data?.non_field_errors?.[0] ||
        "Invalid credentials. Please try again.";
      setError(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
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
            placeholder="Email address"
            leftElement={<MailIcon />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            inputClassName="rounded-lg"
          />
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            leftElement={<LockIcon />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            inputClassName="rounded-lg"
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
            disabled={isLoading}
            className="w-full rounded-lg bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? "Logging in…" : "Login"}
          </button>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
