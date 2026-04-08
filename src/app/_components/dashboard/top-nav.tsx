"use client";

import { useState, useRef, useEffect } from "react";
import LogoutModal from "@/app/_components/dashboard/logout/logout-modal";

const notificationsData = [
  { id: "n1", title: "New Feature Launch", message: "We have launched a new task sharing feature!", timeAgo: "2 days ago", unread: true },
  { id: "n2", title: "System Maintenance", message: "Scheduled maintenance on April 10, 2026.", timeAgo: "5 days ago", unread: true },
  { id: "n3", title: "Premium Plan Update", message: "New benefits added to premium plan.", timeAgo: "1 week ago", unread: false },
  { id: "n4", title: "New User Registered", message: "Jennifer Taylor just joined the platform.", timeAgo: "2 weeks ago", unread: false },
];

type TopNavProps = {
  onMenuClick: () => void;
  onProfileNavigate: () => void;
};

export default function TopNav({ onMenuClick, onProfileNavigate }: TopNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 w-full border-b border-[#E5E7EB] bg-[#FFFFFF]">
      <div className="flex h-full w-full items-center justify-between px-4 lg:justify-end lg:pr-6">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => { setNotifOpen((p) => !p); setIsOpen(false); }}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Notifications"
              title="Notifications"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
                <path d="M9 17a3 3 0 0 0 6 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-none text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Modal */}
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
                  {notificationsData.map((n) => (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50 ${n.unread ? "bg-blue-50/40" : ""}`}
                    >
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-blue-500" : "bg-slate-300"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{n.message}</p>
                        <p className="mt-1 text-xs text-slate-400">{n.timeAgo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 px-5 py-3">
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="w-full text-center text-xs font-semibold text-blue-500 hover:text-blue-600"
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => { setIsOpen(!isOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 rounded-full px-3 py-2 cursor-pointer hover:bg-slate-50"
            >
              <div className="h-10 w-10 rounded-full bg-slate-300" />
              <div className="ml-1 leading-tight text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Admin Angela</p>
                <p className="text-xs text-slate-500">admin@gmail.com</p>
              </div>
              <svg viewBox="0 0 24 24" className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white shadow-lg border border-slate-100 z-50">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-slate-300" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Admin</p>
                      <p className="text-xs text-slate-500">admin@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <button
                    onClick={() => { setIsOpen(false); onProfileNavigate(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-sm font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => { setIsOpen(false); onProfileNavigate(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62L21 6.04c-.12-.22-.39-.3-.61-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.23-.09-.49 0-.61.22L2.88 6.04c-.13.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.8 3.12c.12.22.39.3.61.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.47.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.23.09.49 0 .61-.22l1.8-3.12c.12-.22.07-.48-.1-.62l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                    </svg>
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  <button
                    onClick={() => { setIsOpen(false); setLogoutModal(true); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="m16 17 5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutModal
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={() => {
          setLogoutModal(false);
          // logout logic — e.g. router.push("/login")
        }}
      />
    </header>
  );
}
