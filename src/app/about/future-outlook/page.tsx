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
    title: "Manufacturing Innovation",
    description:
      "Advancing the capabilities of our machinery and automation systems to help manufacturers produce higher-quality products more efficiently, with less waste and greater flexibility.",
  },
  {
    title: "Digital Integration",
    description:
      "Connecting industrial equipment with software and IoT platforms to give customers real-time operational visibility, enabling smarter decisions and proactive maintenance.",
  },
  {
    title: "Regional Expansion",
    description:
      "Strengthening our presence in existing markets and entering new regions where growing industrial demand creates opportunities to serve more customers with local support.",
  },
  {
    title: "Customer Excellence",
    description:
      "Deepening our relationships with customers through better service, faster response times, and a broader range of products and solutions tailored to their evolving needs.",
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
        eyebrow="Strategic Direction"
        title="Building for the future."
        description="Our strategic direction is anchored in four priorities: manufacturing innovation, digital integration, regional expansion, and customer excellence. We are investing across these areas to ensure Koleex continues to grow as a trusted partner for industrial businesses worldwide."
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
        title="Positioned for growth."
        description="The industries we serve are evolving as manufacturers adopt new technologies and expand into new markets. Koleex is well positioned to support this transformation, bringing together industrial expertise, a growing technology portfolio, and a commitment to long-term customer partnership."
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
