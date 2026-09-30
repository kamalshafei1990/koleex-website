"use client";

/* ---------------------------------------------------------------------------
   ContactForm — write to Koleex, or ask for a quotation (?product=<slug>
   from a product's page). The message reaches the Hub as a potential
   customer in its Customers app and the team there is told (the leads step,
   01/10/2026). Every word follows the page's language; the countries are
   the browser's own names in that language, with flags, and the visitor's
   own country (from where they browse) comes chosen.

   Someone applying for a job (?job=<id> from Careers) is not a customer:
   they get the email with its subject written, until applications reach
   HR online (the next step), and never this form.

   What the browser alone knows — the product in the address, the country
   cookie — is read with useSyncExternalStore: the static page renders
   without it, and the form fills in on the visitor's screen with no effect
   setting state. The country list too: its names come from the browser's
   own Intl data, which is not the server's (a name or an Arabic sort
   order differs), so the page is rendered without it and hydrates clean.
   --------------------------------------------------------------------------- */

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useLang } from "@/i18n/LangProvider";
import { translate } from "@/i18n/words";
import { COUNTRY_CODES, countryOptions } from "@/data/countries";
import { cn } from "@/lib/utils";
import { EmailUs } from "@/components/contact/EmailUs";

type Field = "name" | "email" | "phone" | "message";
type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; code: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const FIELD_CODES: readonly string[] = ["name", "email", "phone", "message"];

const never = () => () => {};
const useBrowserValue = (read: () => string) => useSyncExternalStore(never, read, () => "");
const useOnClient = () => useSyncExternalStore(never, () => true, () => false);
const readProduct = () => {
  const s = new URLSearchParams(window.location.search).get("product") ?? "";
  return SLUG_RE.test(s) && s.length <= 120 ? s : "";
};
const readJob = () => {
  const s = new URLSearchParams(window.location.search).get("job") ?? "";
  return /^[\w-]{1,64}$/.test(s) ? s : "";
};
const readGeo = () => {
  const v = document.cookie.split("; ").find((c) => c.startsWith("koleex_geo="))?.slice("koleex_geo=".length) ?? "";
  return v.toUpperCase();
};

const EMPTY = { name: "", email: "", phone: "", company: "", website: "" };

const inputCls =
  "w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/30";

