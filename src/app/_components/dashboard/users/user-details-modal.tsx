import Image from "next/image";
import { User } from "./users-page";
import { useGetDashboardUserDetailsQuery } from "@/store/dashboardUsersApi";

type Props = {
  open: boolean;
  userId: string | null;
  fallbackUser: User | null;
  onClose: () => void;
};

function normalizeImageUrl(url: string | null | undefined) {
  if (!url) return null;
  return url.replace("http://", "https://");
}

function formatJoinDate(value: string | undefined) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "N/A";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function UserDetailsModal({
  open,
  userId,
  fallbackUser,
  onClose,
}: Props) {
  const { data, isLoading, error } = useGetDashboardUserDetailsQuery(userId ?? "", {
    skip: !open || !userId,
  });

  if (!open || !userId) return null;

  const userName = data?.name ?? fallbackUser?.name ?? "User";
  const userImage = normalizeImageUrl(data?.image) ?? fallbackUser?.avatarUrl ?? null;
  const subscriptionPlan =
    data?.subscription?.plan?.toLowerCase() === "premium"
      ? "Premium"
      : data?.subscription?.plan
      ? "Free"
      : fallbackUser?.subscription ?? "Free";
  const status =
    data?.status?.toLowerCase() === "active"
      ? "Active"
      : data?.status
      ? "Inactive"
      : fallbackUser?.status ?? "Inactive";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-slate-900">User Details</h2>
        <p className="text-sm text-slate-500">View user details</p>

        <div className="mt-4 h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={64}
              height={64}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
              {userName.charAt(0)}
            </div>
          )}
        </div>

        {isLoading ? (
          <p className="mt-3 text-xs text-slate-500">Loading details...</p>
        ) : null}

        {error ? (
          <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            Failed to load full details. Showing available data.
          </p>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500">User name</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{userName}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">ID</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{data?.id ?? userId}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{data?.email ?? fallbackUser?.email ?? "N/A"}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Phone</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{data?.phone ?? fallbackUser?.phone ?? "N/A"}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">User Joined</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{formatJoinDate(data?.created_at) || fallbackUser?.joinedDate || "N/A"}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email Verified</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">
              {data?.is_email_verified ? "Verified" : "Not verified"}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Subscription</label>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${subscriptionPlan === "Premium" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                {subscriptionPlan}
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Activity status</label>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
