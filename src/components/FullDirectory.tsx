"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { businesses } from "@/data/listings";
import CategorySection from "@/components/CategorySection";
import CategoryNav from "@/components/CategoryNav";

function categoryToId(category: string) {
  return category.toLowerCase().replace(/[\s/&]+/g, "-");
}

export default function FullDirectory() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const groupedBusinesses = useMemo(() => {
    const grouped: Record<string, typeof businesses> = {};
    for (const business of businesses) {
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
  }, []);

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
      // Find the matching category name for the hash
      const match = Object.keys(groupedBusinesses).find(
        (cat) => categoryToId(cat) === hash
      );
      if (match) {
        setActiveCategory(match);
        // Small delay to ensure the DOM is rendered
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

  return (
    <>
      <CategoryNav
        categories={Object.keys(groupedBusinesses)}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="mt-8 space-y-12">
        {Object.entries(groupedBusinesses).map(([category, categoryBusinesses]) => (
          <CategorySection
            key={category}
            category={category}
            businesses={categoryBusinesses}
          />
        ))}
      </div>
    </>
  );
}
