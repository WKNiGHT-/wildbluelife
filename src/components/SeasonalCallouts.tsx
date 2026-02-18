"use client";

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

interface SeasonConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  categories: string[];
  gradient: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  iconBg: string;
  categoryPillBg: string;
  categoryPillText: string;
  categoryPillHoverBg: string;
  starCardBorder: string;
}

const seasons: Record<string, SeasonConfig> = {
  hurricane: {
    id: "hurricane",
    title: "Hurricane Season Essentials",
    subtitle:
      "Be prepared -- here are your community's trusted service providers for storm season.",
    icon: "\uD83C\uDF00",
    categories: [
      "Home Generators",
      "Home Inspectors",
      "Home Owners Insurance Company",
      "Electrician",
    ],
    gradient: "from-amber-500/15 via-orange-400/10 to-yellow-400/10",
    borderColor: "border-amber-400/60",
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
    accentColor: "text-amber-700",
    iconBg: "bg-amber-100",
    categoryPillBg: "bg-amber-50 border-amber-200",
    categoryPillText: "text-amber-800",
    categoryPillHoverBg: "hover:bg-amber-100",
    starCardBorder: "border-amber-200",
  },
  snowbird: {
    id: "snowbird",
    title: "Snowbird Season Checklist",
    subtitle:
      "Welcome back! Get your home ready with these trusted local services.",
    icon: "\uD83C\uDFD6\uFE0F",
    categories: [
      "Home Watch",
      "House Cleaners",
      "Pool Service",
      "Pest Control",
      "Landscaping",
    ],
    gradient: "from-sky-500/15 via-teal-400/10 to-cyan-400/10",
    borderColor: "border-sky-400/60",
    badgeBg: "bg-sky-500",
    badgeText: "text-white",
    accentColor: "text-sky-700",
    iconBg: "bg-sky-100",
    categoryPillBg: "bg-sky-50 border-sky-200",
    categoryPillText: "text-sky-800",
    categoryPillHoverBg: "hover:bg-sky-100",
    starCardBorder: "border-sky-200",
  },
  summer: {
    id: "summer",
    title: "Summer in SWFL",
    subtitle:
      "Beat the heat and keep your home in top shape with these community favorites.",
    icon: "\u2600\uFE0F",
    categories: [
      "Air Conditioning Services",
      "Pool Service",
      "Pest Control",
      "Exterior Home Cleaning",
    ],
    gradient: "from-orange-500/15 via-red-400/10 to-rose-400/10",
    borderColor: "border-orange-400/60",
    badgeBg: "bg-orange-500",
    badgeText: "text-white",
    accentColor: "text-orange-700",
    iconBg: "bg-orange-100",
    categoryPillBg: "bg-orange-50 border-orange-200",
    categoryPillText: "text-orange-800",
    categoryPillHoverBg: "hover:bg-orange-100",
    starCardBorder: "border-orange-200",
  },
};

function getCurrentSeason(): SeasonConfig {
  const month = new Date().getMonth(); // 0-indexed: 0=Jan, 11=Dec
  // Hurricane: June(5) - November(10)
  // Snowbird: November(10) - April(3)
  // Summer: May(4) - September(8)
  // Overlap priority: Hurricane > Snowbird > Summer
  if (month >= 5 && month <= 10) return seasons.hurricane;
  if (month >= 10 || month <= 3) return seasons.snowbird;
  return seasons.summer;
}

function getTopBusinessesForCategories(categoryList: string[]) {
  return businesses
    .filter(
      (b) => categoryList.includes(b.category) && b.rating >= 4
    )
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 4);
}

export default function SeasonalCallouts() {
  const season = getCurrentSeason();
  const topPicks = getTopBusinessesForCategories(season.categories);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl border-2 ${season.borderColor} bg-gradient-to-br ${season.gradient} p-6 sm:p-8 shadow-lg`}
        >
          {/* Decorative background circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${season.iconBg} text-3xl shadow-sm shrink-0`}
              >
                {season.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${season.accentColor}`}
                  >
                    {season.title}
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-full ${season.badgeBg} ${season.badgeText} px-3 py-0.5 text-xs font-bold uppercase tracking-wide`}
                  >
                    Active Now
                  </span>
                </div>
                <p className="mt-1 text-warm-gray-600 text-sm sm:text-base">
                  {season.subtitle}
                </p>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {season.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/#directory`}
                  className={`inline-flex items-center gap-1.5 rounded-full border ${season.categoryPillBg} ${season.categoryPillText} ${season.categoryPillHoverBg} px-4 py-2 text-sm font-medium transition-colors`}
                >
                  <span>{getCategoryIcon(cat)}</span>
                  {cat}
                </Link>
              ))}
            </div>

            {/* Top picks */}
            {topPicks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-gray-500 mb-3">
                  Top Picks from Your Neighbors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {topPicks.map((biz) => (
                    <Link
                      key={biz.name}
                      href={`/business/${slugify(biz.name)}`}
                      className={`group flex items-center gap-3 rounded-xl border ${season.starCardBorder} bg-white/80 backdrop-blur-sm p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5`}
                    >
                      <div className="shrink-0 text-xl">
                        {getCategoryIcon(biz.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-warm-gray-900 truncate group-hover:text-primary transition-colors">
                          {biz.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <StarRating rating={biz.rating} size="sm" />
                          <span className="text-xs text-warm-gray-500">
                            {biz.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <svg
                        className="h-4 w-4 shrink-0 text-warm-gray-300 group-hover:text-primary transition-colors"
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
