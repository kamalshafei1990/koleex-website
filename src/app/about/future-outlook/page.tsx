import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Outlook",
};

const focusAreas = [
  {
    title: "Smart Manufacturing",
    description:
      "Fully autonomous production lines powered by AI, computer vision, and digital twins. We are building factories that learn, adapt, and optimize in real time, reducing waste and accelerating time to market.",
  },
  {
    title: "Clean Energy",
    description:
      "Next-generation renewable infrastructure including advanced photovoltaics, solid-state storage, and green hydrogen systems. Our energy roadmap targets 50 GW of installed clean capacity by 2030.",
  },
  {
    title: "Connected World",
    description:
      "Industrial IoT platforms that unify operations across geographies and asset types. Our vision is a single, intelligent layer connecting every machine, sensor, and system in our clients' ecosystems.",
  },
  {
    title: "Advanced Materials",
    description:
      "Metamaterials, self-healing composites, and bio-inspired structures that unlock performance levels previously thought impossible. Our materials pipeline addresses challenges from hypersonic flight to deep-ocean exploration.",
  },
];

export default function FutureOutlookPage() {
  return (
    <>
      <AboutHero
        title="Future Outlook"
        subtitle="What comes next."
      />

      <SplitSection
        image="/images/digital-globe.jpg"
        eyebrow="2030 Strategy"
        title="Building the next decade."
        description="Our 2030 strategy is anchored in four strategic pillars: technology leadership, geographic expansion, sustainability integration, and talent development. We are investing over $1.5 billion across these priorities to ensure Koleex remains the partner of choice for the world's most ambitious industrial enterprises."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Strategic Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {area.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        image="/images/hero-robot.jpg"
        flip
        eyebrow="The Road Ahead"
        title="Engineered for what's next."
        description="The industries we serve are undergoing a once-in-a-generation transformation. Automation, decarbonization, and digitalization are reshaping every sector simultaneously. Koleex is uniquely positioned to lead this convergence, bringing together the engineering depth, technological breadth, and global scale required to turn ambitious visions into operational reality."
      />

      <section className="bg-black py-20 md:py-28 text-center border-t border-white/[0.06]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            Ready to build what's next?
          </h2>
          <p className="text-[17px] leading-[1.65] text-white/40 mt-5">
            Whether you're exploring a partnership, a career, or a
            transformation programme, we'd like to hear from you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]"
            >
              Contact us {">"}
            </Link>
            <Link
              href="/careers"
              className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]"
            >
              Explore careers {">"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
