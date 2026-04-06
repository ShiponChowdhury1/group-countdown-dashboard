export type SidebarItem = {
	label: string;
	iconKey: "dashboard" | "users" | "groups" | "subscriptions" | "notifications" | "settings";
};

export type StatCardItem = {
	title: string;
	value: string;
	iconKey: "users" | "groups" | "tasks" | "subscriptions" | "revenue";
	iconColor: string;
};

export type GrowthPoint = {
	month: string;
	value: number;
};

export const navItems: SidebarItem[] = [
	{ label: "Dashboard", iconKey: "dashboard" },
	{ label: "Users", iconKey: "users" },
	{ label: "Groups", iconKey: "groups" },
	{ label: "Subscriptions", iconKey: "subscriptions" },
	{ label: "Notifications", iconKey: "notifications" },
	{ label: "Settings", iconKey: "settings" },
];

export const statsCards: StatCardItem[] = [
	{ title: "Total Users", value: "750", iconKey: "users", iconColor: "#3b82f6" },
	{ title: "Active Groups", value: "234", iconKey: "groups", iconColor: "#22c55e" },
	{ title: "Total Tasks", value: "1,847", iconKey: "tasks", iconColor: "#f59e0b" },
	{
		title: "Active Subscriptions",
		value: "142",
		iconKey: "subscriptions",
		iconColor: "#a855f7",
	},
	{ title: "Revenue", value: "$14,200", iconKey: "revenue", iconColor: "#ef4444" },
];

export const userGrowthData: GrowthPoint[] = [
	{ month: "Oct", value: 120 },
	{ month: "Nov", value: 195 },
	{ month: "Dec", value: 240 },
	{ month: "Jan", value: 350 },
	{ month: "Feb", value: 480 },
	{ month: "Mar", value: 630 },
	{ month: "Apr", value: 775 },
];

export const subGrowthData: GrowthPoint[] = [
	{ month: "Oct", value: 28 },
	{ month: "Nov", value: 42 },
	{ month: "Dec", value: 60 },
	{ month: "Jan", value: 82 },
	{ month: "Feb", value: 100 },
	{ month: "Mar", value: 122 },
	{ month: "Apr", value: 142 },
];
