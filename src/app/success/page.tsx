import Link from "next/link";
import {
  AuthCard,
  AuthPage,
  CheckIcon,
} from "@/app/_components/auth-shell";

export default function SuccessPage() {
  return (
    <AuthPage>
      <AuthCard
        title="Password Updated"
        subtitle="Your new password is active. You can sign in now."
        badgeIcon={<CheckIcon />}
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Logged in as Admin User
          </div>
          <Link
            href="/admin-login"
            className="block w-full rounded-2xl bg-[#3377FF] py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
