import { businesses } from "@/data/listings";
import { reviewsByBusiness } from "@/data/reviews";
import StarRating from "@/components/StarRating";
import ReviewSection, { ShareButton } from "@/components/ReviewSection";
import VouchButton from "@/components/VouchButton";
import ShareButtons from "@/components/ShareButtons";
import PhotoGallery from "@/components/PhotoGallery";
import Link from "next/link";
import { notFound } from "next/navigation";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function categoryAnchor(category: string) {
  return category.toLowerCase().replace(/[\s/&]+/g, "-");
}

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: slugify(b.name) }));
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = businesses.find((b) => slugify(b.name) === slug);

  if (!business) {
    notFound();
  }

  const reviewData = reviewsByBusiness.find(
    (r) => r.businessName.toLowerCase() === business.name.toLowerCase()
  );

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    if (!reviewData || reviewData.reviews.length === 0) return { star, count: 0, pct: 0 };
    const count = reviewData.reviews.filter((r) => r.rating === star).length;
    return { star, count, pct: (count / reviewData.reviews.length) * 100 };
  });

  // Gather business info from both sources
  const address = reviewData?.address;
  const hours = reviewData?.hours;
  const contactPerson = business.contact || reviewData?.contact;
  const location = business.location;
  const hasInfoCard = address || hours || contactPerson || location;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back to [category] link */}
        <Link
          href={`/#${categoryAnchor(business.category)}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary-dark transition-colors mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {business.category}
        </Link>

        {/* Business Header */}
        <div className="rounded-2xl bg-gradient-to-r from-warm-gray-900 to-secondary-dark p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                {business.category}
              </span>
              <h1 className="text-3xl font-bold">{business.name}</h1>
              {contactPerson && (
                <p className="mt-1 text-warm-gray-300">Contact: {contactPerson}</p>
              )}
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {business.phone && (
                  <a
                    href={`tel:${business.phone.replace(/[^\d]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {business.phone}
                  </a>
                )}
                {/* Share Button (client component) */}
                <ShareButton businessName={business.name} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Info Card */}
        {hasInfoCard && (
          <div className="mt-6 rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-warm-gray-900 mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Business Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {address && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray-500">Address</p>
                    <p className="text-sm text-warm-gray-700 mt-0.5">{address}</p>
                  </div>
                </div>
              )}
              {hours && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray-500">Hours</p>
                    <p className="text-sm text-warm-gray-700 mt-0.5">{hours}</p>
                  </div>
                </div>
              )}
              {contactPerson && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray-500">Contact Person</p>
                    <p className="text-sm text-warm-gray-700 mt-0.5">{contactPerson}</p>
                  </div>
                </div>
              )}
              {location && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warm-gray-500">Location</p>
                    <p className="text-sm text-warm-gray-700 mt-0.5">{location}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Photo Gallery */}
        <PhotoGallery businessSlug={slug} />

        {/* Community Trust Section */}
        <div className="mt-6 rounded-2xl border border-warm-gray-200 bg-gradient-to-br from-white to-accent/5 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-warm-gray-900 mb-4 flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Community Trust
          </h2>

          {/* Recommended By */}
          {business.recommendedBy && business.recommendedBy.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-warm-gray-500 mb-2">Recommended by your neighbors:</p>
              <div className="flex flex-wrap gap-2">
                {business.recommendedBy.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-warm-gray-200 px-3 py-1.5 text-sm font-medium text-warm-gray-700 shadow-sm"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-[10px] font-bold text-white">
                      {name.charAt(0)}
                    </span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Vouch + Share Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <VouchButton businessName={business.name} initialVouches={business.vouches ?? 0} />
          </div>

          {/* Share with community */}
          <div className="mt-4 pt-4 border-t border-warm-gray-200">
            <p className="text-sm font-medium text-warm-gray-700 mb-2">Share with your community:</p>
            <ShareButtons businessName={business.name} category={business.category} />
          </div>
        </div>

        {/* Rating Summary */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Overall Rating */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-warm-gray-900 mb-4">Overall Rating</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-warm-gray-900">
                {(reviewData?.overallRating ?? business.rating).toFixed(1)}
              </div>
              <div>
                <StarRating rating={reviewData?.overallRating ?? business.rating} size="lg" />
                <p className="mt-1 text-sm text-warm-gray-500">
                  Based on {reviewData?.totalReviews ?? business.reviewCount} review{(reviewData?.totalReviews ?? business.reviewCount) !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-warm-gray-900 mb-4">Rating Breakdown</h2>
            <div className="space-y-2">
              {ratingDistribution.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-medium text-warm-gray-700">
                    {star} star{star !== 1 ? "s" : ""}
                  </span>
                  <div className="flex-1 h-3 rounded-full bg-warm-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-star-gold to-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-warm-gray-500 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List (client component with sort, helpful, share) */}
        <ReviewSection
          reviews={reviewData?.reviews ?? []}
          businessName={business.name}
        />
      </div>
    </div>
  );
}
