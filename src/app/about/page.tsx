"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub Page — Each section summarizes a topic with a "Learn more"
   link to the dedicated sub-page. Alternating layouts for visual variety.
   --------------------------------------------------------------------------- */

/* ── Reusable section components ── */

function HeroSection() {
  return (
    <section className="bg-black text-center pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-5">About Koleex</p>
        <h1 className="text-[56px] md:text-[80px] font-semibold leading-[1.03] tracking-[-0.045em] text-white">
          Our Story.
        </h1>
        <p className="text-[19px] md:text-[24px] font-normal leading-[1.35] text-[#86868b] mt-4 max-w-[600px] mx-auto">
          A global industrial technology company built on precision, innovation, and long-term partnerships.
        </p>
      </div>
    </section>
  );
}

function SplitLeft({ image, eyebrow, title, desc, href }: { image: string; eyebrow: string; title: string; desc: string; href: string }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div style={revealStyle(visible, 0)}>
          <Image src={image} alt={title} width={1200} height={800} className="w-full h-auto" />
        </div>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 80)}>{eyebrow}</p>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white" style={revealStyle(visible, 150)}>{title}</h2>
          <p className="text-[17px] leading-[1.65] text-white/40 mt-5" style={revealStyle(visible, 230)}>{desc}</p>
          <div className="mt-8" style={revealStyle(visible, 310)}>
            <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SplitRight({ image, eyebrow, title, desc, href }: { image: string; eyebrow: string; title: string; desc: string; href: string }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="lg:order-2" style={revealStyle(visible, 0)}>
          <Image src={image} alt={title} width={1200} height={800} className="w-full h-auto" />
        </div>
        <div className="lg:order-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 80)}>{eyebrow}</p>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white" style={revealStyle(visible, 150)}>{title}</h2>
          <p className="text-[17px] leading-[1.65] text-white/40 mt-5" style={revealStyle(visible, 230)}>{desc}</p>
          <div className="mt-8" style={revealStyle(visible, 310)}>
            <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullWidthHero({ image, eyebrow, title, desc, href }: { image: string; eyebrow: string; title: string; desc: string; href: string }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-black text-center overflow-hidden border-t border-white/[0.06]">
      <div className="pt-16 md:pt-24 px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 0)}>{eyebrow}</p>
        <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.04em] text-white" style={revealStyle(visible, 80)}>{title}</h2>
        <p className="text-[19px] md:text-[21px] font-normal leading-[1.35] text-[#86868b] mt-3 max-w-[600px] mx-auto" style={revealStyle(visible, 160)}>{desc}</p>
        <div className="mt-5" style={revealStyle(visible, 240)}>
          <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
      <div className="mt-6" style={revealStyle(visible, 320)}>
        <Image src={image} alt={title} width={2560} height={1440} className="w-full h-auto block" />
      </div>
    </section>
  );
}

