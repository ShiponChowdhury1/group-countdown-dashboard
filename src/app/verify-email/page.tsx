"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AuthCard, AuthPage, MailIcon } from "@/app/_components/auth-shell";

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const [otpValues, setOtpValues] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpSlots = useMemo(
    () => Array.from({ length: OTP_LENGTH }, (_, index) => index),
    []
  );

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
    if (!value) {
      return;
    }

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

  return (
    <AuthPage>
      <AuthCard
        title="Verify Email"
        subtitle="Enter the 6-digit code we sent to your inbox"
        badgeIcon={<MailIcon />}
        footer={
          <span>
            Did not get the code?{" "}
            <Link href="/forgot-password" className="font-semibold text-slate-700">
              Resend (59s)
            </Link>
          </span>
        }
      >
        <div className="space-y-6">
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
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 text-center text-lg font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            ))}
          </div>
          <button
            type="button"
            className="w-full rounded-2xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Verify Email
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
