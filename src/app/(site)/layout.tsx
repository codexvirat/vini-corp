import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import MobileCTABar from "@/components/MobileCTABar";
import PageTransition from "@/components/PageTransition";
import IntroLoader from "@/components/IntroLoader";
import { siteSettings } from "@/lib/data";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteSettings.legalName,
  alternateName: siteSettings.name,
  image: "https://vinicorporate.com/og-image.jpg",
  url: "https://vinicorporate.com",
  telephone: siteSettings.phone,
  email: siteSettings.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteSettings.address,
    addressLocality: "Gorakhpur",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  foundingDate: String(siteSettings.founded),
  sameAs: [siteSettings.instagram],
  areaServed: {
    "@type": "City",
    name: "Gorakhpur",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <IntroLoader />
      <ScrollProgress />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <MobileCTABar />
    </>
  );
}
