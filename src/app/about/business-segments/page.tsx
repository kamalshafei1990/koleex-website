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
    title: "Industrial Technology",
    description:
      "Precision automation, smart manufacturing, and industrial robotics for aerospace, defense, and heavy industry. Our flagship division delivers the systems that keep the world's most demanding operations running.",
    href: "/about/technology",
  },
  {
    image: "/images/wind-turbines.jpg",
    title: "Energy Systems",
    description:
      "Renewable energy infrastructure, grid modernization, and next-generation storage solutions. We design and deploy the systems that power a cleaner, more resilient energy future across 40 markets.",
    href: "/about/sustainability",
  },
  {
    image: "/images/code-screen.jpg",
    title: "Digital Solutions",
    description:
      "IoT platforms, enterprise analytics, and connected operations software. Our digital arm transforms raw industrial data into actionable intelligence that drives efficiency and growth.",
    href: "/about/technology",
  },
  {
    image: "/images/composites.jpg",
    title: "Advanced Materials",
    description:
      "High-performance composites, alloys, and engineered materials for extreme environments. From deep-sea to deep-space, our materials science division pushes the boundaries of what is physically possible.",
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
          { number: "$2.4B", label: "Combined Revenue" },
          { number: "4", label: "Divisions" },
          { number: "340+", label: "Active Projects" },
          { number: "12,000+", label: "Enterprise Clients" },
        ]}
      />
    </>
  );
}
