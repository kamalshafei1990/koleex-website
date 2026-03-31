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
    year: "Early Years",
    title: "Founded",
    description:
      "Koleex began as a focused industrial trading and engineering business, growing steadily through decades of commitment to quality and customer partnership.",
  },
  {
    year: "Growth Phase",
    title: "Regional Expansion",
    description:
      "Established a strong regional footprint by building trusted relationships with manufacturers and industrial clients across key markets.",
  },
  {
    year: "Expansion Era",
    title: "Technology Integration",
    description:
      "Invested in automation and digital capabilities, expanding the product portfolio to include precision machinery and technology-driven solutions.",
  },
  {
    year: "Modern Era",
    title: "Global Growth",
    description:
      "Extended operations into new international markets, strengthening partnerships with industrial customers and broadening the range of equipment and services offered.",
  },
  {
    year: "Present Day",
    title: "Digital Transformation",
    description:
      "Embracing smart manufacturing, industrial IoT, and digital tools to help customers modernize their operations and compete more effectively.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <AboutHero
        title="History & Heritage"
        subtitle="A legacy of industrial expertise and steady growth."
      />

      <SplitSection
        image="/images/factory-floor.jpg"
        eyebrow="Our Roots"
        title="Where it all began."
        description="Koleex began as a focused industrial trading and engineering business, growing steadily through decades of commitment to quality and customer partnership. From the start, the company was built on a belief that reliable products and honest service create lasting value."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Our Journey
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
        eyebrow="Legacy of Commitment"
        title="Built on trust and expertise."
        description="Throughout every phase of growth, Koleex has remained focused on what matters most: delivering reliable industrial products and services that help customers succeed. Each step forward has been guided by the same principles of quality, integrity, and long-term partnership."
      />
    </>
  );
}
