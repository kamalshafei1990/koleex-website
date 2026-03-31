"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal, revealStyle, revealScaleStyle } from "@/lib/useScrollReveal";

/* ---------------------------------------------------------------------------
   4. Technology & Innovation — Split layout: image left, text right.
   --------------------------------------------------------------------------- */

const capabilities = [
  { icon: "⚙️", title: "Smart Machines", desc: "AI-powered automation systems" },
  { icon: "🔗", title: "IoT Integration", desc: "50,000+ connected devices" },
  { icon: "🧠", title: "Artificial Intelligence", desc: "Predictive analytics & ML" },
  { icon: "🛡️", title: "Cybersecurity", desc: "Enterprise-grade protection" },
];

export function TechnologySection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative bg-black py-32 md:py-44 section-accent-top hero-gradient-alt overflow-hidden">
      <div className="orb orb-silver w-[500px] h-[500px] -top-32 -right-48" style={{ animationDelay: "2s" }} />

      <div className="max-w-[1100px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div style={revealScaleStyle(visible, 0)}>
            <div className="card-image overflow-hidden">
              <Image
                src="/images/circuit-board.jpg"
                alt="Technology & Innovation"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-overline mb-4" style={revealStyle(visible, 100)}>Technology & Innovation</p>
            <h2 className="text-display-sm text-gradient-silver" style={revealStyle(visible, 200)}>
              Where precision meets intelligence.
            </h2>
            <p className="text-subtitle mt-6 !leading-[1.8]" style={revealStyle(visible, 300)}>
              We combine decades of engineering excellence with cutting-edge software,
              AI, and IoT to create systems that don&apos;t just perform — they anticipate,
              adapt, and evolve.
            </p>

            {/* Capabilities grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {capabilities.map((c, i) => (
                <div
                  key={c.title}
                  className="card-dark !p-5 !rounded-[14px]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${400 + i * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${400 + i * 80}ms`,
                  }}
                >
                  <span className="text-xl">{c.icon}</span>
                  <h4 className="text-[14px] font-semibold text-white mt-2.5">{c.title}</h4>
                  <p className="text-[12px] text-white/35 mt-1">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10" style={revealStyle(visible, 700)}>
              <Link href="/solutions" className="link-cta link-cta-dark">
                Explore our technology →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
