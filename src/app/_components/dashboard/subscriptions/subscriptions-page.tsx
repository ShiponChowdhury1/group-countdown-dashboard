"use client";

import { useState } from "react";
import PlanCard from "@/app/_components/dashboard/subscriptions/plan-card";
import EditPricingModal from "./edit-pricing-modal";
import SuccessModal from "@/app/_components/dashboard/subscriptions/success-modal";
import SubscribersTable from "@/app/_components/dashboard/subscriptions/subscribers-table";

export type Plan = {
  id: "free" | "premium";
  name: string;
  monthlyPrice: number;
  yearlyPrice: number | null;
  yearSaving: string | null;
  features: string[];
  userCount: number;
};

export type Subscriber = {
  id: string;
  user: string;
  plan: "Premium" | "Free";
  status: "Active" | "Inactive";
  startDate: string;
  endDate: string;
};

const ITEMS_PER_PAGE = 10;

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [subscribers] = useState<Subscriber[]>(subscribersData);
  const [editModal, setEditModal] = useState<{ open: boolean; plan: Plan | null }>({ open: false, plan: null });
  const [successModal, setSuccessModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addSubModal, setAddSubModal] = useState(false);

  const totalPages = Math.max(1, Math.ceil(subscribers.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = subscribers.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  const handleSave = (updated: { monthlyPrice: number; yearlyPrice: number; description: string }) => {
    if (!editModal.plan) return;
    setPlans((prev) =>
      prev.map((p) =>
        p.id === editModal.plan!.id
          ? { ...p, monthlyPrice: updated.monthlyPrice, yearlyPrice: updated.yearlyPrice }
          : p
      )
    );
    setEditModal({ open: false, plan: null });
    setSuccessModal(true);
  };

  const handleDeletePlan = (id: "free" | "premium") => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="px-4 sm:px-6 pt-4">
        <section className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-slate-900">Subscriptions Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage subscription plans and subscribers</p>
          </div>
          {/* Add Subscription Button */}
          <button
            type="button"
            onClick={() => setAddSubModal(true)}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
          >
            <PlusIcon />
            Add Subscription
          </button>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => setEditModal({ open: true, plan })}
              onDelete={() => handleDeletePlan(plan.id)}
            />
          ))}
        </section>

        <section className="mt-6">
          <SubscribersTable subscribers={paginated} />
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === safeCurrentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>

      <EditPricingModal
        open={editModal.open}
        plan={editModal.plan}
        onClose={() => setEditModal({ open: false, plan: null })}
        onSave={handleSave}
      />

      <SuccessModal
        open={successModal}
        planName={editModal.plan?.name ?? "Premium"}
        onClose={() => setSuccessModal(false)}
      />

      {/* Simple Add Subscription modal */}
      {addSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-base font-semibold text-slate-800 mb-1">Add New Subscription</h2>
            <p className="text-sm text-slate-500 mb-5">Create a new subscription plan or entry.</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Plan name"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              />
              <input
                type="number"
                placeholder="Monthly price ($)"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAddSubModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setAddSubModal(false)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const initialPlans: Plan[] = [
  {
    id: "free",
    name: "Free Plan",
    monthlyPrice: 0,
    yearlyPrice: null,
    yearSaving: null,
    features: ["Up to 3 groups", "Basic task management", "5 members per group", "Email notifications"],
    userCount: 4,
  },
  {
    id: "premium",
    name: "Premium Plan",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    yearSaving: "save 17%",
    features: ["Unlimited groups", "Advanced task management", "Unlimited members", "Priority support", "Custom themes"],
    userCount: 4,
  },
];

const subscribersData: Subscriber[] = [
  { id: "s1", user: "John Smith", plan: "Premium", status: "Active", startDate: "2024-01-15", endDate: "2027-01-15" },
  { id: "s2", user: "Sarah Johnson", plan: "Premium", status: "Active", startDate: "2024-02-20", endDate: "2027-02-20" },
  { id: "s3", user: "David Wilson", plan: "Premium", status: "Active", startDate: "2024-02-28", endDate: "2027-02-28" },
  { id: "s4", user: "James Martinez", plan: "Premium", status: "Active", startDate: "2024-01-20", endDate: "2027-01-20" },
];