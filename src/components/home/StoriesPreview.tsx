"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { stories } from "@/data/stories";

/* ---------------------------------------------------------------------------
   7. Stories / News — 3 story cards with photos and hover effects.
   --------------------------------------------------------------------------- */

const storyImages = ["/images/materials-lab.jpg", "/images/factory-floor.jpg", "/images/digital-globe.jpg"];

export function StoriesPreview() {
  const { ref, visible } = useScrollReveal(0.06);

  return (
    <section className="bg-black py-32 md:py-44 section-accent-top">
      <div ref={ref} className="max-w-[1100px] mx-auto px-5">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Stories & News</p>
            <h2 className="text-display-sm text-gradient-silver" style={revealStyle(visible, 100)}>
              Latest Stories
            </h2>
          </div>
          <div style={revealStyle(visible, 150)}>
            <Link href="/stories" className="link-cta link-cta-dark hidden sm:inline-block pb-2">
              View all →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.slice(0, 3).map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="card-image group block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${250 + i * 140}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${250 + i * 140}ms`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={storyImages[i]}
                  alt={story.title}
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/25 mb-3">{story.category}</p>
                <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.016em] text-white">{story.title}</h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-3 line-clamp-2">{story.excerpt}</p>
                <p className="text-[12px] text-white/15 mt-5">{story.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
