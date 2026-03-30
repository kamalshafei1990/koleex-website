"use client";

import { useEffect, useRef } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

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
      {/* Floating trigger button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full",
          "bg-accent text-white shadow-lg shadow-accent/25",
          "flex items-center justify-center",
          "hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30",
          "transition-all duration-300 hover:scale-105",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      <div
        ref={panelRef}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-h-[560px]",
          "rounded-2xl shadow-2xl overflow-hidden",
          "glass border border-border-light",
          "flex flex-col",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-light">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Koleex AI Assistant
              </p>
              <p className="text-xs text-text-tertiary">How can I help you?</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-full hover:bg-surface-secondary transition-colors"
            aria-label="Close AI Assistant"
          >
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 px-5 py-6 min-h-[300px] flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-surface-secondary flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-text-tertiary" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">
            Welcome to Koleex AI
          </p>
          <p className="text-xs text-text-tertiary text-center max-w-[240px]">
            Ask me about our products, solutions, or anything else. I&apos;m
            here to help.
          </p>
        </div>

        {/* Input area */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-surface-secondary rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
            />
            <button
              className="shrink-0 h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-hover transition-colors"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
