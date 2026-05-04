"use client";

import { useMemo, useState } from "react";
import SubscriptionGrowthChart from "@/app/_components/charts/subscription-growth-chart";
import UserGrowthChart from "@/app/_components/charts/user-growth-chart";
import StatCard from "@/app/_components/dashboard/stat-card";
import TopNav from "@/app/_components/dashboard/top-nav";
import GroupsPage from "@/app/_components/dashboard/groups/groups-page";
import NotificationsPage from "@/app/_components/dashboard/notifications/notifications-page";
import SettingsPage from "@/app/_components/dashboard/settings/settings-page";
import SubscriptionsPage from "@/app/_components/dashboard/subscriptions/subscriptions-page";
import UsersPage from "@/app/_components/dashboard/users/users-page";
import AdminSidebar from "@/app/_components/sidebar/admin-sidebar";
import { useGetDashboardOverviewQuery } from "@/store/dashboardUsersApi";

export default function DashboardPage() {
	const [activeNav, setActiveNav] = useState("Dashboard");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const {
		data: overview,
		isLoading: isOverviewLoading,
		error: overviewError,
		refetch: refetchOverview,
	} = useGetDashboardOverviewQuery();

	const statsCards = useMemo(
		() => [
			{
				title: "Total Users",
				value: isOverviewLoading
					? "..."
					: (overview?.total_users ?? 0).toLocaleString(),
				iconKey: "users",
				iconColor: "#3b82f6",
			},
			{
				title: "Active Events",
				value: isOverviewLoading
					? "..."
					: (overview?.active_groups ?? 0).toLocaleString(),
				iconKey: "groups",
				iconColor: "#22c55e",
			},
			{
				title: "Total Tasks",
				value: isOverviewLoading
					? "..."
					: (overview?.total_tasks ?? 0).toLocaleString(),
				iconKey: "tasks",
				iconColor: "#f59e0b",
			},
			{
				title: "Active Subscriptions",
				value: isOverviewLoading
					? "..."
					: (overview?.active_subscriptions ?? 0).toLocaleString(),
				iconKey: "subscriptions",
				iconColor: "#a855f7",
			},
			{
				title: "Revenue",
				value: "Coming Soon",
				iconKey: "revenue",
				iconColor: "#ef4444",
			},
		],
		[overview, isOverviewLoading]
	);

	const overviewErrorMessage = useMemo(() => {
		if (!overviewError) return "";
		const queryError = overviewError as {
			data?: { message?: string; detail?: string };
			status?: string | number;
		};

		return (
			queryError?.data?.message ||
			queryError?.data?.detail ||
			`Failed to load overview (status: ${String(queryError?.status ?? "unknown")}).`
		);
	}, [overviewError]);

	return (
		<div className="min-h-screen bg-[#F9FAFB]">
			<AdminSidebar
				activeNav={activeNav}
				onChangeNav={(label) => {
					setActiveNav(label);
					setIsSidebarOpen(false);
				}}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				isCollapsed={isSidebarCollapsed}
				onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
			/>

			{/* Main content — shifts with sidebar width */}
			<main
				className={`min-h-screen pb-10 transition-all duration-300 ease-in-out ${
					isSidebarCollapsed ? "lg:pl-16" : "lg:pl-58.75"
				}`}
			>
				<TopNav
					onMenuClick={() => setIsSidebarOpen((prev) => !prev)}
					onProfileNavigate={() => setActiveNav("Settings")}
				/>

				{activeNav === "Users" && <UsersPage />}
				{(activeNav === "Events" || activeNav === "Groups") && <GroupsPage />}
				{activeNav === "Subscriptions" && <SubscriptionsPage />}
				{activeNav === "Notifications" && <NotificationsPage />}
				{activeNav === "Settings" && <SettingsPage />}

				{activeNav === "Dashboard" && (
					<div className="px-4 sm:px-6 pt-4">
						<section className="mt-2">
							<h1 className="text-[22px] font-bold text-slate-900">Dashboard Overview</h1>
							 <p className="mt-1 text-sm text-slate-500">Welcome back, Admin</p>
						</section>

						<section className="mt-7">
							{overviewErrorMessage ? (
								<div className="mb-3 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
									<span>{overviewErrorMessage}</span>
									<button
										type="button"
										onClick={() => refetchOverview()}
										className="rounded-lg border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
									>
										Retry
									</button>
								</div>
							) : null}

							<article className="overflow-hidden rounded-[14px]">
								<div className="grid gap-2 xl:grid-cols-5">
									{statsCards.map((card) => (
										<StatCard key={card.title} {...card} />
									))}
								</div>
							</article>
						</section>

						<section className="mt-6 grid gap-6 xl:grid-cols-2">
							<article className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-[22px] font-semibold text-slate-800">User Growth</h2>
								<div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
									<UserGrowthChart />
								</div>
							</article>

							<article className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-[22px] font-semibold text-slate-800">Subscription Growth</h2>
								<div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
									<SubscriptionGrowthChart />
								</div>
							</article>
						</section>
					</div>
				)}
			</main>
		</div>
	);
}
