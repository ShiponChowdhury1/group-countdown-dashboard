"use client";

import { useState } from "react";
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
						className="group absolute -right-3.5 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:inline-flex"
					>
						{isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
						<CloseIcon />
					</button>
				</div>

				{/* ── Nav items ── */}
				<nav className="flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-2">
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
										: "text-slate-600 hover:bg-slate-100"
								}`}
							>
								<span
									className={`shrink-0 ${
										isActive ? "text-white" : "text-slate-500"
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
							<LogoutIcon />
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
				}}
			/>
		</>
	);
}

/* ── Icons ── */

function ChevronLeftIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}
function ChevronRightIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
			<path d="m9 18 6-6-6-6" />
		</svg>
	);
}
function CloseIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);
}
function LogoutIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<path d="m16 17 5-5-5-5" />
			<path d="M21 12H9" />
		</svg>
	);
}

function getSidebarIcon(
	key: "dashboard" | "users" | "groups" | "subscriptions" | "notifications" | "settings"
) {
	const cls = "h-5 w-5";
	if (key === "dashboard") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<rect x="3" y="3" width="7" height="7" rx="1.5" />
				<rect x="14" y="3" width="7" height="7" rx="1.5" />
				<rect x="3" y="14" width="7" height="7" rx="1.5" />
				<rect x="14" y="14" width="7" height="7" rx="1.5" />
			</svg>
		);
	}
	if (key === "users") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="8" cy="8" r="3" /><path d="M2 20a7 7 0 0 1 12 0" />
				<circle cx="17" cy="8" r="3" /><path d="M13 20a7 7 0 0 1 10 0" />
			</svg>
		);
	}
	if (key === "groups") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
			</svg>
		);
	}
	if (key === "subscriptions") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<rect x="3" y="6" width="18" height="12" rx="2" />
				<path d="M3 10h18" />
			</svg>
		);
	}
	if (key === "notifications") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
				<path d="M13.73 21a2 2 0 0 1-3.46 0" />
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
		</svg>
	);
}
