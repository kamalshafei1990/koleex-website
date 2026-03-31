import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ---------------------------------------------------------------------------
   Root Layout — Global wrapper applied to every page.
   - <Header /> is fixed/sticky, so <main> gets a top padding offset.
   - <Footer /> sits below the main content.
   --------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    default: "Koleex International Group",
    template: "%s | Koleex International Group",
  },
  description:
    "Koleex International Group is a global industrial technology company specializing in precision machinery, automation systems, and technology-driven solutions for manufacturing and industrial sectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black text-white">
        <Header />
        <main className="min-h-screen pt-[var(--header-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
