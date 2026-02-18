"use client";

import { useState, useMemo } from "react";
import { businesses } from "@/data/listings";
import CategorySection from "@/components/CategorySection";
import CategoryNav from "@/components/CategoryNav";

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

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const el = document.getElementById(category.toLowerCase().replace(/[\s/&]+/g, "-"));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
