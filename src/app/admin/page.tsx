"use client";

import { useState, useEffect } from "react";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { getAllPages } from "@/lib/cms";
import { MediaSelector } from "@/components/cms/MediaSelector";
import { ChevronDown, ChevronUp, Plus, Trash2, Eye, EyeOff, Save, GripVertical, LogIn } from "lucide-react";
import type { PageRow, SectionRow, SectionLayout } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Admin CMS Editor — Simple password-protected content editor.
   - Lists all pages
   - Edit sections: title, subtitle, content, image, buttons, layout, order
   - Toggle visibility
   - Add/delete sections
   - Reorder with up/down arrows
   - Save to Supabase
   --------------------------------------------------------------------------- */

const ADMIN_PASSWORD = "koleex2024";

const layoutOptions: SectionLayout[] = [
  "hero", "image-left", "image-right", "cards", "grid",
  "numbers", "video", "cta", "quote", "full-image", "split", "brands", "timeline",
];

const bgOptions = ["white", "light", "dark", "black", "image"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pages, setPages] = useState<PageRow[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageRow | null>(null);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Check session
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("koleex-admin") === "true") setAuthed(true);
    }
  }, []);

  // Load pages
  useEffect(() => {
    if (authed) getAllPages().then(setPages);
  }, [authed]);

  // Load sections when page selected
  useEffect(() => {
    if (!selectedPage) return;
    supabase
      .from("sections")
      .select("*")
      .eq("page_id", selectedPage.id)
      .order("order", { ascending: true })
      .then(({ data }) => setSections(data || []));
  }, [selectedPage]);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("koleex-admin", "true");
    } else {
      alert("Wrong password");
    }
  }

  function updateSection(id: string, field: string, value: unknown) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
    setSaved(false);
  }

  function moveSection(id: string, direction: "up" | "down") {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy.map((s, i) => ({ ...s, order: i + 1 }));
    });
    setSaved(false);
  }

  async function addSection() {
    if (!selectedPage) return;
    const newOrder = sections.length + 1;
    const { data, error } = await supabase
      .from("sections")
      .insert({
        page_id: selectedPage.id,
        section_key: `section-${newOrder}`,
        layout: "hero",
        title: "New Section",
        subtitle: null,
        content: null,
        image_url: null,
        button_text: null,
        button_link: null,
        background: "white",
        order: newOrder,
        visible: true,
      })
      .select()
      .single();

    if (data) {
      setSections((prev) => [...prev, data]);
      setExpandedId(data.id);
    }
    if (error) alert("Error: " + error.message);
  }

  async function deleteSection(id: string) {
    if (!confirm("Delete this section?")) return;
    await supabase.from("sections").delete().eq("id", id);
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  async function saveAll() {
    setSaving(true);
    for (const section of sections) {
      await supabase
        .from("sections")
        .update({
          title: section.title,
          subtitle: section.subtitle,
          content: section.content,
          image_url: section.image_url,
          image_alt: section.image_alt,
          video_url: section.video_url,
          button_text: section.button_text,
          button_link: section.button_link,
          button2_text: section.button2_text,
          button2_link: section.button2_link,
          layout: section.layout,
          background: section.background,
          order: section.order,
          visible: section.visible,
          items: section.items,
        })
        .eq("id", section.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-[360px] bg-[#141414] border border-white/[0.06] rounded-2xl p-8">
          <h1 className="text-[24px] font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-[13px] text-white/30 mb-6">Enter password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full h-10 px-4 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
          />
          <button
            onClick={handleLogin}
            className="w-full h-10 mt-3 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold">Koleex CMS</h1>
          <p className="text-[12px] text-white/30">Content Management System</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-[12px] text-green-400">✓ Saved</span>}
          <button
            onClick={saveAll}
            disabled={saving}
            className="h-9 px-4 rounded-lg bg-white text-black text-[12px] font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* ── Sidebar: pages list ── */}
        <div className="w-[220px] shrink-0 border-r border-white/[0.06] min-h-[calc(100vh-65px)]">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/25">Pages</p>
          </div>
          <div className="py-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                  selectedPage?.id === page.id
                    ? "bg-white/[0.08] text-white font-medium"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main: section editor ── */}
        <div className="flex-1 p-6">
          {!selectedPage ? (
            <div className="flex items-center justify-center h-[60vh]">
              <p className="text-[15px] text-white/20">Select a page to edit</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[20px] font-bold">{selectedPage.name}</h2>
                  <p className="text-[12px] text-white/30">/{selectedPage.slug} · {sections.length} sections</p>
                </div>
                <button
                  onClick={addSection}
                  className="h-8 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white/60 hover:text-white hover:bg-white/[0.10] transition-all flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Section
                </button>
              </div>

              {/* Section list */}
              <div className="space-y-2">
                {sections.map((section, idx) => {
                  const expanded = expandedId === section.id;
                  return (
                    <div key={section.id} className="bg-[#141414] border border-white/[0.06] rounded-xl overflow-hidden">
                      {/* Header */}
                      <div
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedId(expanded ? null : section.id)}
                      >
                        <GripVertical className="h-4 w-4 text-white/15 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-white truncate">{section.title || "(no title)"}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-white/30">{section.layout}</span>
                            <span className="text-[10px] text-white/20">#{section.order}</span>
                          </div>
                          <p className="text-[11px] text-white/20 truncate">{section.section_key}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); updateSection(section.id, "visible", !section.visible); }} className="h-7 w-7 flex items-center justify-center rounded text-white/25 hover:text-white/60 transition-colors">
                            {section.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-red-400/50" />}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, "up"); }} disabled={idx === 0} className="h-7 w-7 flex items-center justify-center rounded text-white/25 hover:text-white/60 transition-colors disabled:opacity-20">
                            <ChevronUp className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, "down"); }} disabled={idx === sections.length - 1} className="h-7 w-7 flex items-center justify-center rounded text-white/25 hover:text-white/60 transition-colors disabled:opacity-20">
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="h-7 w-7 flex items-center justify-center rounded text-white/25 hover:text-red-400/60 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expanded editor */}
                      {expanded && (
                        <div className="px-4 pb-5 pt-2 border-t border-white/[0.04] space-y-4">
                          {/* Row 1: Layout + Background */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Layout</label>
                              <select
                                value={section.layout}
                                onChange={(e) => updateSection(section.id, "layout", e.target.value)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white outline-none"
                              >
                                {layoutOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Background</label>
                              <select
                                value={section.background || "white"}
                                onChange={(e) => updateSection(section.id, "background", e.target.value)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white outline-none"
                              >
                                {bgOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                              </select>
                            </div>
                          </div>

                          {/* Row 2: Title */}
                          <div>
                            <label className="text-[11px] text-white/30 mb-1 block">Title</label>
                            <input
                              value={section.title || ""}
                              onChange={(e) => updateSection(section.id, "title", e.target.value)}
                              className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none focus:border-white/20"
                              placeholder="Section title"
                            />
                          </div>

                          {/* Row 3: Subtitle */}
                          <div>
                            <label className="text-[11px] text-white/30 mb-1 block">Subtitle</label>
                            <input
                              value={section.subtitle || ""}
                              onChange={(e) => updateSection(section.id, "subtitle", e.target.value)}
                              className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none focus:border-white/20"
                              placeholder="Section subtitle"
                            />
                          </div>

                          {/* Row 4: Content */}
                          <div>
                            <label className="text-[11px] text-white/30 mb-1 block">Content</label>
                            <textarea
                              value={section.content || ""}
                              onChange={(e) => updateSection(section.id, "content", e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none focus:border-white/20 resize-y"
                              placeholder="Section content (optional)"
                            />
                          </div>

                          {/* Row 5: Image */}
                          <div>
                            <label className="text-[11px] text-white/30 mb-1 block">Image</label>
                            <MediaSelector
                              currentUrl={section.image_url}
                              onSelect={(url) => updateSection(section.id, "image_url", url || null)}
                            />
                          </div>

                          {/* Row 6: Buttons */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Button 1 Text</label>
                              <input
                                value={section.button_text || ""}
                                onChange={(e) => updateSection(section.id, "button_text", e.target.value || null)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none"
                                placeholder="Learn more"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Button 1 Link</label>
                              <input
                                value={section.button_link || ""}
                                onChange={(e) => updateSection(section.id, "button_link", e.target.value || null)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none"
                                placeholder="/products"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Button 2 Text</label>
                              <input
                                value={section.button2_text || ""}
                                onChange={(e) => updateSection(section.id, "button2_text", e.target.value || null)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none"
                                placeholder="Contact sales"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Button 2 Link</label>
                              <input
                                value={section.button2_link || ""}
                                onChange={(e) => updateSection(section.id, "button2_link", e.target.value || null)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white placeholder:text-white/20 outline-none"
                                placeholder="/contact"
                              />
                            </div>
                          </div>

                          {/* Row 7: Section key + order */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Section Key</label>
                              <input
                                value={section.section_key}
                                onChange={(e) => updateSection(section.id, "section_key", e.target.value)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white/50 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-white/30 mb-1 block">Order</label>
                              <input
                                type="number"
                                value={section.order}
                                onChange={(e) => updateSection(section.id, "order", parseInt(e.target.value) || 0)}
                                className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[13px] text-white outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {sections.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-[15px] text-white/20 mb-4">No sections yet.</p>
                  <button onClick={addSection} className="h-9 px-4 rounded-lg bg-white/[0.06] text-[13px] text-white/60 hover:text-white transition-colors">
                    + Add first section
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
