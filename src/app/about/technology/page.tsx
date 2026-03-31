import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology & Innovation",
};

const capabilities = [
  {
    title: "Smart Automation",
    description:
      "Integrated automation systems that streamline manufacturing workflows, improve production consistency, and reduce manual intervention across industrial operations.",
  },
  {
    title: "Industrial IoT",
    description:
      "Connected sensor networks and monitoring platforms that give manufacturers real-time visibility into equipment performance, enabling proactive maintenance and operational optimization.",
  },
  {
    title: "Precision Engineering",
    description:
      "High-precision machinery and components engineered for demanding manufacturing environments, delivering the accuracy and durability that industrial customers require.",
  },
  {
    title: "Digital Solutions",
    description:
      "Software tools and digital platforms that help industrial businesses manage operations, track assets, and make data-informed decisions to improve efficiency and output.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <AboutHero
        title="Technology & Innovation"
        subtitle="Engineering smarter industrial solutions."
      />

      <SplitSection
        image="/images/circuit-board.jpg"
        eyebrow="Technical Expertise"
        title="Where capability meets application."
        description="Our engineering and technical teams work closely with customers to develop solutions that address real operational challenges. By combining deep industry knowledge with modern technology, we help manufacturers improve productivity, reduce downtime, and stay competitive."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {cap.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        image="/images/code-screen.jpg"
        flip
        eyebrow="Continuous Improvement"
        title="From concept to implementation."
        description="We follow a disciplined approach to technology development, moving from customer needs analysis through prototyping, testing, and deployment. Cross-functional teams collaborate at every stage to ensure that new solutions address real-world challenges and deliver measurable results."
      />

      <StatsRow
        stats={[
          { number: "\u2014", label: "Ongoing R&D Investment" },
          { number: "\u2014", label: "Engineering Team" },
          { number: "\u2014", label: "Technology Partners" },
          { number: "\u2014", label: "Capability Areas" },
        ]}
      />
    </>
  );
}
