"use client";

import { useState } from "react";
import { navItems } from "@/data/dashboard";
import LogoutModal from "@/app/_components/dashboard/logout/logout-modal";

type AdminSidebarProps = {
	activeNav: string;
	onChangeNav: (label: string) => void;
	isOpen: boolean;
	onClose: () => void;
};

export default function AdminSidebar({
	activeNav,
	onChangeNav,
	isOpen,
	onClose,
}: AdminSidebarProps) {
	const [logoutModal, setLogoutModal] = useState(false);

	return (
		<>
			{isOpen && (
				<button
					type="button"
					onClick={onClose}
					className="fixed inset-0 z-30 bg-black/30 lg:hidden"
					aria-label="Close sidebar overlay"
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 z-40 flex w-58.75 flex-col justify-between border-r border-slate-200 bg-white py-6 transition-transform duration-200 lg:z-30 lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="flex h-full flex-col">
					<div className="mb-8 px-4">
						<h2 className="text-lg font-bold leading-tight text-blue-500">
							Task Manager
						</h2>
						<p className="text-xs text-slate-400">Admin Dashboard</p>
					</div>

					<nav className="flex flex-col gap-1">
						{navItems.map((item) => {
							const isActive = activeNav === item.label;
							return (
							<button
								key={item.label}
								type="button"
								onClick={() => onChangeNav(item.label)}
								className={`mx-auto flex h-12 w-55.75 items-center gap-2.5 rounded-[10px] pt-2.5 pr-2.5 pb-2.5 pl-4 text-left text-sm font-medium transition-colors ${
									isActive
										? "bg-blue-500 text-white"
										: "text-slate-600 hover:bg-slate-100"
								}`}
							>
								<span className={isActive ? "text-white" : "text-slate-500"}>
									{getSidebarIcon(item.iconKey)}
								</span>
								<span>{item.label}</span>
							</button>
							);
						})}
					</nav>

					<button
						type="button"
						onClick={() => setLogoutModal(true)}
						className="mx-auto mt-auto flex h-12 w-55.75 items-center gap-2.5 rounded-[10px] border border-slate-200 bg-slate-50 pt-2.5 pr-2.5 pb-2.5 pl-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
					>
						<span className="text-slate-500">{getLogoutIcon()}</span>
						<span>Logout</span>
					</button>
				</div>
			</aside>

			<LogoutModal
				open={logoutModal}
				onClose={() => setLogoutModal(false)}
				onConfirm={() => {
					setLogoutModal(false);
					// logout logic — e.g. router.push("/login")
				}}
			/>
		</>
	);
}

function getSidebarIcon(
	key:
		| "dashboard"
		| "users"
		| "groups"
		| "subscriptions"
		| "notifications"
		| "settings"
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
				<circle cx="8" cy="8" r="3" />
				<path d="M2 20a7 7 0 0 1 12 0" />
				<circle cx="17" cy="8" r="3" />
				<path d="M13 20a7 7 0 0 1 10 0" />
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

function getLogoutIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<path d="m16 17 5-5-5-5" />
			<path d="M21 12H9" />
		</svg>
	);
}
