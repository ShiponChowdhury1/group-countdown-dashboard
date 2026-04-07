"use client";

import { useState } from "react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
};

const ITEMS_PER_PAGE = 5;

const notificationsData: Notification[] = [
  { id: "n1", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago" },
  { id: "n2", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago" },
  { id: "n3", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago" },
  { id: "n4", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago" },
  { id: "n5", title: "Premium Plan Update", message: "New benefits added to premium plan.", timeAgo: "1 week ago" },
  { id: "n6", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago" },
  { id: "n7", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago" },
];

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notificationsData.length / ITEMS_PER_PAGE);
  const paginated = notificationsData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="px-6 pt-4">
      <section className="mt-7">
        <h1 className="text-[22px] font-bold text-slate-900">Notifications</h1>
        <p className="mt-1 text-sm text-slate-500">Send broadcast messages to all users</p>
      </section>

      <section className="mt-6">
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-700">Recent Notifications</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {paginated.map((n) => (
              <div key={n.id} className="px-5 py-4">
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="mt-0.5 text-sm text-slate-600">{n.message}</p>
                <p className="mt-1 text-xs text-slate-400">{n.timeAgo}</p>
              </div>
            ))}
          </div>
        </div>

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
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  return [1, 2, 3, "...", total - 1, total];
}