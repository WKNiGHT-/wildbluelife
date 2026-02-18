import Link from "next/link";
import StarRating from "./StarRating";
import { reviewsByBusiness } from "@/data/reviews";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Get the most recent reviews across all businesses
const recentReviews = reviewsByBusiness
  .flatMap((b) =>
    b.reviews
      .filter((r) => r.date)
      .map((r) => ({
        ...r,
        businessName: b.businessName,
        category: b.category,
      }))
  )
  .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
  .slice(0, 4);

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function RecentlyAdded() {
  return (
    <section className="py-12 bg-warm-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-900">
              Recent Reviews
            </h2>
            <p className="mt-1 text-sm text-warm-gray-500">
              Latest feedback from your Wildblue neighbors
            </p>
          </div>
          <Link
            href="/suggest"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Review
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {recentReviews.map((review, idx) => (
            <Link
              key={idx}
              href={`/business/${slugify(review.businessName)}`}
              className="group rounded-2xl border border-warm-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-secondary"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-secondary">{review.category}</span>
                    <span className="text-warm-gray-300">&middot;</span>
                    <span className="text-xs text-warm-gray-500">{formatDate(review.date!)}</span>
                  </div>
                  <h3 className="font-semibold text-warm-gray-900 group-hover:text-primary transition-colors truncate">
                    {review.businessName}
                  </h3>
                </div>
                <div className="shrink-0">
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </div>
              <p className="mt-2 text-sm text-warm-gray-700 line-clamp-2">
                &ldquo;{review.content}&rdquo;
              </p>
              <p className="mt-2 text-xs text-warm-gray-500">
                &mdash; {review.reviewer}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
