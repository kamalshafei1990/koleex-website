"use client";

import { useEffect, useState } from "react";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { ElementRenderer } from "@/components/cms/ElementRenderer";
import type { SectionRow, ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Admin Preview — Renders sections + elements via postMessage from parent.
   --------------------------------------------------------------------------- */

export default function PreviewPage() {
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [elements, setElements] = useState<Record<string, ElementRow[]>>({});

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "preview-update") {
        setSections(e.data.sections || []);
        if (e.data.elements) setElements(e.data.elements);
      }
      if (e.data?.type === "scroll-to-section") {
        const el = document.getElementById(`section-${e.data.sectionId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "preview-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[14px] text-[#86868b]">Select a page to preview</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section) => {
        const sectionElements = elements[section.id] || [];
        return (
          <div key={section.id} id={`section-${section.id}`} className="relative group">
            <div
              className="absolute inset-0 z-10 border-2 border-transparent group-hover:border-blue-500/30 cursor-pointer transition-colors duration-200"
              onClick={() => window.parent.postMessage({ type: "select-section", sectionId: section.id }, "*")}
            />
            <SectionRenderer sections={[section]} />
            {/* Render child elements below the section's built-in content */}
            {sectionElements.length > 0 && (
              <div className="max-w-[1000px] mx-auto px-6 py-8 space-y-6">
                <ElementRenderer elements={sectionElements} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
