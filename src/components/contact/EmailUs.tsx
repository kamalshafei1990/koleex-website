"use client";

/* "Email us" — an application from Careers (?job=<id>) arrives with its
   subject already written, until applications reach HR online. (A quotation
   request, ?product=<slug>, has the contact form now, which files it in the
   Hub; the subject is still written for anyone who emails instead.) */

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
