type StatCardProps = {
	title: string;
	value: string;
	iconKey: string;
	iconColor: string;
};

export default function StatCard({
	title,
	value,
	iconKey,
	iconColor,
}: StatCardProps) {
	return (
		<article className="h-38 w-full rounded-[14px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
			<div className="flex items-center justify-between">
				<p className="text-base font-medium text-slate-500">{title}</p>
				<span style={{ color: iconColor }}>{getCardIcon(iconKey)}</span>
			</div>
			<p className="mt-8 text-[2.25rem] font-semibold leading-none text-slate-900">{value}</p>
		</article>
	);
}

function getCardIcon(iconKey: string) {
	const cls = "h-5 w-5";

	if (iconKey === "users") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="9" cy="8" r="3" />
				<circle cx="17" cy="8" r="3" />
				<path d="M1 20a8 8 0 0 1 16 0" />
				<path d="M13 20a7 7 0 0 1 10 0" />
			</svg>
		);
	}

	if (iconKey === "groups") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="9" cy="8" r="3" />
				<path d="M3 20a7 7 0 0 1 12 0" />
				<path d="M16 5a3 3 0 1 1 0 6" />
				<path d="M21 20a7 7 0 0 0-7-7" />
			</svg>
		);
	}

	if (iconKey === "tasks") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<rect x="4" y="4" width="16" height="16" rx="2" />
				<path d="m8 12 2 2 4-4" />
			</svg>
		);
	}

	if (iconKey === "subscriptions") {
		return (
			<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<rect x="3" y="6" width="18" height="12" rx="2" />
				<path d="M3 10h18" />
			</svg>
		);
	}

	// revenue / dollar
	return (
		<svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 2v20" />
			<path d="M17 6.5c0-2-2-3.5-5-3.5s-5 1.5-5 3.5 2 3.5 5 3.5 5 1.5 5 3.5-2 3.5-5 3.5-5-1.5-5-3.5" />
		</svg>
	);
}
