import { Group } from "./groups-page";

type Props = {
  groups: Group[];
  onDelete: (id: string) => void;
};

export default function GroupsTable({ groups, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-700">All Groups ({groups.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3 text-left font-medium text-slate-500">Group Name</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Members</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Event Date</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Created By</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-medium text-slate-800">{group.name}</td>
                <td className="px-5 py-3.5 text-slate-600">{group.members}</td>
                <td className="px-5 py-3.5 text-slate-600">
                  <span className="flex items-center gap-2">
                    <CalendarIcon />
                    {group.eventDate}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{group.createdBy}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button className="text-slate-400 hover:text-slate-600">
                      <EyeIcon />
                    </button>
                    <button onClick={() => onDelete(group.id)} className="text-red-400 hover:text-red-600">
                      <TrashIcon />
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

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
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