function CardsSection({ eyebrow, title, desc, href, cards }: { eyebrow: string; title: string; desc: string; href: string; cards: { icon: string; label: string; text: string }[] }) {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-black py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 0)}>{eyebrow}</p>
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>{title}</h2>
          <p className="text-[17px] leading-[1.5] text-[#86868b] mt-3 max-w-[500px] mx-auto" style={revealStyle(visible, 160)}>{desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.10] hover:-translate-y-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${240 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${240 + i * 80}ms`,
              }}
            >
              <span className="text-2xl block mb-4">{c.icon}</span>
              <h3 className="text-[17px] font-semibold text-white">{c.label}</h3>
              <p className="text-[14px] leading-[1.55] text-white/35 mt-2">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10" style={revealStyle(visible, 600)}>
          <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ eyebrow, title, desc, href, stats }: { eyebrow: string; title: string; desc: string; href: string; stats: { value: string; label: string }[] }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className="bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6 text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 0)}>{eyebrow}</p>
        <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>{title}</h2>
        <p className="text-[17px] leading-[1.5] text-[#86868b] mt-3 max-w-[500px] mx-auto" style={revealStyle(visible, 160)}>{desc}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.9)",
                transition: `opacity 0.7s cubic-bezier(0.34,1.56,0.64,1) ${240 + i * 80}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${240 + i * 80}ms`,
              }}
            >
              <p className="text-[40px] md:text-[52px] font-bold tracking-[-0.04em] text-white leading-none">{s.value}</p>
              <p className="text-[13px] text-white/30 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12" style={revealStyle(visible, 600)}>
          <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

function CenteredSection({ eyebrow, title, desc, href, dark = true }: { eyebrow: string; title: string; desc: string; href: string; dark?: boolean }) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <section ref={ref} className={`${dark ? "bg-black" : "bg-[#0a0a0a]"} text-center py-20 md:py-28 border-t border-white/[0.06]`}>
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/30 mb-4" style={revealStyle(visible, 0)}>{eyebrow}</p>
        <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white" style={revealStyle(visible, 80)}>{title}</h2>
        <p className="text-[17px] leading-[1.65] text-white/40 mt-5" style={revealStyle(visible, 160)}>{desc}</p>
        <div className="mt-8" style={revealStyle(visible, 240)}>
          <Link href={href} className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Company Overview */}
      <SplitLeft
        image="/images/factory-floor.jpg"
        eyebrow="Company Overview"
        title="Industrial technology with a global perspective."
        desc="Koleex International Group is a technology-driven industrial company with a focus on precision machinery, automation systems, and integrated solutions for manufacturing sectors worldwide."
        href="/about"
      />

      {/* 3. History & Heritage */}
      <SplitRight
        image="/images/team-office.jpg"
        eyebrow="History & Heritage"
        title="From a family tradition to a global name."
        desc="Koleex began as a focused industrial trading and engineering business, growing steadily through decades of commitment to quality, customer partnership, and continuous improvement."
        href="/about/history"
      />

      {/* 4. Vision & Mission */}
      <FullWidthHero
        image="/images/digital-globe.jpg"
        eyebrow="Vision & Mission"
        title="Where we're going."
        desc="To be a trusted global partner for industrial technology, delivering precision machinery and solutions that empower manufacturers worldwide."
        href="/about/vision-mission"
      />

      {/* 5. Core Values */}
      <CardsSection
        eyebrow="Core Values"
        title="What guides us."
        desc="The principles that shape every decision, product, and partnership."
        href="/about/values"
        cards={[
          { icon: "◆", label: "Quality First", text: "Products and services that meet the highest standards of precision and reliability." },
          { icon: "◇", label: "Customer Partnership", text: "Long-term relationships based on trust, understanding, and shared success." },
          { icon: "●", label: "Innovation", text: "Investing in technology and new approaches to continuously improve." },
          { icon: "○", label: "Integrity", text: "Honesty, transparency, and accountability in every interaction." },
          { icon: "■", label: "Global Perspective", text: "Serving customers across regions with local understanding and global capability." },
          { icon: "□", label: "Sustainable Growth", text: "Growing responsibly, balancing performance with environmental responsibility." },
        ]}
      />

      {/* 6. Corporate Structure */}
      <SplitLeft
        image="/images/modern-office.jpg"
        eyebrow="Corporate Structure"
        title="Organized to deliver."
        desc="Koleex operates through a clear organizational structure designed for efficiency, accountability, and agility — from global leadership to regional operations and specialized business units."
        href="/about/corporate-structure"
      />

      {/* 7. Business Segments */}
      <CardsSection
        eyebrow="Business Segments"
        title="Four divisions. One purpose."
        desc="Each segment focuses on a core area of industrial technology."
        href="/about/business-segments"
        cards={[
          { icon: "⚙️", label: "Industrial Machinery", text: "Precision machinery and equipment for manufacturing operations." },
          { icon: "🤖", label: "Automation Systems", text: "Automation, robotics, and smart production solutions." },
          { icon: "💻", label: "Technology Solutions", text: "Software, IoT, and digital tools for industrial operations." },
          { icon: "🔧", label: "Parts & Service", text: "Spare parts, maintenance, and after-sales support worldwide." },
        ]}
      />

      {/* 8. Technology & Innovation */}
      <SplitRight
        image="/images/circuit-board.jpg"
        eyebrow="Technology & Innovation"
        title="Engineering the future."
        desc="Koleex invests in research and development to bring new technologies to market — from smart automation and IoT integration to precision engineering and digital solutions for industry."
        href="/about/technology"
      />

      {/* 9. Global Presence */}
      <StatsSection
        eyebrow="Global Presence"
        title="Operating worldwide."
        desc="Koleex serves customers across key industrial markets around the world."
        href="/about/global-presence"
        stats={[
          { value: "6", label: "Regions" },
          { value: "4", label: "Divisions" },
          { value: "24/7", label: "Support" },
          { value: "—", label: "Growing Network" },
        ]}
      />

      {/* 10. Sustainability */}
      <SplitLeft
        image="/images/wind-turbines.jpg"
        eyebrow="Sustainability"
        title="Progress with responsibility."
        desc="Koleex is committed to operating responsibly — reducing environmental impact, improving operational efficiency, and contributing to the communities where we work."
        href="/about/sustainability"
      />

      {/* 11. CEO Message */}
      <CenteredSection
        eyebrow="CEO Message"
        title="A message from our leadership."
        desc="Our leadership team shares their perspective on where Koleex has been, where it's going, and what drives the company forward every day."
        href="/about/ceo-message"
      />

      {/* 12. Future Outlook */}
      <SplitRight
        image="/images/hero-robot.jpg"
        eyebrow="Future Outlook"
        title="What comes next."
        desc="Koleex is focused on the future — investing in manufacturing innovation, digital integration, regional expansion, and customer excellence to build the next chapter of the company."
        href="/about/future-outlook"
      />

      {/* 13. CTA */}
      <section className="bg-black text-center py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            Want to work with us?
          </h2>
          <p className="text-[17px] leading-[1.5] text-[#86868b] mt-3">
            Connect with our team to discuss partnerships, solutions, or career opportunities.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <Link href="/contact" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Contact us {">"}</Link>
            <Link href="/careers" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Careers {">"}</Link>
            <Link href="/products" className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]">Products {">"}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
