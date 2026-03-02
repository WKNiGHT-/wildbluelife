import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Wildblue <span className="text-primary">Life</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed">
              Your community recommendation guide for the Wildblue neighborhood
              in Fort Myers, FL. An exclusive community nestled on 800 acres of
              pristine freshwater with luxury lakefront living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/suggest" className="text-sm hover:text-primary transition-colors">
                  Suggest a Company
                </Link>
              </li>
              <li>
                <Link href="/not-recommended" className="text-sm hover:text-primary transition-colors">
                  Not Recommended
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Community Info
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <span className="text-warm-gray-500">HOA Contact:</span>{" "}
                Karen Murphy, CAM — Icon Management
              </li>
              <li>
                <a href="tel:5708150344" className="hover:text-primary transition-colors">
                  (570) 815-0344
                </a>
              </li>
              <li className="pt-2">
                <span className="text-warm-gray-500">Security:</span>{" "}
                Ramco
              </li>
              <li>
                <a href="tel:2398260818" className="hover:text-primary transition-colors">
                  (239) 826-0818
                </a>
              </li>
              <li className="pt-2">
                <span className="text-warm-gray-500">Garbage/Recycle:</span>{" "}
                Fridays
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-warm-gray-700 pt-6 text-center text-sm text-warm-gray-500">
          &copy; {new Date().getFullYear()} Wildblue Life. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
