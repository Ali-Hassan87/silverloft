'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error for diagnostics
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-ink">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.03] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-ink/20" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
            System Notice
          </span>
          <span className="h-px w-6 bg-ink/20" />
        </div>

        <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Unexpected Error
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          An unexpected issue occurred while rendering this view. You can attempt to re-render or return to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all hover:bg-ink/80 hover:shadow-lg"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-full border border-ink/15 bg-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 backdrop-blur-sm transition-all hover:bg-white hover:text-ink"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
