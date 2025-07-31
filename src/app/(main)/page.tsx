import { HeroSection } from "@/components/landing/hero-section";
import { FeaturedPosts } from "@/components/landing/featured-posts";
import { AboutSection } from "@/components/landing/about-section";
import { NewsletterSection } from "@/components/landing/newsletter-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedPosts />
      <AboutSection />
      <NewsletterSection />
    </main>
  );
}
