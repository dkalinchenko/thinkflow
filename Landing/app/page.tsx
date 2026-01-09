import AboutSectionOne from "@/components/About/AboutSectionOne";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OptiMind - AI-Powered Decision Matrix for Smart Product Comparisons",
  description: "Compare products side-by-side with AI suggestions. Make confident purchase decisions using weighted criteria. No sign-up required. Free forever.",
  keywords: ["decision matrix", "product comparison", "AI shopping assistant", "smart decisions", "product research", "comparison tool"],
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionOne />
    </>
  );
}
