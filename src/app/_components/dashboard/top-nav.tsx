'use client';

import { useState, useRef, useEffect } from 'react';

export default function TopNav() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className="h-20 w-full border-b border-[#E5E7EB] bg-[#FFFFFF]">
			<div
				className="flex h-full w-full items-center justify-end pr-6"
			>
				<div className="flex items-center gap-3 rounded-full bg-white px-3 py-2">
					<button
						type="button"
						className="relative h-8 w-8 rounded-full text-slate-600"
						aria-label="Notifications"
					>
						<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
							<path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
							<path d="M9 17a3 3 0 0 0 6 0" />
						</svg>
						<span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
					</button>
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="flex items-center gap-3 rounded-full hover:bg-slate-50 px-3 py-2 cursor-pointer"
						>
							<div className="h-10 w-10 rounded-full bg-slate-300" />
							<div className="ml-1 leading-tight">
								<p className="text-sm font-semibold text-slate-800">Admin Angela</p>
								<p className="text-xs text-slate-500">admin@gmail.com</p>
							</div>
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
										onClick={() => setIsOpen(false)}
										className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition"
									>
										<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
											<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
										</svg>
										<span className="text-sm font-medium">Profile</span>
									</button>

									<button
										onClick={() => setIsOpen(false)}
										className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition"
									>
										<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
											<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62L21 6.04c-.12-.22-.39-.3-.61-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.23-.09-.49 0-.61.22L2.88 6.04c-.13.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.8 3.12c.12.22.39.3.61.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.47.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.23.09.49 0 .61-.22l1.8-3.12c.12-.22.07-.48-.1-.62l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
										</svg>
										<span className="text-sm font-medium">Settings</span>
									</button>

									<button
										onClick={() => setIsOpen(false)}
										className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition"
									>
										<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
											<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
										</svg>
										<span className="text-sm font-medium">Sign Out</span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
