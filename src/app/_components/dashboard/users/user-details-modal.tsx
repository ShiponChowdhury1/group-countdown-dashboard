import { User } from "./users-page";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

export default function UserDetailsModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;
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
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500">User name</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{user.name}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">ID</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{user.id}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{user.email}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Phone</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{user.phone ?? "+1234567890"}</div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">User Joined</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400">{user.joinedDate ?? "05 April 2026"}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Subscription</label>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${user.subscription === "Premium" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                {user.subscription}
              </span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Activity status</label>
            <div className="mt-1">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
