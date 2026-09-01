import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page Not Found — Silverloft',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-paper px-6 pt-32 pb-20 text-center">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.035] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-ink/20" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
              Error 404
            </span>
            <span className="h-px w-6 bg-ink/20" />
          </div>

          {/* Large 404 display */}
          <h1 className="font-display text-[clamp(5rem,14vw,9rem)] leading-[0.85] tracking-[-0.07em] text-ink">
            404
          </h1>

          <h2 className="mt-6 text-xl font-medium tracking-tight text-ink sm:text-2xl">
            This page disappeared into the void.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/50 sm:text-base">
            The page you are looking for might have been moved, renamed, or never existed in the first place.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-all duration-300 hover:bg-ink/80 hover:shadow-lg hover:shadow-ink/10"
            >
              <span>Back to Home</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>

            <a
              href="mailto:contact@silverloft.me"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/70 backdrop-blur-sm transition-all duration-300 hover:border-ink/30 hover:bg-white hover:text-ink"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
