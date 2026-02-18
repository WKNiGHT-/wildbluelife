import BusinessCard, { Business } from "./BusinessCard";
import { getCategoryIcon } from "@/data/category-icons";

interface CategorySectionProps {
  category: string;
  businesses: Business[];
}

export default function CategorySection({
  category,
  businesses,
}: CategorySectionProps) {
  return (
    <section id={category.toLowerCase().replace(/[\s/&]+/g, "-")} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-secondary/20">
        <span className="text-2xl" role="img" aria-label={category}>{getCategoryIcon(category)}</span>
        <h2 className="text-xl font-bold text-warm-gray-900">{category}</h2>
        <span className="rounded-full bg-gradient-to-r from-secondary to-secondary-dark px-3 py-0.5 text-xs font-bold text-white">
          {businesses.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <BusinessCard key={business.name} business={business} />
        ))}
      </div>
    </section>
  );
}
