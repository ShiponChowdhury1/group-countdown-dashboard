import { Group } from "./groups-page";
import { CalendarDays, Eye, Trash2 } from "lucide-react";

type Props = {
  groups: Group[];
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
};

export default function GroupsTable({ groups, onDelete, onDetails }: Props) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-700">All Events ({groups.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3 text-left font-medium text-slate-500">Event Name</th>
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
                    <CalendarDays className="h-4 w-4 text-slate-400" strokeWidth={1.8} />
                    {group.eventDate}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{group.createdBy}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button onClick={() => onDetails(group.id)} className="text-slate-400 hover:text-slate-600">
                      <Eye className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </button>
                    <button onClick={() => onDelete(group.id)} className="text-red-400 hover:text-red-600">
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
