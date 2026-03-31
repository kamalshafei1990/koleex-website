import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Presence",
};

const regions = [
  {
    title: "Americas",
    description:
      "Growing presence in key industrial markets across North and South America, serving manufacturing and technology customers throughout the region.",
  },
  {
    title: "Europe",
    description:
      "Established operations serving industrial enterprises across major European markets, delivering precision engineering and technology solutions.",
  },
  {
    title: "Middle East",
    description:
      "A core region for Koleex with strong relationships across the Gulf states, supporting infrastructure and industrial development programmes.",
  },
  {
    title: "South Asia",
    description:
      "Expanding operations to serve the growing industrial economies of South and Southeast Asia with locally supported technology solutions.",
  },
  {
    title: "China",
    description:
      "Dedicated presence serving one of the world's largest manufacturing markets with localised solutions and technical support.",
  },
  {
    title: "Africa",
    description:
      "Growing presence across key African markets, supporting industrial development and manufacturing modernisation efforts.",
  },
];

export default function GlobalPresencePage() {
  return (
    <>
      <AboutHero
        title="Global Presence"
        subtitle="Serving customers in key industrial markets worldwide."
      />

      <StatsRow
        stats={[
          { number: "\u2014", label: "Multiple Regions" },
          { number: "\u2014", label: "Growing Client Base" },
          { number: "\u2014", label: "Active Projects" },
          { number: "\u2014", label: "Dedicated Team" },
        ]}
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Regional Operations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((region) => (
              <div
                key={region.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {region.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        image="/images/team-office.jpg"
        eyebrow="Local Expertise, Global Scale"
        title="Rooted where it matters."
        description="Koleex operates across multiple regions, serving customers in key industrial markets. Each regional team brings local knowledge and relationships, backed by the full technical depth and resources of the wider group, ensuring customers receive relevant, responsive support wherever they operate."
      />
    </>
  );
}
