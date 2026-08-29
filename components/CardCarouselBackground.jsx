'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * SILVERLOFT — PREMIUM 3D MOBILE SHOWCASE
 *
 * Features:
 * - Real smartphone-style mockups
 * - Larger phones (desktop) / calmer, tighter phones (mobile & tablet)
 * - 3D Y-axis + Z-axis rotation, amplitude tuned per breakpoint
 * - Center phone comes forward
 * - Continuous marquee
 * - Smooth horizontal arc
 * - POSITION-DRIVEN "spotlight" reveal (NEW): whichever phone is
 *   closest to center automatically gets full color + its label/
 *   preview button, driven by a CSS var (--spotlight) updated every
 *   animation frame. On desktop, a real mouse hover forces the same
 *   spotlight to 1 (instant + pauses the marquee) as before. On
 *   mobile/touch there is no hover at all, so without this the
 *   "reveal" moment — the whole point of the effect — never
 *   happened. Now every device gets the same moment, just delivered
 *   passively as the card drifts through center instead of on hover.
 * - Mouse-following glare + diagonal cinematic shine (desktop bonus,
 *   harmless no-op on touch)
 * - Dynamic Island
 * - Phone side buttons
 * - Live preview button
 * - Responsive desktop / tablet / mobile
 * - Reduced-motion support
 * - Hover handlers are now gated behind a real "(hover: hover) and
 *   (pointer: fine)" check, so a stray touch-triggered mouseenter on
 *   mobile can no longer permanently pause the marquee (a real bug
 *   the old hover-only version was exposed to on touch devices).
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
   CONFIGURATION — DESKTOP DEFAULTS
   Mobile/tablet variants are computed in measure() below; these
   constants stay as the top (>=1024px) tier and as safe fallbacks
   before the first measurement runs.
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

const SET_COUNT = 3;

// How close to dead-center (0..1, 1 = perfectly centered) a card
// must drift before it starts "waking up" out of the resting state.
// Below this the card stays fully in its resting (grayscale, label
// dim, button hidden) look — matches the old !isHovered state.
const SPOTLIGHT_WAKE_THRESHOLD = 0.55;

/* ================================================================
   PHONE MOCKUP
   ================================================================ */

