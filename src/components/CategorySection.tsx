"use client";

import { useState } from "react";
import BusinessCard, { Business } from "./BusinessCard";
import { getCategoryIcon } from "@/data/category-icons";

interface CategorySectionProps {
  category: string;
  businesses: Business[];
}

export default function CategorySection({
  category,
  businesses,
}: CategorySectionProps) {
  const [copied, setCopied] = useState(false);
  const id = category.toLowerCase().replace(/[\s/&]+/g, "-");

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.history.replaceState(null, "", `#${id}`);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-secondary/20">
        <span className="text-2xl" role="img" aria-label={category}>{getCategoryIcon(category)}</span>
        <h2 className="text-xl font-bold text-warm-gray-900">{category}</h2>
        <span className="rounded-full bg-gradient-to-r from-secondary to-secondary-dark px-3 py-0.5 text-xs font-bold text-white">
          {businesses.length}
        </span>
        <button
          onClick={handleCopyLink}
          className="ml-auto text-warm-gray-400 hover:text-primary transition-colors"
          title="Copy link to this category"
          aria-label={`Copy link to ${category}`}
        >
          {copied ? (
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <BusinessCard key={business.name} business={business} />
        ))}
      </div>
    </section>
  );
}
