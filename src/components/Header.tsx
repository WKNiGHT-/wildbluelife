"use client";

import { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  url: string;
  external?: boolean;
  children?: { label: string; url: string; external?: boolean }[];
}

const navigation: NavItem[] = [
  { label: "Home", url: "/" },
  {
    label: "Recommendations",
    url: "#",
    children: [
      { label: "Recommendations & Reviews", url: "/" },
      { label: "Suggest a Company", url: "/suggest" },
    ],
  },
  {
    label: "Not Recommended",
    url: "#",
    children: [
      { label: "Not Recommended", url: "/not-recommended" },
      { label: "Submit Report", url: "/not-recommended/submit" },
    ],
  },
  { label: "Ask", url: "/ask" },
  {
    label: "Court Reservations",
    url: "https://floridawildblue.com",
    external: true,
  },
  {
    label: "Gate Access",
    url: "https://gateaccess.net",
    external: true,
  },
  {
    label: "Facebook Groups",
    url: "#",
    children: [
      { label: "Bunco", url: "https://www.facebook.com/groups/wildblue.bunco", external: true },
      { label: "Fishing", url: "https://www.facebook.com/groups/wildblue.fishing", external: true },
      { label: "Mahjong", url: "https://www.facebook.com/groups/wildblue.mahjong", external: true },
      { label: "Pet Owners", url: "https://www.facebook.com/groups/wildblue.petowners", external: true },
      { label: "Pickleball", url: "https://www.facebook.com/groups/wildblue.pickleball", external: true },
      { label: "Residents", url: "https://www.facebook.com/groups/wildblue.residence", external: true },
      { label: "Tennis", url: "https://www.facebook.com/groups/wildblue.tennis", external: true },
    ],
  },
  { label: "Contact Us", url: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-warm-gray-900/95 shadow-lg backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-white font-bold text-lg shadow-md">
              W
            </div>
            <div>
              <span className="text-xl font-bold text-white">Wildblue</span>
              <span className="text-xl font-bold text-primary"> Life</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.external ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-300 transition-colors hover:bg-white/10 hover:text-primary"
                  >
                    {item.label}
                    <span className="ml-1 text-xs">&#8599;</span>
                  </a>
                ) : item.children ? (
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-300 transition-colors hover:bg-white/10 hover:text-primary">
                    {item.label}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.url}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-300 transition-colors hover:bg-white/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-warm-gray-900 p-2 shadow-xl ring-1 ring-white/10">
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-lg px-3 py-2 text-sm text-warm-gray-300 transition-colors hover:bg-white/10 hover:text-primary"
                        >
                          {child.label}
                          <span className="ml-1 text-xs">&#8599;</span>
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          href={child.url}
                          className="block rounded-lg px-3 py-2 text-sm text-warm-gray-300 transition-colors hover:bg-white/10 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-warm-gray-300 hover:bg-white/10"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.external ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-700 hover:bg-warm-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label} &#8599;
                  </a>
                ) : item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-700 hover:bg-warm-gray-100"
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-lg px-3 py-2 text-sm text-warm-gray-400 hover:bg-white/10 hover:text-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label} &#8599;
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.url}
                              className="block rounded-lg px-3 py-2 text-sm text-warm-gray-400 hover:bg-white/10 hover:text-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-warm-gray-700 hover:bg-warm-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
