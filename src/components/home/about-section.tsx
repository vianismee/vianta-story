import Image from "next/image";

export function AboutSection() {
  return (
    <section className="pt-4 pb-15 bg-secondary/20 rounded-t-4xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-500"></div>
            <div className="absolute -bottom-6 -right-6 w-32 aspect-square bg-primary rounded-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <Image
                  src="/asset/primary-logo.png"
                  alt="Logo"
                  width={70}
                  height={40}
                  className="object-contain invert"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Tentang Cerita Kami
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Selamat datang di VIANTASTORY. Bagi kami, setiap tempat memiliki
              momen dan cerita yang wajib diabadikan. Kami percaya bahwa setiap
              cangkir kopi punya kisah, dan setiap sudut kota adalah awal dari
              sebuah petualangan baru.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dari kafe-kafe hangat di jantung kota Malang hingga resto otentik
              di gang-gang kecil, kami menjelajahi setiap jengkalnya, satu
              cerita pada satu waktu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
