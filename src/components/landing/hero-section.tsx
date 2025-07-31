"use client";

import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
       
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          Welcome to
          <span className="block text-secondary">Vianta Story</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover cozy cafes, hidden gems, and inspiring stories from our
          adventures around the world. Every journey has a story worth telling.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/blog">
            <InteractiveHoverButton className="text-lg px-8 py-3">
              Explore Our Stories
            </InteractiveHoverButton>
          </Link>
          <Link
            href="/blog"
            className="text-white hover:text-secondary transition-colors duration-300 text-lg font-medium underline underline-offset-4"
          >
            Read Latest Posts
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}