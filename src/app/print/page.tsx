import { getBusinessesByCategory } from "@/data/listings";
import { getCategoryIcon } from "@/data/category-icons";
import PrintButton from "@/components/PrintButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Printable Directory - Wildblue Life",
};

export default function PrintDirectory() {
  const byCategory = getBusinessesByCategory();
  const categoryNames = Object.keys(byCategory);
  const totalBusinesses = Object.values(byCategory).reduce(
    (sum, list) => sum + list.length,
    0
  );
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 print:px-0 print:py-0">
      {/* Print button - hidden when printing */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-warm-gray-500 hover:text-warm-gray-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Directory
        </a>
        <PrintButton />
      </div>

      {/* Header */}
      <div className="mb-6 text-center border-b-2 border-black pb-4 print:mb-4 print:pb-2">
        <h1 className="text-2xl font-bold text-warm-gray-900 print:text-xl">
          Wildblue Life Community Directory
        </h1>
        <p className="mt-1 text-sm text-warm-gray-500 print:text-xs">
          {totalBusinesses} businesses across {categoryNames.length} categories
          &bull; Generated {today}
        </p>
      </div>

      {/* Directory grid */}
      <div className="columns-1 sm:columns-2 print:columns-2 gap-6 print:gap-4 print:text-[10px]">
        {categoryNames.map((category) => {
          const icon = getCategoryIcon(category);
          const items = byCategory[category];

          return (
            <div
              key={category}
              className="mb-4 break-inside-avoid print:mb-2"
            >
              <h2 className="flex items-center gap-1.5 border-b border-warm-gray-300 pb-1 text-sm font-bold text-warm-gray-900 print:text-[11px] print:border-warm-gray-500">
                <span>{icon}</span>
                {category}
                <span className="ml-auto text-xs font-normal text-warm-gray-500 print:text-[9px]">
                  ({items.length})
                </span>
              </h2>
              <ul className="mt-1 space-y-0.5">
                {items.map((biz) => (
                  <li
                    key={biz.name}
                    className="flex items-baseline gap-1 text-sm leading-tight print:text-[10px]"
                  >
                    <span className="font-medium text-warm-gray-900">
                      {biz.name}
                    </span>
                    <span className="flex-shrink-0 text-warm-gray-500">
                      {" "}
                      &mdash;{" "}
                      {biz.phone || "No phone listed"}
                    </span>
                    {biz.contact && (
                      <span className="flex-shrink-0 text-warm-gray-400 italic print:text-[9px]">
                        ({biz.contact})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-warm-gray-300 pt-3 text-center text-xs text-warm-gray-400 print:mt-2 print:pt-1 print:text-[8px]">
        wildbluelife.com &bull; Community-maintained directory &bull; {today}
      </div>
    </div>
  );
}
