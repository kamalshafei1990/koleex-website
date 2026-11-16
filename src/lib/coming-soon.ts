/* ---------------------------------------------------------------------------
   Coming-soon gate. Prefer the Hub's /api/website/v1/site (Website control
   center). Fall back to COMING_SOON env when the bridge is unset or the Hub
   does not answer — fail closed (stay on teaser) so a bad deploy cannot
   open the unfinished site.

   No process-level cache: Edge middleware and Node RSC are separate isolates,
   so a shared TTL cache caused / ↔ /coming-soon redirect loops when the gate
   flipped off.

   Env still accepted for emergency override:
     COMING_SOON=false|0|no|off  → force open when Hub is unreachable
     unset / anything else       → teaser (fail closed)
   --------------------------------------------------------------------------- */

const OFF = new Set(["0", "false", "no", "off"]);

export function isComingSoonFromEnv(): boolean {
  const raw = process.env.COMING_SOON;
  if (raw === undefined || raw.trim() === "") return true;
  return !OFF.has(raw.trim().toLowerCase());
}

/** Sync helper for places that cannot await (build-time robots fallback). */
export function isComingSoon(): boolean {
  return isComingSoonFromEnv();
}

/**
 * Resolve Coming Soon for middleware / request path.
 * Hub wins when the bridge answers; otherwise env.
 */
export async function resolveComingSoon(): Promise<boolean> {
  const key = (process.env.WEBSITE_BRIDGE_KEY ?? "").trim();
  const hub = (process.env.HUB_URL ?? "https://hub.koleexgroup.com").trim().replace(/\/+$/, "");
  if (key && hub) {
    try {
      const res = await fetch(`${hub}/api/website/v1/site`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const data = (await res.json()) as { comingSoon?: unknown };
        if (typeof data.comingSoon === "boolean") return data.comingSoon;
      }
    } catch {
      /* fall through to env */
    }
  }

  return isComingSoonFromEnv();
}
