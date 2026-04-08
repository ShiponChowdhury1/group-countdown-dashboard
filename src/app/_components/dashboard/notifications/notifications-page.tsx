"use client";

import { useState } from "react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
};

const ITEMS_PER_PAGE = 5;

const notificationsData: Notification[] = [
  { id: "n1", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago", unread: true },
  { id: "n2", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: true },
  { id: "n3", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
  { id: "n4", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
  { id: "n5", title: "Premium Plan Update", message: "New benefits added to premium plan.", timeAgo: "1 week ago", unread: false },
  { id: "n6", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago", unread: false },
  { id: "n7", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
];

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notificationsData.length / ITEMS_PER_PAGE);
  const paginated = notificationsData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="px-4 sm:px-6 pt-4">
      <section className="mt-7">
        <h1 className="text-[22px] font-bold text-slate-900">Notifications</h1>
        <p className="mt-1 text-sm text-slate-500">Send broadcast messages to all users</p>
      </section>

      <section className="mt-6">
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Recent Notifications</h2>
            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-600">
              {notificationsData.filter((n) => n.unread).length} new
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {paginated.map((n) => (
              <div
                key={n.id}
                className={`group flex cursor-pointer gap-3 px-5 py-4 transition-all duration-150 hover:bg-blue-50/50 ${
                  n.unread ? "bg-blue-50/30" : ""
                }`}
              >
                {/* Unread dot */}
                <div className="mt-1.5 flex-shrink-0">
                  <span className={`block h-2 w-2 rounded-full ${n.unread ? "bg-blue-500" : "bg-slate-200"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-slate-900 transition-colors group-hover:text-blue-600 ${n.unread ? "text-slate-900" : "text-slate-700"}`}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">{n.message}</p>
                  <p className="mt-1 text-xs text-slate-400">{n.timeAgo}</p>
                </div>
                {/* Hover chevron */}
                <div className="flex-shrink-0 self-center text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                  <ChevronRightIcon />
                </div>
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

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  return [1, 2, 3, "...", total - 1, total];
}