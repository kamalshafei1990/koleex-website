"use client";

import { useScrollReveal, revealStyle } from "@/lib/useScrollReveal";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

/* ---------------------------------------------------------------------------
   9. Download Catalog — Downloads for catalogs, company profile, brochures.
   --------------------------------------------------------------------------- */

const downloads = [
  { title: "Product Catalog 2026", desc: "Complete product portfolio across all divisions", icon: "📖" },
  { title: "Company Profile", desc: "Overview of Koleex International Group", icon: "🏢" },
  { title: "Technology Brochure", desc: "Innovation and R&D capabilities", icon: "💡" },
];

export function CatalogSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section className="bg-black py-32 md:py-44 section-accent-top">
      <div ref={ref} className="max-w-[980px] mx-auto px-5">
        <div className="text-center mb-16">
          <p className="text-overline mb-4" style={revealStyle(visible, 0)}>Downloads</p>
          <h2 className="text-headline text-gradient-silver" style={revealStyle(visible, 100)}>
            Explore our resources.
          </h2>
          <p className="text-subtitle mt-4 max-w-md mx-auto" style={revealStyle(visible, 200)}>
            Download our latest catalogs and company materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {downloads.map((d, i) => (
            <div
              key={d.title}
              className="card-dark !p-8 !rounded-[20px] text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 100}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 100}ms`,
              }}
            >
              <span className="text-3xl block mb-4">{d.icon}</span>
              <h3 className="text-[16px] font-semibold text-white">{d.title}</h3>
              <p className="text-[13px] text-white/35 mt-2 mb-6">{d.desc}</p>
              <Button variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
