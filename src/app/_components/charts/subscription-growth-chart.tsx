"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { subGrowthData } from "@/data/dashboard";

export default function SubscriptionGrowthChart() {
	return (
		<div className="h-75 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={subGrowthData}
					margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
					accessibilityLayer={false}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
					<XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
					<YAxis stroke="#6b7280" domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} width={42} />
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
