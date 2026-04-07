"use client";

import { useState } from "react";
import GroupsTable from "@/app/_components/dashboard/groups/groups-table";
import DeleteModal from "@/app/_components/dashboard/users/delete-modal";

export type Group = {
  id: string;
  name: string;
  members: number;
  eventDate: string;
  createdBy: string;
};

const ITEMS_PER_PAGE = 8;

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(groupsData);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; groupId: string | null }>({ open: false, groupId: null });
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);
  const paginated = groups.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setDeleteModal({ open: false, groupId: null });
  };

  return (
    <>
      <div className="px-6 pt-4">
        <section className="mt-7">
          <h1 className="text-[22px] font-bold text-slate-900">Groups Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all groups and events</p>
        </section>

        <section className="mt-6">
          <GroupsTable
            groups={paginated}
            onDelete={(id: string) => setDeleteModal({ open: true, groupId: id })}
          />

          <div className="mt-4 flex items-center justify-end gap-1">
            {getPageNumbers(currentPage, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-slate-400">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setCurrentPage(Number(p))}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    currentPage === p
                      ? "bg-blue-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>
        </section>
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, groupId: null })}
        onConfirm={() => deleteModal.groupId && handleDelete(deleteModal.groupId)}
      />
    </>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1, 2, 3];
  if (current > 4) pages.push("...");
  if (current > 3 && current < total - 1) pages.push(current);
  pages.push("...");
  pages.push(total - 1, total);
  return [...new Set(pages)] as (number | "...")[];
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