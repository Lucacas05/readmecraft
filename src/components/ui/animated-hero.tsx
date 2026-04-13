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
};

const DEFAULT_WORDS = ["clear", "local", "usable", "sharp"];

export function AnimatedHero({
  className,
  rotatingWords = DEFAULT_WORDS,
  primaryCta,
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
      <div className="flex flex-col items-center gap-10 text-center">
        <h1 className="text-balance text-6xl leading-none sm:text-7xl md:text-8xl lg:text-[7rem]">
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

        <Button size="lg" onClick={primaryCta?.onClick}>
          {primaryCta?.label ?? "Start building"}
        </Button>
      </div>
    </section>
  );
}
