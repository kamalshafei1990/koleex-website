"use client";

import { useEffect, useState } from "react";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import type { SectionRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Admin Preview — Renders sections received via postMessage from parent.
   Loaded in an iframe by the visual editor.
   --------------------------------------------------------------------------- */

export default function PreviewPage() {
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [viewport, setViewport] = useState("desktop");

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "preview-update") {
        setSections(e.data.sections || []);
      }
      if (e.data?.type === "viewport-change") {
        setViewport(e.data.viewport || "desktop");
      }
      if (e.data?.type === "scroll-to-section") {
        const el = document.getElementById(`section-${e.data.sectionId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    window.addEventListener("message", handleMessage);
    // Tell parent we're ready
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
      {sections.map((section) => (
        <div key={section.id} id={`section-${section.id}`} className="relative group">
          {/* Hover overlay for click-to-select */}
          <div
            className="absolute inset-0 z-10 border-2 border-transparent group-hover:border-blue-500/30 cursor-pointer transition-colors duration-200"
            onClick={() => window.parent.postMessage({ type: "select-section", sectionId: section.id }, "*")}
          />
          <SectionRenderer sections={[section]} />
        </div>
      ))}
    </div>
  );
}
