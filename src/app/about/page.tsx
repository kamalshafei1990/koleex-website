"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   About Hub Page — Organized in logical corporate storytelling flow:

   1. CEO Message (welcome/intro — sets the tone)
   2. History & Heritage (where we come from)
   3. Our Vision (where we're going)
   4. Core Values (what guides us)
   5. Business Segments (what we do)
   6. Technology & Innovation (how we do it)
   7. Corporate Structure (how we're organized)
   8. Global Presence (where we operate)
   9. Market Strategy (how we grow)
   10. Production Overview (our manufacturing strength)
   11. Social Responsibility (our impact beyond business)
   12. Clients Portfolio (who trusts us)
   13. Future Outlook (what's next)

   Layout: Figma-matched split sections on white background.
   --------------------------------------------------------------------------- */

/* ── Split: Image Left / Text Right — White bg ── */
function SplitSection({
  image,
  title,
  desc,
  href,
  flip = false,
}: {
  image: string;
  title: string;
  desc: string;
  href: string;
  flip?: boolean;
}) {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="bg-white overflow-hidden border-t border-[#e8e8ed]">
      <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} min-h-[480px]`}>
        <div className="lg:w-[58%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src={image} alt={title} width={1200} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[480px]" />
        </div>
        <div className="lg:w-[42%] flex items-center px-8 md:px-12 lg:px-16 py-12 lg:py-16">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1d1d1f]" style={revealStyle(visible, 100)}>
              {title}
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[1.65] text-[#6e6e73] mt-4 max-w-[420px]" style={revealStyle(visible, 200)}>
              {desc}
            </p>
            <div className="mt-6" style={revealStyle(visible, 300)}>
              <Link href={href} className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">
                Learn more {">"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 1. CEO Message — Gradient dark, text left, photo right ── */
function CEOMessage() {
  const { ref, visible } = useScrollReveal(0.08);
  return (
    <section ref={ref} className="overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #3a3a3a 100%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        <div className="lg:w-[55%] flex items-center px-8 md:px-12 lg:px-16 py-14 lg:py-20">
          <div className="max-w-[520px]">
            <h2 className="text-[40px] md:text-[56px] font-bold leading-[1.06] tracking-[-0.035em] text-white" style={revealStyle(visible, 0)}>
              CEO Message
            </h2>
            <p className="text-[14px] leading-[1.75] text-white/50 mt-6" style={revealStyle(visible, 100)}>
              To our valued partners, customers, and leaders of Koleex,
            </p>
            <p className="text-[14px] leading-[1.75] text-white/50 mt-4" style={revealStyle(visible, 150)}>
              At Koleex International Group, every step we take is guided by a shared commitment to progress and excellence. Over the years, we have grown from a family legacy into a global enterprise, but our core values remain unchanged: trust, innovation, and responsibility.
            </p>
            <p className="text-[14px] leading-[1.75] text-white/50 mt-4" style={revealStyle(visible, 200)}>
              Together, we are not only building a stronger company, but also shaping the future of manufacturing.
            </p>
            <div className="mt-8" style={revealStyle(visible, 300)}>
              <Link href="/about/ceo-message" className="text-[15px] text-[#2997ff] hover:underline underline-offset-[3px]">
                Read full message {">"}
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 100)}>
          <Image src="/images/team-office.jpg" alt="CEO" width={1000} height={800} className="w-full h-full object-cover min-h-[400px] lg:min-h-[520px] grayscale" />
        </div>
      </div>
    </section>
  );
}

/* ── 4. Core Values — Image left + 2×3 dark cards right ── */
function CoreValues() {
  const { ref, visible } = useScrollReveal(0.06);
  const values = [
    { title: "Global Perspective", icon: "⊕", desc: "We think beyond borders to serve a connected, fast-changing world." },
    { title: "Smart Simplicity", icon: "◎", desc: "We design intelligent systems that are clean, intuitive, and efficient." },
    { title: "Human Centered Innovation", icon: "◇", desc: "Every feature we create starts with people — their needs, barriers, and experiences." },
    { title: "Integrity & Trust", icon: "♡", desc: "Our actions are guided by transparency, honesty, and long-term commitment." },
    { title: "Legacy & Modernity", icon: "□", desc: "We preserve our heritage while building the future with a modern outlook." },
    { title: "Innovation with Purpose", icon: "△", desc: "We don't chase trends. We solve problems with meaningful technology and design." },
  ];

  return (
    <section ref={ref} className="bg-white overflow-hidden border-t border-[#e8e8ed]">
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        <div className="lg:w-[45%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/team-office.jpg" alt="Core Values" width={1000} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[520px]" />
        </div>
        <div className="lg:w-[55%] px-8 md:px-12 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>
            Core Values
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#6e6e73] mt-3 max-w-[450px]" style={revealStyle(visible, 160)}>
            At Koleex, we believe that values are more than words — they are actions. Our brand is guided by purpose, built with integrity.
          </p>
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#1d1d1f] mt-8 mb-5" style={revealStyle(visible, 220)}>
            The Values That Shape Us
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-[#1d1d1f] rounded-[16px] p-5 transition-all duration-500 hover:-translate-y-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${280 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${280 + i * 60}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-[13px] font-semibold text-white leading-tight pr-2">{v.title}</h4>
                  <span className="text-white/30 text-[16px] shrink-0">{v.icon}</span>
                </div>
                <p className="text-[11px] leading-[1.5] text-white/30">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6" style={revealStyle(visible, 650)}>
            <Link href="/about/values" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Business Segments — Image left + text + 2×2 dark cards right ── */
function BusinessSegments() {
  const { ref, visible } = useScrollReveal(0.06);
  const segments = [
    { title: "Manufacturing & Production", icon: "⚙️" },
    { title: "Smart Technologies & Software", icon: "💻" },
    { title: "Global Trade & Distribution", icon: "🌐" },
    { title: "Strategic Investment & Innovation", icon: "📈" },
  ];

  return (
    <section ref={ref} className="bg-white overflow-hidden border-t border-[#e8e8ed]">
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        <div className="lg:w-[40%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/factory-floor.jpg" alt="Business Segments" width={1000} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[520px]" />
        </div>
        <div className="lg:w-[60%] px-8 md:px-12 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>
            Business Segments
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#6e6e73] mt-3 max-w-[550px]" style={revealStyle(visible, 160)}>
            Through integrated business segments, Koleex advances innovation in manufacturing, smart solutions, international trade, and strategic global investment.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {segments.map((s, i) => (
              <div
                key={s.title}
                className="bg-[#1d1d1f] rounded-[16px] p-5 transition-all duration-500 hover:-translate-y-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${240 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${240 + i * 60}ms`,
                }}
              >
                <span className="text-lg block mb-2">{s.icon}</span>
                <h4 className="text-[13px] font-semibold text-white">{s.title}</h4>
              </div>
            ))}
          </div>
          <div className="mt-6" style={revealStyle(visible, 500)}>
            <Link href="/about/business-segments" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Technology — Full dark bg with bento grid ── */
