import Link from "next/link";
import StarRating from "./StarRating";
import { businesses } from "@/data/listings";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const topRated = businesses
  .filter((b) => b.rating >= 4 && b.reviewCount >= 2)
  .sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  })
  .slice(0, 6);

export default function TopRated() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-900">
              Top Rated by Your Neighbors
            </h2>
            <p className="mt-1 text-sm text-warm-gray-500">
              Highest rated businesses with multiple reviews
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Community Verified
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topRated.map((business, idx) => (
            <Link
              key={business.name}
              href={`/business/${slugify(business.name)}`}
              className="group relative overflow-hidden rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-secondary hover:-translate-y-1"
            >
              {idx < 3 && (
                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-star-gold to-primary text-white text-xs font-bold shadow-md">
                  #{idx + 1}
                </div>
              )}
              <div className="mb-3">
                <span className="inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  {business.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-warm-gray-900 group-hover:text-primary transition-colors">
                {business.name}
              </h3>
              {business.phone && (
                <p className="mt-1 text-sm text-warm-gray-500">{business.phone}</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <StarRating rating={business.rating} size="md" showValue />
                <span className="text-xs text-warm-gray-500">
                  ({business.reviewCount} reviews)
                </span>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                Read reviews
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
