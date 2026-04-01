"use client";

import { useEffect } from "react";

/* Hide the main site header/footer on admin pages */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main");
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    if (main) { main.style.paddingTop = "0"; }
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      if (main) { main.style.paddingTop = ""; }
    };
  }, []);

  return <>{children}</>;
}
