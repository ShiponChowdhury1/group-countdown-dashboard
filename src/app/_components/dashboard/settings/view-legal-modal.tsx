import { LegalDoc } from "./legal-section";

type Props = {
  open: boolean;
  doc: LegalDoc | null;
  onClose: () => void;
  onEdit: (doc: LegalDoc) => void;
};

export default function ViewLegalModal({ open, doc, onClose, onEdit }: Props) {
  if (!open || !doc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <XIcon />
        </button>

        <h2 className="text-lg font-bold text-slate-900">{doc.tag}</h2>
        <p className="text-sm text-slate-500">Details {doc.tag}</p>

        <div className="mt-4 space-y-3 overflow-y-auto flex-1 pr-1">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Privacy Policy</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-600">{doc.policyName}</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Effective Date</label>
            <div className="mt-1 w-40 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-600">{doc.effectiveDate}</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Description</label>
            <div className="mt-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm text-slate-600 whitespace-pre-line leading-relaxed">
              {doc.description}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={() => onEdit(doc)} className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}