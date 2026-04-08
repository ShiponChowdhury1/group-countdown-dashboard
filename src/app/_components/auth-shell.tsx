import React from "react";

type AuthPageProps = {
  children: React.ReactNode;
};

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  badgeIcon?: React.ReactNode;
};

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AuthPage({ children }: AuthPageProps) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-white px-4 py-16">
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </main>
  );
}

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  badgeIcon,
}: AuthCardProps) {
  return (
    <section className="auth-card rounded-3xl px-8 py-10 backdrop-blur">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-slate-900/15">
          {badgeIcon ?? <ShieldIcon />}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Secure Access
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="mt-8 space-y-6">{children}</div>
      {footer ? (
        <div className="mt-8 text-center text-sm text-slate-500">
          {footer}
        </div>
      ) : null}
    </section>
  );
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  leftElement,
  rightElement,
  value,
  onChange,
}: FormFieldProps) {
  const leftPadding = leftElement ? "pl-11" : "pl-4";
  const rightPadding = rightElement ? "pr-11" : "pr-4";

  return (
    <label htmlFor={id} className="block space-y-2 text-sm text-slate-600">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        {leftElement ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftElement}
          </span>
        ) : null}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-2xl border border-slate-200 bg-white/80 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 ${leftPadding} ${rightPadding}`}
        />
        {rightElement ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightElement}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3 21 21" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A10.2 10.2 0 0 1 12 5c6 0 10 7 10 7a18.3 18.3 0 0 1-3.2 4.2" />
      <path d="M6.1 6.1A18.3 18.3 0 0 0 2 12s4 7 10 7a9.6 9.6 0 0 0 4.1-.9" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 19 6v6c0 5-3.4 8.5-7 9-3.6-.5-7-4-7-9V6l7-3Z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}
