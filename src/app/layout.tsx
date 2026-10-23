import type { Metadata } from "next";
import { Inter_Tight, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Vini Corporate | Solar Panel Dealer & Installation, Gorakhpur";
const description =
  "Vini Corporate — trusted solar panel distributor & installation company in Golghar, Gorakhpur. Residential, commercial & industrial solar systems, batteries & rooftop solutions. 350+ happy customers, 15 awards.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vinicorporate.com"),
  title: {
    default: title,
    template: "%s | Vini Corporate",
  },
  description,
  keywords: [
    "solar panel Gorakhpur",
    "solar installation Gorakhpur",
    "solar company Golghar",
    "Vini Corporate",
    "rooftop solar UP",
    "solar dealer Gorakhpur",
  ],
  openGraph: {
    title,
    description,
    url: "https://vinicorporate.com",
    siteName: "Vini Corporate",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="grain min-h-full flex flex-col bg-night text-warm">
        {children}
      </body>
    </html>
  );
}
