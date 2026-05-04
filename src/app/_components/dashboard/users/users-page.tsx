"use client";

import { useMemo, useState } from "react";
import { Funnel, Search } from "lucide-react";
import UsersTable from "@/app/_components/dashboard/users/users-table";
import DeleteModal from "@/app/_components/dashboard/users/delete-modal";
import SuspendModal from "@/app/_components/dashboard/users/suspend-modal";
import UserDetailsModal from "@/app/_components/dashboard/users/user-details-modal";
import {
  DashboardUserDto,
  useDeleteDashboardUserMutation,
  useGetDashboardUsersQuery,
  useSetDashboardUserStatusMutation,
} from "@/store/dashboardUsersApi";

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

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return undefined;
  return url.replace("http://", "https://");
}

function mapApiUser(user: DashboardUserDto): User {
  const normalizedSubscription =
    user.subscription.toLowerCase() === "premium" ? "Premium" : "Free";

  const normalizedStatus =
    user.status.toLowerCase() === "active" ? "Active" : "Inactive";

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    groups: user.groups,
    subscription: normalizedSubscription,
    status: normalizedStatus,
    avatarUrl: normalizeImageUrl(user.image),
  };
}

export default function UsersPage() {
  const [deleteError, setDeleteError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null });
  const [suspendModal, setSuspendModal] = useState<{ open: boolean; userId: string | null; action: "suspend" | "active" }>({ open: false, userId: null, action: "suspend" });
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null });

  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterSubscription, setFilterSubscription] = useState<"All" | "Premium" | "Free">("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Inactive">("All");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: usersResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetDashboardUsersQuery({ page: currentPage });
  const [deleteDashboardUser, { isLoading: isDeletingUser }] =
    useDeleteDashboardUserMutation();
  const [setDashboardUserStatus, { isLoading: isUpdatingUserStatus }] =
    useSetDashboardUserStatusMutation();

  const users = useMemo(() => {
    return (usersResponse?.users ?? []).map(mapApiUser);
  }, [usersResponse]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        search.trim() === "" ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchSub = filterSubscription === "All" || u.subscription === filterSubscription;
      const matchStatus = filterStatus === "All" || u.status === filterStatus;
      return matchSearch && matchSub && matchStatus;
    });
  }, [users, search, filterSubscription, filterStatus]);

  const totalPages = Math.max(1, usersResponse?.total_pages ?? 1);
  const safeCurrentPage = usersResponse?.current_page ?? currentPage;
  const paginatedUsers = filteredUsers;

  const errorMessage = useMemo(() => {
    if (!error) return "";
    const queryError = error as {
      data?: { message?: string; detail?: string };
      status?: string | number;
    };

    return (
      queryError?.data?.message ||
      queryError?.data?.detail ||
      `Failed to load users (status: ${String(queryError?.status ?? "unknown")}).`
    );
  }, [error]);

  const handleDelete = async (userId: string) => {
    setDeleteError("");

    try {
      await deleteDashboardUser(userId).unwrap();
      setDeleteModal({ open: false, userId: null });
      refetch();
    } catch (err: unknown) {
      const apiError = err as {
        data?: { message?: string; detail?: string };
      };

      setDeleteError(
        apiError?.data?.message ||
          apiError?.data?.detail ||
          "Failed to delete user. Please try again."
      );
    }
  };

  const handleSuspend = async (userId: string, action: "suspend" | "active") => {
    setStatusError("");

    try {
      await setDashboardUserStatus({
        id: userId,
        is_active: action === "active",
      }).unwrap();

      setSuspendModal({ open: false, userId: null, action: "suspend" });
      refetch();
    } catch (err: unknown) {
      const apiError = err as {
        data?: { message?: string; detail?: string };
      };

      setStatusError(
        apiError?.data?.message ||
          apiError?.data?.detail ||
          "Failed to update user status. Please try again."
      );
    }
  };

  const selectedUser = users.find((u) => u.id === detailsModal.userId) ?? null;

  return (
    <>
      <div className="px-4 sm:px-6 pt-4">
        <section className="mt-2">
          <h1 className="text-[22px] font-bold text-slate-900">Users Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all registered users ({usersResponse?.total ?? users.length})
          </p>
        </section>

        {/* Search + Filter Bar */}
        <section className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" strokeWidth={2} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or email…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((p) => !p)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <Funnel className="h-4 w-4" strokeWidth={2} />
              Filter
              {(filterSubscription !== "All" || filterStatus !== "All") && (
                <span className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </button>

            {showFilter && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Subscription</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(["All", "Premium", "Free"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFilterSubscription(opt);
                        setCurrentPage(1);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        filterSubscription === opt
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Active", "Inactive"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFilterStatus(opt);
                        setCurrentPage(1);
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        filterStatus === opt
                          ? "bg-blue-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFilterSubscription("All");
                    setFilterStatus("All");
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                  className="mt-3 w-full rounded-lg text-xs font-medium text-slate-400 hover:text-slate-600 text-center"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-4">
          {deleteError ? (
            <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
              {deleteError}
            </div>
          ) : null}

          {statusError ? (
            <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
              {statusError}
            </div>
          ) : null}

          {errorMessage ? (
            <div className="mb-3 flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
              <span>{errorMessage}</span>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
              >
                Retry
              </button>
            </div>
          ) : null}

          {isLoading ? (
            <div className="mb-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
              Loading users list...
            </div>
          ) : null}

          <UsersTable
            users={paginatedUsers}
            onDelete={(id) => setDeleteModal({ open: true, userId: id })}
            onSuspend={(id, action) => setSuspendModal({ open: true, userId: id, action })}
            onDetails={(id) => setDetailsModal({ open: true, userId: id })}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              Page {safeCurrentPage} of {totalPages}
              {isFetching ? " • refreshing..." : ""}
            </p>

            <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </section>
      </div>

      <DeleteModal
        open={deleteModal.open}
        loading={isDeletingUser}
        onClose={() => {
          setDeleteError("");
          setDeleteModal({ open: false, userId: null });
        }}
        onConfirm={() => deleteModal.userId && handleDelete(deleteModal.userId)}
      />

      <SuspendModal
        open={suspendModal.open}
        loading={isUpdatingUserStatus}
        action={suspendModal.action}
        onClose={() => {
          setStatusError("");
          setSuspendModal({ open: false, userId: null, action: "suspend" });
        }}
        onConfirm={() => suspendModal.userId && handleSuspend(suspendModal.userId, suspendModal.action)}
      />

      <UserDetailsModal
        open={detailsModal.open}
        userId={detailsModal.userId}
        fallbackUser={selectedUser}
        onClose={() => setDetailsModal({ open: false, userId: null })}
      />
    </>
  );
}
