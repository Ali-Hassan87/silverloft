'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SILVERLOFT — PREMIUM 3D MOBILE SHOWCASE
 *
 * Desktop composition has been refined to create a cleaner,
 * reference-style five-phone hero arrangement.
 *
 * Mobile + tablet responsiveness is preserved.
 */

const CARDS = [
  {
    id: 'ecommerce',
    label: 'E-Commerce Site',
    image: '/projects/ecommerce.jpeg',
    link: 'https://loombloom.vercel.app/',
  },

  {
    id: 'movie',
    label: 'Movie Site',
    image: '/projects/movie.jpeg',
    link: 'https://slantyfix.vercel.app/',
  },

  {
    id: 'lms',
    label: 'Learning Site',
    image: '/projects/lms.jpeg',
    link: 'https://lms-by-silver-loft.vercel.app/',
  },

  {
    id: 'food',
    label: 'Food Delivery Site',
    image:
      'https://i.pinimg.com/736x/56/1e/fd/561efd61bcbc61c2f9f9e42953937d41.jpg',
    link: '',
  },

  {
    id: 'saas-site',
    label: 'Saas Site',
    image: '/projects/saas.jpeg',
    link: 'https://worknest-silverloft.vercel.app/dashboard',
  },

  {
    id: 'authentication',
    label: 'Authentication',
    image: '/projects/auth.jpeg',
    link: 'http://incident-managment-system-seven.vercel.app/',
  },

  {
    id: 'travel',
    label: 'Traveling Agency Site',
    image:
      'https://i.pinimg.com/736x/c6/b4/4a/c6b44a7f0e9031aa99a871ec975b4268.jpg',
    link: '',
  },

  {
    id: 'fashion',
    label: 'Fashion Site',
    image: '/projects/fashion.jpeg',
    link: 'https://thevelvetwardrobeby-silverloft.vercel.app/',
  },

  {
    id: 'landing-page',
    label: 'Landing Page',
    image: '/projects/wesale.png',
    link: 'https://we-sale.vercel.app/',
  },

  {
    id: 'music',
    label: 'Music Site',
    image:
      'https://i.pinimg.com/736x/cc/97/f4/cc97f490d6c074b3fb401e0412fe28c9.jpg',
    link: '',
  },
];

/* ================================================================
   RESPONSIVE PHONE CONFIGURATION
   ================================================================ */

const PHONE_W_DESKTOP = 292;
const PHONE_H_DESKTOP = 620;

const PHONE_W_TABLET = 220;
const PHONE_H_TABLET = 470;

const PHONE_W_MOBILE = 150;
const PHONE_H_MOBILE = 320;

const SPEED_DESKTOP = 42;
const SPEED_TABLET = 38;
const SPEED_MOBILE = 34;

const ARC_DROP_DESKTOP = 54;
const ARC_DROP_TABLET = 38;
const ARC_DROP_MOBILE = 22;

const MAX_ROTATE_Y_DESKTOP = 16;
const MAX_ROTATE_Y_TABLET = 13;
const MAX_ROTATE_Y_MOBILE = 9;

const MAX_ROTATE_Z_DESKTOP = 5.5;
const MAX_ROTATE_Z_TABLET = 4.5;
const MAX_ROTATE_Z_MOBILE = 3;

const PHONE_TOP_DESKTOP = 52;
const PHONE_TOP_TABLET = 30;
const PHONE_TOP_MOBILE = 12;

/* ================================================================
   DESKTOP COMPOSITION
   Mobile/tablet values remain independent and unchanged.
   ================================================================ */

const DESKTOP_GAP = 18;
const TABLET_GAP = 22;
const MOBILE_GAP = 14;

const DESKTOP_EDGE_OPACITY = 0.72;
const TABLET_EDGE_OPACITY = 0.66;
const MOBILE_EDGE_OPACITY = 0.62;

