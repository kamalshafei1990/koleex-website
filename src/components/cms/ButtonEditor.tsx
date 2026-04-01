"use client";

import { LinkPicker } from "./LinkPicker";
import { getButtonClasses } from "@/lib/section-helpers";
import type { ButtonConfig, ButtonStyle, ButtonShape, ButtonSize } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   ButtonEditor — Full button builder with text, link picker, style controls.
   --------------------------------------------------------------------------- */

interface ButtonEditorProps {
  label: string;
  config: ButtonConfig;
  dark?: boolean;
  onChange: (config: ButtonConfig) => void;
}

const styles: { value: ButtonStyle; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

const shapes: { value: ButtonShape; label: string; preview: string }[] = [
  { value: "pill", label: "Pill", preview: "rounded-full" },
  { value: "rounded", label: "Rounded", preview: "rounded-xl" },
  { value: "square", label: "Square", preview: "rounded-none" },
];

const sizes: { value: ButtonSize; label: string }[] = [
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
];

export function ButtonEditor({ label, config, dark = false, onChange }: ButtonEditorProps) {
  function update(field: string, value: unknown) {
    onChange({ ...config, [field]: value });
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/20">{label}</p>

      {/* Text */}
      <div>
        <label className="text-[10px] text-white/25 mb-1 block">Button Text</label>
        <input
          value={config.text}
          onChange={(e) => update("text", e.target.value)}
          className="w-full h-[34px] px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] text-white outline-none focus:border-white/[0.15] placeholder:text-white/[0.15]"
          placeholder="Learn more"
        />
      </div>

      {/* Link picker */}
      {config.text && (
        <>
          <div>
            <label className="text-[10px] text-white/25 mb-1 block">Link</label>
            <LinkPicker
              linkType={config.linkType}
              link={config.link}
              newTab={config.newTab}
              onChangeLinkType={(t) => update("linkType", t)}
              onChangeLink={(l) => update("link", l)}
              onChangeNewTab={(n) => update("newTab", n)}
            />
          </div>

          {/* Style / Shape / Size */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
            {/* Style */}
            <div>
              <label className="text-[10px] text-white/25 mb-1.5 block">Style</label>
              <div className="flex gap-1">
                {styles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => update("style", s.value)}
                    className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all ${
                      config.style === s.value
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape */}
            <div>
              <label className="text-[10px] text-white/25 mb-1.5 block">Shape</label>
              <div className="flex gap-1">
                {shapes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => update("shape", s.value)}
                    className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all ${
                      config.shape === s.value
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-[10px] text-white/25 mb-1.5 block">Size</label>
              <div className="flex gap-1">
                {sizes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => update("size", s.value)}
                    className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all ${
                      config.size === s.value
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div>
              <label className="text-[10px] text-white/25 mb-1.5 block">Preview</label>
              <div className={`p-4 rounded-lg ${dark ? "bg-black" : "bg-white"} flex justify-center`}>
                <span className={getButtonClasses(config, dark)}>
                  {config.text || "Button"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
