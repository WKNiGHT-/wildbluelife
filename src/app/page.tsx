import { businesses, categories } from "@/data/listings";
import TopRated from "@/components/TopRated";
import RecentlyAdded from "@/components/RecentlyAdded";
import CommunityStats from "@/components/CommunityStats";
import SeasonalCallouts from "@/components/SeasonalCallouts";
import NewToDirectory from "@/components/NewToDirectory";
import BusinessDirectory from "@/components/BusinessDirectory";
import FullDirectory from "@/components/FullDirectory";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-28 pb-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-warm-gray-900/75" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              WildBlue&apos;s Neighbor-Rated{" "}
              <span className="text-secondary">Service Directory</span>
            </h1>
            <p className="mt-6 text-xl text-warm-gray-200 max-w-2xl mx-auto">
              Pool, landscaping, home watch, cleaning and more — reviewed by WildBlue residents.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#directory"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Recommendations
              </a>
              <Link
                href="/suggest"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Add a Review (Takes 30 Seconds)
              </Link>
            </div>

            {/* Search */}
            <div className="mt-12">
              <BusinessDirectory />
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <CommunityStats />

      {/* Seasonal Callouts */}
      <SeasonalCallouts />

      {/* Top Rated */}
      <TopRated />

      {/* New to Directory */}
      <NewToDirectory />

      {/* Recent Reviews */}
      <RecentlyAdded />

      {/* Full Directory */}
      <section id="directory" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-warm-gray-900">Full Directory</h2>
            <p className="mt-2 text-warm-gray-500">
              Browse all {businesses.length} businesses across {categories.length} categories
            </p>
          </div>
          <FullDirectory />
        </div>
      </section>
    </>
  );
}
