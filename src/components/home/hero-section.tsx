import Link from "next/link";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mb-9">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-600"></div>
      </div>
      <div className="relative items-center flex flex-col space-y-6 z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <Image
          src="/asset/primary-logo.png"
          alt="Logo"
          width={70}
          height={40}
          className="object-contain invert scale-110"
        />
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          <span className="block text-white">VIANTA STORY</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Bingung mau ngopi di mana? kami punya list kafe & spot kuliner hidden
          gem di Malang yang wajib kamu cobain!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/blog">
            <InteractiveHoverButton className="text-lg px-8 py-3">
              Explor Our Story
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
