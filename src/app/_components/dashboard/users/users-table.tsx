import { User } from "./users-page";
import { Ban, Eye, Trash2 } from "lucide-react";

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
                      <Eye className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => onSuspend(user.id, user.status === "Active" ? "suspend" : "active")}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <Ban className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </button>
                    <button onClick={() => onDelete(user.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </button>
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
