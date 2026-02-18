"use client";

import { useState, useMemo, useEffect } from "react";
import StarRating from "@/components/StarRating";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Review {
  reviewer: string;
  date: string | null;
  rating: number;
  title: string;
  content: string;
}

type SortOption = "newest" | "highest" | "lowest";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface ShareButtonProps {
  businessName: string;
}

function ShareButton({ businessName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-white/30 transition-colors"
        aria-label={`Share ${businessName}`}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Share
      </button>
      {/* Toast notification */}
      {copied && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 whitespace-nowrap rounded-lg bg-warm-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Link copied!
          </div>
        </div>
      )}
    </div>
  );
}

interface HelpfulButtonProps {
  businessName: string;
  reviewer: string;
}

function HelpfulButton({ businessName, reviewer }: HelpfulButtonProps) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const storageKey = `helpful_${businessName}_${reviewer}`;
    if (localStorage.getItem(storageKey)) {
      setClicked(true);
    }

    supabase
      .from("helpful_votes")
      .select("id", { count: "exact", head: true })
      .eq("business_name", businessName)
      .eq("reviewer", reviewer)
      .then(({ count: c }) => {
        if (c !== null) setCount(c);
      });
  }, [businessName, reviewer]);

  const handleClick = async () => {
    if (clicked) return;

    const { error } = await supabase
      .from("helpful_votes")
      .insert({ business_name: businessName, reviewer });

    if (!error) {
      setCount((prev) => prev + 1);
      setClicked(true);
      localStorage.setItem(`helpful_${businessName}_${reviewer}`, "true");
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-warm-gray-100">
      <span className="text-xs text-warm-gray-500">
        Was this review helpful?
      </span>
      <button
        onClick={handleClick}
        disabled={clicked}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
          clicked
            ? "bg-secondary/10 text-secondary cursor-default"
            : "bg-warm-gray-100 text-warm-gray-600 hover:bg-secondary/10 hover:text-secondary"
        }`}
        aria-label="Mark review as helpful"
      >
        <svg
          className="h-3.5 w-3.5"
          fill={clicked ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        Helpful{count > 0 ? ` (${count})` : ""}
      </button>
    </div>
  );
}

interface ReviewSectionProps {
  reviews: Review[];
  businessName: string;
}

export default function ReviewSection({
  reviews,
  businessName,
}: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => {
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      case "highest":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  // Empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold text-warm-gray-900 mb-6">Reviews</h2>
        <div className="rounded-2xl border-2 border-dashed border-warm-gray-200 bg-gradient-to-b from-warm-gray-50 to-white py-16 text-center px-6">
          {/* Friendly illustration */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-warm-gray-900">
            Be the first to review {businessName}!
          </h3>
          <p className="mt-2 text-sm text-warm-gray-500 max-w-md mx-auto">
            Your neighbors want to hear about your experience
          </p>
          <Link
            href="/suggest"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Write a Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Header with sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold text-warm-gray-900">
          Reviews
          <span className="ml-2 text-sm font-normal text-warm-gray-500">
            ({reviews.length} shown)
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-reviews"
            className="text-sm font-medium text-warm-gray-600"
          >
            Sort by:
          </label>
          <select
            id="sort-reviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border border-warm-gray-200 bg-white px-3 py-2 text-sm text-warm-gray-700 shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {sortedReviews.map((review, idx) => (
          <div
            key={`${review.reviewer}-${idx}`}
            className="rounded-xl border border-warm-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-warm-gray-900">
                  {review.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 flex-wrap">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-sm text-warm-gray-500">
                    by{" "}
                    <span className="font-medium text-warm-gray-700">
                      {review.reviewer}
                    </span>
                  </span>
                  {/* Verified Resident Badge */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Wildblue Resident
                  </span>
                </div>
              </div>
              {review.date && (
                <span className="shrink-0 text-xs text-warm-gray-500">
                  {formatDate(review.date)}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-warm-gray-700">
              {review.content}
            </p>
            {/* Helpful button */}
            <HelpfulButton businessName={businessName} reviewer={review.reviewer} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { ShareButton };
