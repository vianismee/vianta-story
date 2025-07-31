"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate newsletter signup
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Stay Connected
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss a story. Get the latest
          adventures, cafe recommendations, and travel tips delivered straight
          to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-foreground"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>

        <p className="text-sm opacity-70 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}