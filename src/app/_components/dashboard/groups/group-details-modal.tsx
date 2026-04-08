import { CalendarDays, Users, UserRound, X } from "lucide-react";
import { Group } from "./groups-page";

type Props = {
  open: boolean;
  group: Group | null;
  onClose: () => void;
};

export default function GroupDetailsModal({ open, group, onClose }: Props) {
  if (!open || !group) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <h2 className="text-lg font-bold text-slate-900">Group Details</h2>
        <p className="text-sm text-slate-500">View selected group information</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Group Name" value={group.name} />
          <DetailField label="Group ID" value={group.id} />
          <DetailField label="Created By" value={group.createdBy} icon={<UserRound className="h-4 w-4" strokeWidth={1.8} />} />
          <DetailField label="Members" value={String(group.members)} icon={<Users className="h-4 w-4" strokeWidth={1.8} />} />
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-slate-500">Event Date</p>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
            {group.eventDate}
          </div>
        </div>
      </div>
    </div>
  );
}

type DetailFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

function DetailField({ label, value, icon }: DetailFieldProps) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
