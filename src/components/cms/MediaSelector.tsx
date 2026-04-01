"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Trash2 } from "lucide-react";
import { uploadMedia, getAllMedia, deleteMedia } from "@/lib/media";
import type { MediaRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   MediaSelector — Upload images + select from media library.

   Props:
   - currentUrl: currently selected image URL
   - onSelect: callback with the selected media URL
   --------------------------------------------------------------------------- */

interface MediaSelectorProps {
  currentUrl: string | null;
  onSelect: (url: string) => void;
}

export function MediaSelector({ currentUrl, onSelect }: MediaSelectorProps) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) loadMedia();
  }, [open]);

  async function loadMedia() {
    const items = await getAllMedia();
    setMedia(items);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const result = await uploadMedia(file);
    setUploading(false);

    if (result) {
      setMedia((prev) => [result, ...prev]);
      onSelect(result.url);
      setOpen(false);
    } else {
      alert("Upload failed. Check console for details.");
    }

    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    const ok = await deleteMedia(id);
    if (ok) setMedia((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      {/* Current image preview + button */}
      <div className="flex items-center gap-3">
        {currentUrl && (
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-800 shrink-0">
            <img src={currentUrl} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <button
          onClick={() => setOpen(true)}
          className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white/60 hover:text-white/80 hover:bg-white/[0.10] transition-all duration-200"
        >
          {currentUrl ? "Change Image" : "Select Image"}
        </button>
        {currentUrl && (
          <button
            onClick={() => onSelect("")}
            className="h-9 px-3 rounded-lg text-[12px] text-red-400/60 hover:text-red-400 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-[640px] max-h-[80vh] bg-[#1a1a1a] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-[15px] font-semibold text-white">Media Library</h3>
              <div className="flex items-center gap-2">
                <label className="h-8 px-3 rounded-lg bg-white text-black text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-white/90 transition-colors">
                  <Upload className="h-3.5 w-3.5" />
                  {uploading ? "Uploading..." : "Upload"}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                </label>
                <button onClick={() => setOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {media.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[14px] text-white/30">No images yet. Upload one above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {media.map((item) => {
                    const isSelected = currentUrl === item.url;
                    return (
                      <div
                        key={item.id}
                        className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                          isSelected ? "border-blue-500" : "border-transparent hover:border-white/20"
                        }`}
                        onClick={() => {
                          onSelect(item.url);
                          setOpen(false);
                        }}
                      >
                        <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <Check className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="absolute top-1 right-1 h-6 w-6 rounded bg-black/60 text-white/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] text-white/70 truncate">{item.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
