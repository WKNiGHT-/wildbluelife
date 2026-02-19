"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, getPhotoUrl } from "@/lib/supabase";
import PhotoUpload from "./PhotoUpload";

interface Photo {
  id: number;
  storage_path: string;
  caption?: string;
  uploaded_by?: string;
  reviewer_name?: string;
  created_at: string;
  source: "gallery" | "review";
}

interface PhotoGalleryProps {
  businessSlug: string;
}

export default function PhotoGallery({ businessSlug }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const [businessRes, reviewRes] = await Promise.all([
      supabase
        .from("business_photos")
        .select("id, storage_path, caption, uploaded_by, created_at")
        .eq("business_slug", businessSlug)
        .order("created_at", { ascending: false }),
      supabase
        .from("review_photos")
        .select("id, storage_path, reviewer_name, created_at")
        .eq("business_slug", businessSlug)
        .order("created_at", { ascending: false }),
    ]);

    const businessPhotos: Photo[] = (businessRes.data ?? []).map((p) => ({
      ...p,
      source: "gallery" as const,
    }));
    const reviewPhotos: Photo[] = (reviewRes.data ?? []).map((p) => ({
      ...p,
      source: "review" as const,
    }));

    const all = [...businessPhotos, ...reviewPhotos].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setPhotos(all);
    setLoading(false);
  }, [businessSlug]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
    };
    document.addEventListener("keydown", handler);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, photos.length]);

  const handleUploaded = () => {
    setShowUpload(false);
    fetchPhotos();
  };

  return (
    <div className="mt-6 rounded-2xl border border-warm-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-warm-gray-900 flex items-center gap-2">
          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Photos
          {photos.length > 0 && (
            <span className="text-sm font-normal text-warm-gray-500">({photos.length})</span>
          )}
        </h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Photos
        </button>
      </div>

      {showUpload && (
        <div className="mb-4">
          <PhotoUpload businessSlug={businessSlug} mode="immediate" onUploaded={handleUploaded} />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : photos.length === 0 ? (
        <p className="text-sm text-warm-gray-500 text-center py-4">
          No photos yet. Be the first to share a photo!
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {photos.map((photo, i) => (
            <button
              key={`${photo.source}-${photo.id}`}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-square rounded-lg overflow-hidden bg-warm-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <img
                src={getPhotoUrl(photo.storage_path)}
                alt={photo.caption || "Business photo"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] animate-lightbox-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getPhotoUrl(photos[lightboxIndex].storage_path)}
              alt={photos[lightboxIndex].caption || "Business photo"}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
            />

            {/* Caption / attribution */}
            {(photos[lightboxIndex].caption || photos[lightboxIndex].uploaded_by || photos[lightboxIndex].reviewer_name) && (
              <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                {photos[lightboxIndex].caption && (
                  <p className="text-sm text-white">{photos[lightboxIndex].caption}</p>
                )}
                {(photos[lightboxIndex].uploaded_by || photos[lightboxIndex].reviewer_name) && (
                  <p className="text-xs text-white/70 mt-0.5">
                    by {photos[lightboxIndex].uploaded_by || photos[lightboxIndex].reviewer_name}
                  </p>
                )}
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous */}
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next */}
            {lightboxIndex < photos.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Counter */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
