import Link from "next/link";
import StarRating from "./StarRating";

export interface Business {
  name: string;
  phone: string | null;
  rating: number;
  reviewCount: number;
  category: string;
  contact?: string;
  location?: string;
  website?: string;
  recommendedBy?: string[];
  vouches?: number;
  notRecommended?: boolean;
}

interface BusinessCardProps {
  business: Business;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${slugify(business.name)}`}
      className={`group block rounded-xl border p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        business.notRecommended
          ? "border-danger/30 bg-danger/5 hover:border-danger"
          : "border-warm-gray-200 bg-white hover:border-secondary"
      }`}
    >
      {business.notRecommended && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-semibold text-danger">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Not Recommended
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={`text-base font-semibold transition-colors ${
            business.notRecommended
              ? "text-danger group-hover:text-danger"
              : "text-warm-gray-900 group-hover:text-primary"
          }`}>
            {business.name}
          </h3>
          {business.phone ? (
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {business.phone}
            </span>
          ) : business.location ? (
            <span className="mt-1 text-sm text-warm-gray-500">{business.location}</span>
          ) : null}
        </div>
        <div className="shrink-0 rounded-lg bg-secondary/10 p-2 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <StarRating rating={business.rating} size="sm" />
        <span className="text-xs text-warm-gray-500">
          ({business.reviewCount} {business.reviewCount === 1 ? "review" : "reviews"})
        </span>
      </div>
      {business.recommendedBy && business.recommendedBy.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-warm-gray-500">
          <svg className="h-3.5 w-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span className="truncate">
            Recommended by {business.recommendedBy.slice(0, 2).join(", ")}
            {business.recommendedBy.length > 2 && ` +${business.recommendedBy.length - 2} more`}
          </span>
        </div>
      )}
      {business.vouches && business.vouches > 0 && (
        <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {business.vouches} neighbor{business.vouches !== 1 ? "s" : ""} vouch
        </div>
      )}
    </Link>
  );
}
