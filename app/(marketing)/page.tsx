import type { Metadata } from "next";
import { MilestoneStepper } from "@/components/ui/milestone-stepper";
import { StatusChip } from "@/components/ui/status-chip";

export const metadata: Metadata = { title: "Client delivery portal" };

/**
 * PLACEHOLDER. The real landing page (Stitch: landing_page_desktop and
 * landing_page_mobile) is not built yet. This page shows the shared primitives
 * so they can be checked in a browser.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <p className="text-label-md text-primary">Cadence</p>
        <h1 className="text-headline-lg text-ink sm:text-headline-xl">Client delivery portal</h1>
        <p className="max-w-prose text-body-lg text-ink-muted">
          Proposals, scope sign-off, milestone payments and deliverables in one place.
        </p>
      </header>

      <section aria-labelledby="preview-heading" className="flex flex-col gap-6">
        <h2 id="preview-heading" className="text-headline-md text-ink">
          Component preview
        </h2>
        <div className="rounded-card border border-border bg-surface p-4 sm:p-6">
          <MilestoneStepper currentIndex={2} timestamps={["14 Nov 2026, 16:40"]} />
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusChip tone="waiting" />
          <StatusChip tone="done" />
          <StatusChip tone="critical" />
        </div>
      </section>
    </main>
  );
}
