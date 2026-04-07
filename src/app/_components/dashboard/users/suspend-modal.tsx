type Props = {
  open: boolean;
  action: "suspend" | "active";
  onClose: () => void;
  onConfirm: () => void;
};

export default function SuspendModal({ open, action, onClose, onConfirm }: Props) {
  if (!open) return null;
  const isSuspend = action === "suspend";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isSuspend ? "bg-red-100" : "bg-yellow-100"}`}>
          <svg className={`h-8 w-8 ${isSuspend ? "text-red-500" : "text-yellow-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{isSuspend ? "Suspend user" : "Active user"}</h2>
        <p className="mt-2 text-slate-500">
          {isSuspend ? "Are you sure you want to suspend the user" : "Are you sure you want to active the user"}
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-full border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            No, Cancel
          </button>
          <button onClick={onConfirm} className={`flex-1 rounded-full py-2.5 text-sm font-medium text-white ${isSuspend ? "bg-red-500 hover:bg-red-600" : "bg-yellow-400 hover:bg-yellow-500"}`}>
            {isSuspend ? "Yes, Suspend" : "Yes, Active"}
          </button>
        </div>
      </div>
    </div>
  );
}
