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

export default function ReviewForm({
  businessName,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("reviewerName");
    if (saved) setReviewer(saved);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: insertError } = await supabase
      .from("submitted_reviews")
      .insert({
        business_name: businessName,
        reviewer: reviewer.trim(),
        rating,
        title: title.trim(),
        content: content.trim(),
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
      content: content.trim(),
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRating(5);
    setTitle("");
    setContent("");
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
