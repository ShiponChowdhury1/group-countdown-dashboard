"use client";

import { useState, useMemo } from "react";
import { isSameDay, parseISO } from "date-fns";
import { CalendarDays, Funnel, Search } from "lucide-react";
import GroupsTable from "@/app/_components/dashboard/groups/groups-table";
import DeleteModal from "@/app/_components/dashboard/users/delete-modal";
import GroupDetailsModal from "@/app/_components/dashboard/groups/group-details-modal";

export type Group = {
  id: string;
  name: string;
  members: number;
  eventDate: string;
  createdBy: string;
};

const ITEMS_PER_PAGE = 10;

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(groupsData);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; groupId: string | null }>({ open: false, groupId: null });
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; groupId: string | null }>({ open: false, groupId: null });
  const [currentPage, setCurrentPage] = useState(1);

  // Search & filter
  const [search, setSearch] = useState("");
  const [filterMembers, setFilterMembers] = useState<"All" | "1-5" | "6-10" | "11+">("All");
  const [filterDate, setFilterDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      const matchSearch =
        search.trim() === "" ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.createdBy.toLowerCase().includes(search.toLowerCase());
      const matchMembers =
        filterMembers === "All" ||
        (filterMembers === "1-5" && g.members >= 1 && g.members <= 5) ||
        (filterMembers === "6-10" && g.members >= 6 && g.members <= 10) ||
        (filterMembers === "11+" && g.members >= 11);
      const matchDate =
        filterDate === "" ||
        isSameDay(parseISO(g.eventDate), parseISO(filterDate));
      return matchSearch && matchMembers && matchDate;
    });
  }, [groups, search, filterMembers, filterDate]);

  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = filteredGroups.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setDeleteModal({ open: false, groupId: null });
  };

  const selectedGroup = groups.find((g) => g.id === detailsModal.groupId) ?? null;

  return (
    <>
      <div className="px-4 sm:px-6 pt-4">
        <section className="mt-2">
          <h1 className="text-[22px] font-bold text-slate-900">Groups Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all groups and events</p>
        </section>

        {/* Search + Filter */}
        <section className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" strokeWidth={2} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by group name or creator…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((p) => !p)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <Funnel className="h-4 w-4" strokeWidth={2} />
              Filter
              {(filterMembers !== "All" || filterDate !== "") && (
                <span className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </button>

            {showFilter && (
              <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Members</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "1-5", "6-10", "11+"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setFilterMembers(opt); setCurrentPage(1); }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        filterMembers === opt
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Event Date</p>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => {
                      setFilterDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-xs text-slate-700 outline-none transition focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setFilterMembers("All"); setFilterDate(""); setShowFilter(false); setCurrentPage(1); }}
                  className="mt-3 w-full rounded-lg text-xs font-medium text-slate-400 hover:text-slate-600 text-center"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-4">
          <GroupsTable
            groups={paginated}
            onDelete={(id: string) => setDeleteModal({ open: true, groupId: id })}
            onDetails={(id: string) => setDetailsModal({ open: true, groupId: id })}
          />

          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === safeCurrentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, groupId: null })}
        onConfirm={() => deleteModal.groupId && handleDelete(deleteModal.groupId)}
      />

      <GroupDetailsModal
        open={detailsModal.open}
        group={selectedGroup}
        onClose={() => setDetailsModal({ open: false, groupId: null })}
      />
    </>
  );
}

const groupsData: Group[] = [
  { id: "g1", name: "Wedding Planning 2026", members: 12, eventDate: "2026-08-15", createdBy: "John Smith" },
  { id: "g2", name: "Product Launch", members: 8, eventDate: "2026-05-20", createdBy: "Sarah Johnson" },
  { id: "g3", name: "Summer Vacation", members: 5, eventDate: "2026-07-01", createdBy: "Michael Brown" },
  { id: "g4", name: "Conference 2026", members: 25, eventDate: "2026-09-10", createdBy: "Emily Davis" },
  { id: "g5", name: "Birthday Party", members: 15, eventDate: "2026-06-05", createdBy: "David Wilson" },
  { id: "g6", name: "Marathon Training", members: 10, eventDate: "2026-10-15", createdBy: "Lisa Anderson" },
  { id: "g7", name: "Book Club Meeting", members: 7, eventDate: "2026-05-01", createdBy: "James Martinez" },
  { id: "g8", name: "New Year Celebration", members: 20, eventDate: "2027-01-01", createdBy: "Jennifer Taylor" },
];