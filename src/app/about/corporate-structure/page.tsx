import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Structure",
};

const leaders = [
  {
    name: "Chief Executive Officer",
    role: "CEO",
    bio: "Profile to be announced.",
  },
  {
    name: "Chief Technology Officer",
    role: "CTO",
    bio: "Profile to be announced.",
  },
  {
    name: "Chief Financial Officer",
    role: "CFO",
    bio: "Profile to be announced.",
  },
  {
    name: "Chief Operating Officer",
    role: "COO",
    bio: "Profile to be announced.",
  },
  {
    name: "Chief Commercial Officer",
    role: "CCO",
    bio: "Profile to be announced.",
  },
  {
    name: "Chief Strategy Officer",
    role: "CSO",
    bio: "Profile to be announced.",
  },
];

export default function CorporateStructurePage() {
  return (
    <>
      <AboutHero
        title="Corporate Structure"
        subtitle="How we're organized to deliver."
      />

      <SplitSection
        image="/images/modern-office.jpg"
        eyebrow="Governance"
        title="Built for accountability."
        description="Koleex International Group operates under a governance framework designed for transparency and responsible decision-making. Our organizational structure ensures that strategic priorities are aligned across all business units, with clear accountability at every level."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {leader.name}
                </h3>
                <p className="text-[14px] font-medium text-[#2997ff] mt-1">
                  {leader.role}
                </p>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-3">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        image="/images/team-office.jpg"
        flip
        eyebrow="Global Operations"
        title="Structured for scale."
        description="Our operational architecture is organized around regional hubs that serve key industrial markets. Each hub operates with the autonomy to respond to local market dynamics while maintaining alignment with group-wide standards, ensuring consistent quality and service wherever we operate."
      />
    </>
  );
}
