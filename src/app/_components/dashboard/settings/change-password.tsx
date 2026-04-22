"use client";

import { useState } from "react";
import { useChangePasswordMutation } from "@/store/authApi";

type Props = {
  onSaved?: () => void;
};

export default function ChangePassword({ onSaved }: Props) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async () => {
    setFeedback(null);

    if (!current || !newPass || !confirm) {
      setFeedback({ type: "error", message: "All password fields are required." });
      return;
    }

    if (newPass !== confirm) {
      setFeedback({ type: "error", message: "New password and confirm password do not match." });
      return;
    }

    try {
      const response = await changePassword({
        current_password: current,
        new_password: newPass,
      }).unwrap();

      setFeedback({ type: "success", message: response.message || "Password changed successfully." });
      setCurrent("");
      setNewPass("");
      setConfirm("");
      onSaved?.();
    } catch (err: unknown) {
      const apiError = err as {
        data?: {
          message?: string;
          detail?: string;
          current_password?: string[];
          new_password?: string[];
        };
      };

      setFeedback({
        type: "error",
        message:
          apiError?.data?.message ||
          apiError?.data?.detail ||
          apiError?.data?.current_password?.[0] ||
          apiError?.data?.new_password?.[0] ||
          "Failed to change password. Please try again.",
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800">Change Password</h2>
        <p className="text-sm text-slate-500">Change your password to keep your account secure.</p>
      </div>

      {feedback ? (
        <p
          className={`mb-4 rounded-lg px-3 py-2 text-xs font-medium ${
            feedback.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-rose-200 bg-rose-50 text-rose-600"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}

      <div className="space-y-4 max-w-sm">
        {/* Current Password */}
        <div>
          <label className="text-sm font-medium text-slate-700">Current Password</label>
          <div className="relative mt-1.5">
            <input
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-medium text-slate-700">New Password</label>
          <div className="relative mt-1.5">
            <input
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Confirm Password — eye icon added */}
        <div>
          <label className="text-sm font-medium text-slate-700">Confirm Password</label>
          <div className="relative mt-1.5">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-5 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3 21 21" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A10.2 10.2 0 0 1 12 5c6 0 10 7 10 7a18.3 18.3 0 0 1-3.2 4.2" />
      <path d="M6.1 6.1A18.3 18.3 0 0 0 2 12s4 7 10 7a9.6 9.6 0 0 0 4.1-.9" />
    </svg>
  );
}