import Link from "next/link";
import { businesses } from "@/data/listings";
import { getCategoryIcon } from "@/data/category-icons";
import StarRating from "./StarRating";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface NewBusiness {
  name: string;
  addedDate: string; // "Month Year"
  addedSort: number; // for sorting, e.g. 202602
}

// Recently added businesses tracked by their WordPress publish dates
const newBusinessEntries: NewBusiness[] = [
  { name: "Waves Pest Control", addedDate: "Feb 2026", addedSort: 202602 },
  {
    name: "Straight Line Custom Finishing LLC",
    addedDate: "Feb 2026",
    addedSort: 202602,
  },
  { name: "JGF Construction", addedDate: "Nov 2025", addedSort: 202511 },
  {
    name: "Rob Berend Handyman Services",
    addedDate: "Oct 2025",
    addedSort: 202510,
  },
];

// Match new entries with full business data
const newToDirectory = newBusinessEntries
  .sort((a, b) => b.addedSort - a.addedSort)
  .map((entry) => {
    const biz = businesses.find((b) => b.name === entry.name);
    return biz ? { ...biz, addedDate: entry.addedDate } : null;
  })
  .filter(Boolean) as (typeof businesses[number] & { addedDate: string })[];

export default function NewToDirectory() {
  if (newToDirectory.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-warm-gray-900">
              New to the Directory
            </h2>
            <p className="mt-1 text-sm text-warm-gray-500">
              Recently added businesses recommended by your neighbors
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Just Added
          </span>
        </div>

        {/* Horizontal scrollable on mobile, grid on larger screens */}
        <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-x-visible scrollbar-hide">
          {newToDirectory.map((biz) => (
            <Link
              key={biz.name}
              href={`/business/${slugify(biz.name)}`}
              className="group relative flex-shrink-0 w-[280px] sm:w-auto rounded-2xl border border-warm-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:border-secondary hover:-translate-y-1"
            >
              {/* NEW badge */}
              <div className="absolute -top-2.5 -right-2.5 z-10">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                  NEW
                </span>
              </div>

              {/* Category icon and label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">
                  {getCategoryIcon(biz.category)}
                </span>
                <span className="inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                  {biz.category}
                </span>
              </div>

              {/* Business name */}
              <h3 className="text-lg font-bold text-warm-gray-900 group-hover:text-primary transition-colors leading-tight">
                {biz.name}
              </h3>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <StarRating rating={biz.rating} size="sm" showValue />
                {biz.reviewCount > 0 && (
                  <span className="text-xs text-warm-gray-500">
                    ({biz.reviewCount}{" "}
                    {biz.reviewCount === 1 ? "review" : "reviews"})
                  </span>
                )}
              </div>

              {/* Added date */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-warm-gray-500">
                <svg
                  className="h-3.5 w-3.5"
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
                Added {biz.addedDate}
              </div>

              {/* View link */}
              <div className="mt-4 flex items-center text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                View details
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
      </div>
    </section>
  );
}
