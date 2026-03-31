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
            To be a trusted global partner for industrial technology, delivering precision machinery and solutions that empower manufacturers worldwide.
          </h2>
          <p className="text-[17px] leading-[1.65] text-white/40 mt-5">
            We see a future where industrial businesses of every size have access to the technology, equipment, and expertise they need to operate at their best.
          </p>
        </div>
      </section>

      <SplitSection
        image="/images/digital-globe.jpg"
        eyebrow="Our Mission"
        title="Delivering technology that matters."
        description="We provide reliable, high-quality industrial products and technology solutions that help our customers operate more efficiently, compete more effectively, and grow sustainably. By combining deep technical knowledge with a commitment to service, we ensure every engagement creates real value."
      />

      <StatsRow
        stats={[
          { number: "\u2014", label: "Multiple Regions" },
          { number: "\u2014", label: "Growing Portfolio" },
          { number: "\u2014", label: "Expanding Network" },
          { number: "\u2014", label: "Dedicated Team" },
        ]}
      />
    </>
  );
}
