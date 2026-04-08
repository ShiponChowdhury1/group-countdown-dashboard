import Link from "next/link";
import {
  AuthCard,
  AuthPage,
  FormField,
  MailIcon,
} from "@/app/_components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthPage>
      <AuthCard
        title="Forgot Password"
        subtitle="Type your email to receive a verification code"
      >
        <div className="space-y-6">
          <FormField
            id="reset-email"
            label="Email"
            type="email"
            placeholder="admin@example.com"
            leftElement={<MailIcon />}
          />
          <button
            type="button"
            className="w-full rounded-xl bg-[#3377FF] py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#2b67e6]"
          >
            Send OTP
          </button>
          <Link
            href="/admin-login"
            className="block text-center text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Back to Login
          </Link>
        </div>
      </AuthCard>
    </AuthPage>
  );
}
