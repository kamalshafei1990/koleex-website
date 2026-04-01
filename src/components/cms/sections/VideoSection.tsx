"use client";

import Link from "next/link";
import type { SectionRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   VideoSection — Supports both:
   1. Embed URLs (YouTube/Vimeo) → renders in iframe
   2. Uploaded video files (Supabase Storage) → renders in <video> tag

   Detection: if video_url contains "youtube", "vimeo", or "embed" → iframe
   Otherwise → native <video> player
   --------------------------------------------------------------------------- */

function isEmbedUrl(url: string): boolean {
  return /youtube|youtu\.be|vimeo|embed|dailymotion/i.test(url);
}

export function VideoSection({ section }: { section: SectionRow }) {
  const dark = section.background === "dark" || section.background === "black";

  return (
    <section className={`${dark ? "bg-black" : "bg-white"} py-20 md:py-28 overflow-hidden`}>
      <div className="max-w-[1000px] mx-auto px-6">
        {section.title && (
          <div className="text-center mb-10">
            <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.035em] ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
              {section.title}
            </h2>
            {section.subtitle && (
              <p className={`text-[17px] mt-3 ${dark ? "text-white/35" : "text-[#86868b]"}`}>{section.subtitle}</p>
            )}
          </div>
        )}

        {section.video_url && (
          <div className="aspect-video rounded-[16px] overflow-hidden bg-black">
            {isEmbedUrl(section.video_url) ? (
              /* Embed (YouTube/Vimeo) */
              <iframe
                src={section.video_url}
                title={section.title || "Video"}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Uploaded video file */
              <video
                src={section.video_url}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                poster={section.image_url || undefined}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {section.button_text && section.button_link && (
          <div className="text-center mt-8">
            <Link href={section.button_link} className={`text-[17px] ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline underline-offset-[3px]`}>
              {section.button_text} {">"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
