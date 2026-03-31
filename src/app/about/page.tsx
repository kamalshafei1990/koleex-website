import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Koleex International Group — a global technology and industrial leader with operations in over 80 countries.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero title="Company Overview" subtitle="A global technology and industrial leader shaping the future through innovation and precision." />

      <StatsRow stats={[
        { number: "80+", label: "Countries" },
        { number: "12,000+", label: "Enterprise Clients" },
        { number: "50+", label: "Years of Heritage" },
        { number: "15,000+", label: "Product Configurations" },
      ]} />

      <SplitSection
        image="/images/factory-floor.jpg"
        eyebrow="Who We Are"
        title="Engineering excellence at global scale."
        description="Koleex International Group is a multinational technology and industrial conglomerate delivering precision-engineered products, intelligent digital solutions, and advanced materials to customers across six continents. From factory floors to energy grids, our technology powers the systems that matter most."
      />

      <SplitSection
        image="/images/team-office.jpg"
        eyebrow="Our People"
        title="Built by engineers, scientists, and visionaries."
        description="Our strength lies in our people — a diverse team of over 25,000 professionals across engineering, research, manufacturing, and commercial operations. We attract the best minds in the industry and empower them to solve problems that matter."
        flip
        dark={false}
      />

      <SplitSection
        image="/images/solar-panels.jpg"
        eyebrow="Our Impact"
        title="Technology that shapes industries."
        description="From smart manufacturing and renewable energy to connected infrastructure and advanced materials, our solutions are deployed in some of the world's most demanding environments. We don't just build products — we engineer outcomes."
      />

      {/* Navigation to sub-pages */}
      <section className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            Learn more about Koleex.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8">
            {[
              { label: "History & Heritage", href: "/about/history" },
              { label: "Vision & Mission", href: "/about/vision-mission" },
              { label: "Core Values", href: "/about/values" },
              { label: "Business Segments", href: "/about/business-segments" },
              { label: "Global Presence", href: "/about/global-presence" },
              { label: "Sustainability", href: "/about/sustainability" },
              { label: "CEO Message", href: "/about/ceo-message" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">
                {link.label} {">"}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
