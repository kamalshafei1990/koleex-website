import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hubTaxonomy } from "@/lib/hub";
import { productsMenuFrom } from "@/data/navigation";

/* ---------------------------------------------------------------------------
   Root Layout — Global wrapper applied to every page.
   - <Header /> is fixed/sticky, so <main> gets a top padding offset.
   - <Footer /> sits below the main content.
   - The products menu (header and footer) is the Koleex Hub's taxonomy, read
     once here on the server and cached under the "taxonomy" tag.
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: "Koleex International Group",
    template: "%s | Koleex International Group",
  },
  description:
    "Koleex International Group is a global industrial technology company specializing in precision machinery, automation systems, and technology-driven solutions for manufacturing and industrial sectors.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productsMenu = productsMenuFrom(await hubTaxonomy());
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black text-white">
        <Header productsMenu={productsMenu} />
        <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
        <Footer productsMenu={productsMenu} />
      </body>
    </html>
  );
}
