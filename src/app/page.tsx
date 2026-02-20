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
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-gray-900 via-secondary-dark to-warm-gray-900 py-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,53,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span className="text-secondary">Wildblue</span>{" "}
              <span className="text-primary">Life</span>
            </h1>
            <p className="mt-4 text-lg text-warm-gray-300 max-w-2xl mx-auto">
              Your trusted community recommendation guide for the Wildblue
              neighborhood in Fort Myers, FL. Rated by your neighbors, for your
              neighbors.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#directory"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-dark transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Directory
              </a>
              <Link
                href="/suggest"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Suggest a Company
              </Link>
              <Link
                href="/print"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Directory
              </Link>
            </div>

            {/* Search */}
            <BusinessDirectory />
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
