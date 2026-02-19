"use client";

import { useState, FormEvent } from "react";
import { categories } from "@/data/listings";
import StarRating from "@/components/StarRating";
import PhotoUpload, { uploadDeferredPhotos } from "@/components/PhotoUpload";
import { slugify } from "@/lib/supabase";

export default function SuggestCompany() {
  const [formData, setFormData] = useState({
    category: "",
    companyName: "",
    phone: "",
    contactPerson: "",
    rating: 5,
    review: "",
    recommendedBy: "",
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Upload deferred photos if any
    if (photoFiles.length > 0) {
      const businessSlug = slugify(formData.companyName);
      await uploadDeferredPhotos(photoFiles, businessSlug, formData.recommendedBy);
    }

    // TODO: Connect rest of form to Supabase
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-warm-gray-900">Thank You!</h2>
          <p className="mt-2 text-warm-gray-700">
            Your recommendation has been submitted and will be reviewed shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setPhotoFiles([]);
              setFormData({
                category: "",
                companyName: "",
                phone: "",
                contactPerson: "",
                rating: 5,
                review: "",
                recommendedBy: "",
              });
            }}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Submit another recommendation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-warm-gray-900">Suggest a Company</h1>
          <p className="mt-3 text-warm-gray-700">
            Know a great service provider? Share your recommendation with the
            Wildblue community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-warm-gray-900">
              Category <span className="text-danger">*</span>
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-warm-gray-900">
              Company Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-warm-gray-900">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-gray-900 mb-2">
              Rating <span className="text-danger">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-0.5"
                >
                  <svg
                    className={`h-8 w-8 transition-colors ${
                      star <= formData.rating ? "text-star-gold" : "text-warm-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-warm-gray-500">
                {formData.rating} star{formData.rating !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium text-warm-gray-900">
              Short Review
            </label>
            <textarea
              id="review"
              rows={3}
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              placeholder="Tell us about your experience..."
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-gray-900 mb-2">
              Photos
            </label>
            <PhotoUpload
              businessSlug={slugify(formData.companyName || "draft")}
              mode="deferred"
              onFilesChange={setPhotoFiles}
            />
          </div>

          <div>
            <label htmlFor="recommendedBy" className="block text-sm font-medium text-warm-gray-900">
              Recommended By <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="recommendedBy"
              required
              value={formData.recommendedBy}
              onChange={(e) => setFormData({ ...formData, recommendedBy: e.target.value })}
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 placeholder:text-warm-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Recommendation"}
          </button>
        </form>
      </div>
    </div>
  );
}
