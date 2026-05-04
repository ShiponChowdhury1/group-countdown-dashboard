"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { useMemo } from "react";
import { useGetDashboardSubscriptionGrowthQuery } from "@/store/dashboardUsersApi";

export default function SubscriptionGrowthChart() {
	const { data, isLoading } = useGetDashboardSubscriptionGrowthQuery();

	const chartData = useMemo(() => {
		return (data ?? []).map((item) => ({
			month: item.month,
			value: item.count,
		}));
	}, [data]);

	const maxValue = useMemo(() => {
		if (!chartData.length) return 10;
		return Math.max(...chartData.map((item) => item.value), 10);
	}, [chartData]);

	const yMax = useMemo(() => {
		return Math.ceil(maxValue / 5) * 5;
	}, [maxValue]);

	const yTicks = useMemo(() => {
		const step = Math.max(1, Math.ceil(yMax / 4));
		return [0, step, step * 2, step * 3, yMax];
	}, [yMax]);

	return (
		<div className="h-75 w-full">
			{isLoading ? (
				<p className="pb-2 text-xs text-slate-500">Loading chart data...</p>
			) : null}

			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={chartData}
					margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
					accessibilityLayer={false}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
					<XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
					<YAxis stroke="#6b7280" domain={[0, yMax]} ticks={yTicks} width={42} />
					<Line
						type="monotone"
						dataKey="value"
						stroke="#10b981"
						strokeWidth={2.5}
						dot={{ r: 3, fill: "#ffffff", stroke: "#10b981", strokeWidth: 2 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
