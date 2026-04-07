"use client";

import { useState } from "react";
import PlanCard from "./plan-card";
import EditPricingModal from "./edit-pricing-modal";
import SuccessModal from "./success-modal";
import SubscribersTable from "./subscribers-table";

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

const ITEMS_PER_PAGE = 8;

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [subscribers] = useState<Subscriber[]>(subscribersData);
  const [editModal, setEditModal] = useState<{ open: boolean; plan: Plan | null }>({ open: false, plan: null });
  const [successModal, setSuccessModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(subscribers.length / ITEMS_PER_PAGE);
  const paginated = subscribers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

  return (
    <>
      <div className="px-6 pt-4">
        <section className="mt-7">
          <h1 className="text-[22px] font-bold text-slate-900">Subscriptions Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage subscription plans and subscribers</p>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => setEditModal({ open: true, plan })}
            />
          ))}
        </section>

        <section className="mt-6">
          <SubscribersTable
            subscribers={paginated}
          />
          <div className="mt-4 flex items-center justify-end gap-1">
            {getPageNumbers(currentPage, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-slate-400">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(Number(p))}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    currentPage === p ? "bg-blue-500 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              )
            )}
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
    </>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  return [1, 2, 3, "...", total - 1, total];
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