import { AboutNav } from "@/components/about/AboutNav";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AboutNav />
      {children}
    </>
  );
}
