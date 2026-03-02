"use client";

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({
  label = "Print Directory",
  className = "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-dark transition-colors",
}: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className={className}
      aria-label="Print this page"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      {label}
    </button>
  );
}
