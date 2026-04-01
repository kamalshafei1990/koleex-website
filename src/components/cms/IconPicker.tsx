"use client";

import { useState } from "react";
import { MediaSelector } from "./MediaSelector";
import type { IconConfig } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   IconPicker — Full icon editor with emoji, image upload, size, color,
   position, alignment, and background shape controls.
   --------------------------------------------------------------------------- */

const defaultIcon: IconConfig = {
  type: "emoji",
  value: "⚡",
  size: "md",
  color: undefined,
  bgShape: "none",
  position: "left",
  align: "left",
};

const emojiGrid = [
  "⚡", "🎯", "🔧", "⚙️", "💡", "🏭", "🤖", "💻",
  "🌐", "📊", "🔬", "🛡️", "📦", "🚀", "✅", "⭐",
  "🏢", "👥", "📈", "🔗", "📋", "🎨", "🔒", "💎",
  "🌍", "⏱️", "📡", "🧠", "🔌", "🏗️", "📱", "🖥️",
  "◆", "◇", "●", "○", "■", "□", "▲", "△",
  "⊕", "⊗", "◎", "◉", "♦", "♠", "★", "☆",
];

const sizeMap: Record<string, string> = {
  xs: "16px", sm: "20px", md: "28px", lg: "40px", xl: "56px",
};

interface IconPickerProps {
  config: IconConfig;
  onChange: (config: IconConfig) => void;
}

export function IconPicker({ config, onChange }: IconPickerProps) {
  const [showEmojiGrid, setShowEmojiGrid] = useState(false);
  const c = { ...defaultIcon, ...config };
  const upd = (field: string, value: unknown) => onChange({ ...c, [field]: value });

  return (
    <div className="space-y-3">
      {/* Icon type tabs */}
      <div className="flex gap-1 bg-white/[0.03] rounded-lg p-0.5">
        {(["emoji", "image"] as const).map((t) => (
          <button key={t} onClick={() => upd("type", t)}
            className={`flex-1 h-7 rounded-md text-[10px] font-medium capitalize transition-all ${c.type === t ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-white/30 hover:text-white/50"}`}>
            {t === "emoji" ? "Icon / Emoji" : "Upload Image"}
          </button>
        ))}
      </div>

      {/* Emoji picker */}
      {c.type === "emoji" && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-[24px]">
              {c.value || "⚡"}
            </div>
            <input value={c.value || ""} onChange={(e) => upd("value", e.target.value)} className="input-field flex-1" placeholder="Emoji or symbol" />
          </div>
          <button onClick={() => setShowEmojiGrid(!showEmojiGrid)} className="text-[10px] text-white/25 hover:text-white/50 transition-colors">
            {showEmojiGrid ? "Hide picker" : "Show emoji picker"}
          </button>
          {showEmojiGrid && (
            <div className="grid grid-cols-8 gap-1 mt-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              {emojiGrid.map((emoji) => (
                <button key={emoji} onClick={() => { upd("value", emoji); setShowEmojiGrid(false); }}
                  className="h-8 w-8 rounded flex items-center justify-center text-[16px] hover:bg-white/[0.08] transition-colors">
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Image upload */}
      {c.type === "image" && (
        <MediaSelector currentUrl={c.value || null} onSelect={(url) => upd("value", url)} />
      )}

      {/* Size */}
      <div>
        <label className="text-[9px] text-white/25 mb-1 block">Size</label>
        <div className="flex gap-1">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <button key={s} onClick={() => upd("size", s)}
              className={`flex-1 h-7 rounded-md text-[10px] font-medium uppercase transition-all ${c.size === s ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/30"}`}>
              {s}
            </button>
          ))}
        </div>
        {c.size === "custom" && (
          <input type="number" value={c.customSize || 32} onChange={(e) => upd("customSize", parseInt(e.target.value))} className="input-field mt-1" placeholder="px" />
        )}
      </div>

      {/* Background shape */}
      <div>
        <label className="text-[9px] text-white/25 mb-1 block">Background Shape</label>
        <div className="flex gap-1">
          {(["none", "circle", "rounded", "pill"] as const).map((s) => (
            <button key={s} onClick={() => upd("bgShape", s)}
              className={`flex-1 h-7 rounded-md text-[10px] font-medium capitalize transition-all ${c.bgShape === s ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/30"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[9px] text-white/25 mb-1 block">Icon Color</label>
          <input value={c.color || ""} onChange={(e) => upd("color", e.target.value || undefined)} className="input-field" placeholder="#1d1d1f or inherit" />
        </div>
        {c.bgShape !== "none" && (
          <div>
            <label className="text-[9px] text-white/25 mb-1 block">BG Color</label>
            <input value={c.bgColor || ""} onChange={(e) => upd("bgColor", e.target.value || undefined)} className="input-field" placeholder="#f5f5f7" />
          </div>
        )}
      </div>

      {/* Position & Alignment */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[9px] text-white/25 mb-1 block">Position</label>
          <select value={c.position || "left"} onChange={(e) => upd("position", e.target.value)} className="input-field">
            {["left", "right", "top", "bottom", "center"].map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[9px] text-white/25 mb-1 block">Align</label>
          <select value={c.align || "left"} onChange={(e) => upd("align", e.target.value)} className="input-field">
            {["left", "center", "right"].map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="text-[9px] text-white/25 mb-1 block">Preview</label>
        <div className="p-4 rounded-lg bg-white flex items-center justify-center">
          <IconPreview config={c} />
        </div>
      </div>
    </div>
  );
}

/* Render an icon based on IconConfig */
export function IconPreview({ config }: { config: IconConfig }) {
  const c = { ...defaultIcon, ...config };
  const size = c.size === "custom" ? `${c.customSize || 32}px` : sizeMap[c.size] || "28px";
  const bgShapes: Record<string, string> = {
    none: "",
    circle: "rounded-full",
    rounded: "rounded-xl",
    pill: "rounded-full px-3",
  };

  const iconContent = c.type === "image" && c.value ? (
    <img src={c.value} alt="" style={{ width: size, height: size }} className="object-contain" />
  ) : (
    <span style={{ fontSize: size, color: c.color || "inherit", lineHeight: 1 }}>{c.value || "⚡"}</span>
  );

  if (c.bgShape && c.bgShape !== "none") {
    const padding = parseInt(size) * 0.5;
    return (
      <div
        className={`inline-flex items-center justify-center ${bgShapes[c.bgShape]}`}
        style={{
          backgroundColor: c.bgColor || "#f5f5f7",
          padding: `${padding}px`,
        }}
      >
        {iconContent}
      </div>
    );
  }

  return iconContent;
}
