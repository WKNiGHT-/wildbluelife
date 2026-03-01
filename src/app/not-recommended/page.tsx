"use client";

import { useState, useEffect } from "react";
import { notRecommendedBusinesses, warnings } from "@/data/not-recommended";
import { supabase } from "@/lib/supabase";

interface ReportedBusiness {
  id: number;
  company_name: string;
  reason: string;
  submitted_by: string;
  created_at: string;
}

export default function NotRecommended() {
  const [reported, setReported] = useState<ReportedBusiness[]>([]);

  useEffect(() => {
    supabase
      .from("reported_businesses")
      .select()
      .order("created_at", { ascending: false })
      .then(({ data }) => setReported((data as ReportedBusiness[]) || []));
  }, []);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-warm-gray-900">Not Recommended</h1>
          <p className="mt-3 text-warm-gray-700">
            Contractors and services that are <strong>not recommended</strong> by the Wildblue community.
            Service or products have caused problems and should not be used.
          </p>
        </div>

        {/* Warnings */}
        {warnings.map((warning, i) => (
          <div
            key={i}
            className="mb-6 flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4"
          >
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-danger" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-danger">{warning}</p>
          </div>
        ))}

        {/* Not Recommended List */}
        <div className="space-y-4">
          {notRecommendedBusinesses.map((business) => (
            <div
              key={business.name}
              className="rounded-xl border border-warm-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-warm-gray-900">
                    {business.name}
                  </h3>
                  <p className="mt-1 text-sm text-warm-gray-700">{business.reason}</p>
                </div>
                <span className="shrink-0 rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">
                  Not Recommended
                </span>
              </div>
            </div>
          ))}

          {/* Community-reported businesses from Supabase */}
          {reported.map((r) => (
            <div
              key={`reported-${r.id}`}
              className="rounded-xl border border-warm-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-warm-gray-900">
                    {r.company_name}
                  </h3>
                  <p className="mt-1 text-sm text-warm-gray-700">{r.reason}</p>
                  <p className="mt-1 text-xs text-warm-gray-400">
                    Reported by {r.submitted_by}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">
                  Community Report
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
