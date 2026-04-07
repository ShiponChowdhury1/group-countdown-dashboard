type Props = {
  open: boolean;
  planName: string;
  onClose: () => void;
};

export default function SuccessModal({ open, planName, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl text-center relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">Successfully updated!</h2>
        <p className="mt-2 text-sm text-slate-500">{planName} pricing has been successfully updated!</p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Continue
        </button>
      </div>
    </div>
  );
}