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
    title: "Carbon Neutrality",
    description:
      "We are committed to achieving net-zero carbon emissions across all operations by 2035. Through renewable energy adoption, process electrification, and verified carbon offset programmes, we are systematically decarbonizing every link in our value chain.",
  },
  {
    title: "Circular Economy",
    description:
      "Our design-for-disassembly principles and closed-loop material recovery systems ensure that over 85% of our industrial output is recyclable. We are building products that generate value at the end of their lifecycle, not waste.",
  },
  {
    title: "Community Investment",
    description:
      "We invest in the communities where we operate through STEM education programmes, local workforce development, and infrastructure partnerships. In the past five years, we have funded over 200 community initiatives across 40 countries.",
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
        title="Engineering a cleaner future."
        description="Sustainability is not a separate initiative at Koleex. It is embedded in every design decision, procurement choice, and operational standard. We measure our impact rigorously, set ambitious targets publicly, and hold ourselves accountable to the highest environmental standards in every market we serve."
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
          { number: "42%", label: "Carbon Reduction Since 2018" },
          { number: "85%", label: "Materials Recyclability" },
          { number: "200+", label: "Community Initiatives" },
          { number: "2035", label: "Net-Zero Target" },
        ]}
      />

      <SplitSection
        image="/images/solar-panels.jpg"
        flip
        dark={false}
        eyebrow="Clean Energy"
        title="Powering progress responsibly."
        description="Our energy division is at the forefront of the global transition to renewables. From utility-scale solar farms to offshore wind installations, we design, build, and operate clean energy infrastructure that delivers reliable power while dramatically reducing environmental impact for our clients and their communities."
      />
    </>
  );
}
