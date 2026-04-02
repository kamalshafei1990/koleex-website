"use client";

import { useEffect, useState, useCallback } from "react";
import { SectionRenderer } from "@/components/cms/SectionRenderer";
import { ElementRenderer } from "@/components/cms/ElementRenderer";
import { CanvasElement } from "@/components/cms/CanvasElement";
import { getSectionSettings } from "@/lib/section-helpers";
import type { SectionRow, ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Admin Preview — Visual canvas with section toolbar + canvas elements.
   --------------------------------------------------------------------------- */

export default function PreviewPage() {
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [elements, setElements] = useState<Record<string, ElementRow[]>>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
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
    }
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "preview-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const selectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId);
    setSelectedElementId(null);
    window.parent.postMessage({ type: "select-section", sectionId }, "*");
  }, []);

  const toolbarAction = useCallback((sectionId: string, action: string) => {
    window.parent.postMessage({ type: "toolbar-action", sectionId, action }, "*");
  }, []);

  // Element actions — send to parent admin
  const handleElementUpdate = useCallback((sectionId: string, elementId: string, updates: Partial<ElementRow>) => {
    window.parent.postMessage({ type: "element-update", sectionId, elementId, updates }, "*");
  }, []);

  const handleElementDuplicate = useCallback((sectionId: string, elementId: string) => {
    window.parent.postMessage({ type: "element-action", sectionId, elementId, action: "duplicate" }, "*");
  }, []);

  const handleElementDelete = useCallback((sectionId: string, elementId: string) => {
    window.parent.postMessage({ type: "element-action", sectionId, elementId, action: "delete" }, "*");
  }, []);

  // Inline text editing
  const handleTextBlur = useCallback((sectionId: string, field: string, value: string) => {
    window.parent.postMessage({ type: "inline-edit", sectionId, field, value }, "*");
  }, []);

  // Click on canvas background deselects
  const handleCanvasClick = useCallback(() => {
    setSelectedElementId(null);
  }, []);

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[14px] text-[#86868b]">Select a page to preview</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" onClick={handleCanvasClick}>
      {/* Canvas guides */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <div className="max-w-[1000px] mx-auto h-full border-l border-r border-dashed border-blue-200/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-blue-300/5" />
      </div>

      {sections.map((section) => {
        const sectionElements = elements[section.id] || [];
        const isSelected = selectedSectionId === section.id;
        const isHovered = hoveredSectionId === section.id;
        const settings = getSectionSettings(section);

        return (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className="relative group"
            onMouseEnter={() => setHoveredSectionId(section.id)}
            onMouseLeave={() => setHoveredSectionId(null)}
            onClick={(e) => {
              e.stopPropagation();
              selectSection(section.id);
            }}
          >
            {/* Selection / hover border */}
            <div className={`absolute inset-0 z-[15] pointer-events-none transition-all duration-200 ${
              isSelected ? "border-2 border-blue-500/40 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]"
              : isHovered ? "border border-blue-400/15" : ""
            }`} />

            {/* Section label */}
            {(isHovered || isSelected) && (
              <div className="absolute top-2 left-2 z-20">
                <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-semibold rounded shadow-lg">
                  {section.layout}
                </span>
              </div>
            )}

            {/* Section floating toolbar */}
            {(isHovered || isSelected) && (
              <div className="absolute top-2 right-2 z-20 flex items-center gap-0.5 bg-white rounded-lg shadow-lg border border-[#e8e8ed] p-0.5">
                <ToolbarBtn onClick={() => toolbarAction(section.id, "moveUp")} title="Move up">↑</ToolbarBtn>
                <ToolbarBtn onClick={() => toolbarAction(section.id, "moveDown")} title="Move down">↓</ToolbarBtn>
                <div className="w-px h-4 bg-[#e8e8ed]" />
                <ToolbarBtn onClick={() => toolbarAction(section.id, "duplicate")} title="Duplicate">⧉</ToolbarBtn>
                <ToolbarBtn onClick={() => toolbarAction(section.id, "toggle")} title="Hide/Show">👁</ToolbarBtn>
                <ToolbarBtn onClick={() => toolbarAction(section.id, "delete")} title="Delete" danger>🗑</ToolbarBtn>
              </div>
            )}

            {/* ── RENDER MODE: Elements OR Section built-in ── */}
            {sectionElements.length > 0 ? (
              /* ELEMENTS MODE: section has elements → render them in a grid container
                 with the section's background. SectionRenderer is skipped so elements
                 ARE the content and can be arranged side-by-side with the grid. */
              (() => {
                const cols = settings.columns || 1;
                const rows = settings.rows || 0;
                const gap = settings.gap || "24px";
                const pt = settings.paddingTop || "48px";
                const pb = settings.paddingBottom || "48px";
                const bg = section.background;
                const bgClass = bg === "dark" ? "bg-[#1d1d1f]" : bg === "black" ? "bg-black" : bg === "light" ? "bg-[#f5f5f7]" : "bg-white";
                return (
                  <div className={bgClass}>
                    <div className="max-w-[1000px] mx-auto px-6" style={{ paddingTop: pt, paddingBottom: pb }}>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: rows ? `repeat(${rows}, auto)` : undefined,
                        gap,
                        alignItems: "center",
                      }}>
                        {sectionElements.map((el) => (
                          <CanvasElement
                            key={el.id}
                            element={el}
                            isSelected={selectedElementId === el.id}
                            onSelect={() => { setSelectedElementId(el.id); window.parent.postMessage({ type: "select-element", sectionId: section.id, elementId: el.id }, "*"); }}
                            onUpdate={(updates) => handleElementUpdate(section.id, el.id, updates)}
                            onDuplicate={() => handleElementDuplicate(section.id, el.id)}
                            onDelete={() => handleElementDelete(section.id, el.id)}
                          >
                            <ElementRenderer elements={[el]} />
                          </CanvasElement>
                        ))}
                      </div>
                    </div>

                    {/* Add element button */}
                    {isSelected && (
                      <div className="max-w-[1000px] mx-auto px-6 pb-4 flex justify-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: "add-element-request", sectionId: section.id }, "*"); }}
                          className="h-8 px-5 rounded-xl border-2 border-dashed border-[#e8e8ed] text-[11px] text-[#aeaeb2] hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all duration-200"
                        >
                          + Add Element
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              /* SECTION MODE: no elements → render section's built-in content */
              <>
                <div className="relative">
                  <SectionRenderer sections={[section]} />
                  {isSelected && section.title && (
                    <InlineEditOverlay sectionId={section.id} onBlur={handleTextBlur} />
                  )}
                </div>

                {/* Add element button — empty section */}
                {isSelected && (
                  <div className="max-w-[1000px] mx-auto px-6 py-8 flex justify-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: "add-element-request", sectionId: section.id }, "*"); }}
                      className="h-10 px-6 rounded-xl border-2 border-dashed border-[#d2d2d7] text-[13px] text-[#86868b] hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
                    >
                      + Add Element
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Helper: Toolbar button ── */
function ToolbarBtn({ onClick, title, children, danger }: { onClick: () => void; title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`h-7 w-7 flex items-center justify-center rounded text-[11px] transition-colors ${
        danger ? "text-[#86868b] hover:text-red-500 hover:bg-red-50" : "text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
      }`}
      title={title}
    >
      {children}
    </button>
  );
}

/* ── Inline edit overlay for section headings ── */
function InlineEditOverlay({ sectionId, onBlur }: { sectionId: string; onBlur: (sId: string, field: string, value: string) => void }) {
  return (
    <style>{`
      #section-${sectionId} h1[class],
      #section-${sectionId} h2[class] {
        cursor: text !important;
        position: relative;
      }
      #section-${sectionId} h1[class]:hover,
      #section-${sectionId} h2[class]:hover {
        outline: 2px dashed rgba(59,130,246,0.25);
        outline-offset: 4px;
        border-radius: 4px;
      }
      #section-${sectionId} h1[class]:focus,
      #section-${sectionId} h2[class]:focus {
        outline: 2px solid rgba(59,130,246,0.5);
        outline-offset: 4px;
        border-radius: 4px;
      }
      #section-${sectionId} p[class] {
        cursor: text !important;
      }
      #section-${sectionId} p[class]:hover {
        outline: 1px dashed rgba(59,130,246,0.15);
        outline-offset: 3px;
        border-radius: 3px;
      }
    `}</style>
  );
}
