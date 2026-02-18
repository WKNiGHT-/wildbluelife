"use client";

import { useState, useMemo } from "react";
import { businesses, categories } from "@/data/listings";
import CategorySection from "@/components/CategorySection";
import SearchBar from "@/components/SearchBar";
import CategoryNav from "@/components/CategoryNav";

export default function BusinessDirectory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(lower) ||
          b.category.toLowerCase().includes(lower) ||
          (b.phone && b.phone.includes(search)) ||
          (b.contact && b.contact.toLowerCase().includes(lower))
      );
    }
    return filtered;
  }, [search]);

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

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const el = document.getElementById(category.toLowerCase().replace(/[\s/&]+/g, "-"));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Search in Hero */}
      <div className="mt-10 max-w-2xl mx-auto">
        <SearchBar
          value={search}
          onChange={setSearch}
          resultCount={filteredBusinesses.length}
          totalCount={businesses.length}
        />
      </div>

      {/* Only show category nav and directory when searching */}
      {search && (
        <>
          <CategoryNav
            categories={Object.keys(groupedBusinesses)}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="space-y-12">
                {Object.entries(groupedBusinesses).map(([category, categoryBusinesses]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    businesses={categoryBusinesses}
                  />
                ))}
              </div>
              {filteredBusinesses.length === 0 && (
                <div className="py-20 text-center">
                  <svg className="mx-auto h-12 w-12 text-warm-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-warm-gray-900">No results found</h3>
                  <p className="mt-2 text-warm-gray-500">
                    Try adjusting your search terms or browse all categories.
                  </p>
                  <button
                    onClick={() => setSearch("")}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
