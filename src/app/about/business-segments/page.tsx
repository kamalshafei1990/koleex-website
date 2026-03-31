import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Segments",
};

const segments = [
  {
    image: "/images/factory-floor.jpg",
    title: "Industrial Machinery",
    description:
      "Precision machinery and equipment for manufacturing. We supply and support the mechanical systems that power production lines, fabrication shops, and industrial facilities worldwide.",
    href: "/about/technology",
  },
  {
    image: "/images/wind-turbines.jpg",
    title: "Automation Systems",
    description:
      "Automation, robotics, and smart production solutions. We help manufacturers modernize their operations with integrated automation that improves throughput, consistency, and safety.",
    href: "/about/technology",
  },
  {
    image: "/images/code-screen.jpg",
    title: "Technology Solutions",
    description:
      "Software, IoT, and digital tools for industrial operations. Our technology solutions connect machines, processes, and people to enable smarter decision-making on the factory floor.",
    href: "/about/technology",
  },
  {
    image: "/images/composites.jpg",
    title: "Parts & Service",
    description:
      "Spare parts, maintenance, and after-sales support. We ensure our customers' equipment stays running at peak performance through responsive service and a comprehensive parts inventory.",
    href: "/about/technology",
  },
];

export default function BusinessSegmentsPage() {
  return (
    <>
      <AboutHero
        title="Business Segments"
        subtitle="Four divisions. One purpose."
      />

      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white text-center mb-14">
            Our Divisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map((segment) => (
              <div
                key={segment.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] overflow-hidden"
              >
                <div
                  className="h-[200px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${segment.image})` }}
                />
                <div className="p-8">
                  <h3 className="text-[18px] font-semibold text-white">
                    {segment.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-white/35 mt-2">
                    {segment.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={segment.href}
                      className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]"
                    >
                      Learn more {">"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsRow
        stats={[
          { number: "4", label: "Divisions" },
          { number: "\u2014", label: "Growing Client Base" },
          { number: "\u2014", label: "Active Projects" },
          { number: "\u2014", label: "Regions Served" },
        ]}
      />
    </>
  );
}
