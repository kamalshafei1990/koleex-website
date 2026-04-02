"use client";

import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import type { ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   CanvasElement — Wraps each element with selection border, floating toolbar,
   and actions. Works within CSS Grid — no absolute positioning.
   --------------------------------------------------------------------------- */

interface CanvasElementProps {
  element: ElementRow;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<ElementRow>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export function CanvasElement({
  element,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
  children,
}: CanvasElementProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection / hover border */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-150 rounded-lg ${
          isSelected
            ? "ring-2 ring-blue-500 ring-offset-1"
            : isHovered ? "ring-1 ring-blue-300/30" : ""
        }`}
        style={{ margin: "-2px" }}
      />

      {/* Floating toolbar — shows when selected */}
      {isSelected && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 bg-white rounded-lg shadow-lg border border-[#e8e8ed] p-0.5">
          <span className="px-2 text-[8px] text-[#86868b] font-semibold uppercase">{element.type}</span>
          <div className="w-px h-4 bg-[#e8e8ed]" />
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="h-6 w-6 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Duplicate">
            <Copy className="h-3 w-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="h-6 w-6 flex items-center justify-center rounded text-[#86868b] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Element content */}
      {children}
    </div>
  );
}
