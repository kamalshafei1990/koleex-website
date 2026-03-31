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
      "Headquartered in Houston with offices across North and South America, serving energy, aerospace, and advanced manufacturing clients from Canada to Brazil.",
  },
  {
    title: "Europe",
    description:
      "A strong presence across the UK, Germany, France, and the Nordics, delivering precision engineering and digital transformation to Europe's leading industrial enterprises.",
  },
  {
    title: "Middle East",
    description:
      "Our founding region and a cornerstone of operations, with major project hubs in the UAE, Saudi Arabia, and Qatar supporting the region's ambitious infrastructure and energy programmes.",
  },
  {
    title: "South Asia",
    description:
      "Growing rapidly across India and Southeast Asia, providing technology solutions to emerging industrial economies with dedicated engineering centres in Bangalore and Singapore.",
  },
  {
    title: "China",
    description:
      "A dedicated China operation with offices in Shanghai and Shenzhen, serving the world's largest manufacturing base with localised solutions and technical support.",
  },
  {
    title: "Africa",
    description:
      "Expanding across sub-Saharan Africa with a focus on energy infrastructure, mining technology, and sustainable development partnerships that drive economic growth.",
  },
];

export default function GlobalPresencePage() {
  return (
    <>
      <AboutHero
        title="Global Presence"
        subtitle="Operating across 80+ countries."
      />

      <StatsRow
        stats={[
          { number: "80+", label: "Countries" },
          { number: "12,000+", label: "Clients" },
          { number: "340+", label: "Projects" },
          { number: "25,000+", label: "Employees" },
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
        description="Every region operates with local leadership, local talent, and deep understanding of market dynamics. This decentralized approach ensures that our clients receive solutions tailored to their specific context, backed by the full technical depth and resources of a global industrial group."
      />
    </>
  );
}
