"use client";

import { useEffect, useRef } from "react";
import { Sparkles, X, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   AIAssistant — Floating AI chat widget.
   Shows as a circular FAB in the bottom-right corner; opens a glass-style
   chat panel with placeholder content. Actual AI logic is NOT wired yet.
   --------------------------------------------------------------------------- */

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const suggestions = [
  "Find industrial automation products",
  "Tell me about energy solutions",
  "Help me contact sales",
];

export default function AIAssistant({ isOpen, onToggle }: AIAssistantProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onToggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggle]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full",
          "bg-accent text-white shadow-lg shadow-accent/20",
          "flex items-center justify-center",
          "hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30",
          "transition-all duration-300 hover:scale-105 active:scale-95",
          "animate-pulse-glow",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Panel */}
      <div
        ref={panelRef}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-h-[580px]",
          "rounded-2xl shadow-2xl overflow-hidden",
          "bg-white border border-border-light",
          "flex flex-col",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light bg-surface-tertiary">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Koleex AI
              </p>
              <p className="text-[11px] text-text-tertiary">
                Always here to help
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-secondary transition-premium"
            aria-label="Close AI Assistant"
          >
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>

        {/* Messages area (placeholder) */}
        <div className="flex-1 px-5 py-8 min-h-[280px] flex flex-col items-center justify-center">
          <div className="h-14 w-14 rounded-2xl bg-surface-secondary flex items-center justify-center mb-5">
            <Sparkles className="h-7 w-7 text-text-quaternary" />
          </div>
          <p className="text-[15px] font-semibold text-text-primary mb-1">
            How can I help?
          </p>
          <p className="text-[13px] text-text-tertiary text-center max-w-[260px] mb-6">
            Ask me about products, solutions, or anything about Koleex.
          </p>

          {/* Quick suggestions */}
          <div className="w-full space-y-2">
            {suggestions.map((s) => (
              <button
                key={s}
                className="flex items-center justify-between w-full px-4 py-2.5 text-[13px] text-text-secondary bg-surface-secondary rounded-xl hover:bg-gray-200 transition-premium group text-left"
              >
                {s}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-quaternary group-hover:text-text-secondary transition-premium" />
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="px-4 pb-4 pt-2 border-t border-border-light">
          <div className="flex items-center gap-2 bg-surface-secondary rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-quaternary outline-none"
            />
            <button
              className="shrink-0 h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-premium active:scale-95"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
