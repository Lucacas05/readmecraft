import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnimatedHeroProps = {
  className?: string;
  rotatingWords?: string[];
  primaryCta?: {
    label: string;
    onClick: () => void;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
};

const DEFAULT_WORDS = ["clear", "local", "usable", "sharp"];

export function AnimatedHero({
  className,
  rotatingWords = DEFAULT_WORDS,
  primaryCta,
  secondaryCta,
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
            Pick structure, tone, presentation, and sections from one shared
            config object. The app stays chooser-only here, then hands the real
            repository inspection to your local IDE agent later.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Button size="lg" onClick={primaryCta?.onClick}>
            {primaryCta?.label ?? "Start with presets"}
          </Button>
          {secondaryCta ? (
            <Button
              variant="outline"
              size="lg"
              className="justify-between"
              onClick={secondaryCta.onClick}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
