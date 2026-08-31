'use client';

import { useInView } from '@/lib/useInView';

const STATS = [
  { label: 'Founders', value: '03' },
  { label: 'Studios', value: '01' },
  { label: 'Handoffs', value: '00' }
];

export default function AboutManifesto() {
  const [quoteRef, quoteInView] = useInView();
  const [bodyRef, bodyInView] = useInView();
  const [statsRef, statsInView] = useInView();

  return (
    <section className="mx-auto mt-28 max-w-5xl px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div
          ref={quoteRef}
          className={`transition-all duration-700 ease-out md:col-span-5 ${
            quoteInView ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
            Our Approach
          </p>
          <p className="mt-4 border-l-2 border-accent/40 pl-5 font-display text-2xl italic leading-snug text-ink sm:text-3xl">
            The person who designs it is the person who ships it.
          </p>
        </div>

        <div
          ref={bodyRef}
          style={{ transitionDelay: bodyInView ? '100ms' : '0ms' }}
          className={`space-y-5 text-base leading-relaxed text-ink/60 transition-all duration-700 ease-out md:col-span-7 md:text-lg ${
            bodyInView ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}
        >
          <p>
            We&apos;re Silverloft — three full-stack developers who started
            the studio we wished we could hire. We handle research and UI, a
            real React and Next.js front end, a working back end behind it,
            and a deploy pipeline that keeps it fast. No telephone game
            between a designer and a developer.
          </p>
          <p>
            Websites are where we started. Games, cybersecurity, and apps
            are next.
          </p>
        </div>
      </div>

      <div
        ref={statsRef}
        style={{ transitionDelay: statsInView ? '200ms' : '0ms' }}
        className={`mt-16 grid grid-cols-3 divide-x divide-paper/10 overflow-hidden rounded-2xl bg-graphite transition-all duration-700 ease-out ${
          statsInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-6">
            <span className="font-display text-3xl text-silver sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper/50">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}