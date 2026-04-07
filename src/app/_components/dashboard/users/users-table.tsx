import { User } from "./users-page";

type Props = {
  users: User[];
  onDelete: (id: string) => void;
  onSuspend: (id: string, action: "suspend" | "active") => void;
  onDetails: (id: string) => void;
};

export default function UsersTable({ users, onDelete, onSuspend, onDetails }: Props) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-700">All Users ({users.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3 text-left font-medium text-slate-500">Name</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Email</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Groups</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Subscription</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-medium text-slate-800">{user.name}</td>
                <td className="px-5 py-3.5 text-slate-600">{user.email}</td>
                <td className="px-5 py-3.5 text-slate-600">{user.groups}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    user.subscription === "Premium"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {user.subscription}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button onClick={() => onDetails(user.id)} className="text-slate-400 hover:text-slate-600">
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => onSuspend(user.id, user.status === "Active" ? "suspend" : "active")}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <SuspendIcon />
                    </button>
                    <button onClick={() => onDelete(user.id)} className="text-red-400 hover:text-red-600">
                      <TrashIcon />
                    </button>
                    {user.subscription === "Premium" && (
                      <span className="text-yellow-400">
                        <StarIcon />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function SuspendIcon() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
