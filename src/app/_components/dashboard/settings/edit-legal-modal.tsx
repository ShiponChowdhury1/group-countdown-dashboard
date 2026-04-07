"use client";

import { useState, useEffect } from "react";
import { LegalDoc } from "./legal-section";

type Props = {
  open: boolean;
  doc: LegalDoc | null;
  onClose: () => void;
  onUpdate: (doc: LegalDoc) => void;
};

export default function EditLegalModal({ open, doc, onClose, onUpdate }: Props) {
  const [policyName, setPolicyName] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (doc) {
      setPolicyName(doc.policyName);
      setEffectiveDate(doc.effectiveDate);
      setDescription(doc.description);
    }
  }, [doc]);

  if (!open || !doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <XIcon />
        </button>

        <h2 className="text-lg font-bold text-slate-900">{doc.tag}</h2>
        <p className="text-sm text-slate-500">App {doc.tag}</p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Privacy Policy</label>
            <input
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Effective Date</label>
            <input
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="mt-1.5 w-40 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            onClick={() => onUpdate({ ...doc, policyName, effectiveDate, description })}
            className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}