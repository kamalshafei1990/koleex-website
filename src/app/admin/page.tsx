"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";
import { getAllPages } from "@/lib/cms";
import { MediaSelector } from "@/components/cms/MediaSelector";
import { ButtonEditor } from "@/components/cms/ButtonEditor";
import { getSectionSettings, getButtonConfig, updateSectionSettings } from "@/lib/section-helpers";
import { blockLibrary, type BlockTemplate } from "@/data/block-library";
import { createElement, getElementsBySectionId, updateElement, deleteElement } from "@/lib/elements";
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
  const [settingsTab, setSettingsTab] = useState<"content" | "style" | "buttons" | "elements">("content");
  const [sectionElements, setSectionElements] = useState<Record<string, import("@/types/supabase").ElementRow[]>>({});
  const [showElementPicker, setShowElementPicker] = useState<string | null>(null);
  const [expandedElement, setExpandedElement] = useState<string | null>(null);
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

  // Send sections + elements to preview iframe
  const updatePreview = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: "preview-update",
      sections: sections.filter((s) => s.visible),
      elements: sectionElements,
    }, "*");
  }, [sections, sectionElements]);

  useEffect(() => {
    updatePreview();
  }, [sections, sectionElements, updatePreview]);

  // Listen for messages from preview
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "preview-ready") updatePreview();
      if (e.data?.type === "select-section") {
        const s = sections.find((sec) => sec.id === e.data.sectionId);
        if (s) { setSelectedSection(s); setSettingsTab("content"); loadElements(s.id); }
      }
      // Inline editing from preview
      if (e.data?.type === "inline-edit") {
        const { sectionId, field, value } = e.data;
        updateSection(sectionId, field, value);
      }
      // Floating toolbar actions from preview
      if (e.data?.type === "toolbar-action") {
        const { sectionId, action } = e.data;
        if (action === "moveUp") moveSection(sectionId, "up");
        if (action === "moveDown") moveSection(sectionId, "down");
        if (action === "duplicate") {
          const s = sections.find(sec => sec.id === sectionId);
          if (s) duplicateSection(s);
        }
        if (action === "toggle") {
          const s = sections.find(sec => sec.id === sectionId);
          if (s) updateSection(sectionId, "visible", !s.visible);
        }
        if (action === "delete") deleteSection(sectionId);
      }
      // Element actions from preview canvas
      if (e.data?.type === "select-element") {
        const { sectionId, elementId } = e.data;
        const s = sections.find(sec => sec.id === sectionId);
        if (s) { setSelectedSection(s); setSettingsTab("elements"); setExpandedElement(elementId); loadElements(sectionId); }
      }
      if (e.data?.type === "element-action") {
        const { sectionId, elementId, action } = e.data;
        if (action === "duplicate") {
          const el = (sectionElements[sectionId] || []).find(e => e.id === elementId);
          if (el) addElement(sectionId, el.type as import("@/types/supabase").ElementType);
        }
        if (action === "delete") removeElement(sectionId, elementId);
      }
      if (e.data?.type === "element-update") {
        const { sectionId, elementId, updates } = e.data;
        if (updates.settings) {
          updateElement(elementId, { settings: updates.settings });
          setSectionElements(prev => ({
            ...prev,
            [sectionId]: (prev[sectionId] || []).map(el => el.id === elementId ? { ...el, ...updates } : el),
          }));
          setSaveState("unsaved");
        }
      }
      if (e.data?.type === "add-element-request") {
        const { sectionId } = e.data;
        const s = sections.find(sec => sec.id === sectionId);
        if (s) { setSelectedSection(s); setSettingsTab("elements"); setShowElementPicker(sectionId); loadElements(sectionId); }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sections, sectionElements, updatePreview]);

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("koleex-admin", "true");
    } else alert("Wrong password");
  }

  function updateSection(id: string, field: string, value: unknown) {
    setSections((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, [field]: value } : s));
      // Force preview update immediately
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({
          type: "preview-update",
          sections: updated.filter(s => s.visible),
          elements: sectionElements,
        }, "*");
      }, 50);
      return updated;
    });
    if (selectedSection?.id === id) {
      setSelectedSection((prev) => prev ? { ...prev, [field]: value } : prev);
    }
    setSaveState("unsaved");
  }

  // Load elements when section is selected
  async function loadElements(sectionId: string) {
    if (sectionElements[sectionId]) return; // already loaded
    const els = await getElementsBySectionId(sectionId);
    setSectionElements(prev => ({ ...prev, [sectionId]: els }));
  }

  async function addElement(sectionId: string, type: import("@/types/supabase").ElementType) {
    const existing = sectionElements[sectionId] || [];
    const el = await createElement(sectionId, type, undefined, existing.length + 1);
    if (el) {
      setSectionElements(prev => ({ ...prev, [sectionId]: [...(prev[sectionId] || []), el] }));
    }
    setShowElementPicker(null);
  }

  async function removeElement(sectionId: string, elementId: string) {
    if (!confirm("Delete this element?")) return;
    await deleteElement(elementId);
    setSectionElements(prev => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter(e => e.id !== elementId),
    }));
  }

  async function editElement(sectionId: string, elementId: string, content: Record<string, unknown>) {
    await updateElement(elementId, { content });
    setSectionElements(prev => {
      const updated = {
        ...prev,
        [sectionId]: (prev[sectionId] || []).map(e => e.id === elementId ? { ...e, content } : e),
      };
      // Force preview update
      setTimeout(() => iframeRef.current?.contentWindow?.postMessage({ type: "preview-update", sections: sections.filter(s => s.visible), elements: updated }, "*"), 50);
      return updated;
    });
    setSaveState("unsaved");
  }

  function updateSetting(sectionId: string, key: keyof SectionSettings, value: unknown) {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;
    const currentSettings = getSectionSettings(section);
    const newSettings = { ...currentSettings, [key]: value };
    const newItems = updateSectionSettings(section.items, newSettings);

    // Update sections state with new items
    setSections(prev => {
      const updated = prev.map(s => s.id === sectionId ? { ...s, items: newItems } : s);
      // Force immediate preview update
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({
          type: "preview-update",
          sections: updated.filter(s => s.visible),
          elements: sectionElements,
        }, "*");
      }, 50);
      return updated;
    });

    // Update selected section if it's the one being changed
    if (selectedSection?.id === sectionId) {
      setSelectedSection(prev => prev ? { ...prev, items: newItems } : prev);
    }

    setSaveState("unsaved");
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

        {/* ── LEFT: Sections List (hidden in preview mode) ── */}
        {mode === "edit" && (
        <div className="w-[240px] shrink-0 border-r border-white/[0.06] flex flex-col">
          <div className="px-3 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/25">Sections</span>
            <button onClick={() => setShowLibrary(true)} className="h-6 w-6 flex items-center justify-center rounded-md bg-white/[0.06] text-white/40 hover:text-white hover:bg-white/[0.10] transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            {sections.map((s, idx) => (
              <div key={s.id}>
                <div
                  onClick={() => { setSelectedSection(s); setSettingsTab("content"); loadElements(s.id); iframeRef.current?.contentWindow?.postMessage({ type: "scroll-to-section", sectionId: s.id }, "*"); }}
                  className={`mx-1 mb-0.5 px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedSection?.id === s.id ? "bg-white/[0.08] border border-blue-500/20" : "hover:bg-white/[0.03] border border-transparent"}`}
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
                  {/* Section toolbar — shown when selected */}
                  {selectedSection?.id === s.id && (
                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/[0.04]">
                      <button onClick={(e) => { e.stopPropagation(); duplicateSection(s); }} className="h-6 px-2 rounded text-[9px] text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-colors flex items-center gap-1"><Copy className="h-2.5 w-2.5" />Duplicate</button>
                      <button onClick={(e) => { e.stopPropagation(); updateSection(s.id, "visible", !s.visible); }} className="h-6 px-2 rounded text-[9px] text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-colors flex items-center gap-1">
                        {s.visible ? <><Eye className="h-2.5 w-2.5" />Hide</> : <><EyeOff className="h-2.5 w-2.5" />Show</>}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteSection(s.id); }} className="h-6 px-2 rounded text-[9px] text-red-400/30 hover:text-red-400/60 hover:bg-red-500/5 transition-colors flex items-center gap-1"><Trash2 className="h-2.5 w-2.5" />Delete</button>
                    </div>
                  )}
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
        )}

        {/* ── CENTER: Live Preview ── */}
        <div className={`flex-1 ${mode === "preview" ? "bg-[#1a1a1a]" : "bg-[#0e0e0e]"} flex items-start justify-center overflow-auto ${mode === "preview" ? "p-0" : "p-4"}`}>
          <div className="transition-all duration-300" style={{ width: mode === "preview" ? "100%" : vpWidth, maxWidth: "100%" }}>
            <iframe
              ref={iframeRef}
              src="/admin/preview"
              className={`w-full bg-white ${mode === "preview" ? "rounded-none shadow-none" : "rounded-lg shadow-2xl"}`}
              style={{ height: mode === "preview" ? "calc(100vh - 52px)" : "calc(100vh - 120px)", border: mode === "preview" ? "none" : "1px solid rgba(255,255,255,0.06)" }}
            />
          </div>
        </div>

        {/* ── RIGHT: Section Settings (hidden in preview mode) ── */}
        {mode === "edit" && (
        <div className="w-[320px] shrink-0 border-l border-white/[0.06] flex flex-col overflow-hidden">)
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
                {(["content", "style", "buttons", "elements"] as const).map((tab) => (
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
                          <Field label="Video Source">
                            <div className="space-y-3">
                              {/* Upload video */}
                              <div>
                                <label className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.10] transition-all cursor-pointer">
                                  <PlayCircle className="h-3.5 w-3.5" />
                                  Upload Video
                                  <input
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const { uploadMedia } = await import("@/lib/media");
                                      const result = await uploadMedia(file);
                                      if (result) updateSection(selectedSection.id, "video_url", result.url);
                                      else alert("Upload failed");
                                    }}
                                  />
                                </label>
                              </div>
                              {/* Or paste URL */}
                              <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-white/[0.06]" />
                                <span className="text-[10px] text-white/15">or paste URL</span>
                                <div className="h-px flex-1 bg-white/[0.06]" />
                              </div>
                              <input value={selectedSection.video_url || ""} onChange={(e) => updateSection(selectedSection.id, "video_url", e.target.value)} className="input-field" placeholder="https://youtube.com/embed/..." />
                              {/* Current video preview */}
                              {selectedSection.video_url && (
                                <div className="mt-2">
                                  <p className="text-[10px] text-white/20 mb-1 truncate">{selectedSection.video_url}</p>
                                  <button onClick={() => updateSection(selectedSection.id, "video_url", null)} className="text-[11px] text-red-400/50 hover:text-red-400 transition-colors">Remove video</button>
                                </div>
                              )}
                            </div>
                          </Field>
                          <Field label="Poster Image (thumbnail)">
                            <MediaSelector
                              currentUrl={selectedSection.image_url}
                              onSelect={(url) => updateSection(selectedSection.id, "image_url", url || null)}
                            />
                          </Field>
                          <Field label="Playback">
                            <div className="space-y-2">
                              {[
                                { key: "autoplay", label: "Autoplay" },
                                { key: "loop", label: "Loop" },
                                { key: "muted", label: "Muted" },
                              ].map((opt) => {
                                const settings = getSectionSettings(selectedSection);
                                const val = (settings as Record<string, unknown>)[opt.key] as boolean | undefined;
                                return (
                                  <label key={opt.key} className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-[11px] text-white/30 group-hover:text-white/50">{opt.label}</span>
                                    <div
                                      onClick={() => updateSetting(selectedSection.id, opt.key as keyof SectionSettings, !val)}
                                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${val ? "bg-blue-500" : "bg-white/[0.08]"}`}
                                    >
                                      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${val ? "left-[18px]" : "left-0.5"}`} />
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
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
                      {/* Element Layout — controls how child elements arrange inside this section */}
                      <SettingsGroup title="Element Layout">
                        <Field label="Arrange elements in columns">
                          <div className="grid grid-cols-4 gap-1.5">
                            {([
                              { value: "1-col", label: "1 Col", preview: <div className="h-5 bg-blue-400/30 rounded" /> },
                              { value: "2-col", label: "2 Col", preview: <div className="flex gap-0.5 h-5"><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /></div> },
                              { value: "3-col", label: "3 Col", preview: <div className="flex gap-0.5 h-5"><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /></div> },
                              { value: "4-col", label: "4 Col", preview: <div className="flex gap-0.5 h-5"><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /><div className="flex-1 bg-blue-400/30 rounded" /></div> },
                              { value: "70-30", label: "70/30", preview: <div className="flex gap-0.5 h-5"><div className="w-[70%] bg-blue-400/30 rounded" /><div className="w-[30%] bg-blue-400/20 rounded" /></div> },
                              { value: "30-70", label: "30/70", preview: <div className="flex gap-0.5 h-5"><div className="w-[30%] bg-blue-400/20 rounded" /><div className="w-[70%] bg-blue-400/30 rounded" /></div> },
                              { value: "60-40", label: "60/40", preview: <div className="flex gap-0.5 h-5"><div className="w-[60%] bg-blue-400/30 rounded" /><div className="w-[40%] bg-blue-400/20 rounded" /></div> },
                              { value: "40-60", label: "40/60", preview: <div className="flex gap-0.5 h-5"><div className="w-[40%] bg-blue-400/20 rounded" /><div className="w-[60%] bg-blue-400/30 rounded" /></div> },
                            ] as { value: string; label: string; preview: React.ReactNode }[]).map((l) => (
                              <button key={l.value} onClick={() => updateSetting(selectedSection.id, "zoneLayout", l.value)}
                                className={`p-1.5 rounded-lg border transition-all ${(getSectionSettings(selectedSection).zoneLayout || "1-col") === l.value ? "border-blue-500/40 bg-blue-500/10" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}>
                                {l.preview}
                                <p className="text-[7px] text-white/20 mt-0.5 text-center">{l.label}</p>
                              </button>
                            ))}
                          </div>
                        </Field>
                        <p className="text-[9px] text-white/15 leading-relaxed">
                          This controls how elements added in the Elements tab are arranged. It does not change the section&apos;s own layout type.
                        </p>
                      </SettingsGroup>

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

                  {/* ═══ ELEMENTS TAB ═══ */}
                  {settingsTab === "elements" && (
                    <>
                      <SettingsGroup title="Elements in this section">
                        {(sectionElements[selectedSection.id] || []).length === 0 ? (
                          <p className="text-[12px] text-white/20 py-4 text-center">No elements yet</p>
                        ) : (
                          <div className="space-y-2">
                            {(sectionElements[selectedSection.id] || []).map((el) => {
                              const isExpanded = expandedElement === el.id;
                              const elContent = (el.content || {}) as Record<string, unknown>;
                              const preview = (elContent.text as string) || (elContent.title as string) || (elContent.question as string) || (elContent.quote as string) || (elContent.name as string) || (elContent.label as string) || (elContent.value as string) || "";
                              return (
                                <div key={el.id} className={`rounded-xl border overflow-hidden transition-colors ${isExpanded ? "bg-white/[0.05] border-blue-500/20" : "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.08]"}`}>
                                  {/* Header — click to expand */}
                                  <div
                                    className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
                                    onClick={() => setExpandedElement(isExpanded ? null : el.id)}
                                  >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/30 font-semibold uppercase shrink-0">{el.type}</span>
                                      <span className="text-[11px] text-white/40 truncate">{preview || "(empty)"}</span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0 ml-2">
                                      {/* Theme toggle */}
                                      <div className="flex items-center gap-0.5 bg-white/[0.04] rounded p-px" onClick={(e) => e.stopPropagation()}>
                                        <button
                                          onClick={async () => {
                                            const newStyle = { ...(el.style || {}), theme: "light" };
                                            await updateElement(el.id, { style: newStyle });
                                            setSectionElements(prev => {
                                              const updated = { ...prev, [selectedSection.id]: (prev[selectedSection.id] || []).map(e => e.id === el.id ? { ...e, style: newStyle } : e) };
                                              // Force preview update with new elements
                                              setTimeout(() => iframeRef.current?.contentWindow?.postMessage({ type: "preview-update", sections: sections.filter(s => s.visible), elements: updated }, "*"), 50);
                                              return updated;
                                            });
                                            setSaveState("unsaved");
                                          }}
                                          className={`h-4 w-4 rounded flex items-center justify-center text-[7px] ${((el.style as Record<string,unknown>)?.theme || "light") === "light" ? "bg-white text-black" : "text-white/25"}`}
                                        >☀</button>
                                        <button
                                          onClick={async () => {
                                            const newStyle = { ...(el.style || {}), theme: "dark" };
                                            await updateElement(el.id, { style: newStyle });
                                            setSectionElements(prev => {
                                              const updated = { ...prev, [selectedSection.id]: (prev[selectedSection.id] || []).map(e => e.id === el.id ? { ...e, style: newStyle } : e) };
                                              setTimeout(() => iframeRef.current?.contentWindow?.postMessage({ type: "preview-update", sections: sections.filter(s => s.visible), elements: updated }, "*"), 50);
                                              return updated;
                                            });
                                            setSaveState("unsaved");
                                          }}
                                          className={`h-4 w-4 rounded flex items-center justify-center text-[7px] ${((el.style as Record<string,unknown>)?.theme) === "dark" ? "bg-[#1d1d1f] text-white" : "text-white/25"}`}
                                        >🌙</button>
                                      </div>
                                      <button onClick={(e) => { e.stopPropagation(); removeElement(selectedSection.id, el.id); }} className="h-5 w-5 flex items-center justify-center text-white/10 hover:text-red-400/60 transition-colors">
                                        <Trash2 className="h-2.5 w-2.5" />
                                      </button>
                                      <ChevronDown className={`h-3 w-3 text-white/15 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                    </div>
                                  </div>
                                  {/* Editor — shown when expanded */}
                                  {isExpanded && (
                                    <div className="px-3 pb-3 pt-1 border-t border-white/[0.04] space-y-3">
                                      {/* Zone selector — only show if section has multi-zone layout */}
                                      {(getSectionSettings(selectedSection).zoneLayout && getSectionSettings(selectedSection).zoneLayout !== "1-col") && (
                                        <div>
                                          <label className="text-[9px] text-white/25 mb-1 block">Zone</label>
                                          <div className="flex gap-1">
                                            {(() => {
                                              const zl = getSectionSettings(selectedSection).zoneLayout || "1-col";
                                              const zones = zl === "3-col" ? ["a","b","c"] : zl === "4-col" ? ["a","b","c","d"] : ["a","b"];
                                              return zones.map((z) => (
                                                <button key={z} onClick={async () => {
                                                  await updateElement(el.id, { settings: { ...(el.settings || {}), zone: z } });
                                                  setSectionElements(prev => ({
                                                    ...prev,
                                                    [selectedSection.id]: (prev[selectedSection.id] || []).map(e => e.id === el.id ? { ...e, zone: z } : e),
                                                  }));
                                                  setSaveState("unsaved");
                                                }}
                                                  className={`flex-1 h-7 rounded-md text-[10px] font-semibold uppercase transition-all ${(el.zone || "a") === z ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/[0.04] border border-white/[0.06] text-white/25"}`}
                                                >{z}</button>
                                              ));
                                            })()}
                                          </div>
                                        </div>
                                      )}
                                      <ElementEditor el={el} sectionId={selectedSection.id} onEdit={editElement} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </SettingsGroup>

                      {/* Add Element picker */}
                      <div className="mt-2">
                        {showElementPicker === selectedSection.id ? (
                          <div className="space-y-3">
                            <ElementPickerGroup title="Basic" items={[
                              { type: "heading", label: "Heading", preview: <div className="space-y-1"><div className="h-2.5 w-[70%] bg-[#1d1d1f] rounded-sm" /><div className="h-1.5 w-[45%] bg-[#d2d2d7] rounded-sm" /></div> },
                              { type: "paragraph", label: "Text", preview: <div className="space-y-1"><div className="h-1 w-full bg-[#d2d2d7] rounded-sm" /><div className="h-1 w-full bg-[#d2d2d7] rounded-sm" /><div className="h-1 w-[60%] bg-[#d2d2d7] rounded-sm" /></div> },
                              { type: "image", label: "Image", preview: <div className="h-8 w-full bg-[#e8e8ed] rounded-md flex items-center justify-center"><div className="h-3 w-3 border border-[#aeaeb2] rounded-sm" /></div> },
                              { type: "button", label: "Button", preview: <div className="flex justify-center"><div className="h-4 px-3 bg-[#1d1d1f] rounded-full flex items-center"><div className="h-1 w-6 bg-white rounded-sm" /></div></div> },
                              { type: "video", label: "Video", preview: <div className="h-8 w-full bg-[#1d1d1f] rounded-md flex items-center justify-center"><div className="h-3 w-3 border-l-[5px] border-l-white border-y-[3px] border-y-transparent" /></div> },
                              { type: "divider", label: "Divider", preview: <div className="flex items-center h-6"><div className="h-px w-full bg-[#d2d2d7]" /></div> },
                              { type: "spacer", label: "Spacer", preview: <div className="flex items-center justify-center h-6"><div className="h-4 w-px bg-[#d2d2d7]" /><div className="text-[6px] text-[#aeaeb2] mx-1">↕</div><div className="h-4 w-px bg-[#d2d2d7]" /></div> },
                              { type: "list", label: "List", preview: <div className="space-y-1 pl-2">{[1,2,3].map(i => <div key={i} className="flex items-center gap-1"><div className="h-1 w-1 rounded-full bg-[#aeaeb2]" /><div className="h-1 w-[60%] bg-[#d2d2d7] rounded-sm" /></div>)}</div> },
                              { type: "icon-box", label: "Icon Box", preview: <div className="flex flex-col items-center gap-1"><div className="h-4 w-4 rounded-md bg-[#e8e8ed]" /><div className="h-1 w-6 bg-[#1d1d1f] rounded-sm" /><div className="h-0.5 w-8 bg-[#d2d2d7] rounded-sm" /></div> },
                            ]} onAdd={(t) => addElement(selectedSection.id, t as import("@/types/supabase").ElementType)} />

                            <ElementPickerGroup title="Components" items={[
                              { type: "card", label: "Card", preview: <div className="bg-[#f5f5f7] rounded-md p-1.5 space-y-1"><div className="h-4 bg-[#e8e8ed] rounded-sm" /><div className="h-1.5 w-[70%] bg-[#1d1d1f] rounded-sm" /><div className="h-1 w-full bg-[#d2d2d7] rounded-sm" /></div> },
                              { type: "feature", label: "Feature", preview: <div className="flex gap-1.5"><div className="h-4 w-4 rounded bg-[#e8e8ed] shrink-0" /><div className="space-y-0.5 flex-1"><div className="h-1.5 w-[80%] bg-[#1d1d1f] rounded-sm" /><div className="h-1 w-full bg-[#d2d2d7] rounded-sm" /></div></div> },
                              { type: "stat", label: "Stat", preview: <div className="text-center"><div className="text-[12px] font-bold text-[#1d1d1f] leading-none">100+</div><div className="h-0.5 w-6 bg-[#d2d2d7] rounded-sm mx-auto mt-0.5" /></div> },
                              { type: "badge", label: "Badge", preview: <div className="flex justify-center"><div className="h-3 px-2 bg-[#1d1d1f] rounded-full flex items-center"><div className="h-0.5 w-4 bg-white rounded-sm" /></div></div> },
                              { type: "avatar", label: "Avatar", preview: <div className="flex items-center gap-1.5"><div className="h-5 w-5 rounded-full bg-[#e8e8ed]" /><div className="space-y-0.5"><div className="h-1 w-6 bg-[#1d1d1f] rounded-sm" /><div className="h-0.5 w-8 bg-[#d2d2d7] rounded-sm" /></div></div> },
                              { type: "testimonial", label: "Review", preview: <div className="bg-[#f5f5f7] rounded-md p-1.5 space-y-1"><div className="flex gap-px">{[1,2,3,4,5].map(i => <div key={i} className="text-[4px] text-amber-400">★</div>)}</div><div className="h-1 w-full bg-[#d2d2d7] rounded-sm italic" /><div className="flex items-center gap-1 mt-0.5"><div className="h-2.5 w-2.5 rounded-full bg-[#e8e8ed]" /><div className="h-0.5 w-5 bg-[#aeaeb2] rounded-sm" /></div></div> },
                              { type: "faq", label: "FAQ", preview: <div className="space-y-1">{[1,2].map(i => <div key={i} className="flex items-center justify-between bg-[#f5f5f7] rounded px-1 py-0.5"><div className="h-1 w-[60%] bg-[#1d1d1f] rounded-sm" /><div className="text-[5px] text-[#aeaeb2]">+</div></div>)}</div> },
                              { type: "alert", label: "Alert", preview: <div className="bg-blue-50 border border-blue-200 rounded px-1.5 py-1"><div className="h-1 w-full bg-blue-300 rounded-sm" /></div> },
                              { type: "progress", label: "Progress", preview: <div className="space-y-0.5"><div className="flex justify-between"><div className="h-0.5 w-5 bg-[#1d1d1f] rounded-sm" /><div className="h-0.5 w-3 bg-[#aeaeb2] rounded-sm" /></div><div className="h-1.5 bg-[#e8e8ed] rounded-full overflow-hidden"><div className="h-full w-[70%] bg-[#1d1d1f] rounded-full" /></div></div> },
                            ]} onAdd={(t) => addElement(selectedSection.id, t as import("@/types/supabase").ElementType)} />

                            <ElementPickerGroup title="Advanced" items={[
                              { type: "pricing", label: "Pricing", preview: <div className="bg-[#f5f5f7] rounded-md p-1.5 text-center space-y-0.5"><div className="h-0.5 w-5 bg-[#aeaeb2] rounded-sm mx-auto" /><div className="text-[10px] font-bold text-[#1d1d1f] leading-none">$99</div><div className="h-0.5 w-3 bg-[#aeaeb2] rounded-sm mx-auto" />{[1,2].map(i => <div key={i} className="flex items-center gap-0.5 justify-center"><div className="text-[4px] text-green-500">✓</div><div className="h-0.5 w-5 bg-[#d2d2d7] rounded-sm" /></div>)}</div> },
                              { type: "cta-banner", label: "CTA Banner", preview: <div className="bg-[#1d1d1f] rounded-md p-1.5 flex items-center justify-between"><div className="space-y-0.5"><div className="h-1.5 w-8 bg-white rounded-sm" /><div className="h-0.5 w-10 bg-white/30 rounded-sm" /></div><div className="h-3 px-1.5 bg-white rounded-full" /></div> },
                              { type: "gallery", label: "Gallery", preview: <div className="grid grid-cols-3 gap-0.5">{[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-[#e8e8ed] rounded-sm" />)}</div> },
                              { type: "tag-list", label: "Tags", preview: <div className="flex flex-wrap gap-0.5">{["Tag", "Label", "Item"].map(t => <div key={t} className="h-2.5 px-1 bg-[#e8e8ed] rounded-full flex items-center"><span className="text-[4px] text-[#6e6e73]">{t}</span></div>)}</div> },
                              { type: "social", label: "Social", preview: <div className="flex gap-1 justify-center">{[1,2,3,4].map(i => <div key={i} className="h-3.5 w-3.5 rounded-full bg-[#e8e8ed]" />)}</div> },
                              { type: "logo", label: "Logo", preview: <div className="flex items-center justify-center h-6"><div className="h-3 w-10 bg-[#e8e8ed] rounded opacity-50" /></div> },
                              { type: "table", label: "Table", preview: <div className="border border-[#e8e8ed] rounded overflow-hidden"><div className="flex bg-[#f5f5f7]">{[1,2,3].map(i => <div key={i} className="flex-1 h-2 border-r border-[#e8e8ed] last:border-r-0" />)}</div><div className="flex">{[1,2,3].map(i => <div key={i} className="flex-1 h-2 border-r border-[#e8e8ed] last:border-r-0 border-t border-[#e8e8ed]" />)}</div></div> },
                              { type: "accordion", label: "Accordion", preview: <div className="border border-[#e8e8ed] rounded overflow-hidden">{[1,2,3].map(i => <div key={i} className="flex items-center justify-between px-1 py-0.5 border-b border-[#e8e8ed] last:border-b-0"><div className="h-0.5 w-6 bg-[#1d1d1f] rounded-sm" /><div className="text-[4px] text-[#aeaeb2]">▶</div></div>)}</div> },
                              { type: "map", label: "Map", preview: <div className="h-8 bg-[#e8e8ed] rounded-md flex items-center justify-center"><div className="text-[8px] text-[#aeaeb2]">📍</div></div> },
                            ]} onAdd={(t) => addElement(selectedSection.id, t as import("@/types/supabase").ElementType)} />
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowElementPicker(selectedSection.id)}
                            className="w-full h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Plus className="h-3 w-3" /> Add Element
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        )}
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

/* ── Full Element Editor — edits all properties per element type ── */
function ElementEditor({ el, sectionId, onEdit }: { el: import("@/types/supabase").ElementRow; sectionId: string; onEdit: (sId: string, eId: string, content: Record<string, unknown>) => void }) {
  const c = (el.content || {}) as Record<string, unknown>;
  const upd = (field: string, value: unknown) => onEdit(sectionId, el.id, { ...c, [field]: value });
  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div><label className="text-[9px] text-white/25 mb-0.5 block">{label}</label>{children}</div>
  );

  switch (el.type) {
    case "heading":
      return (
        <div className="space-y-2">
          <F label="Text"><input value={(c.text as string) || ""} onChange={(e) => upd("text", e.target.value)} className="input-field" placeholder="Heading text" /></F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Level"><select value={(c.level as string) || "h2"} onChange={(e) => upd("level", e.target.value)} className="input-field">{["h1","h2","h3","h4","h5","h6"].map(h => <option key={h} value={h}>{h.toUpperCase()}</option>)}</select></F>
            <F label="Size"><select value={((el.style as Record<string,unknown>)?.size as string) || "lg"} onChange={(e) => onEdit(sectionId, el.id, c)} className="input-field">{["xl","lg","md","sm"].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}</select></F>
          </div>
        </div>
      );
    case "paragraph":
      return (
        <div className="space-y-2">
          <F label="Text"><textarea value={(c.text as string) || ""} onChange={(e) => upd("text", e.target.value)} className="input-field resize-y" rows={3} placeholder="Paragraph text" /></F>
        </div>
      );
    case "button":
      return (
        <div className="space-y-2">
          <F label="Text"><input value={(c.text as string) || ""} onChange={(e) => upd("text", e.target.value)} className="input-field" placeholder="Button text" /></F>
          <F label="Link"><input value={(c.link as string) || ""} onChange={(e) => upd("link", e.target.value)} className="input-field" placeholder="/products" /></F>
          <div className="grid grid-cols-3 gap-1.5">
            <F label="Style"><select value={(c.style as string) || "solid"} onChange={(e) => upd("style", e.target.value)} className="input-field">{["solid","outline","ghost"].map(s => <option key={s}>{s}</option>)}</select></F>
            <F label="Shape"><select value={(c.shape as string) || "pill"} onChange={(e) => upd("shape", e.target.value)} className="input-field">{["pill","rounded","square"].map(s => <option key={s}>{s}</option>)}</select></F>
            <F label="Size"><select value={(c.size as string) || "medium"} onChange={(e) => upd("size", e.target.value)} className="input-field">{["small","medium","large"].map(s => <option key={s}>{s}</option>)}</select></F>
          </div>
          <F label="New Tab"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!c.newTab} onChange={(e) => upd("newTab", e.target.checked)} className="accent-blue-500" /><span className="text-[10px] text-white/30">Open in new tab</span></label></F>
        </div>
      );
    case "image":
      return (
        <div className="space-y-2">
          <F label="Image"><MediaSelector currentUrl={(c.src as string) || null} onSelect={(url) => upd("src", url)} /></F>
          <F label="Alt Text"><input value={(c.alt as string) || ""} onChange={(e) => upd("alt", e.target.value)} className="input-field" placeholder="Image description" /></F>
        </div>
      );
    case "video":
      return (
        <div className="space-y-2">
          <F label="Video URL"><input value={(c.src as string) || ""} onChange={(e) => upd("src", e.target.value)} className="input-field" placeholder="YouTube/Vimeo URL or upload URL" /></F>
        </div>
      );
    case "card":
      return (
        <div className="space-y-2">
          <F label="Icon (emoji)"><input value={(c.icon as string) || ""} onChange={(e) => upd("icon", e.target.value)} className="input-field" placeholder="⚡" /></F>
          <F label="Title"><input value={(c.title as string) || ""} onChange={(e) => upd("title", e.target.value)} className="input-field" placeholder="Card title" /></F>
          <F label="Description"><textarea value={(c.description as string) || ""} onChange={(e) => upd("description", e.target.value)} className="input-field resize-y" rows={2} placeholder="Card description" /></F>
          <F label="Image"><MediaSelector currentUrl={(c.image as string) || null} onSelect={(url) => upd("image", url)} /></F>
          <F label="Link"><input value={(c.link as string) || ""} onChange={(e) => upd("link", e.target.value)} className="input-field" placeholder="/page-link" /></F>
        </div>
      );
    case "badge":
      return (
        <div className="space-y-2">
          <F label="Text"><input value={(c.text as string) || ""} onChange={(e) => upd("text", e.target.value)} className="input-field" placeholder="Badge text" /></F>
          <F label="Variant"><select value={(c.variant as string) || "default"} onChange={(e) => upd("variant", e.target.value)} className="input-field">{["default","primary","success","warning","danger","info"].map(v => <option key={v}>{v}</option>)}</select></F>
        </div>
      );
    case "avatar":
      return (
        <div className="space-y-2">
          <F label="Name"><input value={(c.name as string) || ""} onChange={(e) => upd("name", e.target.value)} className="input-field" placeholder="Person name" /></F>
          <F label="Role"><input value={(c.role as string) || ""} onChange={(e) => upd("role", e.target.value)} className="input-field" placeholder="Job title" /></F>
          <F label="Photo"><MediaSelector currentUrl={(c.src as string) || null} onSelect={(url) => upd("src", url)} /></F>
          <F label="Size"><select value={(c.size as string) || "md"} onChange={(e) => upd("size", e.target.value)} className="input-field">{["sm","md","lg"].map(s => <option key={s}>{s}</option>)}</select></F>
        </div>
      );
    case "stat":
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <F label="Value"><input value={(c.value as string) || ""} onChange={(e) => upd("value", e.target.value)} className="input-field" placeholder="100" /></F>
            <F label="Suffix"><input value={(c.suffix as string) || ""} onChange={(e) => upd("suffix", e.target.value)} className="input-field" placeholder="+" /></F>
          </div>
          <F label="Label"><input value={(c.label as string) || ""} onChange={(e) => upd("label", e.target.value)} className="input-field" placeholder="Countries" /></F>
          <F label="Prefix"><input value={(c.prefix as string) || ""} onChange={(e) => upd("prefix", e.target.value)} className="input-field" placeholder="$" /></F>
        </div>
      );
    case "testimonial":
      return (
        <div className="space-y-2">
          <F label="Quote"><textarea value={(c.quote as string) || ""} onChange={(e) => upd("quote", e.target.value)} className="input-field resize-y" rows={3} placeholder="Client quote" /></F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Name"><input value={(c.name as string) || ""} onChange={(e) => upd("name", e.target.value)} className="input-field" placeholder="Client name" /></F>
            <F label="Role"><input value={(c.role as string) || ""} onChange={(e) => upd("role", e.target.value)} className="input-field" placeholder="Company" /></F>
          </div>
          <F label="Rating (1-5)"><input type="number" min={1} max={5} value={(c.rating as number) || 5} onChange={(e) => upd("rating", parseInt(e.target.value))} className="input-field" /></F>
          <F label="Avatar"><MediaSelector currentUrl={(c.avatar as string) || null} onSelect={(url) => upd("avatar", url)} /></F>
        </div>
      );
    case "feature":
      return (
        <div className="space-y-2">
          <F label="Icon (emoji)"><input value={(c.icon as string) || ""} onChange={(e) => upd("icon", e.target.value)} className="input-field" placeholder="⚡" /></F>
          <F label="Title"><input value={(c.title as string) || ""} onChange={(e) => upd("title", e.target.value)} className="input-field" placeholder="Feature title" /></F>
          <F label="Description"><textarea value={(c.description as string) || ""} onChange={(e) => upd("description", e.target.value)} className="input-field resize-y" rows={2} placeholder="Feature description" /></F>
        </div>
      );
    case "pricing":
      return (
        <div className="space-y-2">
          <F label="Plan Name"><input value={(c.name as string) || ""} onChange={(e) => upd("name", e.target.value)} className="input-field" placeholder="Standard" /></F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Price"><input value={(c.price as string) || ""} onChange={(e) => upd("price", e.target.value)} className="input-field" placeholder="$99" /></F>
            <F label="Period"><input value={(c.period as string) || ""} onChange={(e) => upd("period", e.target.value)} className="input-field" placeholder="month" /></F>
          </div>
          <F label="Features (one per line)"><textarea value={((c.features as string[]) || []).join("\n")} onChange={(e) => upd("features", e.target.value.split("\n"))} className="input-field resize-y" rows={3} placeholder="Feature 1&#10;Feature 2" /></F>
          <F label="Button Text"><input value={(c.cta as string) || ""} onChange={(e) => upd("cta", e.target.value)} className="input-field" placeholder="Get Started" /></F>
          <F label="Highlighted"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!c.highlighted} onChange={(e) => upd("highlighted", e.target.checked)} className="accent-blue-500" /><span className="text-[10px] text-white/30">Make this plan stand out</span></label></F>
        </div>
      );
    case "faq":
      return (
        <div className="space-y-2">
          <F label="Question"><input value={(c.question as string) || ""} onChange={(e) => upd("question", e.target.value)} className="input-field" placeholder="Your question?" /></F>
          <F label="Answer"><textarea value={(c.answer as string) || ""} onChange={(e) => upd("answer", e.target.value)} className="input-field resize-y" rows={3} placeholder="The answer..." /></F>
        </div>
      );
    case "social":
      return (
        <div className="space-y-2">
          <F label="Social Links (one per line: platform,url)"><textarea
            value={((c.links as {platform:string;url:string}[]) || []).map(l => `${l.platform},${l.url}`).join("\n")}
            onChange={(e) => upd("links", e.target.value.split("\n").filter(Boolean).map(l => { const [platform, ...rest] = l.split(","); return { platform: platform.trim(), url: rest.join(",").trim() }; }))}
            className="input-field resize-y" rows={4} placeholder="linkedin,https://linkedin.com&#10;twitter,https://x.com" /></F>
        </div>
      );
    case "logo":
      return (
        <div className="space-y-2">
          <F label="Logo Image"><MediaSelector currentUrl={(c.src as string) || null} onSelect={(url) => upd("src", url)} /></F>
          <F label="Name"><input value={(c.name as string) || ""} onChange={(e) => upd("name", e.target.value)} className="input-field" placeholder="Brand name" /></F>
          <F label="Max Width"><input value={(c.width as string) || "120px"} onChange={(e) => upd("width", e.target.value)} className="input-field" placeholder="120px" /></F>
        </div>
      );
    case "progress":
      return (
        <div className="space-y-2">
          <F label="Label"><input value={(c.label as string) || ""} onChange={(e) => upd("label", e.target.value)} className="input-field" placeholder="Progress" /></F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Value"><input type="number" value={(c.value as number) || 0} onChange={(e) => upd("value", parseInt(e.target.value))} className="input-field" /></F>
            <F label="Max"><input type="number" value={(c.max as number) || 100} onChange={(e) => upd("max", parseInt(e.target.value))} className="input-field" /></F>
          </div>
        </div>
      );
    case "tag-list":
      return (
        <div className="space-y-2">
          <F label="Tags (one per line)"><textarea value={((c.tags as string[]) || []).join("\n")} onChange={(e) => upd("tags", e.target.value.split("\n"))} className="input-field resize-y" rows={3} placeholder="Tag 1&#10;Tag 2&#10;Tag 3" /></F>
        </div>
      );
    case "cta-banner":
      return (
        <div className="space-y-2">
          <F label="Title"><input value={(c.title as string) || ""} onChange={(e) => upd("title", e.target.value)} className="input-field" placeholder="Ready to start?" /></F>
          <F label="Description"><input value={(c.description as string) || ""} onChange={(e) => upd("description", e.target.value)} className="input-field" placeholder="Contact our team." /></F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Button Text"><input value={(c.buttonText as string) || ""} onChange={(e) => upd("buttonText", e.target.value)} className="input-field" placeholder="Contact Us" /></F>
            <F label="Button Link"><input value={(c.buttonLink as string) || ""} onChange={(e) => upd("buttonLink", e.target.value)} className="input-field" placeholder="/contact" /></F>
          </div>
          <F label="Dark Background"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!c.dark} onChange={(e) => upd("dark", e.target.checked)} className="accent-blue-500" /><span className="text-[10px] text-white/30">Use dark background</span></label></F>
        </div>
      );
    case "icon-box":
      return (
        <div className="space-y-2">
          <F label="Icon (emoji)"><input value={(c.icon as string) || ""} onChange={(e) => upd("icon", e.target.value)} className="input-field" placeholder="🎯" /></F>
          <F label="Title"><input value={(c.title as string) || ""} onChange={(e) => upd("title", e.target.value)} className="input-field" placeholder="Title" /></F>
          <F label="Description"><textarea value={(c.description as string) || ""} onChange={(e) => upd("description", e.target.value)} className="input-field resize-y" rows={2} placeholder="Description" /></F>
        </div>
      );
    case "gallery":
      return (
        <div className="space-y-2">
          <F label="Columns"><select value={(c.columns as number) || 3} onChange={(e) => upd("columns", parseInt(e.target.value))} className="input-field">{[2,3,4,5,6].map(n => <option key={n} value={n}>{n} columns</option>)}</select></F>
          <F label="Images (add via Media Library)"><p className="text-[10px] text-white/20">Gallery images coming soon. Use image elements for now.</p></F>
        </div>
      );
    case "table":
      return (
        <div className="space-y-2">
          <F label="Headers (comma-separated)"><input value={((c.headers as string[]) || []).join(",")} onChange={(e) => upd("headers", e.target.value.split(",").map(s => s.trim()))} className="input-field" placeholder="Name,Value,Status" /></F>
          <F label="Rows (one row per line, comma-separated)"><textarea
            value={((c.rows as string[][]) || []).map(r => r.join(",")).join("\n")}
            onChange={(e) => upd("rows", e.target.value.split("\n").map(r => r.split(",").map(s => s.trim())))}
            className="input-field resize-y" rows={4} placeholder="Item 1,100,Active&#10;Item 2,200,Pending" /></F>
        </div>
      );
    case "accordion":
      return (
        <div className="space-y-2">
          <F label="Items (title|content, one per line)"><textarea
            value={((c.items as {title:string;content:string}[]) || []).map(i => `${i.title}|${i.content}`).join("\n")}
            onChange={(e) => upd("items", e.target.value.split("\n").filter(Boolean).map(l => { const [title, ...rest] = l.split("|"); return { title: title.trim(), content: rest.join("|").trim() }; }))}
            className="input-field resize-y" rows={4} placeholder="Section 1|Content for section 1&#10;Section 2|Content for section 2" /></F>
        </div>
      );
    case "alert":
      return (
        <div className="space-y-2">
          <F label="Message"><input value={(c.text as string) || ""} onChange={(e) => upd("text", e.target.value)} className="input-field" placeholder="Alert message" /></F>
          <F label="Type"><select value={(c.type as string) || "info"} onChange={(e) => upd("type", e.target.value)} className="input-field">{["info","success","warning","error"].map(t => <option key={t}>{t}</option>)}</select></F>
        </div>
      );
    case "list":
      return (
        <div className="space-y-2">
          <F label="Items (one per line)"><textarea value={((c.items as string[]) || []).join("\n")} onChange={(e) => upd("items", e.target.value.split("\n"))} className="input-field resize-y" rows={4} placeholder="Item 1&#10;Item 2&#10;Item 3" /></F>
          <F label="Style"><select value={(c.style as string) || "bullet"} onChange={(e) => upd("style", e.target.value)} className="input-field"><option value="bullet">Bullet</option><option value="number">Numbered</option></select></F>
        </div>
      );
    case "divider":
      return <p className="text-[10px] text-white/15 py-1">Horizontal divider line — no settings needed.</p>;
    case "spacer":
      return (
        <div className="space-y-2">
          <F label="Height"><input value={(c.height as string) || "48px"} onChange={(e) => upd("height", e.target.value)} className="input-field" placeholder="48px" /></F>
        </div>
      );
    default:
      return <p className="text-[10px] text-white/20 py-1">No editor available for {el.type}</p>;
  }
}

function ElementPickerGroup({ title, items, onAdd }: { title: string; items: { type: string; label: string; preview: React.ReactNode }[]; onAdd: (type: string) => void }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/15 mb-2">{title}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((item) => (
          <button
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="flex flex-col rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all overflow-hidden"
          >
            <div className="w-full bg-white rounded-t-md p-2 h-[48px] flex items-center justify-center">
              {item.preview}
            </div>
            <span className="text-[8px] text-white/30 py-1.5 text-center w-full">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

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
