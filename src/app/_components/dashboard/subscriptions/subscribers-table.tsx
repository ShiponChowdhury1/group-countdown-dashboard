"use client";

import { useState, useMemo } from "react";
import { Subscriber } from "./subscriptions-page";

type Props = {
  subscribers: Subscriber[];
};

export default function SubscribersTable({ subscribers }: Props) {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<"All" | "Premium" | "Free">("All");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    return subscribers.filter((s) => {
      const matchSearch =
        search.trim() === "" ||
        s.user.toLowerCase().includes(search.toLowerCase());
      const matchPlan = filterPlan === "All" || s.plan === filterPlan;
      return matchSearch && matchPlan;
    });
  }, [subscribers, search, filterPlan]);

  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      {/* Header row with title + search + filter */}
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-slate-700">Active Subscribers</h2>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subscriber…"
              className="w-44 sm:w-52 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((p) => !p)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <FilterIcon />
              Filter
              {filterPlan !== "All" && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
            </button>
            {showFilter && (
              <div className="absolute right-0 top-full z-30 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Plan</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Premium", "Free"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setFilterPlan(opt); setShowFilter(false); }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        filterPlan === opt
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3 text-left font-medium text-slate-500">User</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Plan</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">End Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-400">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              filtered.map((sub) => (
                <tr key={sub.id} className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{sub.user}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${sub.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{sub.endDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}