"use client";

import { getCategoryIcon } from "@/data/category-icons";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onCategoryClick }: CategoryNavProps) {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-warm-gray-100 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md scale-105"
                  : "bg-secondary/10 text-secondary-dark hover:bg-secondary/20 hover:text-secondary-dark"
              }`}
            >
              {getCategoryIcon(category)} {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
