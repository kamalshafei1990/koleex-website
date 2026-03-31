import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision & Mission",
};

export default function VisionMissionPage() {
  return (
    <>
      <AboutHero
        title="Vision & Mission"
        subtitle="Where we're going and why it matters."
      />

      <section className="bg-black py-20 md:py-28 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <p className="text-[14px] font-medium text-[#2997ff] mb-4 uppercase tracking-wide">
            Our Vision
          </p>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            To be the global standard for precision technology and sustainable industrial innovation.
          </h2>
          <p className="text-[17px] leading-[1.65] text-white/40 mt-5">
            We envision a world where engineering excellence and environmental responsibility are inseparable, where every solution we deliver raises the bar for what industry can achieve.
          </p>
        </div>
      </section>

      <SplitSection
        image="/images/digital-globe.jpg"
        eyebrow="Our Mission"
        title="Delivering technology that matters."
        description="Our mission is to design, build, and deploy precision-engineered solutions that empower industries and communities worldwide. We combine deep technical expertise with a relentless focus on outcomes, ensuring every project delivers measurable value and lasting impact for the clients and societies we serve."
      />

      <StatsRow
        stats={[
          { number: "80+", label: "Countries Served" },
          { number: "99.7%", label: "Client Retention" },
          { number: "$2.4B", label: "Annual Revenue" },
          { number: "25,000+", label: "Team Members" },
        ]}
      />
    </>
  );
}
