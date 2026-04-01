"use client";

import { useState } from "react";
import { Globe, FileText, Mail, Phone, Hash, ExternalLink, Link2, ChevronDown } from "lucide-react";
import type { LinkType } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   LinkPicker — Visual link type selector.
   Supports: page, product, anchor, url, file, email, phone, none.
   --------------------------------------------------------------------------- */

interface LinkPickerProps {
  linkType: LinkType;
  link: string;
  newTab: boolean;
  onChangeLinkType: (type: LinkType) => void;
  onChangeLink: (link: string) => void;
  onChangeNewTab: (newTab: boolean) => void;
}

const linkTypes: { value: LinkType; label: string; icon: React.ReactNode; placeholder: string }[] = [
  { value: "none", label: "None", icon: null, placeholder: "" },
  { value: "page", label: "Internal Page", icon: <FileText className="h-3.5 w-3.5" />, placeholder: "/about, /products, /contact" },
  { value: "product", label: "Product Page", icon: <Link2 className="h-3.5 w-3.5" />, placeholder: "/products/industrial-technology" },
  { value: "anchor", label: "Section Anchor", icon: <Hash className="h-3.5 w-3.5" />, placeholder: "section-id (without #)" },
  { value: "url", label: "External URL", icon: <Globe className="h-3.5 w-3.5" />, placeholder: "https://example.com" },
  { value: "file", label: "File / Document", icon: <FileText className="h-3.5 w-3.5" />, placeholder: "https://...pdf" },
  { value: "email", label: "Email", icon: <Mail className="h-3.5 w-3.5" />, placeholder: "info@koleex.com" },
  { value: "phone", label: "Phone", icon: <Phone className="h-3.5 w-3.5" />, placeholder: "+1234567890" },
];

export function LinkPicker({ linkType, link, newTab, onChangeLinkType, onChangeLink, onChangeNewTab }: LinkPickerProps) {
  const [open, setOpen] = useState(false);
  const current = linkTypes.find((t) => t.value === linkType) || linkTypes[0];

  return (
    <div className="space-y-2">
      {/* Type selector */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full h-[34px] px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] text-white/60 flex items-center justify-between hover:border-white/[0.12] transition-colors"
        >
          <div className="flex items-center gap-2">
            {current.icon}
            <span>{current.label}</span>
          </div>
          <ChevronDown className={`h-3 w-3 text-white/25 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/[0.08] rounded-xl shadow-2xl z-50 py-1 max-h-[240px] overflow-y-auto">
            {linkTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => { onChangeLinkType(t.value); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] transition-colors ${linkType === t.value ? "bg-white/[0.06] text-white" : "text-white/50 hover:text-white hover:bg-white/[0.03]"}`}
              >
                <span className="text-white/30 w-4 flex justify-center">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* URL input (hidden for "none") */}
      {linkType !== "none" && (
        <>
          <input
            value={link}
            onChange={(e) => onChangeLink(e.target.value)}
            className="w-full h-[34px] px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] text-white outline-none focus:border-white/[0.15] placeholder:text-white/[0.15]"
            placeholder={current.placeholder}
          />

          {/* New tab toggle */}
          {["url", "page", "product", "file"].includes(linkType) && (
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => onChangeNewTab(!newTab)}
                className={`h-5 w-9 rounded-full transition-colors ${newTab ? "bg-blue-500" : "bg-white/[0.08]"} relative`}
              >
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${newTab ? "left-[18px]" : "left-0.5"}`} />
              </div>
              <span className="text-[11px] text-white/30 group-hover:text-white/50 transition-colors flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Open in new tab
              </span>
            </label>
          )}
        </>
      )}
    </div>
  );
}
