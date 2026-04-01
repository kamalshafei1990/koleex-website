"use client";

/* ---------------------------------------------------------------------------
   CmsImage — Handles both local (/images/...) and remote (Supabase Storage)
   images. Uses next/image for local, plain <img> for remote URLs.
   This avoids next/image domain configuration issues.
   --------------------------------------------------------------------------- */

interface CmsImageProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function CmsImage({ src, alt = "", className = "", priority = false }: CmsImageProps) {
  if (!src) return null;

  const isLocal = src.startsWith("/");

  if (isLocal) {
    // Use next/image for local files (optimized)
    const NextImage = require("next/image").default;
    return (
      <NextImage
        src={src}
        alt={alt}
        width={2560}
        height={1440}
        className={className}
        priority={priority}
      />
    );
  }

  // Use plain <img> for remote/Supabase URLs (avoids domain config issues)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
