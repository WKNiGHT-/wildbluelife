"use client";

import { useState } from "react";
import Link from "next/link";
import { communityRequests, CommunityRequest } from "@/data/community-requests";
import { businesses, categories } from "@/data/listings";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function findBusinessSlug(businessName: string): string | null {
  const match = businesses.find(
    (b) => b.name.toLowerCase() === businessName.toLowerCase()
  );
  return match ? slugify(match.name) : null;
}

type FilterTab = "all" | "open" | "resolved";

export default function AskPage() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [suggestingForId, setSuggestingForId] = useState<string | null>(null);

  // Post a Question form state
  const [questionText, setQuestionText] = useState("");
  const [questionAuthor, setQuestionAuthor] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  // Suggest a Business form state
  const [suggestBusiness, setSuggestBusiness] = useState("");
  const [suggestAuthor, setSuggestAuthor] = useState("");
  const [suggestComment, setSuggestComment] = useState("");
  const [suggestSubmitted, setSuggestSubmitted] = useState<string | null>(null);

  const filtered = communityRequests.filter((r) => {
    if (filter === "open") return !r.resolved;
    if (filter === "resolved") return r.resolved;
    return true;
  });

  const openCount = communityRequests.filter((r) => !r.resolved).length;
  const resolvedCount = communityRequests.filter((r) => r.resolved).length;

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend
    setQuestionSubmitted(true);
    setTimeout(() => {
      setQuestionSubmitted(false);
      setShowPostForm(false);
      setQuestionText("");
      setQuestionAuthor("");
      setQuestionCategory("");
    }, 3000);
  };

  const handleSuggestBusiness = (e: React.FormEvent, requestId: string) => {
    e.preventDefault();
    // TODO: Connect to backend
    setSuggestSubmitted(requestId);
    setTimeout(() => {
      setSuggestSubmitted(null);
      setSuggestingForId(null);
      setSuggestBusiness("");
      setSuggestAuthor("");
      setSuggestComment("");
    }, 3000);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setSuggestingForId(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-gray-900 via-secondary-dark to-warm-gray-900 py-16 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,107,53,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ask Your{" "}
              <span className="text-primary">Neighbors</span>
            </h1>
            <p className="mt-4 text-lg text-warm-gray-300 max-w-2xl mx-auto">
              Need a recommendation? Ask the Wildblue community and get trusted
              suggestions from people who live right here in the neighborhood.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-warm-gray-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>{communityRequests.length} Questions</span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{resolvedCount} Resolved</span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                  <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <span>
                  {communityRequests.reduce(
                    (acc, r) => acc + r.responses.length,
                    0
                  )}{" "}
                  Responses
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Post a Question Toggle */}
          <div className="mb-8">
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark transition-colors"
            >
              <svg
                className={`h-5 w-5 transition-transform ${showPostForm ? "rotate-45" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {showPostForm ? "Cancel" : "Post a Question"}
            </button>
          </div>

          {/* Post a Question Form */}
          {showPostForm && (
            <div className="mb-8 rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-lg font-bold text-warm-gray-900 mb-1">
                Ask the Community
              </h2>
              <p className="text-sm text-warm-gray-500 mb-5">
                Describe what you're looking for and your neighbors will share
                their recommendations.
              </p>

              {questionSubmitted ? (
                <div className="flex items-center gap-3 rounded-xl bg-accent/10 border border-accent/20 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <svg
                      className="h-5 w-5 text-accent"
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
                  <div>
                    <p className="font-semibold text-warm-gray-900">
                      Question submitted!
                    </p>
                    <p className="text-sm text-warm-gray-700">
                      Your question will be posted shortly after review.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePostQuestion} className="space-y-4">
                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-warm-gray-900"
                    >
                      Your Question <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="question"
                      required
                      rows={3}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="e.g., Looking for a reliable plumber who can fix a leaky faucet..."
                      className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium text-warm-gray-900"
                      >
                        Your Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="author"
                        required
                        value={questionAuthor}
                        onChange={(e) => setQuestionAuthor(e.target.value)}
                        placeholder="e.g., John D."
                        className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-warm-gray-900"
                      >
                        Category{" "}
                        <span className="text-warm-gray-500 font-normal">
                          (optional)
                        </span>
                      </label>
                      <select
                        id="category"
                        value={questionCategory}
                        onChange={(e) => setQuestionCategory(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select a category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
                  >
                    Submit Question
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Filter Tabs */}
          <div className="mb-6 flex items-center gap-2">
            {(
              [
                { key: "all", label: "All", count: communityRequests.length },
                { key: "open", label: "Open", count: openCount },
                { key: "resolved", label: "Resolved", count: resolvedCount },
              ] as { key: FilterTab; label: string; count: number }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                    filter === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-warm-gray-200 text-warm-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-warm-gray-200 bg-white p-10 text-center shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-warm-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="mt-3 text-warm-gray-500">
                  No questions in this category yet.
                </p>
              </div>
            ) : (
              filtered.map((request) => (
                <QuestionCard
                  key={request.id}
                  request={request}
                  isExpanded={expandedId === request.id}
                  onToggle={() => toggleExpand(request.id)}
                  isSuggesting={suggestingForId === request.id}
                  onToggleSuggest={() =>
                    setSuggestingForId(
                      suggestingForId === request.id ? null : request.id
                    )
                  }
                  suggestBusiness={suggestBusiness}
                  setSuggestBusiness={setSuggestBusiness}
                  suggestAuthor={suggestAuthor}
                  setSuggestAuthor={setSuggestAuthor}
                  suggestComment={suggestComment}
                  setSuggestComment={setSuggestComment}
                  suggestSubmitted={suggestSubmitted === request.id}
                  onSubmitSuggestion={(e) =>
                    handleSuggestBusiness(e, request.id)
                  }
                />
              ))
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-warm-gray-900 to-secondary-dark p-8 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold">
              Can't find what you're looking for?
            </h2>
            <p className="mt-2 text-warm-gray-300 max-w-lg mx-auto">
              Browse our full directory of community-recommended businesses, or
              suggest a new company to add.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse Directory
              </Link>
              <Link
                href="/suggest"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Suggest a Company
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Question Card Component                                            */
/* ------------------------------------------------------------------ */

function QuestionCard({
  request,
  isExpanded,
  onToggle,
  isSuggesting,
  onToggleSuggest,
  suggestBusiness,
  setSuggestBusiness,
  suggestAuthor,
  setSuggestAuthor,
  suggestComment,
  setSuggestComment,
  suggestSubmitted,
  onSubmitSuggestion,
}: {
  request: CommunityRequest;
  isExpanded: boolean;
  onToggle: () => void;
  isSuggesting: boolean;
  onToggleSuggest: () => void;
  suggestBusiness: string;
  setSuggestBusiness: (v: string) => void;
  suggestAuthor: string;
  setSuggestAuthor: (v: string) => void;
  suggestComment: string;
  setSuggestComment: (v: string) => void;
  suggestSubmitted: boolean;
  onSubmitSuggestion: (e: React.FormEvent) => void;
}) {
  return (
    <div className="rounded-2xl border border-warm-gray-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Card Header - clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {request.category && (
                <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  {request.category}
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  request.resolved
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {request.resolved ? "Resolved" : "Open"}
              </span>
            </div>
            <h3 className="text-base font-semibold text-warm-gray-900 leading-snug">
              {request.question}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-warm-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {request.author}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(request.date)}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                {request.responses.length}{" "}
                {request.responses.length === 1 ? "response" : "responses"}
              </span>
            </div>
          </div>
          <svg
            className={`h-5 w-5 shrink-0 text-warm-gray-500 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-warm-gray-100">
          {/* Responses */}
          {request.responses.length > 0 ? (
            <div className="divide-y divide-warm-gray-100">
              {request.responses.map((response, idx) => {
                const slug = findBusinessSlug(response.businessName);
                return (
                  <div
                    key={idx}
                    className="px-5 py-4 sm:px-6 flex items-start gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 text-sm font-bold text-secondary">
                      {response.recommendedBy.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-sm font-semibold text-warm-gray-900">
                          {response.recommendedBy}
                        </span>
                        <span className="text-xs text-warm-gray-500">
                          {formatDate(response.date)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-warm-gray-700">
                        {response.comment}
                      </p>
                      <div className="mt-2">
                        {slug ? (
                          <Link
                            href={`/business/${slug}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary hover:bg-secondary/20 transition-colors"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {response.businessName}
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-warm-gray-100 px-3 py-1.5 text-sm font-medium text-warm-gray-700">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {response.businessName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-6 sm:px-6 text-center">
              <svg
                className="mx-auto h-10 w-10 text-warm-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <p className="mt-2 text-sm text-warm-gray-500">
                No recommendations yet. Be the first to help!
              </p>
            </div>
          )}

          {/* Suggest a Business Section */}
          <div className="border-t border-warm-gray-100 px-5 py-4 sm:px-6 bg-warm-gray-50">
            {!isSuggesting && !suggestSubmitted ? (
              <button
                onClick={onToggleSuggest}
                className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/20 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Suggest a Business
              </button>
            ) : suggestSubmitted ? (
              <div className="flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/20 p-3">
                <svg
                  className="h-5 w-5 text-accent"
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
                <p className="text-sm font-medium text-warm-gray-900">
                  Thanks! Your recommendation has been submitted.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmitSuggestion}
                className="space-y-3"
              >
                <h4 className="text-sm font-semibold text-warm-gray-900">
                  Recommend a business for this request
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`suggest-business-${request.id}`}
                      className="block text-xs font-medium text-warm-gray-700"
                    >
                      Business Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id={`suggest-business-${request.id}`}
                      required
                      value={suggestBusiness}
                      onChange={(e) => setSuggestBusiness(e.target.value)}
                      placeholder="e.g., Angel's Pool Service"
                      className="mt-1 w-full rounded-lg border border-warm-gray-200 bg-white px-3 py-2 text-sm text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`suggest-author-${request.id}`}
                      className="block text-xs font-medium text-warm-gray-700"
                    >
                      Your Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id={`suggest-author-${request.id}`}
                      required
                      value={suggestAuthor}
                      onChange={(e) => setSuggestAuthor(e.target.value)}
                      placeholder="e.g., Mike T."
                      className="mt-1 w-full rounded-lg border border-warm-gray-200 bg-white px-3 py-2 text-sm text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor={`suggest-comment-${request.id}`}
                    className="block text-xs font-medium text-warm-gray-700"
                  >
                    Comment <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id={`suggest-comment-${request.id}`}
                    required
                    rows={2}
                    value={suggestComment}
                    onChange={(e) => setSuggestComment(e.target.value)}
                    placeholder="Share your experience with this business..."
                    className="mt-1 w-full rounded-lg border border-warm-gray-200 bg-white px-3 py-2 text-sm text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark transition-colors"
                  >
                    Submit Recommendation
                  </button>
                  <button
                    type="button"
                    onClick={onToggleSuggest}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-warm-gray-700 hover:bg-warm-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
