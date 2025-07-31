"use client";

import { AboutSection } from "@/components/home/about-section";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="max-w-5xl mt-5 md:mt-0 mx-auto min-h-screen">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
