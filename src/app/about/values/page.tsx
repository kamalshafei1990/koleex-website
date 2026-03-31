import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core Values",
};

const values = [
  {
    title: "Quality First",
    description:
      "We deliver products and services that meet the highest standards of precision and reliability.",
  },
  {
    title: "Customer Partnership",
    description:
      "We build long-term relationships based on trust, understanding, and shared success.",
  },
  {
    title: "Innovation",
    description:
      "We invest in technology and new approaches to continuously improve what we offer.",
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and accountability in every interaction.",
  },
  {
    title: "Global Perspective",
    description:
      "We serve customers across regions with local understanding and global capability.",
  },
  {
    title: "Sustainable Growth",
    description:
      "We grow responsibly, balancing business performance with environmental and social responsibility.",
  },
];

export default function ValuesPage() {
  return (
    <>
      <AboutHero
        title="Core Values"
        subtitle="The principles that guide everything we do."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8"
              >
                <h3 className="text-[18px] font-semibold text-white">
                  {value.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
