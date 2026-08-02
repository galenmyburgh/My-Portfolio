import Link from "next/link";

import { ScatteredConstellation } from "@/components/constellation/scattered";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <ScatteredConstellation />

      <p className="mt-8 font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        This node doesn&apos;t exist
      </h1>
      <p className="mt-3 text-pretty text-muted">
        The constellation came apart. Whatever you were looking for either moved or was
        never here.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
        >
          Back to the start
        </Link>
        <Link
          href="/work"
          className="rounded-lg border border-edge px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          See the work
        </Link>
      </div>
    </div>
  );
}
