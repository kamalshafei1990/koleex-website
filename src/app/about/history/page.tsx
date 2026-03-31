import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History & Heritage",
};

const milestones = [
  {
    year: "1970s",
    title: "Founded",
    description:
      "Koleex was established as a precision engineering workshop, rooted in a family tradition of craftsmanship and an uncompromising commitment to quality.",
  },
  {
    year: "1990s",
    title: "Expansion",
    description:
      "Rapid growth across the Middle East and Europe, opening regional offices and forming strategic partnerships with leading industrial enterprises.",
  },
  {
    year: "2000s",
    title: "Digital Transformation",
    description:
      "Embraced digital engineering and automation, launching our first integrated technology platform and doubling our R&D investment.",
  },
  {
    year: "2010s",
    title: "Global Reach",
    description:
      "Expanded operations to over 60 countries, acquired key technology firms, and established innovation labs on four continents.",
  },
  {
    year: "2020s",
    title: "Innovation Era",
    description:
      "Pioneering AI-driven industrial solutions, sustainable energy systems, and next-generation materials that define the future of engineering.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <AboutHero
        title="History & Heritage"
        subtitle="From a family tradition into a global name."
      />

      <SplitSection
        image="/images/factory-floor.jpg"
        eyebrow="Our Roots"
        title="Where it all began."
        description="What started as a modest workshop driven by a passion for precision has evolved into one of the most respected names in global engineering. Our founders believed that extraordinary outcomes begin with meticulous attention to detail, a philosophy that still runs through everything we build today."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Five Decades of Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <p className="text-[14px] font-medium text-[#2997ff] mb-2">
                  {milestone.year}
                </p>
                <h3 className="text-[18px] font-semibold text-white">
                  {milestone.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        image="/images/team-office.jpg"
        flip
        dark={false}
        eyebrow="Legacy of Innovation"
        title="Five decades of engineering."
        description="From analogue instruments to artificial intelligence, Koleex has continually reinvented itself while staying true to its founding principles. Every generation has built on the last, ensuring that our heritage is not just preserved but propelled forward into new frontiers of possibility."
      />
    </>
  );
}
