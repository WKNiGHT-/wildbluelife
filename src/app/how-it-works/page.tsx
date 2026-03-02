export default function HowItWorksPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-warm-gray-900">
            How WildBlueLife Works
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-warm-gray-700 leading-relaxed">
            WildBlueLife is built by and for the residents of WildBlue. Every
            recommendation, review, and listing on this site is driven by real
            experiences from your neighbors — not advertising dollars. Here is
            how we keep it honest and useful.
          </p>
        </div>

        <div className="space-y-6">
          {/* Reviews are from residents */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-warm-gray-900">
                  Reviews are from residents
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-700">
                  Reviews come from actual WildBlue residents who have used
                  these services. This ensures authentic, community-based
                  recommendations you can trust when choosing a service
                  provider.
                </p>
              </div>
            </div>
          </div>

          {/* No paid placements */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <svg
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-warm-gray-900">
                  No paid placements
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-700">
                  Businesses cannot pay to be listed or to improve their
                  ranking. Every listing is here because a neighbor recommended
                  them. This keeps the directory free from commercial bias and
                  focused entirely on quality.
                </p>
              </div>
            </div>
          </div>

          {/* Businesses may request corrections */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                <svg
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-warm-gray-900">
                  Businesses may request corrections
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-700">
                  If a business believes their listing contains inaccurate
                  information, they can contact us to request a correction.
                  We are committed to keeping every listing fair and factually
                  accurate.
                </p>
              </div>
            </div>
          </div>

          {/* No personal attacks or defamation */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-danger/10">
                <svg
                  className="h-6 w-6 text-danger"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-warm-gray-900">
                  No personal attacks or defamation
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-700">
                  Reviews must be based on actual service experiences. Personal
                  attacks, harassment, or defamatory content will be removed.
                  We maintain a respectful space where feedback focuses on the
                  quality of work performed.
                </p>
              </div>
            </div>
          </div>

          {/* Not Recommended must be experience-based */}
          <div className="rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-gray-100">
                <svg
                  className="h-6 w-6 text-warm-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-warm-gray-900">
                  Not Recommended must be experience-based
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray-700">
                  A business can only be placed on the Not Recommended list
                  based on documented negative experiences from WildBlue
                  residents. We do not allow unsubstantiated claims — every
                  entry must be backed by a real interaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-warm-gray-200 bg-warm-gray-50 p-6 text-center">
          <p className="text-sm text-warm-gray-700">
            Have questions or feedback about how WildBlueLife works?
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
