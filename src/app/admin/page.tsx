"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type Tab = "suggestions" | "reports" | "reviews";

interface Suggestion {
  id: number;
  category: string;
  company_name: string;
  phone: string | null;
  contact_person: string | null;
  rating: number;
  review: string | null;
  recommended_by: string;
  created_at: string;
}

interface Report {
  id: number;
  company_name: string;
  reason: string;
  submitted_by: string;
  created_at: string;
}

interface Review {
  id: number;
  business_name: string;
  reviewer: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`h-4 w-4 ${s <= rating ? "text-star-gold" : "text-warm-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("suggestions");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [sugRes, repRes, revRes] = await Promise.all([
      supabase.from("suggested_businesses").select().order("created_at", { ascending: false }),
      supabase.from("reported_businesses").select().order("created_at", { ascending: false }),
      supabase.from("submitted_reviews").select().order("created_at", { ascending: false }),
    ]);
    setSuggestions((sugRes.data as Suggestion[]) || []);
    setReports((repRes.data as Report[]) || []);
    setReviews((revRes.data as Review[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const handleDelete = async (table: string, id: number) => {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  };

  // --- Password gate ---
  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm px-4">
          <h1 className="text-2xl font-bold text-warm-gray-900 text-center mb-6">Admin Access</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            {passwordError && (
              <p className="text-sm text-danger">Incorrect password.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "suggestions", label: "Suggestions", count: suggestions.length },
    { key: "reports", label: "Reports", count: reports.length },
    { key: "reviews", label: "Reviews", count: reviews.length },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-warm-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_auth");
              setAuthenticated(false);
              setPassword("");
            }}
            className="text-sm text-warm-gray-500 hover:text-warm-gray-700 transition-colors"
          >
            Log out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-warm-gray-200 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.key
                  ? "bg-white border border-b-white border-warm-gray-200 -mb-px text-primary"
                  : "text-warm-gray-500 hover:text-warm-gray-700"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-warm-gray-100 px-2 py-0.5 text-xs text-warm-gray-600">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-warm-gray-500 py-12">Loading...</p>
        ) : (
          <>
            {/* Suggestions */}
            {activeTab === "suggestions" && (
              <div className="space-y-4">
                {suggestions.length === 0 && (
                  <p className="text-warm-gray-500 text-center py-8">No suggestions yet.</p>
                )}
                {suggestions.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-warm-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-warm-gray-900">{s.company_name}</h3>
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {s.category}
                          </span>
                          <Stars rating={s.rating} />
                        </div>
                        <div className="mt-2 text-sm text-warm-gray-600 space-y-1">
                          {s.phone && <p>Phone: {s.phone}</p>}
                          {s.contact_person && <p>Contact: {s.contact_person}</p>}
                          {s.review && <p className="italic">&ldquo;{s.review}&rdquo;</p>}
                          <p className="text-warm-gray-400">
                            By {s.recommended_by} &middot; {formatDate(s.created_at)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete("suggested_businesses", s.id)}
                        className="shrink-0 rounded-lg border border-warm-gray-200 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reports */}
            {activeTab === "reports" && (
              <div className="space-y-4">
                {reports.length === 0 && (
                  <p className="text-warm-gray-500 text-center py-8">No reports yet.</p>
                )}
                {reports.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-warm-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-warm-gray-900">{r.company_name}</h3>
                        <p className="mt-2 text-sm text-warm-gray-600">{r.reason}</p>
                        <p className="mt-2 text-sm text-warm-gray-400">
                          By {r.submitted_by} &middot; {formatDate(r.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete("reported_businesses", r.id)}
                        className="shrink-0 rounded-lg border border-warm-gray-200 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-warm-gray-500 text-center py-8">No reviews yet.</p>
                )}
                {reviews.map((rv) => (
                  <div key={rv.id} className="rounded-2xl border border-warm-gray-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-semibold text-warm-gray-900">{rv.business_name}</h3>
                          <Stars rating={rv.rating} />
                        </div>
                        <p className="mt-1 text-sm font-medium text-warm-gray-700">{rv.title}</p>
                        <p className="mt-1 text-sm text-warm-gray-600">{rv.content}</p>
                        <p className="mt-2 text-sm text-warm-gray-400">
                          By {rv.reviewer} &middot; {formatDate(rv.created_at)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete("submitted_reviews", rv.id)}
                        className="shrink-0 rounded-lg border border-warm-gray-200 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
