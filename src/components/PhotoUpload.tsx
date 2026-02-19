"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface PhotoFile {
  file: File;
  preview: string;
  uploading?: boolean;
  error?: string;
}

interface PhotoUploadProps {
  businessSlug: string;
  /** "immediate" uploads on select (gallery), "deferred" returns files for later upload */
  mode: "immediate" | "deferred";
  /** Called with storage paths after successful immediate uploads */
  onUploaded?: (paths: string[]) => void;
  /** Called with selected files for deferred mode */
  onFilesChange?: (files: File[]) => void;
}

export default function PhotoUpload({ businessSlug, mode, onUploaded, onFilesChange }: PhotoUploadProps) {
  const [files, setFiles] = useState<PhotoFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Only JPEG, PNG, and WebP files are allowed";
    if (file.size > MAX_SIZE) return "File must be under 5MB";
    return null;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const incoming = Array.from(newFiles);
    setFiles((prev) => {
      const remaining = MAX_FILES - prev.length;
      if (remaining <= 0) return prev;
      const toAdd: PhotoFile[] = [];
      for (const file of incoming.slice(0, remaining)) {
        const error = validate(file);
        toAdd.push({
          file,
          preview: URL.createObjectURL(file),
          error: error ?? undefined,
        });
      }
      const updated = [...prev, ...toAdd];
      if (mode === "deferred" && onFilesChange) {
        onFilesChange(updated.filter((f) => !f.error).map((f) => f.file));
      }
      return updated;
    });
  }, [mode, onFilesChange]);

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      if (mode === "deferred" && onFilesChange) {
        onFilesChange(next.filter((f) => !f.error).map((f) => f.file));
      }
      return next;
    });
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const uploadAll = async () => {
    const valid = files.filter((f) => !f.error);
    if (valid.length === 0) return;

    const paths: string[] = [];
    setFiles((prev) => prev.map((f) => (f.error ? f : { ...f, uploading: true })));

    for (let i = 0; i < files.length; i++) {
      const pf = files[i];
      if (pf.error) continue;

      const ext = pf.file.name.split(".").pop() || "jpg";
      const path = `${businessSlug}/${Date.now()}-${i}.${ext}`;

      const { error } = await supabase.storage.from("photos").upload(path, pf.file, {
        contentType: pf.file.type,
      });

      if (error) {
        setFiles((prev) =>
          prev.map((f, j) => (j === i ? { ...f, uploading: false, error: error.message } : f))
        );
      } else {
        paths.push(path);
        setFiles((prev) =>
          prev.map((f, j) => (j === i ? { ...f, uploading: false } : f))
        );
      }
    }

    if (paths.length > 0) {
      // Insert metadata rows
      await supabase.from("business_photos").insert(
        paths.map((p) => ({ business_slug: businessSlug, storage_path: p }))
      );
      onUploaded?.(paths);
      // Clear successful uploads
      setFiles((prev) => prev.filter((f) => f.error));
    }
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors
          ${dragOver ? "border-primary bg-primary/5" : "border-warm-gray-200 hover:border-warm-gray-300 bg-warm-gray-50"}
        `}
      >
        <svg className="mx-auto h-8 w-8 text-warm-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-sm text-warm-gray-600">
          Drag & drop photos here, or <span className="font-medium text-primary">browse</span>
        </p>
        <p className="mt-1 text-xs text-warm-gray-400">
          JPEG, PNG, or WebP. Max 5MB each. Up to {MAX_FILES} photos.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {files.map((pf, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-warm-gray-100">
              <img src={pf.preview} alt="" className="h-full w-full object-cover" />
              {pf.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
              {pf.error && (
                <div className="absolute inset-0 flex items-center justify-center bg-danger/80 p-1">
                  <p className="text-[10px] text-white text-center leading-tight">{pf.error}</p>
                </div>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button for immediate mode */}
      {mode === "immediate" && files.some((f) => !f.error) && (
        <button
          type="button"
          onClick={uploadAll}
          disabled={files.some((f) => f.uploading)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {files.some((f) => f.uploading) ? "Uploading..." : `Upload ${files.filter((f) => !f.error).length} photo${files.filter((f) => !f.error).length !== 1 ? "s" : ""}`}
        </button>
      )}
    </div>
  );
}

/** Upload files for deferred mode (called from suggest form) */
export async function uploadDeferredPhotos(
  files: File[],
  businessSlug: string,
  reviewerName: string
): Promise<string[]> {
  const paths: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop() || "jpg";
    const path = `reviews/${businessSlug}/${Date.now()}-${i}.${ext}`;

    const { error } = await supabase.storage.from("photos").upload(path, file, {
      contentType: file.type,
    });

    if (!error) paths.push(path);
  }

  if (paths.length > 0) {
    await supabase.from("review_photos").insert(
      paths.map((p) => ({
        business_slug: businessSlug,
        storage_path: p,
        reviewer_name: reviewerName,
      }))
    );
  }

  return paths;
}