function PhoneMockup({ label, image, link, isHovered, onMouseMove }) {
  const handlePreviewClick = (event) => {
    event.stopPropagation();

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative h-full w-full" onMouseMove={onMouseMove}>
      {/* ============================================================
          FLOOR SHADOW
          Driven by --spotlight (0..1) instead of a hover boolean, so
          it breathes as the card drifts through center on every
          device, not just under a mouse.
         ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[82%] h-24 w-[78%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl"
        style={{
          opacity: 'calc(0.5 + var(--spotlight, 0) * 0.5)',
          transform:
            'translateX(-50%) scale(calc(0.92 + var(--spotlight, 0) * 0.16))',
          transition: 'opacity 500ms ease-out, transform 500ms ease-out',
        }}
      />

      {/* ============================================================
          PHONE BODY
         ============================================================ */}

      <div
        className="group/phone relative h-full w-full rounded-[44px] border border-white/70 bg-[#171717] p-[7px] transition-[box-shadow] duration-700 ease-out"
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
        {/* ============================================================
            SIDE BUTTONS
           ============================================================ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[3px] top-[25%] h-16 w-[3px] rounded-r-full bg-white/35"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l-full bg-white/35"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[3px] top-[31%] h-16 w-[3px] rounded-l-full bg-white/30"
        />

        {/* ============================================================
            SCREEN
           ============================================================ */}

        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-black">
          {/* ========================================================
              PROJECT IMAGE
              Grayscale → color driven by --spotlight, so the "reveal"
              moment now happens automatically as each card passes
              through center — on touch devices too, where a real
              hover state can never fire.
             ======================================================== */}

          <img
            src={image}
            alt={label}
            draggable="false"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full select-none object-cover object-top will-change-transform"
            style={{
              filter: `
                grayscale(calc(100% - var(--spotlight, 0) * 100%))
                contrast(calc(0.90 + var(--spotlight, 0) * 0.10))
                brightness(calc(0.68 + var(--spotlight, 0) * 0.32))
                saturate(calc(0.72 + var(--spotlight, 0) * 0.28))
              `,
              transform: 'scale(calc(1 + var(--spotlight, 0) * 0.035))',
              transition:
                'filter 500ms ease-out, transform 500ms ease-out',
            }}
          />

          {/* ========================================================
              SCREEN GLASS
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(255,255,255,0.18),
                  rgba(255,255,255,0.02) 48%,
                  rgba(0,0,0,0.18)
                )
              `,
              opacity: 'calc(1 - var(--spotlight, 0))',
              transition: 'opacity 500ms ease-out',
            }}
          />

          {/* ========================================================
              DYNAMIC ISLAND
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[27px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[0_2px_7px_rgba(0,0,0,0.30)]"
          >
            <div className="absolute right-[17px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-white/10" />
          </div>

          {/* ========================================================
              TOP SCREEN REFLECTION
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[32%] bg-gradient-to-b from-white/[0.12] via-white/[0.025] to-transparent"
            style={{
              opacity: 'calc(0.72 - var(--spotlight, 0) * 0.50)',
              transition: 'opacity 500ms ease-out',
            }}
          />

          {/* ========================================================
              MOUSE FOLLOWING GLARE (desktop hover bonus — no-op
              on touch since group-hover never triggers there)
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[45%] z-30 opacity-0 transition-opacity duration-500 group-hover/phone:opacity-100"
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

          {/* ========================================================
              DIAGONAL LIGHT SWEEP (desktop hover bonus)
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-1/2 top-0 z-30 h-full w-[48%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover/phone:left-[105%] group-hover/phone:opacity-100"
          />

          {/* ========================================================
              BOTTOM CINEMATIC SHADOW
             ======================================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  transparent 48%,
                  rgba(0,0,0,0.46) 100%
                )
              `,
              opacity: 'calc(0.72 - var(--spotlight, 0) * 0.50)',
              transition: 'opacity 500ms ease-out',
            }}
          />

          {/* ========================================================
              PROJECT LABEL
             ======================================================== */}

          <div
            className="pointer-events-none absolute bottom-3 left-3 z-40 max-w-[72%] rounded-full border border-white/25 bg-black/45 px-2.5 py-1.5 text-[6.5px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-xl sm:bottom-5 sm:left-5 sm:px-3.5 sm:py-2 sm:text-[8px] sm:tracking-[0.19em]"
            style={{
              opacity: 'calc(0.82 + var(--spotlight, 0) * 0.18)',
              transform: `
                translateY(calc(2px - var(--spotlight, 0) * 2px))
                scale(calc(0.98 + var(--spotlight, 0) * 0.02))
              `,
              transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            }}
          >
            {label}
          </div>

          {/* ========================================================
              LIVE PREVIEW BUTTON
              Pops in once a card is well past the wake threshold —
              works identically whether that happened via mouse hover
              (desktop) or drifting through center (any device).
             ======================================================== */}

          {link && (
            <button
              type="button"
              onClick={handlePreviewClick}
              aria-label={`Open ${label} live preview`}
              title="View live"
              className="pointer-events-auto absolute bottom-3 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/95 text-black shadow-[0_12px_28px_-8px_rgba(0,0,0,0.60)] backdrop-blur-xl transition-transform duration-300 ease-out hover:scale-110 active:scale-95 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
              style={{
                opacity:
                  'clamp(0, calc((var(--spotlight, 0) - 0.55) * 2.2), 1)',
                transform: `
                  translateY(calc(10px - var(--spotlight, 0) * 10px))
                  scale(calc(0.72 + var(--spotlight, 0) * 0.28))
                `,
                transition: 'opacity 400ms ease-out, transform 400ms ease-out',
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

        {/* ============================================================
            OUTER PHONE HIGHLIGHT
           ============================================================ */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[44px] border border-white/15"
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
  const gapRef = useRef(34);
  const phoneTopRef = useRef(PHONE_TOP_DESKTOP);
  const arcDropRef = useRef(ARC_DROP_DESKTOP);
  const maxRotateYRef = useRef(MAX_ROTATE_Y_DESKTOP);
  const maxRotateZRef = useRef(MAX_ROTATE_Z_DESKTOP);
  const speedRef = useRef(SPEED_DESKTOP);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const slots = SET_COUNT * CARDS.length;

  /* ================================================================
     MARQUEE WIDTH
     ================================================================ */

  const itemWidth = () => cardWidthRef.current + gapRef.current;
  const setWidth = () => itemWidth() * CARDS.length;

  /* ================================================================
     RESPONSIVE MEASUREMENT
     ================================================================ */

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const onMotionChange = (event) => setReducedMotion(event.matches);
    mql.addEventListener('change', onMotionChange);

    // Real mouse-hover capability check — a touch tap can fire a
    // synthetic mouseenter with no matching mouseleave on some mobile
    // browsers, which used to permanently pause the marquee. Gating
    // the hover handlers behind this fixes that.
    hoverCapableRef.current = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    const measure = () => {
      const width = window.innerWidth;

      if (containerRef.current) {
        containerWidthRef.current = containerRef.current.offsetWidth;
      }

      let targetWidth = PHONE_W_DESKTOP;
      let targetHeight = PHONE_H_DESKTOP;
      let gap = 34;
      let top = PHONE_TOP_DESKTOP;
      let arcDrop = ARC_DROP_DESKTOP;
      let maxRotateY = MAX_ROTATE_Y_DESKTOP;
      let maxRotateZ = MAX_ROTATE_Z_DESKTOP;
      let speed = SPEED_DESKTOP;

      /* ============================================================
         MOBILE
         ============================================================ */

      if (width < 640) {
        targetWidth = PHONE_W_MOBILE;
        targetHeight = PHONE_H_MOBILE;
        gap = 14;
        top = PHONE_TOP_MOBILE;
        arcDrop = ARC_DROP_MOBILE;
        maxRotateY = MAX_ROTATE_Y_MOBILE;
        maxRotateZ = MAX_ROTATE_Z_MOBILE;
        speed = SPEED_MOBILE;
      }

      /* ============================================================
         TABLET
         ============================================================ */

      else if (width < 1024) {
        targetWidth = PHONE_W_TABLET;
        targetHeight = PHONE_H_TABLET;
        gap = 22;
        top = PHONE_TOP_TABLET;
        arcDrop = ARC_DROP_TABLET;
        maxRotateY = MAX_ROTATE_Y_TABLET;
        maxRotateZ = MAX_ROTATE_Z_TABLET;
        speed = SPEED_TABLET;
      }

      /* ============================================================
         SAVE DIMENSIONS
         ============================================================ */

      cardWidthRef.current = targetWidth;
      cardHeightRef.current = targetHeight;
      gapRef.current = gap;
      phoneTopRef.current = top;
      arcDropRef.current = arcDrop;
      maxRotateYRef.current = maxRotateY;
      maxRotateZRef.current = maxRotateZ;
      speedRef.current = speed;
    };

    measure();

    window.addEventListener('resize', measure, { passive: true });

    return () => {
      mql.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', measure);
    };
  }, []);

  /* ================================================================
     ANIMATION
     ================================================================ */

  useEffect(() => {
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      /* ============================================================
         MARQUEE MOVEMENT
         ============================================================ */

      if (!reducedMotion && pausedIndexRef.current === null) {
        offsetRef.current += speedRef.current * dt;

        const full = setWidth();
        if (offsetRef.current >= full) {
          offsetRef.current -= full;
        }
      }

      /* ============================================================
         CONTAINER
         ============================================================ */

      const containerWidth = containerWidthRef.current;
      const halfContainerWidth = containerWidth / 2;
      const cardWidth = cardWidthRef.current;

      /* ============================================================
         EACH PHONE
         ============================================================ */

      cardRefs.current.forEach((element, index) => {
        if (!element) return;

        /* --------------------------------------------------------
           HORIZONTAL POSITION
           -------------------------------------------------------- */

        const x = index * itemWidth() - offsetRef.current;

        /* --------------------------------------------------------
           CENTER POINT
           -------------------------------------------------------- */

        const cardCenter = x + cardWidth / 2;

        /* --------------------------------------------------------
           NORMALIZED DISTANCE
           -1 = far left, 0 = center, +1 = far right
           -------------------------------------------------------- */

        let t = (cardCenter - halfContainerWidth) / Math.max(halfContainerWidth, 1);
        t = Math.max(-1, Math.min(1, t));

        /* --------------------------------------------------------
           CENTER STRENGTH
           -------------------------------------------------------- */

        const distance = Math.abs(t);
        const centerStrength = 1 - distance;

        /* --------------------------------------------------------
           ARC
           -------------------------------------------------------- */

        const arcY = arcDropRef.current * t * t;
        const y = phoneTopRef.current + arcY;

        /* --------------------------------------------------------
           3D Y ROTATION
           -------------------------------------------------------- */

        const rotateY = t * maxRotateYRef.current;

        /* --------------------------------------------------------
           Z ROTATION
           -------------------------------------------------------- */

        const rotateZ = t * maxRotateZRef.current;

        /* --------------------------------------------------------
           CENTER SCALE
           -------------------------------------------------------- */

        const scale = 0.9 + centerStrength * 0.1;

        /* --------------------------------------------------------
           Z-INDEX
           -------------------------------------------------------- */

        const zIndex = Math.round(20 + centerStrength * 80);

        /* --------------------------------------------------------
           SPOTLIGHT (NEW)
           A real hover always wins (forced to 1). Otherwise the
           card's own position in the arc drives it — remapped so
           nothing "wakes up" until it's well past the wake
           threshold, matching the old resting/hover split instead
           of glowing faintly the whole time.
           -------------------------------------------------------- */

        let spotlight;
        if (pausedIndexRef.current === index) {
          spotlight = 1;
        } else {
          const raw =
            (centerStrength - SPOTLIGHT_WAKE_THRESHOLD) /
            (1 - SPOTLIGHT_WAKE_THRESHOLD);
          spotlight = Math.max(0, Math.min(1, raw));
        }

        /* --------------------------------------------------------
           APPLY TRANSFORM
           -------------------------------------------------------- */

        element.style.transform = `
          translate3d(${x}px, ${y}px, 0)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `;

        element.style.zIndex = String(zIndex);

        /* --------------------------------------------------------
           EDGE FADE
           -------------------------------------------------------- */

        element.style.opacity = String(0.62 + centerStrength * 0.38);

        /* --------------------------------------------------------
           SPOTLIGHT CSS VAR — read by PhoneMockup's inline styles
           -------------------------------------------------------- */

        element.style.setProperty('--spotlight', spotlight.toFixed(3));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion]);

  /* ================================================================
     RENDER
     ================================================================ */

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden [perspective:1400px] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ============================================================
          AMBIENT CENTER LIGHT
         ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[220px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[70px] sm:h-[300px] sm:w-[480px] sm:blur-[90px] lg:h-[340px] lg:w-[620px] lg:blur-[100px]"
      />

      {/* ============================================================
          PHONE SET
         ============================================================ */}

      {Array.from({ length: slots }).map((_, index) => {
        const project = CARDS[index % CARDS.length];
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={`${project.id}-${index}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="absolute left-0 top-0 z-20 pointer-events-auto will-change-transform transform-gpu h-[320px] w-[150px] sm:h-[470px] sm:w-[220px] lg:h-[620px] lg:w-[292px]"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
            }}
            /* ======================================================
               HOVER — gated behind a real "can hover" check so a
               touch tap can never freeze the marquee.
               ====================================================== */
            onMouseEnter={() => {
              if (!hoverCapableRef.current) return;
              pausedIndexRef.current = index;
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              if (!hoverCapableRef.current) return;
              pausedIndexRef.current = null;
              setHoveredIndex(null);
            }}
            /* ======================================================
               MOUSE GLARE
               ====================================================== */
            onMouseMove={(event) => {
              if (!hoverCapableRef.current) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              event.currentTarget.style.setProperty('--mx', `${x}%`);
              event.currentTarget.style.setProperty('--my', `${y}%`);
            }}
          >
            <PhoneMockup
              {...project}
              isHovered={isHovered}
              onMouseMove={(event) => {
                if (!hoverCapableRef.current) return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                event.currentTarget.style.setProperty('--mx', `${x}%`);
                event.currentTarget.style.setProperty('--my', `${y}%`);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}