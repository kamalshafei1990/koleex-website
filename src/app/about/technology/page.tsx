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
    title: "AI & Machine Learning",
    description:
      "Proprietary machine learning models trained on decades of industrial data, enabling predictive maintenance, autonomous quality control, and intelligent process optimization across our client base.",
  },
  {
    title: "IoT Platforms",
    description:
      "A scalable, secure IoT infrastructure connecting millions of industrial sensors and devices, delivering real-time visibility and control over complex operations worldwide.",
  },
  {
    title: "Robotics",
    description:
      "Next-generation industrial robotics designed for precision assembly, hazardous environment inspection, and collaborative human-machine workflows in advanced manufacturing.",
  },
  {
    title: "Advanced Materials Science",
    description:
      "Breakthrough composites and engineered alloys developed in our materials laboratories, designed for extreme temperature, pressure, and corrosion resistance in critical applications.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <AboutHero
        title="Technology & Innovation"
        subtitle="Engineering the future."
      />

      <SplitSection
        image="/images/circuit-board.jpg"
        eyebrow="R&D Excellence"
        title="Where breakthroughs begin."
        description="Our global network of research and development centres brings together over 3,000 engineers and scientists working at the frontier of industrial technology. With annual R&D investment exceeding $380 million, we maintain the pace of innovation that our clients and the world demand."
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
        eyebrow="Innovation Pipeline"
        title="From concept to commercialization."
        description="Our structured innovation pipeline moves ideas from early-stage research through prototyping, validation, and commercial deployment in as little as 18 months. Cross-functional teams from engineering, data science, and product management collaborate at every stage to ensure that new technologies solve real-world problems at industrial scale."
      />

      <StatsRow
        stats={[
          { number: "$380M+", label: "Annual R&D Spend" },
          { number: "3,000+", label: "R&D Engineers" },
          { number: "1,200+", label: "Patents Filed" },
          { number: "7", label: "Innovation Labs" },
        ]}
      />
    </>
  );
}
