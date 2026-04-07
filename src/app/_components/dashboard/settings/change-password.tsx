"use client";

import { useState } from "react";

export default function ChangePassword() {
  const [current, setCurrent] = useState("12345");
  const [newPass, setNewPass] = useState("12345");
  const [confirm, setConfirm] = useState("12345");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <KeyIcon />
        <div>
          <h2 className="text-base font-semibold text-slate-800">Change Password</h2>
          <p className="text-sm text-slate-500">Change your password to keep your account secure.</p>
        </div>
      </div>

      <div className="mt-5 space-y-4 max-w-sm">
        <div>
          <label className="text-sm font-medium text-slate-700">Current Password</label>
          <div className="relative mt-1.5">
            <input
              type={showCurrent ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <EyeIcon />
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">New Password</label>
          <div className="relative mt-1.5">
            <input
              type={showNew ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <EyeIcon />
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
        </div>
      </div>

      <button className="mt-5 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
        Change Password
      </button>
    </div>
  );
}

function KeyIcon() {
  return (
    <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
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