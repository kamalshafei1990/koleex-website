"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Copy, Trash2, ArrowUp, ArrowDown, AlignLeft, AlignCenter, AlignRight, Link2, GripVertical } from "lucide-react";
import type { ElementRow } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   CanvasElement — Wraps each element with drag, resize, select, and
   floating toolbar capabilities for the visual canvas editor.
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
  onUpdate,
  onDuplicate,
  onDelete,
  children,
}: CanvasElementProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Get current position from element settings
  const pos = (element.settings as Record<string, unknown>) || {};
  const x = (pos.x as number) || 0;
  const y = (pos.y as number) || 0;
  const w = (pos.w as string) || "auto";
  const zIndex = (pos.zIndex as number) || 0;

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isSelected) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - x, y: e.clientY - y });
  }, [isSelected, x, y]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onUpdate({ settings: { ...pos, x: newX, y: newY } });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, pos, onUpdate]);

  // Check if element uses free positioning
  const isFreePositioned = x !== 0 || y !== 0;

  return (
    <div
      ref={elRef}
      className={`relative group ${isDragging ? "cursor-grabbing" : ""}`}
      style={isFreePositioned ? {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: w,
        zIndex: zIndex || "auto",
      } : {
        position: "relative",
      }}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {/* Selection border */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-150 rounded-lg ${
          isSelected
            ? "border-2 border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
            : "border border-transparent group-hover:border-blue-300/30"
        }`}
        style={{ margin: "-2px" }}
      />

      {/* Drag handle — top center */}
      {isSelected && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
          onMouseDown={handleMouseDown}
        >
          <GripVertical className="h-3 w-3 text-white" />
        </div>
      )}

      {/* Floating toolbar — shows when selected */}
      {isSelected && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 bg-white rounded-lg shadow-lg border border-[#e8e8ed] p-0.5">
          <button onClick={onDuplicate} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Duplicate">
            <Copy className="h-3 w-3" />
          </button>
          <button onClick={() => onUpdate({ settings: { ...pos, zIndex: zIndex + 1 } })} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Bring forward">
            <ArrowUp className="h-3 w-3" />
          </button>
          <button onClick={() => onUpdate({ settings: { ...pos, zIndex: Math.max(0, zIndex - 1) } })} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Send backward">
            <ArrowDown className="h-3 w-3" />
          </button>
          <div className="w-px h-4 bg-[#e8e8ed]" />
          <button className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Align left">
            <AlignLeft className="h-3 w-3" />
          </button>
          <button className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Align center">
            <AlignCenter className="h-3 w-3" />
          </button>
          <button className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors" title="Align right">
            <AlignRight className="h-3 w-3" />
          </button>
          <div className="w-px h-4 bg-[#e8e8ed]" />
          <button onClick={onDelete} className="h-7 w-7 flex items-center justify-center rounded text-[#86868b] hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Resize handles — corners */}
      {isSelected && (
        <>
          <div className="absolute -bottom-1 -right-1 z-30 h-3 w-3 bg-blue-500 rounded-full cursor-se-resize shadow" />
          <div className="absolute -bottom-1 -left-1 z-30 h-3 w-3 bg-blue-500 rounded-full cursor-sw-resize shadow" />
          <div className="absolute -top-1 -right-1 z-30 h-3 w-3 bg-blue-500 rounded-full cursor-ne-resize shadow" />
          <div className="absolute -top-1 -left-1 z-30 h-3 w-3 bg-blue-500 rounded-full cursor-nw-resize shadow" />
        </>
      )}

      {/* Element content */}
      {children}
    </div>
  );
}
