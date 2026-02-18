"use client";

import { useState } from "react";

interface VouchButtonProps {
  businessName: string;
  initialVouches: number;
}

export default function VouchButton({ businessName, initialVouches }: VouchButtonProps) {
  const [vouches, setVouches] = useState(initialVouches);
  const [hasVouched, setHasVouched] = useState(false);

  const handleVouch = () => {
    if (hasVouched) return;
    setVouches((v) => v + 1);
    setHasVouched(true);
  };

  return (
    <button
      onClick={handleVouch}
      disabled={hasVouched}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
        hasVouched
          ? "bg-accent/10 text-accent border border-accent/20 cursor-default"
          : "bg-accent text-white shadow-md hover:bg-accent-dark hover:shadow-lg active:scale-95"
      }`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      {hasVouched ? (
        <span>You vouched! ({vouches})</span>
      ) : (
        <span>+1 I&apos;ve Used Them ({vouches})</span>
      )}
    </button>
  );
}
