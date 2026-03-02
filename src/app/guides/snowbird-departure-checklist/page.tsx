import { businesses } from "@/data/listings";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snowbird Departure Checklist | WildBlue Life",
  description:
    "Essential services to arrange before heading north for the summer. Trusted providers recommended by WildBlue residents.",
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function categoryAnchor(category: string) {
  return category.toLowerCase().replace(/[\s/&]+/g, "-");
}

const checklistCategories = [
  {
    category: "Home Watch",
    label: "Home Watch",
    description:
      "Have someone check on your home regularly while you're away.",
  },
  {
    category: "Pool Service",
    label: "Pool Service",
    description:
      "Keep your pool clean and chemically balanced all summer long.",
  },
  {
    category: "Pest Control",
    label: "Pest Control",
    description:
      "Schedule ongoing treatments to prevent unwelcome critters.",
  },
  {
    category: "Landscaping",
    label: "Landscaping",
    description:
      "Arrange regular lawn and landscape maintenance while you're gone.",
  },
  {
    category: "Air Conditioning Services",
    label: "Air Conditioning Services",
    description:
      "Get your AC serviced before you leave -- Florida summers are brutal.",
  },
  {
    category: "House Cleaners",
    label: "House Cleaning",
    description:
      "Schedule a deep clean before you lock up for the season.",
  },
];

function getTopProviders(category: string) {
  return businesses
    .filter((b) => b.category === category && b.rating >= 3)
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 3);
}

export default function SnowbirdDepartureChecklistPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
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
          Back to Directory
        </Link>

        {/* Page Header */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-secondary p-8 text-white shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </span>
            <h1 className="text-3xl font-bold">Snowbird Departure Checklist</h1>
          </div>
          <p className="text-lg text-white/85 max-w-2xl">
            Heading north for the summer? Make sure your WildBlue home is taken
            care of while you&apos;re away. Here are trusted providers for the
            essential services you&apos;ll need before you go.
          </p>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-6">
          {checklistCategories.map((item, idx) => {
            const providers = getTopProviders(item.category);
            return (
              <div
                key={item.category}
                className="rounded-2xl border border-warm-gray-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Category header */}
                <div className="flex items-start gap-4 p-6 pb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg font-bold text-warm-gray-900">
                        {item.label}
                      </h2>
                      <Link
                        href={`/#${categoryAnchor(item.category)}`}
                        className="text-xs font-medium text-secondary hover:text-secondary-dark transition-colors"
                      >
                        View all &rarr;
                      </Link>
                    </div>
                    <p className="mt-1 text-sm text-warm-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Provider cards */}
                {providers.length > 0 ? (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {providers.map((biz) => (
                        <Link
                          key={biz.name}
                          href={`/business/${slugify(biz.name)}`}
                          className="group flex flex-col rounded-xl border border-warm-gray-200 bg-warm-gray-50 p-4 transition-all hover:shadow-md hover:border-secondary hover:-translate-y-0.5"
                        >
                          <h3 className="text-sm font-bold text-warm-gray-900 group-hover:text-primary transition-colors truncate">
                            {biz.name}
                          </h3>
                          {biz.phone && (
                            <p className="mt-1 text-xs text-warm-gray-500">
                              {biz.phone}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-1.5">
                            <StarRating rating={biz.rating} size="sm" />
                            <span className="text-xs text-warm-gray-500">
                              ({biz.reviewCount})
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-warm-gray-400 italic">
                      No rated providers yet.{" "}
                      <Link
                        href="/suggest"
                        className="text-secondary hover:text-secondary-dark transition-colors not-italic font-medium"
                      >
                        Suggest one
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-warm-gray-200 bg-gradient-to-br from-white to-accent/5 p-6 shadow-sm text-center">
          <h2 className="text-lg font-bold text-warm-gray-900 mb-2">
            Have a provider to recommend?
          </h2>
          <p className="text-sm text-warm-gray-500 mb-4">
            Help fellow snowbirds find trusted services before they head north.
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
