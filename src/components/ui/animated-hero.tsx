import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnimatedHeroProps = {
  className?: string;
  rotatingWords?: string[];
};

const DEFAULT_WORDS = ["clear", "local", "usable", "sharp"];

export function AnimatedHero({
  className,
  rotatingWords = DEFAULT_WORDS,
}: AnimatedHeroProps) {
  const words = useMemo(
    () => (rotatingWords.length > 0 ? rotatingWords : DEFAULT_WORDS),
    [rotatingWords],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % words.length);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, words.length]);

  return (
    <section className={cn("section-shell overflow-hidden", className)}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl space-y-6">
          <span className="eyebrow">Chooser-first README setup</span>

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Backend-free MVP · local agent handoff later
            </p>

            <h1 className="text-balance text-5xl leading-none sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Build a README prompt that stays
              <span className="relative mt-3 block min-h-[1.1em] text-primary">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[activeIndex]}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -22 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="block"
                  >
                    {words[activeIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>

          <p className="support-copy">
            Pick structure, tone, and presentation later from one shared config.
            This first slice locks the visual language now so the product feels
            like a postered tool, not a soft dashboard.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Button size="lg">Start with presets</Button>
          <Button variant="outline" size="lg" className="justify-between">
            Adapted from references
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
