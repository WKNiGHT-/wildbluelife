"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase or email service
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
          <h2 className="mt-4 text-2xl font-bold text-warm-gray-900">Message Sent!</h2>
          <p className="mt-2 text-warm-gray-700">
            Thanks for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", subject: "", message: "" });
            }}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-warm-gray-900">Contact Us</h1>
          <p className="mt-3 text-warm-gray-700">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-warm-gray-900">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 w-full rounded-xl border border-warm-gray-200 bg-white px-4 py-3 text-warm-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Community Info */}
        <div className="mt-12 rounded-xl border border-warm-gray-200 bg-warm-gray-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-gray-500">
            Community Information
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-warm-gray-900">HOA Contact</p>
              <p className="text-sm text-warm-gray-700">Karen Murphy, CAM</p>
              <p className="text-sm text-warm-gray-500">Icon Management</p>
              <a href="tel:5708150344" className="text-sm text-secondary hover:text-secondary-dark">
                (570) 815-0344
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-warm-gray-900">Roaming Security</p>
              <p className="text-sm text-warm-gray-700">Ramco</p>
              <a href="tel:2398260818" className="text-sm text-secondary hover:text-secondary-dark">
                (239) 826-0818
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
