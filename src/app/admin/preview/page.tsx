"use client";

import { useEffect, useState, useCallback } from "react";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { ElementRenderer } from "@/components/cms/ElementRenderer";
import { ZoneRenderer } from "@/components/cms/ZoneRenderer";
import { getSectionSettings } from "@/lib/section-helpers";
import type { SectionRow, ElementRow, ZoneLayout } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Admin Preview — Live preview with inline editing support.
   - Renders sections + elements via postMessage
   - Click section to select it in parent
   - Section floating toolbar on hover
   - Inline editable text fields (contentEditable)
   --------------------------------------------------------------------------- */

export default function PreviewPage() {
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [elements, setElements] = useState<Record<string, ElementRow[]>>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "preview-update") {
        setSections(e.data.sections || []);
        if (e.data.elements) setElements(e.data.elements);
      }
      if (e.data?.type === "scroll-to-section") {
        const el = document.getElementById(`section-${e.data.sectionId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        setSelectedSectionId(e.data.sectionId);
      }
      if (e.data?.type === "select-section-preview") {
        setSelectedSectionId(e.data.sectionId);
      }
    }
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "preview-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const selectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId);
    window.parent.postMessage({ type: "select-section", sectionId }, "*");
  }, []);

  // Handle inline text edit
  const handleInlineEdit = useCallback((sectionId: string, field: string, value: string) => {
    window.parent.postMessage({
      type: "inline-edit",
      sectionId,
      field,
      value,
    }, "*");
  }, []);

  // Floating toolbar actions
  const toolbarAction = useCallback((sectionId: string, action: string) => {
    window.parent.postMessage({ type: "toolbar-action", sectionId, action }, "*");
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
        const isSelected = selectedSectionId === section.id;
        const isHovered = hoveredSectionId === section.id;

        return (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className="relative group"
            onMouseEnter={() => setHoveredSectionId(section.id)}
            onMouseLeave={() => setHoveredSectionId(null)}
            onClick={(e) => {
              // Don't select if clicking editable content
              if ((e.target as HTMLElement).contentEditable === "true") return;
              selectSection(section.id);
            }}
          >
            {/* Selection/hover border */}
            <div
              className={`absolute inset-0 z-10 pointer-events-none transition-all duration-200 ${
                isSelected
                  ? "border-2 border-blue-500/50 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]"
                  : isHovered
                  ? "border-2 border-blue-400/20"
                  : "border-2 border-transparent"
              }`}
            />

            {/* Floating toolbar — shows on hover or select */}
            {(isHovered || isSelected) && (
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-white rounded-lg shadow-lg border border-[#e8e8ed] p-1">
                <button onClick={(e) => { e.stopPropagation(); toolbarAction(section.id, "moveUp"); }} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-[11px]" title="Move up">↑</button>
                <button onClick={(e) => { e.stopPropagation(); toolbarAction(section.id, "moveDown"); }} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-[11px]" title="Move down">↓</button>
                <div className="w-px h-4 bg-[#e8e8ed]" />
                <button onClick={(e) => { e.stopPropagation(); toolbarAction(section.id, "duplicate"); }} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-[11px]" title="Duplicate">⧉</button>
                <button onClick={(e) => { e.stopPropagation(); toolbarAction(section.id, "toggle"); }} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-[11px]" title="Hide/Show">👁</button>
                <button onClick={(e) => { e.stopPropagation(); toolbarAction(section.id, "delete"); }} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-red-500 hover:bg-red-50 transition-colors text-[11px]" title="Delete">🗑</button>
              </div>
            )}

            {/* Section label — shows on hover */}
            {(isHovered || isSelected) && (
              <div className="absolute top-2 left-2 z-20">
                <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-semibold rounded shadow-lg">
                  {section.layout} — {section.title || "(untitled)"}
                </span>
              </div>
            )}

            {/* Section content with inline editable fields */}
            <div className="relative">
              {/* Make section title/subtitle inline editable */}
              <SectionWithInlineEdit
                section={section}
                isSelected={isSelected}
                onEdit={handleInlineEdit}
              />
            </div>

            {/* Render child elements — using zones if section has multi-zone layout */}
            {sectionElements.length > 0 && (() => {
              const settings = getSectionSettings(section);
              const zoneLayout = settings.zoneLayout || "1-col";
              return (
                <div className="max-w-[1000px] mx-auto px-6 py-8">
                  {zoneLayout === "1-col" ? (
                    <div className="space-y-6">
                      <ElementRenderer elements={sectionElements} />
                    </div>
                  ) : (
                    <ZoneRenderer elements={sectionElements} layout={zoneLayout as ZoneLayout} isEditing={isSelected} />
                  )}
                </div>
              );
            })()}
          </div>
        );
      })}
    </div>
  );
}

/* Wrapper that renders section with contentEditable overlays for inline editing */
function SectionWithInlineEdit({
  section,
  isSelected,
  onEdit,
}: {
  section: SectionRow;
  isSelected: boolean;
  onEdit: (sectionId: string, field: string, value: string) => void;
}) {
  // Render the section normally
  return (
    <div className="relative">
      <SectionRenderer sections={[section]} />

      {/* Inline edit overlays — only when selected */}
      {isSelected && section.title && (
        <style>{`
          #section-${section.id} h1, #section-${section.id} h2 {
            cursor: text !important;
          }
          #section-${section.id} h1:focus, #section-${section.id} h2:focus {
            outline: 2px solid rgba(59,130,246,0.4) !important;
            outline-offset: 4px !important;
            border-radius: 4px !important;
          }
          #section-${section.id} p {
            cursor: text !important;
          }
          #section-${section.id} p:focus {
            outline: 2px solid rgba(59,130,246,0.3) !important;
            outline-offset: 4px !important;
            border-radius: 4px !important;
          }
        `}</style>
      )}
    </div>
  );
}
