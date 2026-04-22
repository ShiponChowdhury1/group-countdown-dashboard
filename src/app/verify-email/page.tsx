"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard, AuthPage, MailIcon } from "@/app/_components/auth-shell";
import { useVerifyOtpMutation } from "@/store/authApi";
import { useAppSelector } from "@/store/hooks";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

export default function VerifyEmailPage() {
  const router = useRouter();

  // Get the email that was stored when user submitted forgot-password
  const forgotPasswordEmail = useAppSelector(
    (state) => state.auth.forgotPasswordEmail
  );

  const [otpValues, setOtpValues] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpSlots = useMemo(
    () => Array.from({ length: OTP_LENGTH }, (_, index) => index),
    []
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  // ── Countdown timer ──────────────────────────────────────────────────────
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // ── OTP input helpers ────────────────────────────────────────────────────
  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateValue = (index: number, value: string) => {
    setOtpValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "");
    if (!value) {
      updateValue(index, "");
      return;
    }
    const chars = value.split("");
    setOtpValues((prev) => {
      const next = [...prev];
      let cursor = index;
      chars.forEach((char) => {
        if (cursor < OTP_LENGTH) {
          next[cursor] = char;
          cursor += 1;
        }
      });
      return next;
    });
    const nextIndex = Math.min(index + chars.length, OTP_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      updateValue(index - 1, "");
      focusInput(index - 1);
      event.preventDefault();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
      event.preventDefault();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text");
    const value = pasted.replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!value) return;
    const chars = value.split("");
    setOtpValues((prev) => {
      const next = [...prev];
      chars.forEach((char, idx) => {
        next[idx] = char;
      });
      return next;
    });
    focusInput(Math.min(chars.length, OTP_LENGTH) - 1);
    event.preventDefault();
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleVerify = async () => {
    setError("");
    setSuccess("");

    const otp_code = otpValues.join("");
    if (otp_code.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }

    if (!forgotPasswordEmail) {
      setError("Session expired. Please start the forgot-password flow again.");
      return;
    }

    try {
      const result = await verifyOtp({
        email: forgotPasswordEmail,
        otp_code,
        otp_type: "email_verification",
      }).unwrap();

      setSuccess(result.message);
      // Navigate to reset-password
      setTimeout(() => router.push("/reset-password"), 800);
    } catch (err: unknown) {
      const apiError = err as {
        data?: { detail?: string; message?: string };
      };
      const message =
        apiError?.data?.detail ||
        apiError?.data?.message ||
        "OTP verification failed. Please try again.";
      setError(message);
    }
  };

  return (
    <AuthPage>
      <AuthCard
        title="Verify Email"
        subtitle="Enter the 6-digit code we sent to your inbox"
        badgeIcon={<MailIcon />}
        footer={
          <span>
            Did not get the code?{" "}
            {countdown > 0 ? (
              <span className="font-semibold text-slate-400">
                Resend ({countdown}s)
              </span>
            ) : (
              <Link
                href="/forgot-password"
                className="font-semibold text-slate-700 hover:text-slate-900"
              >
                Resend
              </Link>
            )}
          </span>
        }
      >
        <div className="space-y-6">
          {/* OTP inputs */}
          <div className="grid grid-cols-6 gap-2">
            {otpSlots.map((index) => (
              <input
                key={`otp-${index}`}
                inputMode="numeric"
                maxLength={1}
                placeholder=""
                aria-label={`OTP digit ${index + 1}`}
                value={otpValues[index]}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                autoComplete="one-time-code"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 text-center text-lg font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            ))}
          </div>

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
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full rounded-xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? "Verifying…" : "Verify Email"}
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
