import Link from "next/link";
import { AuthPage, CheckIcon } from "@/app/_components/auth-shell";

export default function SuccessPage() {
  return (
    <AuthPage>
      <section className="auth-card rounded-3xl px-8 py-10 text-center backdrop-blur">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <CheckIcon />
        </div>
        <h1 className="mt-6 text-2xl font-semibold text-slate-900">
          Your Password Successfully Changed
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Sign in to your account with your new password
        </p>
        <Link
          href="/admin-login"
          className="mt-8 block w-full rounded-xl bg-[#3377FF] py-3 text-center text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
        >
          Sign in
        </Link>
      </section>
    </AuthPage>
  );
}
