import { Plan } from "./subscriptions-page";

type Props = {
  plan: Plan;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PlanCard({ plan, onEdit, onDelete }: Props) {
  const isPremium = plan.id === "premium";

  return (
    <div className={`rounded-[14px] border bg-white p-6 shadow-sm ${isPremium ? "border-blue-400" : "border-slate-200"}`}>
      <div className="flex items-start justify-between">
        <h2 className="text-base font-semibold text-slate-800">{plan.name}</h2>
        {/* Edit + Delete icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            title="Edit plan"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <PencilIcon />
          </button>
          <button
            onClick={onDelete}
            title="Delete plan"
            className="rounded-lg p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <span className={`text-3xl font-bold ${isPremium ? "text-blue-500" : "text-slate-900"}`}>
          ${plan.monthlyPrice === 0 ? "0" : plan.monthlyPrice.toFixed(2)}
        </span>
        <span className="text-sm text-slate-500">/month</span>
      </div>

      {plan.yearlyPrice && (
        <p className="mt-1 text-sm text-slate-500">
          ${plan.yearlyPrice}/year ({plan.yearSaving})
        </p>
      )}

      <ul className="mt-4 space-y-1.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
        <UsersIcon />
        <span>{plan.userCount} users</span>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 flex-shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <path d="M2 20a7 7 0 0 1 12 0" />
      <circle cx="17" cy="8" r="3" />
      <path d="M13 20a7 7 0 0 1 10 0" />
    </svg>
  );
}