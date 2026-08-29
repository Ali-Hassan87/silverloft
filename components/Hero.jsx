'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import RotatingWord, { TIER_ACCENT_HEX } from './RotatingWord';
import CardCarouselBackground from './CardCarouselBackground';
import LoaderOrb from './LoaderOrb';

import { arcLetterStyle } from '@/lib/textCurve';

const STATIC_WORD = 'Websites';

/* =============================================================
   RESPONSIVE ARC AMPLITUDE
   ============================================================= */

function getArcAmplitude(width) {
  if (width < 640) {
    return {
      depth: 18,
      rotation: 4.5,
    };
  }

  if (width < 1024) {
    return {
      depth: 26,
      rotation: 5,
    };
  }

  return {
    depth: 40,
    rotation: 5.5,
  };
}

/* =============================================================
   FOOT-LABEL ARC
   ============================================================= */

function footArcStyle(index, total) {
  if (total <= 1) {
    return {
      display: 'inline-block',
    };
  }

  const progress = index / (total - 1);
  const centered = progress - 0.5;

  const rotate = centered * 9;
  const lift =
    Math.cos(centered * Math.PI) * 4.5;

  return {
    display: 'inline-block',
    transform: `
      translateY(${-lift}px)
      rotate(${rotate}deg)
    `,
  };
}

function ArcLabel({
  text,
  delayBase = 0,
}) {
  const chars = text.split('');

  return (
    <>
      {chars.map((char, i) => (
        <span
          key={`${text}-${i}`}
          style={footArcStyle(
            i,
            chars.length
          )}
        >
          <span
            className="foot-letter inline-block"
            style={{
              animationDelay: `${delayBase + i * 16}ms`,
            }}
          >
            {char === ' '
              ? '\u00A0'
              : char}
          </span>
        </span>
      ))}
    </>
  );
}

/* =============================================================
   HERO
   ============================================================= */

