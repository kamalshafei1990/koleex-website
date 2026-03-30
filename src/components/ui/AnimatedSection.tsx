"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   AnimatedSection — Intersection observer-based scroll animation wrapper.
   Elements fade in when they enter the viewport. One-shot by default.
   --------------------------------------------------------------------------- */

type AnimationType = "fade-up" | "fade-in" | "fade-down" | "scale-in";

const animationClasses: Record<AnimationType, string> = {
  "fade-up": "animate-fade-in-up",
  "fade-in": "animate-fade-in",
  "fade-down": "animate-fade-in-down",
  "scale-in": "animate-scale-in",
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.12,
  className,
  as: Component = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Component
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animationClasses[animation],
        className
      )}
      style={delay > 0 && isVisible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
