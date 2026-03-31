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
    title: "Engineering Excellence",
    description:
      "We hold ourselves to the highest technical standards, because precision is not a preference but a responsibility. Every component, every system, every solution reflects our obsession with getting it right.",
  },
  {
    title: "Customer Partnership",
    description:
      "We succeed only when our clients succeed. We listen deeply, collaborate openly, and treat every engagement as a long-term partnership built on trust and shared ambition.",
  },
  {
    title: "Sustainable Progress",
    description:
      "Growth without responsibility is not progress. We integrate environmental stewardship into every decision, designing solutions that serve both commerce and the communities we operate in.",
  },
  {
    title: "Innovation First",
    description:
      "We invest boldly in research and development, challenging conventional thinking and embracing emerging technologies to stay ahead of what the world needs next.",
  },
  {
    title: "Integrity Always",
    description:
      "Transparency, honesty, and accountability define how we operate. We earn trust through consistent action, not promises, and we hold every team member to this standard without exception.",
  },
  {
    title: "Global Responsibility",
    description:
      "Operating in over 80 countries means understanding that our impact extends far beyond the balance sheet. We invest in local talent, respect cultural contexts, and contribute to the economies we serve.",
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