export function ContactForm({ companyEmail }: { companyEmail: string | null }) {
  const { lang, t } = useLang();
  const productSlug = useBrowserValue(readProduct);
  const geo = useBrowserValue(readGeo);
  const jobId = useBrowserValue(readJob);
  const onClient = useOnClient();
  const openedAt = useRef(0);
  const [fields, setFields] = useState(EMPTY);
  /* null until the visitor picks or types: the country falls back to where
     they browse from, the message to the quotation sentence. */
  const [country, setCountry] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [productName, setProductName] = useState<{ slug: string; name: string } | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [problem, setProblem] = useState<Field | null>(null);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  /* The product's name, in the page's language. */
  useEffect(() => {
    if (!productSlug) return;
    let live = true;
    fetch(`/api/products?slug=${encodeURIComponent(productSlug)}&lang=${lang}`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j: { items?: Array<{ name?: string }> }) => {
        const name = j.items?.[0]?.name;
        if (live && name) setProductName({ slug: productSlug, name });
      })
      .catch(() => {});
    return () => { live = false; };
  }, [productSlug, lang]);

  const quote = !!productSlug;
  const product = productName?.slug === productSlug ? productName.name : null;
  const chosenCountry = country ?? (COUNTRY_CODES.includes(geo) ? geo : "");
  const text = message ?? (product ? translate("I would like a quotation for {product}.", lang, { product }) : "");
  const countries = useMemo(() => (onClient ? countryOptions(lang) : []), [onClient, lang]);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (problem === k) setProblem(null);
  };

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const missing: Field | null = !fields.name.trim() ? "name" : !EMAIL_RE.test(fields.email.trim()) ? "email" : !text.trim() ? "message" : null;
    if (missing) {
      setProblem(missing);
      setStatus({ state: "error", code: missing });
      return;
    }
    setProblem(null);
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: quote ? "quote" : "contact",
          name: fields.name, email: fields.email.trim(), phone: fields.phone, company: fields.company,
          country: chosenCountry, message: text, product: productSlug || undefined,
          lang, page: `${window.location.pathname}${window.location.search}`,
          website: fields.website, elapsed: Date.now() - openedAt.current,
        }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (res.ok && j.ok) {
        setStatus({ state: "sent" });
        return;
      }
      const code = typeof j.code === "string" ? j.code : "failed";
      if (FIELD_CODES.includes(code)) setProblem(code as Field);
      setStatus({ state: "error", code });
    } catch {
      setStatus({ state: "error", code: "failed" });
    }
  }

  const again = () => {
    setFields(EMPTY);
    setMessage(null);
    setCountry(null);
    setProblem(null);
    setStatus({ state: "idle" });
    openedAt.current = Date.now();
  };

  if (jobId) {
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-title text-white">{t("Apply for this position")}</h2>
        <p className="text-white/60">{t("Email us your CV — the subject is already written for you.")}</p>
        {companyEmail ? (
          <div>
            <EmailUs email={companyEmail} className="inline-flex h-[48px] items-center justify-center rounded-full bg-white px-8 text-[14px] font-medium text-black hover:bg-white/90">
              {t("Email us")}
            </EmailUs>
          </div>
        ) : null}
      </div>
    );
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-title text-white">{t("Thank you — your message has reached us.")}</h2>
        <p className="text-white/60">{quote ? t("Our team will send you the quotation by email.") : t("Our team will answer you by email.")}</p>
        <div>
          <button type="button" onClick={again} className="inline-flex h-[44px] items-center justify-center rounded-full border border-white/15 px-6 text-[14px] font-medium text-white hover:bg-white/5">
            {t("Send another message")}
          </button>
        </div>
      </div>
    );
  }

  const errorText = (code: string): string => {
    if (code === "name") return t("Write your name.");
    if (code === "email") return t("Write a valid email address.");
    if (code === "phone") return t("Write the phone number with digits only.");
    if (code === "message") return t("Write your message.");
    if (code === "too_fast") return t("Please check your message and send it again.");
    if (code === "too_long") return t("The message is too long.");
    if (code.startsWith("flood")) return t("You have sent several messages in a short time. Please try again in an hour.");
    return companyEmail
      ? t("Your message could not be sent. Please try again, or email us at {email}.", { email: companyEmail })
      : t("Your message could not be sent. Please try again.");
  };
  const err = status.state === "error" ? errorText(status.code) : null;
  const fieldErr = (f: Field) => (problem === f ? err : null);
  const border = (f: Field) => (problem === f ? "border-[#FF3333]/70" : "border-white/10");

  return (
    <form onSubmit={send} noValidate className="flex flex-col gap-5">
      <div>
        <h2 className="text-title text-white">{quote ? t("Request a quotation") : t("Send us a message")}</h2>
        {quote ? <p className="mt-2 text-white/60">{product ?? "\u00A0"}</p> : null}
      </div>

      {/* People never see this field; a robot filling every field fills it. */}
      {/* sr-only, not pushed off-screen: an offset that far overflows a right-to-left page into a sideways scroll. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Labelled id="cf-name" label={t("Your name")} error={fieldErr("name")}>
          <input id="cf-name" name="name" autoComplete="name" maxLength={120} value={fields.name} onChange={set("name")}
            aria-invalid={problem === "name"} aria-describedby={problem === "name" ? "cf-name-err" : undefined} className={cn(inputCls, border("name"))} />
        </Labelled>
        <Labelled id="cf-email" label={t("Email")} error={fieldErr("email")}>
          <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" maxLength={200} value={fields.email} onChange={set("email")}
            aria-invalid={problem === "email"} aria-describedby={problem === "email" ? "cf-email-err" : undefined} className={cn(inputCls, border("email"), "text-start")} />
        </Labelled>
        <Labelled id="cf-phone" label={t("Phone")} optional={t("Optional")} error={fieldErr("phone")}>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={40} value={fields.phone} onChange={set("phone")}
            aria-invalid={problem === "phone"} aria-describedby={problem === "phone" ? "cf-phone-err" : undefined} className={cn(inputCls, border("phone"), "text-start")} />
        </Labelled>
        <Labelled id="cf-company" label={t("Company")} optional={t("Optional")}>
          <input id="cf-company" name="company" autoComplete="organization" maxLength={160} value={fields.company} onChange={set("company")} className={cn(inputCls, "border-white/10")} />
        </Labelled>
      </div>

      <Labelled id="cf-country" label={t("Country")} optional={t("Optional")}>
        <select id="cf-country" name="country" autoComplete="country" value={chosenCountry} onChange={(e) => setCountry(e.target.value)}
          className={cn(inputCls, "border-white/10 [color-scheme:dark] [&>option]:bg-neutral-900")}>
          <option value="">{t("Choose your country")}</option>
          {countries.map((c) => <option key={c.code} value={c.code}>{`${c.flag} ${c.name}`}</option>)}
        </select>
      </Labelled>

      <Labelled id="cf-message" label={t("Message")} error={fieldErr("message")}>
        <textarea id="cf-message" name="message" rows={6} maxLength={4000} value={text}
          onChange={(e) => { setMessage(e.target.value); if (problem === "message") setProblem(null); }}
          aria-invalid={problem === "message"} aria-describedby={problem === "message" ? "cf-message-err" : undefined}
          className={cn(inputCls, border("message"), "resize-y leading-relaxed")} />
      </Labelled>

      {err && !problem ? <p role="alert" className="text-[14px] text-[#FF6666]">{err}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" disabled={status.state === "sending"}
          className="inline-flex h-[48px] items-center justify-center rounded-full bg-white px-8 text-[14px] font-medium text-black hover:bg-white/90 disabled:opacity-60">
          {status.state === "sending" ? t("Sending…") : quote ? t("Request a quotation") : t("Send message")}
        </button>
        <p className="text-[13px] text-white/40">{t("We use your details only to answer your message.")}</p>
      </div>
    </form>
  );
}

function Labelled({ id, label, optional, error, children }: { id: string; label: string; optional?: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline gap-2 text-[13px] font-medium text-white/70">
        {label}
        {optional ? <span className="text-[12px] font-normal text-white/35">{optional}</span> : null}
      </label>
      {children}
      {error ? <p id={`${id}-err`} role="alert" className="text-[13px] text-[#FF6666]">{error}</p> : null}
    </div>
  );
}
