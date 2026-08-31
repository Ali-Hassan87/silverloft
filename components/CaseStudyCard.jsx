'use client';

import { useState } from 'react';

import LiveDemoButton from './LiveDemoButton';
import { useInView } from '@/lib/useInView';

/*
|--------------------------------------------------------------------------
| PREMIUM PROJECT COLOR SYSTEM
|--------------------------------------------------------------------------
*/

const THEMES = {
  entertainment: {
    accent: '#E85D2A',
    secondary: '#FF9A5C',
    glow: 'rgba(232, 93, 42, 0.16)',
  },

  ai: {
    accent: '#C6283D',
    secondary: '#F06A78',
    glow: 'rgba(198, 40, 61, 0.16)',
  },

  productivity: {
    accent: '#173B67',
    secondary: '#4D78A8',
    glow: 'rgba(23, 59, 103, 0.16)',
  },
};

const VIDEO_EXT =
  /\.(mp4|webm|mov)$/i;

/*
|--------------------------------------------------------------------------
| FALLBACK
|--------------------------------------------------------------------------
*/

function MediaPlaceholder() {
  return (
    <div
      className="
        flex
        min-h-[220px]
        w-full
        items-center
        justify-center
        text-center
      "
    >
      <div>
        <div
          className="
            mx-auto
            mb-5
            h-10
            w-10
            rounded-full
            border
            border-ink/10
          "
        />

        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink/25">
          Preview coming soon
        </p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| CASE STUDY CARD
|--------------------------------------------------------------------------
*/

export default function CaseStudyCard({
  caseNumber,
  tags = [],
  title,
  subtitle,
  description,
  theme = 'entertainment',
  href = '#',
  videoSrc,
}) {
  /*
  --------------------------------------------------------------------------
  Seed with the real project video ratio (640/426 ≈ 1.50), not a guessed
  16/10 (1.6). The old guess caused a ~6% height snap on every card once
  the video's actual metadata loaded — a measured CLS contributor flagged
  by PageSpeed. Images fall back to their own measured ratio below anyway.
  --------------------------------------------------------------------------
  */
  const [ratio, setRatio] =
    useState(640 / 426);

  const [failed, setFailed] =
    useState(false);

  /*
  --------------------------------------------------------------------------
  Defer the (below-the-fold) preview video/image until its card is actually
  approaching the viewport, instead of every card's media downloading the
  moment the page loads. The media stage below already reserves its own
  space via aspectRatio, so this introduces no layout shift.
  --------------------------------------------------------------------------
  */
  const [mediaRef, mediaInView] = useInView(0.1);

  const colors =
    THEMES[theme] ||
    THEMES.entertainment;

  const isVideo =
    VIDEO_EXT.test(videoSrc || '');

  const showMedia =
    Boolean(videoSrc) && !failed;

  /*
  --------------------------------------------------------------------------
  Detect video aspect ratio
  --------------------------------------------------------------------------
  */

  const handleVideoMeta = (event) => {
    const {
      videoWidth,
      videoHeight,
    } = event.currentTarget;

    if (videoWidth && videoHeight) {
      setRatio(
        videoWidth / videoHeight
      );
    }
  };

  /*
  --------------------------------------------------------------------------
  Detect image aspect ratio
  --------------------------------------------------------------------------
  */

  const handleImageLoad = (event) => {
    const {
      naturalWidth,
      naturalHeight,
    } = event.currentTarget;

    if (naturalWidth && naturalHeight) {
      setRatio(
        naturalWidth / naturalHeight
      );
    }
  };

  return (
    <article
      className="
        group
        relative
        min-h-[620px]
        overflow-hidden
        rounded-[30px]
        border
        border-black/[0.07]
        bg-[#F2F0EB]
        shadow-[0_35px_100px_-45px_rgba(0,0,0,0.32)]
        sm:min-h-[720px]
        sm:rounded-[42px]
      "
      style={{
        '--accent': colors.accent,
        '--secondary': colors.secondary,
      }}
    >
      {/* ================================================================
          AMBIENT COLOR WASH
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-[480px]
          w-[480px]
          rounded-full
          opacity-60
          blur-[110px]
          transition-all
          duration-[1200ms]
          ease-out
          group-hover:scale-125
          group-hover:opacity-80
        "
        style={{
          background: colors.glow,
        }}
      />

      {/* ================================================================
          SUBTLE BOTTOM GRADIENT
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[55%]
          w-full
          opacity-60
        "
        style={{
          background: `
            linear-gradient(
              to top,
              ${colors.glow},
              transparent 70%
            )
          `,
        }}
      />

      {/* ================================================================
          GRAIN
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          opacity-[0.025]
          mix-blend-multiply
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.45%22/%3E%3C/svg%3E")',
        }}
      />

      {/* ================================================================
          TOP NAV / META
          ================================================================ */}

      <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-9">
        <div className="flex items-center gap-3">
          <span
            className="
              h-2
              w-2
              rounded-full
              transition-transform
              duration-500
              group-hover:scale-150
            "
            style={{
              backgroundColor:
                colors.accent,

              boxShadow:
                `0 0 20px ${colors.accent}66`,
            }}
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ink/40">
            Case {caseNumber}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[8px] font-semibold uppercase tracking-[0.2em] text-ink/20 sm:block">
            Digital experience
          </span>

          <span className="font-display text-[10px] text-ink/20">
            2026
          </span>
        </div>
      </header>

      {/* ================================================================
          GIANT BACKGROUND NUMBER
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-4
          top-4
          select-none
          font-display
          text-[clamp(8rem,20vw,17rem)]
          leading-none
          tracking-[-0.1em]
          text-ink/[0.035]
          transition-transform
          duration-[1200ms]
          ease-out
          group-hover:translate-x-4
          group-hover:-translate-y-3
        "
      >
        {caseNumber}
      </div>

      {/* ================================================================
          MAIN CONTENT
          ================================================================ */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[620px]
          flex-col
          justify-between
          px-6
          pb-7
          pt-12
          sm:min-h-[720px]
          sm:px-10
          sm:pb-10
          sm:pt-16
        "
      >
        {/* ================================================================
            TITLE AREA
            ================================================================ */}

        <div className="max-w-4xl">
          {/* Category */}
          <div className="mb-6 overflow-hidden">
            <span
              className="
                inline-flex
                items-center
                gap-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-ink/35
                transition-transform
                duration-700
                group-hover:-translate-y-1
              "
            >
              <span
                className="h-px w-6"
                style={{
                  backgroundColor:
                    colors.accent,
                }}
              />

              Digital product
            </span>
          </div>

          {/* ============================================================
              TITLE
              ============================================================ */}

          <h3
            className="
              max-w-4xl
              font-display
              text-[clamp(2.8rem,6vw,6.8rem)]
              leading-[0.84]
              tracking-[-0.07em]
              text-ink
            "
          >
            {title}
          </h3>

          {/* ============================================================
              SUBTITLE
              ============================================================ */}

          <div className="mt-6 flex items-center gap-4">
            <span
              className="
                h-px
                w-8
                transition-all
                duration-700
                group-hover:w-16
              "
              style={{
                backgroundColor:
                  colors.accent,
              }}
            />

            <p className="font-display text-base italic tracking-[-0.02em] text-ink/45 sm:text-xl">
              {subtitle}
            </p>
          </div>

          {/* ============================================================
              DESCRIPTION
              ============================================================ */}

          {description && (
            <p className="mt-6 max-w-md text-[12px] leading-6 text-ink/35 sm:text-[13px]">
              {description}
            </p>
          )}

          {/* ============================================================
              TAGS
              ============================================================ */}

          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-black/[0.07]
                  bg-white/20
                  px-3
                  py-1.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.17em]
                  text-ink/40
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:bg-white/50
                  hover:text-ink/70
                "
                style={{
                  transitionDelay:
                    `${index * 50}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ================================================================
            VISUAL + SIDE LABEL
            ================================================================ */}

        <div className="relative mt-12 flex items-end gap-5 sm:mt-16 sm:gap-8">
          {/* --------------------------------------------------------------
              Side project marker
              -------------------------------------------------------------- */}

          <div className="hidden shrink-0 flex-col items-center gap-3 pb-3 sm:flex">
            <span
              className="h-14 w-px"
              style={{
                background: `
                  linear-gradient(
                    to bottom,
                    transparent,
                    ${colors.accent}
                  )
                `,
              }}
            />

            <span
              className="
                font-display
                text-[8px]
                text-ink/25
                [writing-mode:vertical-rl]
              "
            >
              PROJECT {caseNumber}
            </span>
          </div>

          {/* ================================================================
              DIRECT MEDIA STAGE
              
              IMPORTANT:
              There is NO white image wrapper here.
              The media itself sits directly in the visual stage.
              ================================================================ */}

          <div className="relative ml-auto w-full max-w-[780px]">
            {/* Ambient media glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-8
                rounded-[50px]
                opacity-0
                blur-[55px]
                transition-opacity
                duration-1000
                group-hover:opacity-50
              "
              style={{
                background:
                  colors.glow,
              }}
            />

            {/* ============================================================
                MEDIA STAGE
                No white background.
                No fake frame.
                No nested image card.
                ============================================================ */}

            <div
              ref={mediaRef}
              className="
                relative
                overflow-hidden
                rounded-[22px]
                sm:rounded-[30px]
              "
              style={{
                aspectRatio: ratio,
              }}
            >
              {/* Soft accent reflection */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  z-20
                  h-52
                  w-52
                  rounded-full
                  opacity-20
                  blur-[70px]
                "
                style={{
                  backgroundColor:
                    colors.accent,
                }}
              />

              {/* ==========================================================
                  IMAGE / VIDEO DIRECTLY INSIDE THE MEDIA STAGE
                  ========================================================== */}

              {showMedia ? (
                isVideo ? (
                  mediaInView && (
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={
                      handleVideoMeta
                    }
                    onError={() =>
                      setFailed(true)
                    }
                    className="
                      block
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-[1600ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-[1.035]
                    "
                  />
                  )
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={videoSrc}
                    alt={`${title} preview`}
                    loading="lazy"
                    decoding="async"
                    onLoad={
                      handleImageLoad
                    }
                    onError={() =>
                      setFailed(true)
                    }
                    className="
                      block
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-[1600ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-[1.035]
                    "
                  />
                )
              ) : (
                <MediaPlaceholder />
              )}

              {/* ==========================================================
                  SCAN LINE / MICRO DETAIL
                  ========================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  h-px
                  opacity-40
                "
                style={{
                  backgroundColor:
                    colors.accent,
                }}
              />
            </div>

            {/* ============================================================
                FLOATING PROJECT NUMBER
                ============================================================ */}

            <div
              className="
                pointer-events-none
                absolute
                -bottom-4
                -left-4
                z-30
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-black/[0.08]
                bg-[#F2F0EB]
                font-display
                text-[11px]
                text-ink/50
                shadow-[0_15px_40px_-20px_rgba(0,0,0,0.4)]
                transition-transform
                duration-700
                group-hover:-translate-y-1
                group-hover:rotate-6
                sm:-bottom-5
                sm:-left-5
                sm:h-16
                sm:w-16
              "
            >
              0{caseNumber}
            </div>
          </div>
        </div>

        {/* ================================================================
            FOOTER
            ================================================================ */}

        <footer className="mt-10 flex items-center justify-between">
          <div className="hidden sm:block">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-ink/20">
              Crafted with intent
            </span>
          </div>

          <div className="ml-auto">
            <LiveDemoButton
              href={href}
              theme={theme}
            />
          </div>
        </footer>
      </div>

      {/* ================================================================
          HOVER EDGE
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-8
          bottom-0
          h-px
          origin-left
          scale-x-0
          transition-transform
          duration-1000
          group-hover:scale-x-100
        "
        style={{
          backgroundColor:
            colors.accent,
        }}
      />
    </article>
  );
}