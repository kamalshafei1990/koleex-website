import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Koleex International Group — a global industrial technology company specializing in precision machinery, automation, and technology-driven solutions.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero
        title="Company Overview"
        subtitle="A global industrial technology company built on precision, innovation, and long-term partnerships."
      />

      <SplitSection
        image="/images/factory-floor.jpg"
        eyebrow="Who We Are"
        title="Industrial technology with a global perspective."
        description="Koleex International Group is a technology-driven industrial company with a focus on precision machinery, automation systems, and integrated solutions for manufacturing sectors worldwide. With roots in engineering and a commitment to quality, Koleex serves customers across multiple regions through a growing portfolio of products and services."
      />

      <SplitSection
        image="/images/team-office.jpg"
        eyebrow="Our Approach"
        title="Built on engineering. Driven by partnership."
        description="We work closely with manufacturers, factories, and industrial businesses to deliver machinery and systems that meet real operational needs. Our approach combines technical expertise with a deep understanding of the industries we serve — enabling us to provide solutions that are practical, reliable, and built to last."
        flip
        dark={false}
      />

      <SplitSection
        image="/images/hero-robot.jpg"
        eyebrow="Our Commitment"
        title="Quality and reliability at every level."
        description="From product design to after-sales support, Koleex is committed to delivering consistent quality across everything we do. We invest in our people, our technology, and our partnerships to ensure that every product and service meets the standards our customers expect."
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
