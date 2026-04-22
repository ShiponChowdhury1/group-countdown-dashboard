"use client";

import { useState } from "react";
import PersonalDetails from "@/app/_components/dashboard/settings/personal-details";
import ChangePassword from "@/app/_components/dashboard/settings/change-password";
import LegalSection from "@/app/_components/dashboard/settings/legal-section";
import SuccessModal from "@/app/_components/dashboard/settings/settings-success-modal";

export default function SettingsPage() {
  const [successModal, setSuccessModal] = useState(false);

  return (
    <>
      <div className="px-6 pt-4">
        <section className="mt-2">
          <h1 className="text-[22px] font-bold text-slate-900">General Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Configure basic business information</p>
        </section>

        <section className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PersonalDetails onSaved={() => setSuccessModal(true)} />
            <ChangePassword onSaved={() => setSuccessModal(true)} />
          </div>
          <LegalSection />
        </section>
      </div>

      <SuccessModal open={successModal} onClose={() => setSuccessModal(false)} />
    </>
  );
}