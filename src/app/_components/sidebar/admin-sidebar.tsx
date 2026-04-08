"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Bell,
	ChevronLeft,
	ChevronRight,
	Folder,
	Grid3X3,
	LogOut,
	Settings,
	Users,
	WalletCards,
	X,
} from "lucide-react";
import { navItems } from "@/data/dashboard";
import LogoutModal from "@/app/_components/dashboard/logout/logout-modal";

type AdminSidebarProps = {
	activeNav: string;
	onChangeNav: (label: string) => void;
	isOpen: boolean;
	onClose: () => void;
	isCollapsed: boolean;
	onToggleCollapse: () => void;
};

export default function AdminSidebar({
	activeNav,
	onChangeNav,
	isOpen,
	onClose,
	isCollapsed,
	onToggleCollapse,
}: AdminSidebarProps) {
	const router = useRouter();
	const [logoutModal, setLogoutModal] = useState(false);
	const toggleLabel = isCollapsed ? "Expand sidebar" : "Collapse sidebar";

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && (
				<button
					type="button"
					onClick={onClose}
					className="fixed inset-0 z-30 bg-black/30 lg:hidden"
					aria-label="Close sidebar overlay"
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white py-5 transition-all duration-300 ease-in-out lg:z-30 lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				} ${isCollapsed ? "w-16" : "w-58.75"}`}
			>
				{/* ── Header ── */}
				<div
					className={`relative mb-6 flex items-center px-3 ${
						isCollapsed ? "justify-center" : "px-4 pr-12"
					}`}
				>
					{!isCollapsed && (
						<div className="min-w-0 overflow-hidden">
							<h2 className="truncate text-lg font-bold leading-tight text-blue-500">
								Task Manager
							</h2>
							<p className="truncate text-xs text-slate-400">Admin Dashboard</p>
						</div>
					)}

					{/* Collapse / Expand toggle — desktop only */}
					<button
						type="button"
						onClick={onToggleCollapse}
						aria-label={toggleLabel}
						title={toggleLabel}
						className="group absolute -right-3.5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:inline-flex"
					>
						{isCollapsed ? <ChevronRight className="h-5 w-5" strokeWidth={2.2} /> : <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />}
						<span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity group-hover:block group-hover:opacity-100 group-focus-visible:block group-focus-visible:opacity-100">
							{toggleLabel}
						</span>
					</button>

					{/* Mobile close button */}
					<button
						type="button"
						onClick={onClose}
						aria-label="Close sidebar"
						className={`flex lg:hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 ${
							isCollapsed ? "mx-auto" : ""
						}`}
					>
						<X className="h-5 w-5" strokeWidth={2} />
					</button>
				</div>

				{/* ── Nav items ── */}
				<nav className="mt-2 flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-2">
					{navItems.map((item) => {
						const isActive = activeNav === item.label;
						return (
							<button
								key={item.label}
								type="button"
								onClick={() => onChangeNav(item.label)}
								title={isCollapsed ? item.label : undefined}
								className={`group relative flex items-center gap-3 rounded-[10px] transition-all duration-200 ${
									isCollapsed
										? "h-11 w-11 justify-center mx-auto"
										: "h-12 w-full px-4"
								} ${
									isActive
										? "bg-blue-500 text-white"
										: "text-[#274690] hover:bg-[#EEF4FF]"
								}`}
							>
								<span
									className={`shrink-0 ${
										isActive ? "text-white" : "text-[#4A67A1]"
									}`}
								>
									{getSidebarIcon(item.iconKey)}
								</span>

								{!isCollapsed && (
									<span className="truncate text-sm font-medium">{item.label}</span>
								)}

								{/* Tooltip when collapsed */}
								{isCollapsed && (
									<span className="pointer-events-none absolute left-full ml-3 z-50 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity">
										{item.label}
									</span>
								)}
							</button>
						);
					})}
				</nav>

				{/* ── Logout ── */}
				<div className="mt-auto px-2">
					<button
						type="button"
						onClick={() => setLogoutModal(true)}
						title={isCollapsed ? "Logout" : undefined}
						className={`group relative flex items-center gap-3 rounded-[10px] border border-slate-200 bg-slate-50 transition-all duration-200 hover:bg-slate-100 ${
							isCollapsed
								? "h-11 w-11 justify-center mx-auto"
								: "h-12 w-full px-4"
						}`}
					>
						<span className="shrink-0 text-slate-500">
							<LogOut className="h-5 w-5" strokeWidth={1.8} />
						</span>
						{!isCollapsed && (
							<span className="truncate text-sm font-medium text-slate-700">
								Logout
							</span>
						)}
						{isCollapsed && (
							<span className="pointer-events-none absolute left-full ml-3 z-50 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:block transition-opacity">
								Logout
							</span>
						)}
					</button>
				</div>
			</aside>

			<LogoutModal
				open={logoutModal}
				onClose={() => setLogoutModal(false)}
				onConfirm={() => {
					setLogoutModal(false);
					router.push("/admin-login");
				}}
			/>
		</>
	);
}

function getSidebarIcon(
	key: "dashboard" | "users" | "groups" | "subscriptions" | "notifications" | "settings"
) {
	const cls = "h-5 w-5";
	if (key === "dashboard") return <Grid3X3 className={cls} strokeWidth={1.8} />;
	if (key === "users") return <Users className={cls} strokeWidth={1.8} />;
	if (key === "groups") return <Folder className={cls} strokeWidth={1.8} />;
	if (key === "subscriptions") return <WalletCards className={cls} strokeWidth={1.8} />;
	if (key === "notifications") return <Bell className={cls} strokeWidth={1.8} />;
	return <Settings className={cls} strokeWidth={1.8} />;
}
