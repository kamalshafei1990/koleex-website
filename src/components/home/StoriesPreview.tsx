"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { stories } from "@/data/stories";

/* ---------------------------------------------------------------------------
   Section 7: Stories — Light gray bg. Heading + 3-column image cards.
   Like Apple's entertainment/gallery grid section.
   --------------------------------------------------------------------------- */

const storyImages = ["/images/materials-lab.jpg", "/images/factory-floor.jpg", "/images/digital-globe.jpg"];

export function StoriesPreview() {
  const { ref, visible } = useScrollReveal(0.06);

  return (
    <section ref={ref} className="bg-[#f5f5f7] py-16 md:py-20 overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1d1d1f]" style={revealStyle(visible, 0)}>
          Latest Stories.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {stories.slice(0, 3).map((story, i) => (
            <Link
              key={story.slug}
              href={`/stories/${story.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 100}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${200 + i * 100}ms`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={storyImages[i]}
                  alt={story.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6e6e73] mb-1.5">{story.category}</p>
                <h3 className="text-[17px] font-semibold leading-[1.23] text-[#1d1d1f]">{story.title}</h3>
                <p className="text-[14px] leading-[1.43] text-[#6e6e73] mt-1.5 line-clamp-2">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8" style={revealStyle(visible, 500)}>
          <Link href="/stories" className="text-[17px] text-[#0066cc] hover:underline underline-offset-[3px]">View all stories {">"}</Link>
        </div>
      </div>
    </section>
  );
}