export default function Hero() {
  const [rotatingWordLen, setRotatingWordLen] =
    useState(5);

  const [accentColor, setAccentColor] =
    useState(TIER_ACCENT_HEX.Basic);

  const [arcAmplitude, setArcAmplitude] =
    useState({
      depth: 40,
      rotation: 5.5,
    });

  /* =============================================================
     ROTATING WORD
     ============================================================= */

  const handleWordChange = useCallback(
    (word) => {
      setRotatingWordLen(word.length);

      setAccentColor(
        TIER_ACCENT_HEX[word] ??
          TIER_ACCENT_HEX.Basic
      );
    },
    []
  );

  /* =============================================================
     RESPONSIVE ARC
     ============================================================= */

  useEffect(() => {
    const measure = () => {
      setArcAmplitude(
        getArcAmplitude(
          window.innerWidth
        )
      );
    };

    measure();

    window.addEventListener(
      'resize',
      measure,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        'resize',
        measure
      );
    };
  }, []);

  const totalLetters =
    rotatingWordLen +
    1 +
    STATIC_WORD.length;

  const staticStartIndex =
    rotatingWordLen + 1;

  return (
    <section
      className="
        hero-section
        relative
        flex
        min-h-0
        flex-col
        overflow-hidden
        pt-24

        sm:pt-28

        md:min-h-[100svh]
      "
    >
      {/* =========================================================
          AMBIENT DEPTH
          ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* Left warm glow */}

        <div
          className="
            blob-drift-a
            absolute
            -left-24
            top-6
            h-72
            w-72
            rounded-full
            bg-gradient-to-br
            from-amber-200/25
            via-orange-100/15
            to-transparent
            blur-3xl
          "
        />

        {/* Right cool glow */}

        <div
          className="
            blob-drift-b
            absolute
            -right-20
            top-44
            h-80
            w-80
            rounded-full
            bg-gradient-to-bl
            from-sky-200/20
            via-indigo-100/10
            to-transparent
            blur-3xl
          "
        />

        {/* Very subtle center atmosphere */}

        <div
          className="
            absolute
            left-1/2
            top-[38%]
            h-[280px]
            w-[520px]
            -translate-x-1/2
            rounded-full
            bg-white/15
            blur-[100px]
          "
        />
      </div>

      {/* =========================================================
          CAROUSEL BACKGROUND

          DESKTOP:
          - More vertical room
          - Phones no longer cut at bottom
          - Wide composition
          - Sits below headline

          MOBILE:
          Existing responsive structure preserved.
          ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[145px]
          z-0
          h-[330px]
          origin-top
          scale-[0.78]

          sm:top-[155px]
          sm:h-[430px]
          sm:scale-[0.82]

          md:top-[175px]
          md:h-[560px]
          md:scale-[0.86]

          lg:top-[188px]
          lg:h-[650px]
          lg:scale-[0.82]

          xl:top-[195px]
          xl:h-[675px]
          xl:scale-[0.84]

          2xl:top-[198px]
          2xl:h-[700px]
          2xl:scale-[0.87]
        "
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',

          maskImage:
            'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <CardCarouselBackground />
      </div>

      {/* =========================================================
          STATUS PILL
          ========================================================= */}

      <div
        className="
          hero-fade-in
          relative
          z-40
          mx-auto
          mb-2
        "
        style={{
          animationDelay: '0ms',
        }}
      >
        <div
          className="
            mx-auto
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-ink/10
            bg-paper/75
            px-3
            py-1
            text-[11px]
            font-medium
            text-ink/60
            shadow-sm
            backdrop-blur-md
          "
        >
          <span
            className="
              relative
              flex
              h-2
              w-2
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-emerald-400
                opacity-75
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2
                w-2
                rounded-full
                bg-emerald-500
              "
            />
          </span>

          Available for new projects
        </div>
      </div>

      {/* =========================================================
          HEADLINE

          Kept ABOVE the phones.
          ========================================================= */}

      <div
        className="
          hero-fade-in
          relative
          z-40
          mx-auto
          w-full
          max-w-6xl
          px-6
          text-center
        "
        style={{
          animationDelay: '80ms',
        }}
      >
        <h1
          className="
            hero-headline
            overflow-visible
            font-display
            leading-[0.92]
            tracking-tight
            text-ink
          "
        >
          <div
            className="
              flex
              flex-nowrap
              items-baseline
              justify-center
              gap-x-1.5
              text-[clamp(1.6rem,8vw,2.5rem)]

              sm:gap-x-3
              sm:text-[clamp(2.25rem,7vw,3.25rem)]

              md:gap-x-4
              md:text-[5rem]

              lg:text-[5.2rem]

              xl:text-[5.5rem]
            "
          >
            <RotatingWord
              curveTotal={totalLetters}
              onWordChange={
                handleWordChange
              }
              arcDepth={
                arcAmplitude.depth
              }
              arcRotation={
                arcAmplitude.rotation
              }
            />

            <span
              className="
                inline-flex
                shrink-0
              "
            >
              {STATIC_WORD.split('').map(
                (char, index) => (
                  <span
                    key={`ws-${index}`}
                    className="
                      shrink-0
                    "
                    style={arcLetterStyle(
                      staticStartIndex +
                        index,
                      totalLetters,
                      arcAmplitude
                    )}
                  >
                    <span
                      className="
                        static-shine
                        inline-block
                      "
                      style={{
                        animationDelay: `${index * 90}ms`,
                      }}
                    >
                      {char}
                    </span>
                  </span>
                )
              )}
            </span>
          </div>
        </h1>
      </div>

      {/* =========================================================
          CHARACTER AREA

          IMPORTANT:
          Desktop character is pushed down so its head doesn't
          collide with the headline.
          ========================================================= */}

      <div
        className="
          pointer-events-none
          relative
          z-30
          mx-auto
          mt-[-2px]
          flex
          w-full
          max-w-6xl
          flex-none
          items-end
          justify-center
          px-6
          pb-0

          sm:mt-[-8px]
          sm:pb-3

          md:mt-[-18px]
          md:flex-1
          md:pb-17

          lg:mt-[-10px]
          lg:pb-6

          xl:mt-[-8px]
          xl:pb-4
        "
      >
        <div
          className="
            relative
            flex
            w-full
            max-w-2xl
            flex-col
            items-center
          "
        >
          {/* =====================================================
              FADE-IN
              ===================================================== */}

          <div
            className="
              hero-fade-in
              relative
            "
            style={{
              animationDelay: '160ms',
            }}
          >
            {/* ===================================================
                CHARACTER POSITION
                =================================================== */}

            <div
              className="
                relative
                translate-y-[10px]

                sm:translate-y-[8px]

                md:translate-y-[30px]

                lg:translate-y-[32px]

                xl:translate-y-[38px]

                2xl:translate-y-[42px]
              "
            >
              {/* =================================================
                  CHARACTER GLOW
                  ================================================= */}

              <div
                className="
                  glow-pulse
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  z-0
                  h-[210px]
                  w-[210px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-gradient-to-br
                  from-ink/10
                  via-ink/5
                  to-transparent
                  blur-3xl

                  sm:h-[260px]
                  sm:w-[260px]

                  md:h-[340px]
                  md:w-[340px]

                  lg:h-[360px]
                  lg:w-[360px]
                "
              />

              {/* =================================================
                  TOP RIGHT BADGE
                  ================================================= */}

              <div
                className="
                  float-1
                  pointer-events-none
                  absolute
                  -right-1
                  top-3
                  z-40
                  rounded-full
                  border
                  border-ink/10
                  bg-paper/80
                  px-2
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-ink/70
                  shadow-md
                  backdrop-blur-md

                  sm:-right-8
                  sm:top-10
                  sm:px-3
                  sm:py-1.5
                  sm:text-[10px]
                "
              >
                Custom-Built ⚡
              </div>

              {/* =================================================
                  BOTTOM LEFT BADGE
                  ================================================= */}

              <div
                className="
                  float-2
                  pointer-events-none
                  absolute
                  -left-1
                  bottom-14
                  z-40
                  rounded-full
                  border
                  border-ink/10
                  bg-paper/80
                  px-2
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-ink/70
                  shadow-md
                  backdrop-blur-md

                  sm:-left-10
                  sm:bottom-28
                  sm:px-3
                  sm:py-1.5
                  sm:text-[10px]
                "
              >
                Fast · Secure · Scalable
              </div>

              {/* =================================================
                  CHARACTER

                  Mobile/tablet sizes preserved.
                  Desktop slightly controlled for better
                  reference composition.
                  ================================================= */}

              <Image
                src="/character_glare.gif"
                alt="Silverloft founding developer, illustrated full-body portrait holding a laptop"
                width={900}
                height={1400}
                priority
                unoptimized
                draggable="false"
                className="
                  h-auto
                  w-full
                  max-w-[210px]
                  select-none
                  object-contain
                  drop-shadow-[0_25px_35px_rgba(10,10,10,0.25)]

                  sm:max-w-[360px]

                  md:max-w-[430px]

                  lg:max-w-[430px]

                  xl:max-w-[445px]

                  2xl:max-w-[455px]
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          EXPLORE CONTROL
          ========================================================= */}

      <div
        className="
          hero-fade-in
          relative
          z-50
          mt-[-2px]
          mb-3
          flex
          w-full
          justify-end
          pr-4
          pointer-events-auto

          sm:mt-[-10px]
          sm:mb-5
          sm:pr-6

          md:mt-[-48px]
          md:mb-9
          md:pr-8

          lg:mt-[-60px]
          lg:mb-10
          lg:pr-10

          xl:mt-[-68px]

          2xl:mt-[-72px]
        "
        style={{
          animationDelay: '260ms',
        }}
      >
        <a
          href="#work"
          aria-label="Explore our work"
          className="
            explore-orb-control
            group
            relative
            flex
            h-[68px]
            w-[68px]
            items-center
            justify-center

            sm:h-[108px]
            sm:w-[108px]

            md:h-[108px]
            md:w-[108px]

            lg:h-[108px]
            lg:w-[108px]

            cursor-pointer
            rounded-full

            transition-all
            duration-500
            ease-out

            hover:scale-110
            active:scale-95
          "
        >
          {/* =====================================================
              LOADER
              ===================================================== */}

          <div
            className="
              explore-loader-shell
              pointer-events-none
              relative
              z-10
              transition-all
              duration-500
              group-hover:drop-shadow-[0_0_28px_rgba(255,191,72,0.45)]
            "
          >
            <LoaderOrb
              size={1}
              className="explore-loader-orb"
            />
          </div>

          {/* =====================================================
              CENTER LABEL
              ===================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-30
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <span
              className="
                explore-center-title
                text-[7px]
                font-black
                uppercase
                leading-none
                tracking-[0.12em]
                text-white

                sm:text-[13px]
                md:text-[13px]
              "
            >
              Explore
            </span>

            <span
              className="
                mt-0.5
                text-[8px]
                font-bold
                leading-none
                text-white/90

                sm:mt-1
                sm:text-[11px]
              "
            >
              ↓
            </span>
          </div>

          {/* =====================================================
              HOVER DESCRIPTION
              ===================================================== */}

          <span
            className="
              pointer-events-none
              absolute
              -bottom-7
              left-1/2
              z-40
              -translate-x-1/2
              whitespace-nowrap

              text-[7px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-ink/45

              opacity-0
              transition-all
              duration-300

              group-hover:translate-y-1
              group-hover:opacity-100

              sm:-bottom-8
              sm:text-[8px]
            "
          >
            Discover the work
          </span>
        </a>
      </div>

      {/* =========================================================
          ANIMATIONS
          ========================================================= */}

      <style jsx>{`

        /* =======================================================
           ORB
           ======================================================= */

        .explore-loader-shell {
          transform: scale(0.48);
          transform-origin: center;
          animation:
            exploreOrbFloatMobile
            4s
            ease-in-out
            infinite;
        }

        @media (min-width: 640px) {
          .explore-loader-shell {
            transform: scale(0.98);
            animation:
              exploreOrbFloatDesktop
              4s
              ease-in-out
              infinite;
          }
        }

        /* =======================================================
           MOBILE ORB
           ======================================================= */

        @keyframes exploreOrbFloatMobile {
          0%,
          100% {
            transform:
              scale(0.48)
              translateY(0);
          }

          50% {
            transform:
              scale(0.48)
              translateY(-3px);
          }
        }

        /* =======================================================
           DESKTOP ORB
           ======================================================= */

        @keyframes exploreOrbFloatDesktop {
          0%,
          100% {
            transform:
              scale(0.98)
              translateY(0);
          }

          50% {
            transform:
              scale(0.98)
              translateY(-4px);
          }
        }

        /* =======================================================
           EXPLORE TEXT
           ======================================================= */

        .explore-center-title {
          text-shadow:
            0 1px 4px
              rgba(0, 0, 0, 0.55),
            0 0 10px
              rgba(0, 0, 0, 0.3);
        }

        /* =======================================================
           HERO FADE
           ======================================================= */

        .hero-fade-in {
          opacity: 0;
          animation:
            heroFadeIn
            700ms
            ease-out
            forwards;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform:
              translateY(18px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        /* =======================================================
           HEADLINE
           ======================================================= */

        .hero-headline {
          text-shadow:
            0 1px 0
              rgba(10, 10, 10, 0.05),
            0 2px 0
              rgba(10, 10, 10, 0.035),
            0 6px 14px
              rgba(10, 10, 10, 0.1);
        }

        /* =======================================================
           STATIC WORD SHINE
           ======================================================= */

        .static-shine {
          background-image:
            linear-gradient(
              120deg,
              #0a0a0a 35%,
              #f4f4f4 50%,
              #0a0a0a 65%
            );

          background-size:
            220% 100%;

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color:
            transparent;

          color: transparent;

          animation:
            staticShine
            5.5s
            ease-in-out
            infinite;
        }

        @keyframes staticShine {
          0% {
            background-position:
              200% 0;
          }

          55%,
          100% {
            background-position:
              -60% 0;
          }
        }

        /* =======================================================
           FOOT LABEL
           ======================================================= */

        .foot-letter {
          opacity: 0;

          animation:
            footLetterIn
            500ms
            ease-out
            forwards;
        }

        @keyframes footLetterIn {
          from {
            opacity: 0;
            transform:
              translateY(6px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        /* =======================================================
           FLOATING BADGES
           ======================================================= */

        .float-1 {
          animation:
            floatY
            5s
            ease-in-out
            infinite;
        }

        .float-2 {
          animation:
            floatY
            6s
            ease-in-out
            infinite;

          animation-delay:
            0.8s;
        }

        @keyframes floatY {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-10px);
          }
        }

        /* =======================================================
           CHARACTER GLOW
           ======================================================= */

        .glow-pulse {
          animation:
            glowPulse
            4s
            ease-in-out
            infinite;
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.6;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }

          50% {
            opacity: 1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.08);
          }
        }

        /* =======================================================
           BACKGROUND BLOBS
           ======================================================= */

        .blob-drift-a {
          animation:
            blobDriftA
            14s
            ease-in-out
            infinite;
        }

        .blob-drift-b {
          animation:
            blobDriftB
            17s
            ease-in-out
            infinite;
        }

        @keyframes blobDriftA {
          0%,
          100% {
            transform:
              translate(0, 0)
              scale(1);
          }

          50% {
            transform:
              translate(24px, 16px)
              scale(1.08);
          }
        }

        @keyframes blobDriftB {
          0%,
          100% {
            transform:
              translate(0, 0)
              scale(1);
          }

          50% {
            transform:
              translate(-20px, -14px)
              scale(1.1);
          }
        }

        /* =======================================================
           REDUCED MOTION
           ======================================================= */

        @media (
          prefers-reduced-motion: reduce
        ) {
          .hero-fade-in,
          .static-shine,
          .foot-letter,
          .float-1,
          .float-2,
          .glow-pulse,
          .blob-drift-a,
          .blob-drift-b,
          .explore-loader-shell {
            animation: none !important;
          }

          .hero-fade-in {
            opacity: 1 !important;
          }

          .group {
            transition: none !important;
          }
        }

        /* =======================================================
           VERY SMALL PHONES
           ======================================================= */

        @media (max-width: 380px) {
          .hero-headline {
            text-shadow:
              0 1px 0
                rgba(10, 10, 10, 0.04),
              0 4px 10px
                rgba(10, 10, 10, 0.08);
          }

          .explore-center-title {
            font-size: 6.5px;
            letter-spacing: 0.1em;
          }
        }

      `}</style>
    </section>
  );
}