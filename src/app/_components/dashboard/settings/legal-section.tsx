"use client";

import { useState } from "react";
import ViewLegalModal from "@/app/_components/dashboard/settings/view-legal-modal";
import EditLegalModal from "@/app/_components/dashboard/settings/edit-legal-modal";

export type LegalDoc = {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  policyName: string;
  effectiveDate: string;
  description: string;
};

const initialDocs: LegalDoc[] = [
  {
    id: "privacy",
    tag: "Privacy Policy",
    tagColor: "bg-blue-500",
    title: "Privacy Policy - Legal Document",
    policyName: "App- Privacy Policy",
    effectiveDate: "11/21/2024",
    description: `ACCEPTANCE OF TERMS Your access to and use of www.sozohair.net ("the Website") and any Services referred to in Clause 2, is subject exclusively to these Terms and Conditions. You will not use the Website/Services for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the Website/Services you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the Website/Services.\nWe reserve the right to update or amend these Terms and Conditions at any time and your continued use of the Website/Services following any changes shall be deemed to be your acceptance of such change. It is therefore your responsibility to check the Terms and Conditions regularly for any changes.\nTHE SERVICES\nThe Website may provide communication tools such as email, bulletin boards, chat areas, news groups, forums and/or other message or communication facilities ("the Services") designed to enable you to communicate with others. Unless stated otherwise the Services are for your personal and non-commercial use only.\nCHILD SUPERVISION\nWe are concerned about the safety and privacy of our users, particularly children. Parents who wish to allow their children access to and use of the Website/Services should supervise such access and use.\nPRIVACY POLICY\nWe are committed to responsible data management.\nUSER ACCOUNT, PASSWORD AND SECURITY\nIf a particular Service requires you to open an account you will be required to complete the registration process.`,
  },
  {
    id: "terms",
    tag: "Terms of use",
    tagColor: "bg-blue-600",
    title: "Terms of use",
    policyName: "Apps - Terms of Use",
    effectiveDate: "11/21/2024",
    description: "These Terms of Use govern your use of our platform and services.",
  },
  {
    id: "cookie",
    tag: "Cookie Policy",
    tagColor: "bg-indigo-500",
    title: "Cookie Policy",
    policyName: "Apps - Cookie Policy",
    effectiveDate: "11/21/2024",
    description: "This Cookie Policy explains how we use cookies and similar technologies.",
  },
];

export default function LegalSection() {
  const [docs, setDocs] = useState<LegalDoc[]>(initialDocs);
  const [viewModal, setViewModal] = useState<{ open: boolean; doc: LegalDoc | null }>({ open: false, doc: null });
  const [editModal, setEditModal] = useState<{ open: boolean; doc: LegalDoc | null }>({ open: false, doc: null });

  const handleUpdate = (updated: LegalDoc) => {
    setDocs((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setEditModal({ open: false, doc: null });
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-6 shadow-sm">
        {/* Clean header — no icon */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-800">Legal</h2>
          <p className="text-sm text-slate-500">Manage your legal documents</p>
        </div>

        <div className="space-y-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`inline-flex flex-shrink-0 items-center rounded-md px-2.5 py-1 text-xs font-semibold text-white ${doc.tagColor}`}>
                  {doc.tag}
                </span>
                <span className="truncate text-sm font-medium text-slate-700">{doc.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setViewModal({ open: true, doc })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  View
                </button>
                <button
                  onClick={() => setEditModal({ open: true, doc })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {docs.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No legal documents found.</p>
          )}
        </div>
      </div>

      <ViewLegalModal
        open={viewModal.open}
        doc={viewModal.doc}
        onClose={() => setViewModal({ open: false, doc: null })}
        onEdit={(doc: LegalDoc) => {
          setViewModal({ open: false, doc: null });
          setEditModal({ open: true, doc });
        }}
      />
      <EditLegalModal
        open={editModal.open}
        doc={editModal.doc}
        onClose={() => setEditModal({ open: false, doc: null })}
        onUpdate={handleUpdate}
      />
    </>
  );
}