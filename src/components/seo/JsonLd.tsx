import { hubCompany } from "@/lib/hub";
import { siteUrl } from "@/i18n/config";

/* Structured data for search engines (schema.org JSON-LD). Written as text
   the page cannot run: "<" is escaped so no value can close the script. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/* The company, from the Hub's own record (the papers' address, phones and
   email). Nothing until the Hub answers. */
export async function OrganizationJsonLd() {
  const company = await hubCompany();
  if (!company) return null;
  const base = siteUrl();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.name,
        legalName: company.legalName,
        url: base,
        logo: `${base}/logo-black.png`,
        slogan: company.slogan,
        email: company.email,
        telephone: company.tel,
        foundingDate: company.brandEstablished,
        address: { "@type": "PostalAddress", streetAddress: company.address, addressLocality: "Taizhou", addressRegion: "Zhejiang", addressCountry: "CN" },
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: company.email, telephone: company.tel, availableLanguage: ["English", "Arabic", "Chinese"] }],
      }}
    />
  );
}
