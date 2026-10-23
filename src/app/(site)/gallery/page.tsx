import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | Vini Corporate",
  description:
    "Browse recent solar installations by Vini Corporate — residential, commercial and industrial projects across Gorakhpur.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Installation"
        accent="gallery."
        image="/images/solar-grid-aerial.jpg"
        subtitle="A look at recent residential, commercial and industrial solar projects."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="relative bg-night py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
