"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { businesses, categories } from "@/data/listings";
import { reviewsByBusiness } from "@/data/reviews";
import { recentlyAddedNames } from "@/data/recently-added";
import CategorySection from "@/components/CategorySection";
import CategoryNav from "@/components/CategoryNav";

function categoryToId(category: string) {
  return category.toLowerCase().replace(/[\s/&]+/g, "-");
}

// Build a lookup: business name → concatenated review text (for keyword search)
const reviewTextByBusiness: Record<string, string> = {};
for (const br of reviewsByBusiness) {
  reviewTextByBusiness[br.businessName.toLowerCase()] = br.reviews
    .map((r) => `${r.title} ${r.content}`)
    .join(" ")
    .toLowerCase();
}

type RatingFilter = "all" | "4" | "4.5";

export default function FullDirectory() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Search & filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [hasReviews, setHasReviews] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [
    categoryFilter,
    ratingFilter !== "all",
    hasReviews,
    recentlyAdded,
  ].filter(Boolean).length;

  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    // Text search — match name, category, contact, phone, review text
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter((b) => {
        if (b.name.toLowerCase().includes(lower)) return true;
        if (b.category.toLowerCase().includes(lower)) return true;
        if (b.contact && b.contact.toLowerCase().includes(lower)) return true;
        if (b.phone && b.phone.includes(search)) return true;
        // Search review text
        const rt = reviewTextByBusiness[b.name.toLowerCase()];
        if (rt && rt.includes(lower)) return true;
        // Search recommendedBy
        if (b.recommendedBy?.some((r) => r.toLowerCase().includes(lower))) return true;
        return false;
      });
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((b) => b.category === categoryFilter);
    }

    // Rating filter
    if (ratingFilter === "4") {
      filtered = filtered.filter((b) => b.rating >= 4);
    } else if (ratingFilter === "4.5") {
      filtered = filtered.filter((b) => b.rating >= 4.5);
    }

    // Has 2+ reviews
    if (hasReviews) {
      filtered = filtered.filter((b) => b.reviewCount >= 2);
    }

    // Recently added
    if (recentlyAdded) {
      filtered = filtered.filter((b) => recentlyAddedNames.has(b.name));
    }

    return filtered;
  }, [search, categoryFilter, ratingFilter, hasReviews, recentlyAdded]);

  const groupedBusinesses = useMemo(() => {
    const grouped: Record<string, typeof businesses> = {};
    for (const business of filteredBusinesses) {
      if (!grouped[business.category]) {
        grouped[business.category] = [];
      }
      grouped[business.category].push(business);
    }
    const sorted: Record<string, typeof businesses> = {};
    for (const key of Object.keys(grouped).sort()) {
      sorted[key] = grouped[key];
    }
    return sorted;
  }, [filteredBusinesses]);

  const scrollToCategory = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // On mount, check for a hash in the URL and scroll to that category
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const match = Object.keys(groupedBusinesses).find(
        (cat) => categoryToId(cat) === hash
      );
      if (match) {
        setActiveCategory(match);
        setTimeout(() => scrollToCategory(hash), 100);
      }
    }
  }, [groupedBusinesses, scrollToCategory]);

  const handleCategoryClick = (category: string) => {
    const id = categoryToId(category);
    setActiveCategory(category);
    window.history.replaceState(null, "", `#${id}`);
    scrollToCategory(id);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setRatingFilter("all");
    setHasReviews(false);
    setRecentlyAdded(false);
  };

  const isFiltered = search || categoryFilter || ratingFilter !== "all" || hasReviews || recentlyAdded;

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, category, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-warm-gray-200 bg-white py-3.5 pl-12 pr-24 text-warm-gray-900 placeholder:text-warm-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "bg-primary text-white"
                : "bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="rounded-xl border border-warm-gray-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Category dropdown */}
              <div>
                <label className="block text-xs font-medium text-warm-gray-500 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-lg border border-warm-gray-200 bg-white px-3 py-2.5 text-sm text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Rating filter */}
              <div>
                <label className="block text-xs font-medium text-warm-gray-500 mb-1">Minimum Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value as RatingFilter)}
                  className="w-full rounded-lg border border-warm-gray-200 bg-white px-3 py-2.5 text-sm text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4.0+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Toggle: Has 2+ Reviews */}
              <div className="flex items-end">
                <button
                  onClick={() => setHasReviews(!hasReviews)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                    hasReviews
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-warm-gray-200 text-warm-gray-600 hover:bg-warm-gray-50"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Has 2+ Reviews
                  </span>
                </button>
              </div>

              {/* Toggle: Recently Added */}
              <div className="flex items-end">
                <button
                  onClick={() => setRecentlyAdded(!recentlyAdded)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                    recentlyAdded
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-warm-gray-200 text-warm-gray-600 hover:bg-warm-gray-50"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Recently Added
                  </span>
                </button>
              </div>
            </div>

            {/* Active filter summary + clear */}
            {isFiltered && (
              <div className="mt-3 flex items-center justify-between border-t border-warm-gray-100 pt-3">
                <p className="text-sm text-warm-gray-500">
                  Showing <span className="font-semibold text-warm-gray-900">{filteredBusinesses.length}</span> of {businesses.length} businesses
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Inline result count when filters active but panel closed */}
        {isFiltered && !showFilters && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-warm-gray-500">
              Showing <span className="font-semibold text-warm-gray-900">{filteredBusinesses.length}</span> of {businesses.length} businesses
            </p>
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Category Nav */}
      {Object.keys(groupedBusinesses).length > 0 && (
        <CategoryNav
          categories={Object.keys(groupedBusinesses)}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      )}

      {/* Results */}
      <div className="mt-8 space-y-12">
        {Object.entries(groupedBusinesses).map(([category, categoryBusinesses]) => (
          <CategorySection
            key={category}
            category={category}
            businesses={categoryBusinesses}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredBusinesses.length === 0 && (
        <div className="py-20 text-center">
          <svg className="mx-auto h-12 w-12 text-warm-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-warm-gray-900">No results found</h3>
          <p className="mt-2 text-warm-gray-500">
            Try adjusting your search or filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
