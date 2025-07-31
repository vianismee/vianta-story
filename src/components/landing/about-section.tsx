import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Stories</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              About Our Journey
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to Vianta Story, where every cup of coffee tells a tale
              and every journey becomes an adventure worth sharing. We're
              passionate storytellers who believe that the best experiences
              happen in the most unexpected places.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From cozy neighborhood cafes to hidden travel gems, we explore the
              world one story at a time. Our mission is to inspire you to
              discover your own adventures and create memories that last a
              lifetime.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Cafes Visited</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Cities Explored</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}