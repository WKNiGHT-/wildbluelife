import { businesses } from "@/data/listings";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Pool Services in WildBlue | WildBlue Life",
  description:
    "Top-rated pool service providers in WildBlue, recommended by your neighbors in Southwest Florida.",
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BestPoolServicesPage() {
  const topPoolServices = businesses
    .filter((b) => b.category === "Pool Service" && b.rating >= 3)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/#pool-service"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary-dark transition-colors mb-6"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          View all Pool Service providers
        </Link>

        {/* Page Header */}
        <div className="rounded-2xl bg-gradient-to-r from-secondary to-secondary-dark p-8 text-white shadow-xl mb-8">
          <h1 className="text-3xl font-bold">Best Pool Services in WildBlue</h1>
          <p className="mt-3 text-lg text-white/85 max-w-2xl">
            Finding a reliable pool service in Southwest Florida is essential.
            Here are the top-rated pool service providers recommended by your
            WildBlue neighbors.
          </p>
        </div>

        {/* Provider Cards */}
        {topPoolServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topPoolServices.map((biz) => (
              <Link
                key={biz.name}
                href={`/business/${slugify(biz.name)}`}
                className="group relative overflow-hidden rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-secondary hover:-translate-y-1"
              >
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {biz.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-warm-gray-900 group-hover:text-primary transition-colors">
                  {biz.name}
                </h3>
                {biz.phone && (
                  <p className="mt-1 text-sm text-warm-gray-500">{biz.phone}</p>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <StarRating rating={biz.rating} size="md" showValue />
                  <span className="text-xs text-warm-gray-500">
                    ({biz.reviewCount}{" "}
                    {biz.reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                  Read reviews
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-warm-gray-500">
              No pool service providers with ratings found yet. Check back soon!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-warm-gray-200 bg-gradient-to-br from-white to-accent/5 p-6 shadow-sm text-center">
          <h2 className="text-lg font-bold text-warm-gray-900 mb-2">
            Know a great pool service?
          </h2>
          <p className="text-sm text-warm-gray-500 mb-4">
            Help your WildBlue neighbors by sharing your recommendation.
          </p>
          <Link
            href="/suggest"
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            Add a Review
          </Link>
        </div>
      </div>
    </div>
  );
}
