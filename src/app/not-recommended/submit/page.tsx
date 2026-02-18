"use client";

import { useState, FormEvent } from "react";

export default function SubmitNotRecommended() {
  const [formData, setFormData] = useState({
    companyName: "",
    reason: "",
    submittedBy: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <svg className="h-8 w-8 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-warm-gray-900">Report Submitted</h2>
          <p className="mt-2 text-warm-gray-700">
            Your report has been submitted and will be reviewed by the community team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-warm-gray-900">Report a Business</h1>
          <p className="mt-3 text-warm-gray-700">
            Had a bad experience? Let the community know so others can avoid the same issue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-warm-gray-900">
              Company / Contractor Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-warm-gray-900">
              Reason for Not Recommending <span className="text-danger">*</span>
            </label>
            <textarea
              id="reason"
              rows={5}
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Please describe your experience and why this business should not be recommended..."
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div>
            <label htmlFor="submittedBy" className="block text-sm font-medium text-warm-gray-900">
              Your Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="submittedBy"
              required
              value={formData.submittedBy}
              onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-danger px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