const DESKTOP_SCALE_MIN = 0.86;
const TABLET_SCALE_MIN = 0.88;
const MOBILE_SCALE_MIN = 0.9;

const DESKTOP_CENTER_Z = 42;
const TABLET_CENTER_Z = 18;
const MOBILE_CENTER_Z = 0;

const SET_COUNT = 3;

/*
 * Card starts revealing when it gets sufficiently close
 * to the center of the hero.
 */
const SPOTLIGHT_WAKE_THRESHOLD = 0.55;

/* ================================================================
   PHONE MOCKUP
   ================================================================ */

function PhoneMockup({
  label,
  image,
  link,
  isHovered,
  onMouseMove,
}) {
  const handlePreviewClick = (event) => {
    event.stopPropagation();

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseMove={onMouseMove}
    >
      {/* Floor shadow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[82%]
          h-24
          w-[78%]
          -translate-x-1/2
          rounded-full
          bg-black/20
          blur-2xl
        "
        style={{
          opacity: 'calc(0.5 + var(--spotlight, 0) * 0.5)',
          transform:
            'translateX(-50%) scale(calc(0.92 + var(--spotlight, 0) * 0.16))',
          transition:
            'opacity 500ms ease-out, transform 500ms ease-out',
        }}
      />

      {/* Phone body */}

      <div
        className="
          group/phone
          relative
          h-full
          w-full
          rounded-[44px]
          border
          border-white/70
          bg-[#171717]
          p-[7px]
          transition-[box-shadow]
          duration-700
          ease-out
        "
        style={{
          boxShadow: isHovered
            ? `
              0 38px 90px -28px rgba(0,0,0,0.58),
              inset 0 1px 0 rgba(255,255,255,0.65)
            `
            : `
              0 28px 70px -28px rgba(0,0,0,0.48),
              inset 0 1px 0 rgba(255,255,255,0.55)
            `,
        }}
      >
        {/* Side buttons */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[3px]
            top-[25%]
            h-16
            w-[3px]
            rounded-r-full
            bg-white/35
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-[3px]
            top-[22%]
            h-10
            w-[3px]
            rounded-l-full
            bg-white/35
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-[3px]
            top-[31%]
            h-16
            w-[3px]
            rounded-l-full
            bg-white/30
          "
        />

        {/* Screen */}

        <div
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[38px]
            bg-black
          "
        >
          {/* Project image */}

          <img
            src={image}
            alt={label}
            draggable="false"
            loading="eager"
            decoding="async"
            className="
              absolute
              inset-0
              h-full
              w-full
              select-none
              object-cover
              object-top
              will-change-transform
            "
            style={{
              filter: `
                grayscale(
                  calc(100% - var(--spotlight, 0) * 100%)
                )
                contrast(
                  calc(0.90 + var(--spotlight, 0) * 0.10)
                )
                brightness(
                  calc(0.68 + var(--spotlight, 0) * 0.32)
                )
                saturate(
                  calc(0.72 + var(--spotlight, 0) * 0.28)
                )
              `,
              transform:
                'scale(calc(1 + var(--spotlight, 0) * 0.035))',
              transition:
                'filter 500ms ease-out, transform 500ms ease-out',
            }}
          />

          {/* Screen glass */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(255,255,255,0.18),
                  rgba(255,255,255,0.02) 48%,
                  rgba(0,0,0,0.18)
                )
              `,
              opacity:
                'calc(1 - var(--spotlight, 0))',
              transition:
                'opacity 500ms ease-out',
            }}
          />

          {/* Dynamic island */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[11px]
              z-20
              h-[27px]
              w-[92px]
              -translate-x-1/2
              rounded-full
              bg-black
              shadow-[0_2px_7px_rgba(0,0,0,0.30)]
            "
          >
            <div
              className="
                absolute
                right-[17px]
                top-1/2
                h-[6px]
                w-[6px]
                -translate-y-1/2
                rounded-full
                bg-white/10
              "
            />
          </div>

          {/* Top screen reflection */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-10
              h-[32%]
              bg-gradient-to-b
              from-white/[0.12]
              via-white/[0.025]
              to-transparent
            "
            style={{
              opacity:
                'calc(0.72 - var(--spotlight, 0) * 0.50)',
              transition:
                'opacity 500ms ease-out',
            }}
          />

          {/* Mouse glare */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-[45%]
              z-30
              opacity-0
              transition-opacity
              duration-500
              group-hover/phone:opacity-100
            "
            style={{
              background: `
                radial-gradient(
                  circle at var(--mx,50%) var(--my,50%),
                  rgba(255,255,255,0.34) 0%,
                  rgba(255,255,255,0.12) 12%,
                  transparent 34%
                )
              `,
              mixBlendMode: 'screen',
            }}
          />

          {/* Diagonal light sweep */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-1/2
              top-0
              z-30
              h-full
              w-[48%]
              -skew-x-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              opacity-0
              transition-all
              duration-700
              group-hover/phone:left-[105%]
              group-hover/phone:opacity-100
            "
          />

          {/* Bottom cinematic shadow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
            "
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  transparent 48%,
                  rgba(0,0,0,0.46) 100%
                )
              `,
              opacity:
                'calc(0.72 - var(--spotlight, 0) * 0.50)',
              transition:
                'opacity 500ms ease-out',
            }}
          />

          {/* Project label */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-3
              left-3
              z-40
              max-w-[72%]
              rounded-full
              border
              border-white/25
              bg-black/45
              px-2.5
              py-1.5
              text-[6.5px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white
              shadow-lg
              backdrop-blur-xl

              sm:bottom-5
              sm:left-5
              sm:px-3.5
              sm:py-2
              sm:text-[8px]
              sm:tracking-[0.19em]
            "
            style={{
              opacity:
                'calc(0.82 + var(--spotlight, 0) * 0.18)',
              transform: `
                translateY(
                  calc(2px - var(--spotlight, 0) * 2px)
                )
                scale(
                  calc(0.98 + var(--spotlight, 0) * 0.02)
                )
              `,
              transition:
                'opacity 500ms ease-out, transform 500ms ease-out',
            }}
          >
            {label}
          </div>

          {/* Live preview */}

          {link && (
            <button
              type="button"
              onClick={handlePreviewClick}
              aria-label={`Open ${label} live preview`}
              title="View live"
              className="
                pointer-events-auto
                absolute
                bottom-3
                right-3
                z-50
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/50
                bg-white/95
                text-black
                shadow-[0_12px_28px_-8px_rgba(0,0,0,0.60)]
                backdrop-blur-xl
                transition-transform
                duration-300
                ease-out
                hover:scale-110
                active:scale-95

                sm:bottom-5
                sm:right-5
                sm:h-11
                sm:w-11
              "
              style={{
                opacity:
                  'clamp(0, calc((var(--spotlight, 0) - 0.55) * 2.2), 1)',
                transform: `
                  translateY(
                    calc(10px - var(--spotlight, 0) * 10px)
                  )
                  scale(
                    calc(0.72 + var(--spotlight, 0) * 0.28)
                  )
                `,
                transition:
                  'opacity 400ms ease-out, transform 400ms ease-out',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="sm:h-[17px] sm:w-[17px]"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7H17V16" />
              </svg>
            </button>
          )}
        </div>

        {/* Outer phone highlight */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[44px]
            border
            border-white/15
          "
        />
      </div>
    </div>
  );
}

/* ================================================================
   MAIN 3D MARQUEE
   ================================================================ */

export default function CardCarouselBackground() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const offsetRef = useRef(0);
  const pausedIndexRef = useRef(null);
  const rafRef = useRef(null);
  const hoverCapableRef = useRef(false);

  const containerWidthRef = useRef(1200);

  const cardWidthRef = useRef(PHONE_W_DESKTOP);
  const cardHeightRef = useRef(PHONE_H_DESKTOP);

  const gapRef = useRef(DESKTOP_GAP);
  const phoneTopRef = useRef(PHONE_TOP_DESKTOP);

  const arcDropRef = useRef(ARC_DROP_DESKTOP);
  const maxRotateYRef = useRef(MAX_ROTATE_Y_DESKTOP);
  const maxRotateZRef = useRef(MAX_ROTATE_Z_DESKTOP);

  const speedRef = useRef(SPEED_DESKTOP);

  const edgeOpacityRef = useRef(
    DESKTOP_EDGE_OPACITY
  );

  const scaleMinRef = useRef(
    DESKTOP_SCALE_MIN
  );

  const centerZRef = useRef(
    DESKTOP_CENTER_Z
  );

  const [reducedMotion, setReducedMotion] =
    useState(false);

  const [hoveredIndex, setHoveredIndex] =
    useState(null);

  const slots = SET_COUNT * CARDS.length;

  /* ================================================================
     MARQUEE WIDTH
     ================================================================ */

  const itemWidth = () =>
    cardWidthRef.current + gapRef.current;

  const setWidth = () =>
    itemWidth() * CARDS.length;

  /* ================================================================
     RESPONSIVE MEASUREMENT
     ================================================================ */

  useEffect(() => {
    const mql = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    setReducedMotion(mql.matches);

    const onMotionChange = (event) => {
      setReducedMotion(event.matches);
    };

    mql.addEventListener(
      'change',
      onMotionChange
    );

    hoverCapableRef.current =
      window.matchMedia(
        '(hover: hover) and (pointer: fine)'
      ).matches;

    const measure = () => {
      const width = window.innerWidth;

      if (containerRef.current) {
        containerWidthRef.current =
          containerRef.current.offsetWidth;
      }

      let targetWidth =
        PHONE_W_DESKTOP;

      let targetHeight =
        PHONE_H_DESKTOP;

      let gap =
        DESKTOP_GAP;

      let top =
        PHONE_TOP_DESKTOP;

      let arcDrop =
        ARC_DROP_DESKTOP;

      let maxRotateY =
        MAX_ROTATE_Y_DESKTOP;

      let maxRotateZ =
        MAX_ROTATE_Z_DESKTOP;

      let speed =
        SPEED_DESKTOP;

      let edgeOpacity =
        DESKTOP_EDGE_OPACITY;

      let scaleMin =
        DESKTOP_SCALE_MIN;

      let centerZ =
        DESKTOP_CENTER_Z;

      /* ============================================================
         MOBILE
         ============================================================ */

      if (width < 640) {
        targetWidth =
          PHONE_W_MOBILE;

        targetHeight =
          PHONE_H_MOBILE;

        gap =
          MOBILE_GAP;

        top =
          PHONE_TOP_MOBILE;

        arcDrop =
          ARC_DROP_MOBILE;

        maxRotateY =
          MAX_ROTATE_Y_MOBILE;

        maxRotateZ =
          MAX_ROTATE_Z_MOBILE;

        speed =
          SPEED_MOBILE;

        edgeOpacity =
          MOBILE_EDGE_OPACITY;

        scaleMin =
          MOBILE_SCALE_MIN;

        centerZ =
          MOBILE_CENTER_Z;
      }

      /* ============================================================
         TABLET
         ============================================================ */

      else if (width < 1024) {
        targetWidth =
          PHONE_W_TABLET;

        targetHeight =
          PHONE_H_TABLET;

        gap =
          TABLET_GAP;

        top =
          PHONE_TOP_TABLET;

        arcDrop =
          ARC_DROP_TABLET;

        maxRotateY =
          MAX_ROTATE_Y_TABLET;

        maxRotateZ =
          MAX_ROTATE_Z_TABLET;

        speed =
          SPEED_TABLET;

        edgeOpacity =
          TABLET_EDGE_OPACITY;

        scaleMin =
          TABLET_SCALE_MIN;

        centerZ =
          TABLET_CENTER_Z;
      }

      /* ============================================================
         SAVE DIMENSIONS
         ============================================================ */

      cardWidthRef.current =
        targetWidth;

      cardHeightRef.current =
        targetHeight;

      gapRef.current =
        gap;

      phoneTopRef.current =
        top;

      arcDropRef.current =
        arcDrop;

      maxRotateYRef.current =
        maxRotateY;

      maxRotateZRef.current =
        maxRotateZ;

      speedRef.current =
        speed;

      edgeOpacityRef.current =
        edgeOpacity;

      scaleMinRef.current =
        scaleMin;

      centerZRef.current =
        centerZ;
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
      mql.removeEventListener(
        'change',
        onMotionChange
      );

      window.removeEventListener(
        'resize',
        measure
      );
    };
  }, []);

  /* ================================================================
     ANIMATION
     ================================================================ */

  useEffect(() => {
    let last =
      performance.now();

    const tick = (now) => {
      const dt = Math.min(
        (now - last) / 1000,
        0.05
      );

      last = now;

      /* ============================================================
         MARQUEE MOVEMENT
         ============================================================ */

      if (
        !reducedMotion &&
        pausedIndexRef.current === null
      ) {
        offsetRef.current +=
          speedRef.current * dt;

        const full =
          setWidth();

        if (
          offsetRef.current >= full
        ) {
          offsetRef.current -=
            full;
        }
      }

      /* ============================================================
         CONTAINER
         ============================================================ */

      const containerWidth =
        containerWidthRef.current;

      const halfContainerWidth =
        containerWidth / 2;

      const cardWidth =
        cardWidthRef.current;

      /* ============================================================
         EACH PHONE
         ============================================================ */

      cardRefs.current.forEach(
        (element, index) => {
          if (!element) return;

          /* --------------------------------------------------------
             HORIZONTAL POSITION
             -------------------------------------------------------- */

          const x =
            index * itemWidth() -
            offsetRef.current;

          /* --------------------------------------------------------
             CENTER POINT
             -------------------------------------------------------- */

          const cardCenter =
            x + cardWidth / 2;

          /* --------------------------------------------------------
             NORMALIZED DISTANCE
             -------------------------------------------------------- */

          let t =
            (cardCenter -
              halfContainerWidth) /
            Math.max(
              halfContainerWidth,
              1
            );

          t = Math.max(
            -1,
            Math.min(1, t)
          );

          /* --------------------------------------------------------
             CENTER STRENGTH
             -------------------------------------------------------- */

          const distance =
            Math.abs(t);

          const centerStrength =
            1 - distance;

          /* --------------------------------------------------------
             ARC
             -------------------------------------------------------- */

          const arcY =
            arcDropRef.current *
            t *
            t;

          const y =
            phoneTopRef.current +
            arcY;

          /* --------------------------------------------------------
             3D Y ROTATION
             -------------------------------------------------------- */

          const rotateY =
            t *
            maxRotateYRef.current;

          /* --------------------------------------------------------
             Z ROTATION
             -------------------------------------------------------- */

          const rotateZ =
            t *
            maxRotateZRef.current;

          /* --------------------------------------------------------
             CENTER SCALE
             -------------------------------------------------------- */

          const scale =
            scaleMinRef.current +
            centerStrength *
              (1 - scaleMinRef.current);

          /* --------------------------------------------------------
             Z-INDEX
             -------------------------------------------------------- */

          const zIndex =
            Math.round(
              20 +
                centerStrength *
                  80
            );

          /* --------------------------------------------------------
             SPOTLIGHT
             -------------------------------------------------------- */

          let spotlight;

          if (
            pausedIndexRef.current ===
            index
          ) {
            spotlight = 1;
          } else {
            const raw =
              (centerStrength -
                SPOTLIGHT_WAKE_THRESHOLD) /
              (1 -
                SPOTLIGHT_WAKE_THRESHOLD);

            spotlight =
              Math.max(
                0,
                Math.min(1, raw)
              );
          }

          /* --------------------------------------------------------
             APPLY TRANSFORM
             -------------------------------------------------------- */

          const centerDepth =
            centerStrength *
            centerZRef.current;

          element.style.transform = `
            translate3d(
              ${x}px,
              ${y}px,
              ${centerDepth}px
            )
            rotateY(${rotateY}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `;

          element.style.zIndex =
            String(zIndex);

          /* --------------------------------------------------------
             EDGE FADE
             -------------------------------------------------------- */

          element.style.opacity =
            String(
              edgeOpacityRef.current +
                centerStrength *
                  (1 -
                    edgeOpacityRef.current)
            );

          /* --------------------------------------------------------
             SPOTLIGHT CSS VARIABLE
             -------------------------------------------------------- */

          element.style.setProperty(
            '--spotlight',
            spotlight.toFixed(3)
          );
        }
      );

      rafRef.current =
        requestAnimationFrame(tick);
    };

    rafRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, [reducedMotion]);

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-full
        w-full
        overflow-hidden
        [perspective:1400px]
        pointer-events-none
        select-none
      "
      aria-hidden="true"
    >
      {/* Ambient center light */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[42%]
          z-0
          h-[220px]
          w-[320px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.07]
          blur-[70px]

          sm:h-[300px]
          sm:w-[480px]
          sm:blur-[90px]

          lg:h-[340px]
          lg:w-[620px]
          lg:blur-[100px]
        "
      />

      {/* Phone set */}

      {Array.from({
        length: slots,
      }).map((_, index) => {
        const project =
          CARDS[
            index % CARDS.length
          ];

        const isHovered =
          hoveredIndex === index;

        return (
          <div
            key={`${project.id}-${index}`}
            ref={(element) => {
              cardRefs.current[index] =
                element;
            }}
            className="
              absolute
              left-0
              top-0
              z-20
              pointer-events-auto
              will-change-transform
              transform-gpu
              h-[320px]
              w-[150px]

              sm:h-[470px]
              sm:w-[220px]

              lg:h-[620px]
              lg:w-[292px]
            "
            style={{
              transformStyle:
                'preserve-3d',

              transformOrigin:
                'center center',
            }}
            onMouseEnter={() => {
              if (
                !hoverCapableRef.current
              ) {
                return;
              }

              pausedIndexRef.current =
                index;

              setHoveredIndex(
                index
              );
            }}
            onMouseLeave={() => {
              if (
                !hoverCapableRef.current
              ) {
                return;
              }

              pausedIndexRef.current =
                null;

              setHoveredIndex(
                null
              );
            }}
            onMouseMove={(event) => {
              if (
                !hoverCapableRef.current
              ) {
                return;
              }

              const rect =
                event.currentTarget.getBoundingClientRect();

              const x =
                ((event.clientX -
                  rect.left) /
                  rect.width) *
                100;

              const y =
                ((event.clientY -
                  rect.top) /
                  rect.height) *
                100;

              event.currentTarget.style.setProperty(
                '--mx',
                `${x}%`
              );

              event.currentTarget.style.setProperty(
                '--my',
                `${y}%`
              );
            }}
          >
            <PhoneMockup
              {...project}
              isHovered={
                isHovered
              }
              onMouseMove={(
                event
              ) => {
                if (
                  !hoverCapableRef.current
                ) {
                  return;
                }

                const rect =
                  event.currentTarget.getBoundingClientRect();

                const x =
                  ((event.clientX -
                    rect.left) /
                    rect.width) *
                  100;

                const y =
                  ((event.clientY -
                    rect.top) /
                    rect.height) *
                  100;

                event.currentTarget.style.setProperty(
                  '--mx',
                  `${x}%`
                );

                event.currentTarget.style.setProperty(
                  '--my',
                  `${y}%`
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
}