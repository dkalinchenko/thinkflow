import AboutSectionOne from "@/components/About/AboutSectionOne";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Decision Matrix & Product Comparison Tool (Free, No Signup) | OptiMind",
  description: "Compare products side-by-side using a weighted decision matrix with AI suggestions. No account required. Private, browser-based, exportable results.",
  keywords: [
    "decision matrix",
    "weighted decision matrix",
    "decision matrix calculator",
    "weighted scoring model",
    "product comparison tool",
    "selection matrix",
    "Pugh matrix",
    "prioritization matrix",
    "AI decision making tool",
    "compare products side by side",
    "laptop comparison tool",
    "smartphone comparison tool",
    "product comparison",
    "decision matrix tool",
  ],
  openGraph: {
    title: "AI Decision Matrix & Product Comparison Tool (Free, No Signup) | OptiMind",
    description: "Compare products side-by-side using a weighted decision matrix with AI suggestions. No account required. Private, browser-based, exportable results.",
    type: "website",
    url: "https://optimind.space/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Decision Matrix & Product Comparison Tool (Free, No Signup) | OptiMind",
    description: "Compare products side-by-side using a weighted decision matrix with AI suggestions. No account required. Private, browser-based, exportable results.",
  },
  alternates: {
    canonical: "https://optimind.space/",
  },
};

export default function Home() {
  // Schema.org structured data for homepage
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OptiMind",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered decision matrix and product comparison tool. Compare products side-by-side using weighted scoring. Free, no signup required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    },
    "operatingSystem": "Web Browser",
    "url": "https://optimind.space",
    "screenshot": "https://optimind.space/images/hero/hero-image.svg"
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OptiMind",
    "url": "https://optimind.space",
    "logo": "https://optimind.space/images/logo/logo.svg",
    "description": "Free AI-powered decision matrix and product comparison tool",
    "sameAs": [
      "https://github.com/dkalinchenko/optimind"
    ]
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
    </>
  );
}
