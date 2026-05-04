"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread?: boolean;
};

const ITEMS_PER_PAGE = 5;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "n1", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago", unread: true },
    { id: "n2", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: true },
    { id: "n3", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
    { id: "n4", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
    { id: "n5", title: "Premium Plan Update", message: "New benefits added to premium plan.", timeAgo: "1 week ago", unread: false },
    { id: "n6", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago", unread: false },
    { id: "n7", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const totalPages = Math.max(1, Math.ceil(notifications.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = notifications.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      timeAgo: "Just now",
      unread: true,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // reset
    setTitle("");
    setMessage("");
    setOpenModal(false);
  };

  return (
    <div className="px-4 sm:px-6 pt-4">
      <section className="mt-2">
        <h1 className="text-[22px] font-bold text-black">Notifications</h1>
        <p className="mt-1 text-sm text-slate-500">
          Send broadcast messages to all users
        </p>
      </section>

      <section className="mt-6">
        <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              Recent Notifications
            </h2>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-600">
                {notifications.filter((n) => n.unread).length} new
              </span>

              <button
                onClick={() => setOpenModal(true)}
                className="rounded-lg bg-blue-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-100">
            {paginated.map((n) => (
              <div
                key={n.id}
                className={`group flex cursor-pointer gap-3 px-5 py-4 transition-all duration-150 hover:bg-blue-50/50 ${
                  n.unread ? "bg-blue-50/30" : ""
                }`}
              >
                <div className="mt-1.5 shrink-0">
                  <span
                    className={`block h-2 w-2 rounded-full ${
                      n.unread ? "bg-blue-500" : "bg-slate-200"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {n.message}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {n.timeAgo}
                  </p>
                </div>

                <div className="shrink-0 self-center text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
            className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 min-w-9 rounded-lg border px-3 text-sm ${
                  page === safeCurrentPage
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage === totalPages}
            className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="mb-1 text-lg font-semibold text-slate-900">
              Send Notification
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              This message will be sent to all users.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="notification-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Title
                </label>
              <input
                id="notification-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
              </div>

              <div>
                <label htmlFor="notification-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Message
                </label>
              <textarea
                id="notification-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                rows={3}
                required
              />
                <p className="mt-1 text-xs text-slate-400">Keep it short and clear for better engagement.</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}