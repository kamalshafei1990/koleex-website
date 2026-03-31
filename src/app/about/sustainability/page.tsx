import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability",
};

const pillars = [
  {
    title: "Environmental Responsibility",
    description:
      "We are committed to reducing our environmental footprint across all operations. This includes improving energy efficiency, minimizing waste, and exploring cleaner ways to manufacture and deliver our products.",
  },
  {
    title: "Operational Efficiency",
    description:
      "We continuously seek ways to operate more efficiently, reducing resource consumption while maintaining the quality and reliability our customers depend on. Better processes mean less waste and a smaller environmental impact.",
  },
  {
    title: "Community Engagement",
    description:
      "We invest in the communities where we operate through workforce development, local partnerships, and initiatives that support economic opportunity and social well-being.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <AboutHero
        title="Sustainability"
        subtitle="Progress with responsibility."
      />

      <SplitSection
        image="/images/wind-turbines.jpg"
        eyebrow="Environmental Commitment"
        title="Operating responsibly as we grow."
        description="Koleex is committed to operating responsibly and reducing our environmental impact as we grow. Sustainability considerations are integrated into our operational planning, procurement decisions, and product development processes. We aim to continuously improve our practices and set higher standards for ourselves."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Our Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsRow
        stats={[
          { number: "\u2014", label: "Emissions Reduction Goals" },
          { number: "\u2014", label: "Efficiency Improvements" },
          { number: "\u2014", label: "Community Initiatives" },
          { number: "\u2014", label: "Sustainability Targets" },
        ]}
      />

      <SplitSection
        image="/images/solar-panels.jpg"
        flip
        dark={false}
        eyebrow="Looking Ahead"
        title="Building a more sustainable business."
        description="As we grow, we are committed to raising the bar on environmental and social responsibility. We are investing in cleaner operational practices, working with suppliers who share our values, and exploring new ways to reduce the environmental impact of the industrial products and solutions we deliver."
      />
    </>
  );
}
