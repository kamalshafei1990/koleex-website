/* ---------------------------------------------------------------------------
   Coming-soon gate. While this is on, the public site shows only the teaser
   (see middleware). The real pages stay in the repo under app/[lang]/(site).

   Default is ON when COMING_SOON is unset, so a deploy without the variable
   does not publish the unfinished site. To launch the real site, set
   COMING_SOON=false and redeploy. Middleware reads the variable on each
   request. robots.txt follows it too. The sitemap is generated at build
   time, so the redeploy is what publishes the real URL list.

   Anything other than an explicit off stays on, so a typo cannot publish
   the unfinished site.
   Accepted off: 0, false, no, off
   --------------------------------------------------------------------------- */

export function isComingSoon(): boolean {
  const raw = process.env.COMING_SOON;
  if (raw === undefined || raw.trim() === "") return true;
  const v = raw.trim().toLowerCase();
  return !(v === "0" || v === "false" || v === "no" || v === "off");
}
