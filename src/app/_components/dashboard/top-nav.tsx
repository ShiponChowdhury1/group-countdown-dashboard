"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Settings, UserRound } from "lucide-react";
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
  const router = useRouter();
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
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => { setNotifOpen((p) => !p); setIsOpen(false); }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5" strokeWidth={2} />
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
                <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
              <Image
                src="/admin-avatar.svg"
                alt="Admin profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
              />
              <div className="ml-1 leading-tight text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Admin Angela</p>
                <p className="text-xs text-slate-500">admin@gmail.com</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} strokeWidth={2} aria-hidden="true" />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white shadow-lg border border-slate-100 z-50">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/admin-avatar.svg"
                      alt="Admin profile"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                    />
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
                    <UserRound className="h-5 w-5" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => { setIsOpen(false); onProfileNavigate(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  <button
                    onClick={() => { setIsOpen(false); setLogoutModal(true); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="h-5 w-5" strokeWidth={1.8} />
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
          router.push("/admin-login");
        }}
      />
    </header>
  );
}
