import { useNavigate } from "react-router-dom";

import { HowItWorks } from "@/components/landing/HowItWorks";
import { AnimatedHero } from "@/components/ui/animated-hero";

export function LandingPage() {
  const navigate = useNavigate();
  const goToBuilder = () => navigate("/builder");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-4 py-6 md:px-6 md:py-10">
      <AnimatedHero
        primaryCta={{ label: "Start building", onClick: goToBuilder }}
      />
      <HowItWorks />
    </main>
  );
}
