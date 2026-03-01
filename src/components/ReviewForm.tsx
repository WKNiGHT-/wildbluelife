"use client";

import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

interface ReviewFormProps {
  businessName: string;
  onReviewSubmitted: (review: {
    reviewer: string;
    date: string;
    rating: number;
    title: string;
    content: string;
  }) => void;
}

const QUICK_TAGS = [
  "On Time",
  "Fair Price",
  "Great Communication",
  "Would Hire Again",
  "Quality Work",
];

const PRICE_OPTIONS = [
  { label: "$", desc: "Budget-friendly" },
  { label: "$$", desc: "Average" },
  { label: "$$$", desc: "Above average" },
  { label: "$$$$", desc: "Premium" },
];

function formatDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name.trim();
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export default function ReviewForm({
  businessName,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hiredFor, setHiredFor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("reviewerName");
    if (saved) setReviewer(saved);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Build the full content with tags, hired-for, and price prepended
    const extras: string[] = [];
    if (selectedTags.length > 0) extras.push(`Tags: ${selectedTags.join(", ")}`);
    if (hiredFor) extras.push(`Hired for: ${hiredFor}`);
    if (priceRange) extras.push(`Price: ${priceRange}`);
    const fullContent = extras.length > 0
      ? `${extras.join(" | ")}\n\n${content.trim()}`
      : content.trim();

    const { error: insertError } = await supabase
      .from("submitted_reviews")
      .insert({
        business_name: businessName,
        reviewer: reviewer.trim(),
        rating,
        title: title.trim(),
        content: fullContent,
      });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem("reviewerName", reviewer.trim());

    onReviewSubmitted({
      reviewer: reviewer.trim(),
      date: new Date().toISOString(),
      rating,
      title: title.trim(),
      content: fullContent,
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(5);
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setHiredFor("");
    setPriceRange("");
    setError("");
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 py-10 text-center px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <svg
            className="h-7 w-7 text-accent"
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
        </div>
        <h3 className="mt-4 text-lg font-bold text-warm-gray-900">
          Thank you for your review!
        </h3>
        <p className="mt-1 text-sm text-warm-gray-500">
          Your feedback helps the Wildblue community.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-warm-gray-900 mb-4">
        Write a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-900 mb-2">
            Rating <span className="text-danger">*</span>
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <svg
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "text-star-gold"
                      : "text-warm-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-warm-gray-500">
              {(hoverRating || rating)} star
              {(hoverRating || rating) !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Quick-select tags */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-900 mb-2">
            Quick Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white"
                    : "bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200"
                }`}
              >
                {selectedTags.includes(tag) && (
                  <svg className="mr-1 -ml-0.5 inline h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Hired for dropdown */}
        <div>
          <label
            htmlFor="hired-for"
            className="block text-sm font-medium text-warm-gray-900"
          >
            What did you hire them for?
          </label>
          <select
            id="hired-for"
            value={hiredFor}
            onChange={(e) => setHiredFor(e.target.value)}
            className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select...</option>
            <option value="New Installation">New Installation</option>
            <option value="Repair">Repair</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Consultation">Consultation</option>
            <option value="Remodel / Renovation">Remodel / Renovation</option>
            <option value="Inspection">Inspection</option>
            <option value="Emergency Service">Emergency Service</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Price range */}
        <div>
          <label className="block text-sm font-medium text-warm-gray-900 mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            {PRICE_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setPriceRange(priceRange === opt.label ? "" : opt.label)}
                title={opt.desc}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                  priceRange === opt.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-warm-gray-200 text-warm-gray-500 hover:bg-warm-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-warm-gray-400">
            $ Budget &middot; $$ Average &middot; $$$ Above average &middot; $$$$ Premium
          </p>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="review-title"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="review-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Review content */}
        <div>
          <label
            htmlFor="review-content"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Review <span className="text-danger">*</span>
          </label>
          <textarea
            id="review-content"
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell us about your experience..."
            className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Reviewer name */}
        <div>
          <label
            htmlFor="review-name"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Your Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="review-name"
            required
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-1 text-xs text-warm-gray-400">
            Displays as {reviewer.trim() ? formatDisplayName(reviewer) : "First Name + Last Initial"} (e.g., Fred F.)
          </p>
        </div>

        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
