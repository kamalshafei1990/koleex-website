import { AboutHero } from "@/components/about/AboutHero";
import { SplitSection } from "@/components/about/SplitSection";
import { StatsRow } from "@/components/about/StatsRow";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Message from Our Leadership",
};

export default function CeoMessagePage() {
  return (
    <>
      <AboutHero
        title="A Message from Our Leadership"
        subtitle="Our commitment to customers and the path ahead."
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
            At Koleex, we have always believed that a company earns its
            reputation through the quality of its products, the reliability of
            its service, and the strength of its relationships. These principles
            have guided us from our earliest days and continue to shape every
            decision we make.
          </p>
          <p className="text-[17px] leading-[1.65] text-white/60 mt-6">
            The industrial landscape is evolving rapidly. Manufacturers are
            looking for partners who can help them adopt new technologies,
            improve efficiency, and compete in a global market. We are investing
            in our capabilities, expanding our reach, and deepening our
            expertise so that we can be that partner for our customers, today
            and in the years ahead.
          </p>
          <p className="text-[17px] leading-[1.65] text-white/60 mt-6">
            To our clients, partners, and team members: thank you for your
            trust and commitment. We are focused on building something lasting,
            and the best of Koleex is still ahead of us.
          </p>

          <div className="mt-12 border-t border-white/[0.06] pt-8">
            <p className="text-[20px] font-semibold text-white">
              The Leadership Team
            </p>
            <p className="text-[14px] text-white/40 mt-1">
              Koleex International Group
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
