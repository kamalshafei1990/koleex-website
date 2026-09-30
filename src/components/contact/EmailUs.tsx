"use client";

/* "Email us" — a quotation request from a product page (?product=<slug>) or
   an application from Careers (?job=<id>) arrives with its subject already
   written. The contact form itself comes with the leads step (the Hub's
   Contacts); until then nothing a visitor types is lost in a form that goes
   nowhere. */

import { useEffect, useState } from "react";

export function EmailUs({ email, className, children }: { email: string; className?: string; children: React.ReactNode }) {
  const [href, setHref] = useState(`mailto:${email}`);
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const product = sp.get("product");
    const job = sp.get("job");
    const subject = product ? `Quotation request: ${product}` : job ? `Job application: ${job}` : "";
    if (subject) setHref(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
  }, [email]);
  return <a href={href} className={className}>{children}</a>;
}