function Technology() {
  const { ref, visible } = useScrollReveal(0.06);
  const features = [
    { title: "Custom Operation System", desc: "Build a custom OS for platform optimization." },
    { title: "AI Powered Machines", desc: "Smart machines powered with AI to enhance performance." },
    { title: "Smart User Interface", desc: "An intuitive interface designed for ease of use." },
    { title: "Modular Software Updates", desc: "Seamless feature upgrades and updates." },
    { title: "Data-Driven Production", desc: "Monitor performance and optimize operations." },
    { title: "Predictive Maintenance", desc: "Reduce downtime and improve machine uptime." },
  ];

  return (
    <section ref={ref} className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-[45%]">
            <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white" style={revealStyle(visible, 0)}>
              Driven by Innovation.
              <br />
              Powered by Technology.
            </h2>
            <p className="text-[14px] leading-[1.7] text-white/40 mt-5 max-w-[400px]" style={revealStyle(visible, 100)}>
              At Koleex, technology is the engine that drives our transformation. We design intelligent solutions that power machines, software, and systems to achieve precision and future-ready performance.
            </p>
            <div className="mt-8" style={revealStyle(visible, 200)}>
              <Image src="/images/hero-robot.jpg" alt="Technology" width={600} height={800} className="w-full h-auto rounded-[16px] opacity-80" />
            </div>
          </div>
          <div className="lg:w-[55%]">
            <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-6 mb-4" style={revealStyle(visible, 150)}>
              <p className="text-[12px] uppercase tracking-[0.08em] text-white/30 mb-2">Koleex Technology</p>
              <h3 className="text-[22px] md:text-[28px] font-semibold text-white leading-tight">
                Koleex Technology and Smart Solutions.
                <br />
                <span className="text-white/40">Empowering the Future of Industry.</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.10]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${300 + i * 50}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${300 + i * 50}ms`,
                  }}
                >
                  <h4 className="text-[12px] font-semibold text-white mb-1.5">{f.title}</h4>
                  <p className="text-[10.5px] leading-[1.5] text-white/25">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6" style={revealStyle(visible, 600)}>
              <Link href="/about/technology" className="text-[15px] text-[#2997ff] hover:underline underline-offset-[3px]">Explore our technology {">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9. Market Strategy — Image left + text + icon cards right ── */
function MarketStrategy() {
  const { ref, visible } = useScrollReveal(0.08);
  const cards = [
    { title: "Market Research & Local Insights", icon: "🔍" },
    { title: "Tailored Strategy Design", icon: "📋" },
    { title: "Channel Activation", icon: "🔗" },
    { title: "Performance Optimization", icon: "📈" },
  ];

  return (
    <section ref={ref} className="bg-white overflow-hidden border-t border-[#e8e8ed]">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="lg:w-[42%] overflow-hidden" style={revealStyle(visible, 0)}>
          <Image src="/images/modern-office.jpg" alt="Market Strategy" width={1000} height={800} className="w-full h-full object-cover min-h-[300px] lg:min-h-[480px]" />
        </div>
        <div className="lg:w-[58%] px-8 md:px-12 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-bold leading-[1.06] tracking-[-0.035em] text-[#1d1d1f]" style={revealStyle(visible, 80)}>
            Market Strategy
          </h2>
          <p className="text-[15px] leading-[1.65] text-[#6e6e73] mt-3 max-w-[480px]" style={revealStyle(visible, 160)}>
            We move with strategy, not chance — understanding markets, shaping demands, and leading with innovation.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-8">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className="bg-[#1d1d1f] rounded-[16px] p-5 flex items-start gap-3 transition-all duration-500 hover:-translate-y-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${240 + i * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${240 + i * 60}ms`,
                }}
              >
                <span className="text-xl shrink-0">{c.icon}</span>
                <h4 className="text-[13px] font-semibold text-white">{c.title}</h4>
              </div>
            ))}
          </div>
          <div className="mt-6" style={revealStyle(visible, 500)}>
            <Link href="/about/future-outlook" className="text-[15px] text-[#0066cc] hover:underline underline-offset-[3px]">Learn more {">"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function AboutPage() {
  return (
    <>
      {/* ═══ PART 1: WHO WE ARE ═══ */}

      {/* 1. CEO Message — Welcome, sets the tone */}
      <CEOMessage />

      {/* 2. History & Heritage — Where we come from */}
      <SplitSection
        image="/images/factory-floor.jpg"
        title="History and Heritage"
        desc="Koleex has grown from a family tradition into a global name, driven by integrity, precision, and a deep respect for the past that shapes our future direction."
        href="/about/history"
      />

      {/* 3. Our Vision — Where we're going */}
      <SplitSection
        image="/images/solar-panels.jpg"
        title="Our Vision"
        desc="At Koleex, our vision is to redefine the future of smart industry by fusing innovation with heritage, delivering intelligent tools that shape progress across global markets and generations."
        href="/about/vision-mission"
        flip
      />

      {/* 4. Core Values — What guides us */}
      <CoreValues />

      {/* ═══ PART 2: WHAT WE DO ═══ */}

      {/* 5. Business Segments — Our four pillars */}
      <BusinessSegments />

      {/* 6. Technology & Innovation — How we build */}
      <Technology />

      {/* 7. Corporate Structure — How we're organized */}
      <SplitSection
        image="/images/modern-office.jpg"
        title="Corporate Structure"
        desc="With defined leadership roles and clear departmental responsibilities, our structure empowers teams to innovate and operate with precision and agility."
        href="/about/corporate-structure"
      />

      {/* ═══ PART 3: WHERE WE OPERATE ═══ */}

      {/* 8. Global Presence — Our worldwide reach */}
      <SplitSection
        image="/images/digital-globe.jpg"
        title="Global Presence"
        desc="Koleex operates across multiple continents, establishing strong partnerships and a dynamic presence in the world's leading industrial markets."
        href="/about/global-presence"
        flip
      />

      {/* 9. Market Strategy — How we grow */}
      <MarketStrategy />

      {/* 10. Production Overview — Our manufacturing strength */}
      <SplitSection
        image="/images/hero-robot.jpg"
        title="Production Overview"
        desc="At Koleex Group, we showcase our production strength. Each stage reflects advanced technology, precision, and strict quality standards we uphold."
        href="/products"
        flip
      />

      {/* ═══ PART 4: OUR IMPACT & FUTURE ═══ */}

      {/* 11. Social Responsibility — Our commitment to communities */}
      <SplitSection
        image="/images/wind-turbines.jpg"
        title="Social Responsibility"
        desc="Koleex believes in creating impact beyond industry, promoting fairness, education, and community empowerment in every region we operate in."
        href="/about/sustainability"
      />

      {/* 12. Clients Portfolio — Who trusts us */}
      <SplitSection
        image="/images/composites.jpg"
        title="Clients Portfolio"
        desc="We present the global brands and factories that believe in our products. Each alliance stands as proof of our vision, our innovation, and our enduring values."
        href="/contact"
        flip
      />

      {/* 13. Future Outlook — What's next */}
      <SplitSection
        image="/images/circuit-board.jpg"
        title="Future Outlook"
        desc="Looking ahead, Koleex is focused on manufacturing innovation, digital integration, regional expansion, and customer excellence — building the next chapter of industrial technology."
        href="/about/future-outlook"
      />
    </>
  );
}
