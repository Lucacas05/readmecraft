import type { ReactNode } from "react";

type AppShellProps = {
  hero?: ReactNode;
  configurator: ReactNode;
  outputs: ReactNode;
};

export function AppShell({ hero, configurator, outputs }: AppShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      {hero}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(24rem,0.92fr)] xl:items-stretch">
        {configurator}
        {outputs}
      </section>
    </main>
  );
}
