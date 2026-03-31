import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEO Message",
};

export default function CeoMessagePage() {
  return (
    <>
      <AboutHero
        title="CEO Message"
        subtitle="A letter from our leadership."
      />

      <section className="relative bg-black">
        <div
          className="h-[400px] md:h-[520px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/team-office.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>
      </section>

      <section className="bg-black py-20 md:py-28 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <p className="text-[17px] leading-[1.65] text-white/60">
            When my grandfather founded this company over five decades ago, he
            believed that precision engineering could change the way industries
            operate and communities prosper. That belief has guided every
            generation of leadership since, and it remains the foundation of
            everything we do today.
          </p>
          <p className="text-[17px] leading-[1.65] text-white/60 mt-6">
            The world is changing faster than ever. The convergence of
            artificial intelligence, sustainable energy, and advanced materials
            is creating opportunities that would have been unimaginable a decade
            ago. At Koleex, we are not simply responding to these shifts. We are
            helping to shape them. Our investments in R&D, our commitment to
            carbon neutrality, and our expansion into new markets all reflect a
            singular conviction: that the companies that lead with purpose will
            be the ones that endure.
          </p>
          <p className="text-[17px] leading-[1.65] text-white/60 mt-6">
            To our clients, partners, and the 25,000 people who make this
            organization what it is, I offer both my gratitude and my
            commitment. The best of Koleex is still ahead of us.
          </p>

          <div className="mt-12 border-t border-white/[0.06] pt-8">
            <p className="text-[20px] font-semibold text-white">
              Marcus Koleex
            </p>
            <p className="text-[14px] text-white/40 mt-1">
              Chief Executive Officer, Koleex International Group
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/careers"
              className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]"
            >
              Join our team {">"}
            </Link>
            <Link
              href="/contact"
              className="text-[17px] text-[#2997ff] hover:underline underline-offset-[3px]"
            >
              Get in touch {">"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
