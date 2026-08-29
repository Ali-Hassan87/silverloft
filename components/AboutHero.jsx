'use client';

import { useInView } from '../lib/useInView';

export default function AboutHero() {
  const [badgeRef, badgeInView] = useInView();
  const [titleRef, titleInView] = useInView();
  const [subRef, subInView] = useInView();

  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-8 text-center">
      {/* Ghost wordmark — huge, near-invisible "S" behind the headline */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 -translate-x-1/2 select-none font-display italic text-[200px] leading-none text-ink/[0.04] sm:text-[260px]"
      >
        S
      </span>

      {/* Brushed-metal sheen — echoes the diamond logo's silver/steel tone */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-[380px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-silver/25 via-steel/10 to-transparent blur-3xl"
      />

      <div
        ref={badgeRef}
        className={`mb-6 flex items-center gap-3 transition-all duration-700 ease-out ${
          badgeInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Diamond mark — same motif as the logo, not a generic dot */}
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
          Digital Studio · Rawalpindi
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
      </div>

      <h1
        ref={titleRef}
        className={`font-display text-5xl leading-[1.05] text-ink transition-all duration-700 ease-out sm:text-6xl md:text-7xl ${
          titleInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        About Silverloft
      </h1>

      <p
        ref={subRef}
        style={{ transitionDelay: subInView ? '150ms' : '0ms' }}
        className={`mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink/60 transition-all duration-700 ease-out ${
          subInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        Three full-stack developers. One studio. No handoffs between the
        person who designs it and the person who ships it.
      </p>
    </section>
  );
}