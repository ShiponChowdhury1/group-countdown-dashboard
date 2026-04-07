"use client";

import { useState, useEffect } from "react";
import { Plan } from "./subscriptions-page";

type Props = {
  open: boolean;
  plan: Plan | null;
  onClose: () => void;
  onSave: (data: { monthlyPrice: number; yearlyPrice: number; description: string }) => void;
};

export default function EditPricingModal({ open, plan, onClose, onSave }: Props) {
  const [monthly, setMonthly] = useState("");
  const [yearly, setYearly] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (plan) {
      setMonthly(plan.monthlyPrice.toString());
      setYearly(plan.yearlyPrice?.toString() ?? "");
      setDescription("");
    }
  }, [plan]);

  if (!open || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-lg font-bold text-slate-900">Edit {plan.name} Pricing</h2>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Monthly Price ($)</label>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Yearly Price ($)</label>
            <input
              type="number"
              value={yearly}
              onChange={(e) => setYearly(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description...."
              rows={5}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => onSave({ monthlyPrice: Number(monthly), yearlyPrice: Number(yearly), description })}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}