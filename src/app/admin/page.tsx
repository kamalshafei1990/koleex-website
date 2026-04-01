"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { getAllPages } from "@/lib/cms";
import { MediaSelector } from "@/components/cms/MediaSelector";
import { ButtonEditor } from "@/components/cms/ButtonEditor";
import { getSectionSettings, getButtonConfig, updateSectionSettings } from "@/lib/section-helpers";
import { blockLibrary, type BlockTemplate } from "@/data/block-library";
import {
  Plus, Trash2, Eye, EyeOff, Save, GripVertical, LogIn, Copy,
  ChevronDown, ChevronUp, Monitor, Tablet, Smartphone, Undo2,
  Layout, Type, Image as ImageIcon, Columns, BarChart3, PlayCircle,
  Quote, Clock, Grid3X3, Download, Star, MessageSquare, Layers,
  ArrowLeft, X, Check, ExternalLink, Maximize,
} from "lucide-react";
import type { PageRow, SectionRow, SectionLayout, SectionItem, ButtonConfig, SectionSettings } from "@/types/supabase";

/* ---------------------------------------------------------------------------
   Visual Page Builder — Three-panel editor.
   Left: Section list | Center: Live preview | Right: Section settings
   --------------------------------------------------------------------------- */

const ADMIN_PASSWORD = "koleex2024";

/* ── Section Library ── */
const sectionLibrary: { type: SectionLayout; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: "hero", label: "Hero", icon: <Layout className="h-4 w-4" />, desc: "Full-width hero with title & image" },
  { type: "image-left", label: "Image + Text", icon: <Columns className="h-4 w-4" />, desc: "Image left, text right" },
  { type: "image-right", label: "Text + Image", icon: <Columns className="h-4 w-4" />, desc: "Text left, image right" },
  { type: "cards", label: "Cards", icon: <Grid3X3 className="h-4 w-4" />, desc: "Card grid with icons" },
  { type: "grid", label: "Image Grid", icon: <Grid3X3 className="h-4 w-4" />, desc: "Photo card grid" },
  { type: "numbers", label: "Stats / Numbers", icon: <BarChart3 className="h-4 w-4" />, desc: "Statistics row" },
  { type: "cta", label: "Call to Action", icon: <MessageSquare className="h-4 w-4" />, desc: "CTA with buttons" },
  { type: "quote", label: "Quote", icon: <Quote className="h-4 w-4" />, desc: "Blockquote section" },
  { type: "full-image", label: "Full Image", icon: <ImageIcon className="h-4 w-4" />, desc: "Image with text overlay" },
  { type: "video", label: "Video", icon: <PlayCircle className="h-4 w-4" />, desc: "Embedded video section" },
  { type: "timeline", label: "Timeline", icon: <Clock className="h-4 w-4" />, desc: "Timeline milestones" },
  { type: "brands", label: "Logo Cloud", icon: <Star className="h-4 w-4" />, desc: "Partner/brand logos" },
  { type: "split", label: "Product Showcase", icon: <Layers className="h-4 w-4" />, desc: "Product feature split" },
  { type: "bg-hero", label: "Background Hero", icon: <Maximize className="h-4 w-4" />, desc: "Full image background with overlay" },
];

const bgOptions = [
  { value: "white", label: "White", color: "#ffffff" },
  { value: "light", label: "Light Gray", color: "#f5f5f7" },
  { value: "dark", label: "Dark", color: "#1d1d1f" },
  { value: "black", label: "Black", color: "#000000" },
];

