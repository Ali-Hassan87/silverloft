'use client';

/*
|--------------------------------------------------------------------------
| LIVE DEMO ACCENTS
|--------------------------------------------------------------------------
| Same color language as the CaseStudyCard themes:
|
| Entertainment → Deep Orange / Orange-Red
| AI            → Premium Crimson Red
| Productivity  → Deep Navy Blue
|--------------------------------------------------------------------------
*/

const ACCENTS = {
  entertainment: 'bg-[#E85D2A]',
  ai: 'bg-[#C6283D]',
  productivity: 'bg-[#173B67]',
};

import { trackEvent } from '@/lib/analytics';

export default function LiveDemoButton({
  href = '#',
  label = 'Live Demo',
  theme = 'entertainment',
}) {
  const isPlaceholder = href === '#';

  /*
  --------------------------------------------------------------------------
  | Get project-specific accent
  |--------------------------------------------------------------------------
  */

  const fill =
    ACCENTS[theme] ??
    ACCENTS.entertainment;

  return (
    <a
      href={href}
      target={
        isPlaceholder
          ? undefined
          : '_blank'
      }
      rel={
        isPlaceholder
          ? undefined
          : 'noreferrer'
      }
      onClick={(e) => {
        if (isPlaceholder) {
          e.preventDefault();
        } else {
          trackEvent('live_demo_click', {
            url: href,
            label,
            theme,
          });
        }
      }}
      aria-disabled={isPlaceholder}
      className={`
        group
        relative
        inline-flex
        items-center
        gap-2.5
        overflow-hidden
        rounded-full
        border
        border-ink
        px-6
        py-2.5
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-ink
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          isPlaceholder
            ? 'cursor-default opacity-50'
            : `
              hover:-translate-y-1
              hover:border-transparent
              hover:shadow-[0_14px_35px_-10px_rgba(0,0,0,0.35)]
            `
        }
      `}
    >
      {/* ================================================================
          COLOR FILL
          ================================================================
          The project accent sweeps upward from the bottom.
          Each project automatically gets its own color.
          ================================================================ */}

      <span
        className={`
          absolute
          inset-0
          -z-10
          origin-bottom
          scale-y-0
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-y-100
          ${fill}
        `}
      />

      {/* ================================================================
          LABEL
          ================================================================ */}

      <span
        className="
          relative
          z-10
          transition-colors
          duration-500
          group-hover:text-white
        "
      >
        {label}
      </span>

      {/* ================================================================
          ARROW
          ================================================================ */}

      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        className="
          relative
          z-10
          transition-all
          duration-500
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
          group-hover:text-white
        "
        aria-hidden="true"
      >
        <path
          d="M2.5 9.5 9.5 2.5M9.5 2.5H4M9.5 2.5V8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ================================================================
          SUBTLE HOVER SHINE
          ================================================================ */}

      {!isPlaceholder && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-1/2
            w-1/3
            -skew-x-12
            bg-white/20
            opacity-0
            transition-all
            duration-700
            group-hover:left-[120%]
            group-hover:opacity-100
          "
        />
      )}
    </a>
  );
}