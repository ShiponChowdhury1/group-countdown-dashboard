"use client";

import { useState } from "react";
import UsersTable from "@/app/_components/dashboard/users/users-table";
import DeleteModal from "@/app/_components/dashboard/users/delete-modal";
import SuspendModal from "@/app/_components/dashboard/users/suspend-modal";
import UserDetailsModal from "@/app/_components/dashboard/users/user-details-modal";
import { usersData } from "@/data/users";

export type User = {
  id: string;
  name: string;
  email: string;
  groups: number;
  subscription: "Premium" | "Free";
  status: "Active" | "Inactive";
  phone?: string;
  joinedDate?: string;
  avatarUrl?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null });
  const [suspendModal, setSuspendModal] = useState<{ open: boolean; userId: string | null; action: "suspend" | "active" }>({ open: false, userId: null, action: "suspend" });
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null });

  const handleDelete = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setDeleteModal({ open: false, userId: null });
  };

  const handleSuspend = (userId: string, action: "suspend" | "active") => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: action === "suspend" ? "Inactive" : "Active" } : u
      )
    );
    setSuspendModal({ open: false, userId: null, action: "suspend" });
  };

  const selectedUser = users.find((u) => u.id === detailsModal.userId) ?? null;

  return (
    <>
      <div className="px-6 pt-4">
        <section className="mt-7">
          <h1 className="text-[22px] font-bold text-slate-900">Users Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all registered users</p>
        </section>

        <section className="mt-6">
          <UsersTable
            users={users}
            onDelete={(id) => setDeleteModal({ open: true, userId: id })}
            onSuspend={(id, action) => setSuspendModal({ open: true, userId: id, action })}
            onDetails={(id) => setDetailsModal({ open: true, userId: id })}
          />
        </section>
      </div>

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, userId: null })}
        onConfirm={() => deleteModal.userId && handleDelete(deleteModal.userId)}
      />

      <SuspendModal
        open={suspendModal.open}
        action={suspendModal.action}
        onClose={() => setSuspendModal({ open: false, userId: null, action: "suspend" })}
        onConfirm={() => suspendModal.userId && handleSuspend(suspendModal.userId, suspendModal.action)}
      />

      <UserDetailsModal
        open={detailsModal.open}
        user={selectedUser}
        onClose={() => setDetailsModal({ open: false, userId: null })}
      />
    </>
  );
}
