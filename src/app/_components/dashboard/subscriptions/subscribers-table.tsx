import { Subscriber } from "./subscriptions-page";

type Props = {
  subscribers: Subscriber[];
};

export default function SubscribersTable({ subscribers }: Props) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-700">Active Subscribers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/60">
              <th className="px-5 py-3 text-left font-medium text-slate-500">User</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Plan</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">Start Date</th>
              <th className="px-5 py-3 text-left font-medium text-slate-500">End Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-medium text-slate-800">{sub.user}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                    {sub.plan}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${sub.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{sub.startDate}</td>
                <td className="px-5 py-3.5 text-slate-600">{sub.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}