const btnStyles = ["solid", "outline", "ghost"];
const btnShapes = ["pill", "rounded", "square"];
const btnSizes = ["small", "medium", "large"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pages, setPages] = useState<PageRow[]>([]);
  const [selectedPage, setSelectedPage] = useState<PageRow | null>(null);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "unsaved" | "saving">("saved");
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryCategory, setLibraryCategory] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [pageListOpen, setPageListOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"content" | "style" | "buttons">("content");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("koleex-admin") === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) getAllPages().then(setPages);
  }, [authed]);

  useEffect(() => {
    if (!selectedPage) return;
    supabase
      .from("sections")
      .select("*")
      .eq("page_id", selectedPage.id)
      .order("order", { ascending: true })
      .then(({ data }) => {
        const s = data || [];
        setSections(s);
        setSelectedSection(null);
      });
  }, [selectedPage]);

  // Send sections to preview iframe
  const updatePreview = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "preview-update",
      sections: sections.filter((s) => s.visible),
    }, "*");
  }, [sections]);

  useEffect(() => {
    updatePreview();
  }, [sections, updatePreview]);

  // Listen for messages from preview
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "preview-ready") updatePreview();
      if (e.data?.type === "select-section") {
        const s = sections.find((sec) => sec.id === e.data.sectionId);
        if (s) setSelectedSection(s);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sections, updatePreview]);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("koleex-admin", "true");
    } else alert("Wrong password");
  }

  function updateSection(id: string, field: string, value: unknown) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    if (selectedSection?.id === id) {
      setSelectedSection((prev) => prev ? { ...prev, [field]: value } : prev);
    }
    setSaveState("unsaved");
  }

  function updateSetting(sectionId: string, key: keyof SectionSettings, value: unknown) {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    const settings = getSectionSettings(section);
    const newSettings = { ...settings, [key]: value };
    const newItems = updateSectionSettings(section.items, newSettings);
    updateSection(sectionId, "items", newItems);
  }

  function updateButton(sectionId: string, which: "btn1" | "btn2", config: ButtonConfig) {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    const settings = getSectionSettings(section);
    const newSettings = { ...settings, [which]: config };
    const newItems = updateSectionSettings(section.items, newSettings);
    updateSection(sectionId, "items", newItems);
    // Also sync to legacy fields for backward compatibility
    if (which === "btn1") {
      updateSection(sectionId, "button_text", config.text || null);
      updateSection(sectionId, "button_link", config.link || null);
    } else {
      updateSection(sectionId, "button2_text", config.text || null);
      updateSection(sectionId, "button2_link", config.link || null);
    }
  }

  function moveSection(id: string, dir: "up" | "down") {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const ni = dir === "up" ? idx - 1 : idx + 1;
      if (ni < 0 || ni >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[ni]] = [copy[ni], copy[idx]];
      return copy.map((s, i) => ({ ...s, order: i + 1 }));
    });
    setSaveState("unsaved");
  }

  async function addFromTemplate(template: BlockTemplate) {
    if (!selectedPage) return;
    const newOrder = sections.length + 1;
    const d = template.defaults;
    const { data, error } = await supabase
      .from("sections")
      .insert({
        page_id: selectedPage.id,
        section_key: `${template.id}-${newOrder}`,
        layout: template.layout,
        title: d.title || template.label,
        subtitle: d.subtitle || null,
        content: d.content || null,
        image_url: d.image_url || null,
        button_text: d.button_text || null,
        button_link: d.button_link || null,
        button2_text: d.button2_text || null,
        button2_link: d.button2_link || null,
        background: d.background || "white",
        items: d.items || null,
        order: newOrder,
        visible: true,
      })
      .select()
      .single();
    if (data) {
      setSections((prev) => [...prev, data]);
      setSelectedSection(data);
    }
    if (error) alert("Error: " + error.message);
    setShowLibrary(false);
    setLibraryCategory(null);
  }

  // Keep old addSection for backward compat
  async function addSection(layout: SectionLayout) {
    const template = blockLibrary.flatMap(c => c.templates).find(t => t.layout === layout);
    if (template) return addFromTemplate(template);
    // Fallback
    if (!selectedPage) return;
    const { data } = await supabase.from("sections").insert({
      page_id: selectedPage.id, section_key: `${layout}-${sections.length + 1}`,
      layout, title: "New Section", background: "white", order: sections.length + 1, visible: true,
    }).select().single();
    if (data) { setSections(prev => [...prev, data]); setSelectedSection(data); }
    setShowLibrary(false);
  }

  async function duplicateSection(section: SectionRow) {
    const { id, created_at, updated_at, ...rest } = section;
    const { data } = await supabase
      .from("sections")
      .insert({ ...rest, section_key: `${rest.section_key}-copy`, order: sections.length + 1 })
      .select()
      .single();
    if (data) setSections((prev) => [...prev, data]);
  }

  async function deleteSection(id: string) {
    if (!confirm("Delete this section?")) return;
    await supabase.from("sections").delete().eq("id", id);
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSection?.id === id) setSelectedSection(null);
  }

  async function saveAll() {
    setSaving(true);
    setSaveState("saving");
    for (const s of sections) {
      await supabase.from("sections").update({
        title: s.title, subtitle: s.subtitle, content: s.content,
        image_url: s.image_url, image_alt: s.image_alt, video_url: s.video_url,
        button_text: s.button_text, button_link: s.button_link,
        button2_text: s.button2_text, button2_link: s.button2_link,
        layout: s.layout, background: s.background,
        order: s.order, visible: s.visible, items: s.items,
      }).eq("id", s.id);
    }
    setSaving(false);
    setSaveState("saved");
  }

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-[360px] bg-[#141414] border border-white/[0.06] rounded-2xl p-8">
          <h1 className="text-[24px] font-bold text-white mb-2">Koleex Builder</h1>
          <p className="text-[13px] text-white/30 mb-6">Visual Page Editor</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Password" className="w-full h-10 px-4 rounded-lg bg-white/[0.05] border border-white/[0.08] text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/20" />
          <button onClick={handleLogin} className="w-full h-10 mt-3 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" /> Sign In
          </button>
        </div>
      </div>
    );
  }

  const vpWidth = viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px";

  // ── Three-panel editor ──
  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      {/* ═══ TOP BAR ═══ */}
      <div className="h-[52px] shrink-0 border-b border-white/[0.06] px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-bold">Koleex Builder</span>
          {/* Page selector */}
          <div className="relative">
            <button onClick={() => setPageListOpen(!pageListOpen)} className="h-8 px-3 rounded-lg bg-white/[0.06] border border-white/[0.06] text-[12px] font-medium text-white/60 hover:text-white flex items-center gap-2 transition-colors">
              {selectedPage?.name || "Select page"} <ChevronDown className="h-3 w-3" />
            </button>
            {pageListOpen && (
              <div className="absolute top-full left-0 mt-1 w-[180px] bg-[#1a1a1a] border border-white/[0.08] rounded-xl shadow-2xl z-50 py-1">
                {pages.map((p) => (
                  <button key={p.id} onClick={() => { setSelectedPage(p); setPageListOpen(false); }} className={`w-full text-left px-3 py-2 text-[12px] transition-colors ${selectedPage?.id === p.id ? "bg-white/[0.08] text-white" : "text-white/50 hover:text-white hover:bg-white/[0.04]"}`}>
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: mode + viewport */}
        <div className="flex items-center gap-3">
          {/* Edit / Preview mode */}
          <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-0.5">
            <button onClick={() => setMode("edit")} className={`h-7 px-3 rounded-md text-[11px] font-medium transition-colors ${mode === "edit" ? "bg-white/[0.10] text-white" : "text-white/30 hover:text-white/60"}`}>
              Edit
            </button>
            <button onClick={() => setMode("preview")} className={`h-7 px-3 rounded-md text-[11px] font-medium transition-colors ${mode === "preview" ? "bg-white/[0.10] text-white" : "text-white/30 hover:text-white/60"}`}>
              Preview
            </button>
          </div>
          {/* Viewport */}
          <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-0.5">
            {([["desktop", <Monitor key="d" className="h-3.5 w-3.5" />], ["tablet", <Tablet key="t" className="h-3.5 w-3.5" />], ["mobile", <Smartphone key="m" className="h-3.5 w-3.5" />]] as const).map(([vp, icon]) => (
              <button key={vp} onClick={() => setViewport(vp as "desktop" | "tablet" | "mobile")} className={`h-7 w-7 flex items-center justify-center rounded-md transition-colors ${viewport === vp ? "bg-white/[0.10] text-white" : "text-white/30 hover:text-white/60"}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Right: save state + actions */}
        <div className="flex items-center gap-2">
          {/* Save state indicator */}
          <span className={`text-[11px] flex items-center gap-1 ${saveState === "saved" ? "text-green-400/70" : saveState === "saving" ? "text-yellow-400/70" : "text-orange-400/70"}`}>
            {saveState === "saved" && <><Check className="h-3 w-3" /> Saved</>}
            {saveState === "saving" && <><Save className="h-3 w-3 animate-pulse" /> Saving...</>}
            {saveState === "unsaved" && <><div className="h-1.5 w-1.5 rounded-full bg-orange-400" /> Unsaved</>}
          </span>
          <a href={`/${selectedPage?.slug || ""}`} target="_blank" className="h-8 px-3 rounded-lg text-[11px] font-medium text-white/40 hover:text-white/70 flex items-center gap-1.5 transition-colors">
            <ExternalLink className="h-3 w-3" /> View Page
          </a>
          <button onClick={saveAll} disabled={saving} className="h-8 px-4 rounded-lg bg-white text-black text-[11px] font-semibold flex items-center gap-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
            <Save className="h-3 w-3" /> {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      {/* ═══ THREE PANELS ═══ */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── LEFT: Sections List ── */}
        <div className={`w-[240px] shrink-0 border-r border-white/[0.06] flex flex-col transition-all duration-300 ${mode === "preview" ? "w-0 overflow-hidden border-none" : ""}`}>
          <div className="px-3 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/25">Sections</span>
            <button onClick={() => setShowLibrary(true)} className="h-6 w-6 flex items-center justify-center rounded-md bg-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.10] transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {sections.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => { setSelectedSection(s); iframeRef.current?.contentWindow?.postMessage({ type: "scroll-to-section", sectionId: s.id }, "*"); }}
                className={`mx-1 mb-0.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${selectedSection?.id === s.id ? "bg-white/[0.08]" : "hover:bg-white/[0.03]"}`}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="h-3 w-3 text-white/10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white/70 truncate">{s.title || "(untitled)"}</p>
                    <p className="text-[10px] text-white/20">{s.layout}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {!s.visible && <EyeOff className="h-3 w-3 text-red-400/40" />}
                    <button onClick={(e) => { e.stopPropagation(); moveSection(s.id, "up"); }} className="h-5 w-5 flex items-center justify-center text-white/15 hover:text-white/40" disabled={idx === 0}><ChevronUp className="h-3 w-3" /></button>
                    <button onClick={(e) => { e.stopPropagation(); moveSection(s.id, "down"); }} className="h-5 w-5 flex items-center justify-center text-white/15 hover:text-white/40" disabled={idx === sections.length - 1}><ChevronDown className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>
            ))}
            {sections.length === 0 && selectedPage && (
              <div className="px-4 py-8 text-center">
                <p className="text-[12px] text-white/20 mb-3">No sections</p>
                <button onClick={() => setShowLibrary(true)} className="text-[11px] text-white/40 hover:text-white/70 transition-colors">+ Add section</button>
              </div>
            )}
          </div>
        </div>

        {/* ── CENTER: Live Preview ── */}
        <div className="flex-1 bg-[#0e0e0e] flex items-start justify-center overflow-auto p-4">
          <div className="transition-all duration-300" style={{ width: vpWidth, maxWidth: "100%" }}>
            <iframe
              ref={iframeRef}
              src="/admin/preview"
              className="w-full bg-white rounded-lg shadow-2xl"
              style={{ height: "calc(100vh - 120px)", border: "1px solid rgba(255,255,255,0.06)" }}
            />
          </div>
        </div>

        {/* ── RIGHT: Section Settings ── */}
        <div className={`w-[320px] shrink-0 border-l border-white/[0.06] flex flex-col overflow-hidden transition-all duration-300 ${mode === "preview" ? "w-0 overflow-hidden border-none" : ""}`}>
          {!selectedSection ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[13px] text-white/20">Select a section to edit</p>
            </div>
          ) : (
            <>
              {/* Settings header */}
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                <div>
                  <p className="text-[13px] font-semibold text-white">{selectedSection.title || "Section"}</p>
                  <p className="text-[10px] text-white/25">{selectedSection.layout} · #{selectedSection.order}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateSection(selectedSection.id, "visible", !selectedSection.visible)} className={`h-7 w-7 flex items-center justify-center rounded-md transition-colors ${selectedSection.visible ? "text-white/30 hover:text-white/60" : "text-red-400/50"}`}>
                    {selectedSection.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => duplicateSection(selectedSection)} className="h-7 w-7 flex items-center justify-center rounded-md text-white/20 hover:text-white/50 transition-colors"><Copy className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteSection(selectedSection.id)} className="h-7 w-7 flex items-center justify-center rounded-md text-white/20 hover:text-red-400/60 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>

              {/* Settings tabs */}
              <div className="flex border-b border-white/[0.06] shrink-0">
                {(["content", "style", "buttons"] as const).map((tab) => (
                  <button key={tab} onClick={() => setSettingsTab(tab)} className={`flex-1 py-2.5 text-[11px] font-medium capitalize transition-colors border-b-2 ${settingsTab === tab ? "text-white border-white/40" : "text-white/30 border-transparent hover:text-white/50"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Scrollable settings */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-5">

                  {/* ═══ CONTENT TAB ═══ */}
                  {settingsTab === "content" && (
                    <>
                      <SettingsGroup title="Section Type">
                        <Field label="Layout">
                          <select value={selectedSection.layout} onChange={(e) => updateSection(selectedSection.id, "layout", e.target.value)} className="input-field">
                            {["hero","bg-hero","image-left","image-right","cards","grid","numbers","cta","quote","full-image","video","timeline","brands","split"].map((l) => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </Field>
                      </SettingsGroup>

                      <SettingsGroup title="Text">
                        <Field label="Title">
                          <input value={selectedSection.title || ""} onChange={(e) => updateSection(selectedSection.id, "title", e.target.value)} className="input-field" placeholder="Section title" />
                        </Field>
                        <Field label="Subtitle">
                          <input value={selectedSection.subtitle || ""} onChange={(e) => updateSection(selectedSection.id, "subtitle", e.target.value)} className="input-field" placeholder="Subtitle" />
                        </Field>
                        {["quote", "image-left", "image-right", "cta", "split"].includes(selectedSection.layout) && (
                          <Field label="Body Text">
                            <textarea value={selectedSection.content || ""} onChange={(e) => updateSection(selectedSection.id, "content", e.target.value)} rows={3} className="input-field resize-y" placeholder="Body text" />
                          </Field>
                        )}
                      </SettingsGroup>

                      {/* Image */}
                      {["hero", "image-left", "image-right", "full-image", "grid", "split"].includes(selectedSection.layout) && (
                        <SettingsGroup title="Image">
                          <MediaSelector
                            currentUrl={selectedSection.image_url}
                            onSelect={(url) => updateSection(selectedSection.id, "image_url", url || null)}
                          />
                          <Field label="Alt Text">
                            <input value={selectedSection.image_alt || ""} onChange={(e) => updateSection(selectedSection.id, "image_alt", e.target.value || null)} className="input-field" placeholder="Image description" />
                          </Field>
                        </SettingsGroup>
                      )}

                      {/* Video */}
                      {selectedSection.layout === "video" && (
                        <SettingsGroup title="Video">
                          <Field label="Embed URL">
                            <input value={selectedSection.video_url || ""} onChange={(e) => updateSection(selectedSection.id, "video_url", e.target.value)} className="input-field" placeholder="https://youtube.com/embed/..." />
                          </Field>
                        </SettingsGroup>
                      )}

                      {/* Cards / Items */}
                      {["cards", "grid", "numbers", "brands", "timeline"].includes(selectedSection.layout) && (
                        <SettingsGroup title="Items">
                          <ItemsEditor
                            items={selectedSection.items || []}
                            layout={selectedSection.layout}
                            onChange={(items) => updateSection(selectedSection.id, "items", items)}
                          />
                        </SettingsGroup>
                      )}

                      <SettingsGroup title="Advanced">
                        <Field label="Section Key">
                          <input value={selectedSection.section_key} onChange={(e) => updateSection(selectedSection.id, "section_key", e.target.value)} className="input-field text-white/40" />
                        </Field>
                      </SettingsGroup>
                    </>
                  )}

                  {/* ═══ STYLE TAB ═══ */}
                  {settingsTab === "style" && (
                    <>
                      <SettingsGroup title="Background">
                        <Field label="Color">
                          <div className="flex gap-2">
                            {bgOptions.map((bg) => (
                              <button key={bg.value} onClick={() => updateSection(selectedSection.id, "background", bg.value)}
                                className={`h-8 w-8 rounded-lg border-2 transition-all ${selectedSection.background === bg.value ? "border-blue-500 scale-110" : "border-white/10 hover:border-white/20"}`}
                                style={{ backgroundColor: bg.color }}
                                title={bg.label}
                              />
                            ))}
                          </div>
                        </Field>
                        {selectedSection.background === "image" && (
                          <Field label="Background Image">
                            <MediaSelector
                              currentUrl={selectedSection.image_url}
                              onSelect={(url) => updateSection(selectedSection.id, "image_url", url || null)}
                            />
                          </Field>
                        )}
                      </SettingsGroup>

                      <SettingsGroup title="Text">
                        <Field label="Alignment">
                          <div className="flex gap-1">
                            {(["left", "center", "right"] as const).map((a) => (
                              <button key={a} onClick={() => updateSetting(selectedSection.id, "textAlign", a)} className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all capitalize ${getSectionSettings(selectedSection).textAlign === a ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"}`}>
                                {a}
                              </button>
                            ))}
                          </div>
                        </Field>
                      </SettingsGroup>

                      {/* bg-hero specific controls */}
                      {selectedSection.layout === "bg-hero" && (
                        <>
                          <SettingsGroup title="Overlay">
                            <Field label={`Opacity: ${getSectionSettings(selectedSection).overlayOpacity || 60}%`}>
                              <input
                                type="range"
                                min={0} max={100} step={5}
                                value={getSectionSettings(selectedSection).overlayOpacity || 60}
                                onChange={(e) => updateSetting(selectedSection.id, "overlayOpacity", parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                              />
                            </Field>
                            <Field label="Text Mode">
                              <div className="flex gap-1">
                                {(["light", "dark"] as const).map((m) => (
                                  <button key={m} onClick={() => updateSetting(selectedSection.id, "textMode", m)} className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all capitalize ${getSectionSettings(selectedSection).textMode === m ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"}`}>
                                    {m === "light" ? "White Text" : "Dark Text"}
                                  </button>
                                ))}
                              </div>
                            </Field>
                          </SettingsGroup>

                          <SettingsGroup title="Layout">
                            <Field label="Content Width">
                              <div className="flex gap-1">
                                {(["narrow", "medium", "wide", "full"] as const).map((w) => (
                                  <button key={w} onClick={() => updateSetting(selectedSection.id, "contentWidth", w)} className={`flex-1 h-7 rounded-lg text-[10px] font-medium transition-all capitalize ${getSectionSettings(selectedSection).contentWidth === w ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"}`}>
                                    {w}
                                  </button>
                                ))}
                              </div>
                            </Field>
                            <Field label="Vertical Alignment">
                              <div className="flex gap-1">
                                {(["top", "center", "bottom"] as const).map((v) => (
                                  <button key={v} onClick={() => updateSetting(selectedSection.id, "verticalAlign", v)} className={`flex-1 h-8 rounded-lg text-[11px] font-medium transition-all capitalize ${getSectionSettings(selectedSection).verticalAlign === v ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/35 hover:text-white/60"}`}>
                                    {v}
                                  </button>
                                ))}
                              </div>
                            </Field>
                          </SettingsGroup>
                        </>
                      )}

                      <SettingsGroup title="Visibility">
                        <Field label="Show on page">
                          <button
                            onClick={() => updateSection(selectedSection.id, "visible", !selectedSection.visible)}
                            className={`h-8 px-3 rounded-lg text-[11px] font-medium flex items-center gap-2 transition-all ${selectedSection.visible ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
                          >
                            {selectedSection.visible ? <><Eye className="h-3 w-3" /> Visible</> : <><EyeOff className="h-3 w-3" /> Hidden</>}
                          </button>
                        </Field>
                      </SettingsGroup>
                    </>
                  )}

                  {/* ═══ BUTTONS TAB ═══ */}
                  {settingsTab === "buttons" && (
                    <>
                      <ButtonEditor
                        label="Primary Button"
                        config={getButtonConfig(selectedSection, "btn1")}
                        dark={selectedSection.background === "dark" || selectedSection.background === "black"}
                        onChange={(config) => updateButton(selectedSection.id, "btn1", config)}
                      />
                      <div className="h-px bg-white/[0.04] my-2" />
                      <ButtonEditor
                        label="Secondary Button"
                        config={getButtonConfig(selectedSection, "btn2")}
                        dark={selectedSection.background === "dark" || selectedSection.background === "black"}
                        onChange={(config) => updateButton(selectedSection.id, "btn2", config)}
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══ BLOCK LIBRARY MODAL ═══ */}
      {showLibrary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowLibrary(false); setLibraryCategory(null); }} />
          <div className="relative z-10 w-full max-w-[720px] max-h-[80vh] bg-[#141414] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                {libraryCategory && (
                  <button onClick={() => setLibraryCategory(null)} className="h-7 w-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06]">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <h3 className="text-[15px] font-semibold text-white">
                  {libraryCategory
                    ? blockLibrary.find(c => c.id === libraryCategory)?.label || "Templates"
                    : "Add Block"}
                </h3>
              </div>
              <button onClick={() => { setShowLibrary(false); setLibraryCategory(null); }} className="h-7 w-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06]">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {!libraryCategory ? (
                /* ── Category grid ── */
                <div className="grid grid-cols-3 gap-2">
                  {blockLibrary.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setLibraryCategory(cat.id)}
                      className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.10] transition-all"
                    >
                      <span className="text-[24px]">{cat.icon}</span>
                      <span className="text-[12px] font-medium text-white/70">{cat.label}</span>
                      <span className="text-[10px] text-white/20">{cat.templates.length} templates</span>
                    </button>
                  ))}
                </div>
              ) : (
                /* ── Templates grid for selected category ── */
                <div className="grid grid-cols-2 gap-3">
                  {blockLibrary.find(c => c.id === libraryCategory)?.templates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => addFromTemplate(tmpl)}
                      className="flex flex-col items-center p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all text-center group"
                    >
                      <div className="h-16 w-full rounded-lg bg-white/[0.04] flex items-center justify-center text-[32px] mb-3 group-hover:bg-white/[0.08] transition-colors">
                        {tmpl.preview}
                      </div>
                      <p className="text-[13px] font-medium text-white">{tmpl.label}</p>
                      <p className="text-[10px] text-white/20 mt-0.5">{tmpl.layout}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input-field {
          width: 100%;
          height: 34px;
          padding: 0 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          color: white;
          font-size: 12px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: rgba(255,255,255,0.15); }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
        textarea.input-field { height: auto; padding: 8px 10px; }
      `}</style>
    </div>
  );
}

/* ── Helper Components ── */

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-3">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] text-white/30 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function ItemsEditor({ items, layout, onChange }: { items: SectionItem[]; layout: string; onChange: (items: SectionItem[]) => void }) {
  function addItem() {
    onChange([...items, { title: "New item", description: "" }]);
  }
  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function updateItem(idx: number, field: string, value: string) {
    onChange(items.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/20">Item {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-white/15 hover:text-red-400/60 transition-colors"><Trash2 className="h-3 w-3" /></button>
          </div>
          <input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} className="input-field" placeholder="Title" />
          {layout !== "numbers" && (
            <input value={item.description || ""} onChange={(e) => updateItem(i, "description", e.target.value)} className="input-field" placeholder="Description" />
          )}
          {layout === "numbers" && (
            <div className="grid grid-cols-2 gap-2">
              <input value={item.value || ""} onChange={(e) => updateItem(i, "value", e.target.value)} className="input-field" placeholder="Value (e.g. 80+)" />
              <input value={item.label || ""} onChange={(e) => updateItem(i, "label", e.target.value)} className="input-field" placeholder="Label" />
            </div>
          )}
          {(layout === "cards" || layout === "brands") && (
            <input value={item.icon || ""} onChange={(e) => updateItem(i, "icon", e.target.value)} className="input-field" placeholder="Icon (emoji or text)" />
          )}
        </div>
      ))}
      <button onClick={addItem} className="w-full h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors flex items-center justify-center gap-1">
        <Plus className="h-3 w-3" /> Add Item
      </button>
    </div>
  );
}
