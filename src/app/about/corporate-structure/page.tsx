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
    name: "Marcus Koleex",
    role: "Chief Executive Officer",
    bio: "A third-generation leader who has guided the group through its most transformative decade, expanding operations to over 80 countries while maintaining the engineering-first culture the company was built on.",
  },
  {
    name: "Dr. Elena Voss",
    role: "Chief Technology Officer",
    bio: "A former MIT research fellow who oversees the company's global R&D strategy, driving breakthroughs in AI, robotics, and advanced materials that keep Koleex at the forefront of industrial technology.",
  },
  {
    name: "James Harrington",
    role: "Chief Financial Officer",
    bio: "With two decades of experience in global industrial finance, James ensures disciplined capital allocation and sustainable growth across all four business segments.",
  },
  {
    name: "Aisha Rahman",
    role: "President, Industrial Technology",
    bio: "Leads the flagship division delivering precision automation and smart manufacturing solutions to heavy industry, aerospace, and defense clients worldwide.",
  },
  {
    name: "Henrik Lindqvist",
    role: "President, Energy Systems",
    bio: "Oversees the energy portfolio spanning renewables, grid infrastructure, and next-generation storage, serving utility and enterprise clients across 40 markets.",
  },
  {
    name: "Sarah Chen",
    role: "President, Digital Solutions",
    bio: "Directs the fast-growing digital arm, building IoT platforms, data analytics suites, and enterprise software that power connected industrial operations.",
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
        description="Koleex International Group operates under a governance framework designed for transparency and decisive action. Our board of directors brings together industry veterans, independent advisors, and technology leaders who collectively ensure that strategic decisions serve both shareholders and the communities we work within."
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
        description="Our operational architecture is organized around four geographic hubs covering the Americas, Europe, Asia-Pacific, and the Middle East and Africa. Each hub operates with the autonomy to respond to local market dynamics while maintaining alignment with group-wide standards, ensuring consistent quality no matter where we deliver."
      />
    </>
  );
}
