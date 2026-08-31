'use client';

import { useState } from 'react';
import GlareHover from './GlareHover';
import { useInView } from '@/lib/useInView';

const SERVICES = [
  {
    n: '01',
    title: 'Website Design',
    copy:
      'Brand-true interfaces, from wireframe to a design system your team can keep building on.',
    tags: ['Figma', 'Design Systems', 'UI/UX'],
    keyword: 'DISCOVER',
  },
  {
    n: '02',
    title: 'Full-Stack Development',
    copy:
      'React / Next.js front ends wired to real back ends — auth, databases, payments, APIs.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    keyword: 'BUILD',
  },
  {
    n: '03',
    title: 'Deployment & Maintenance',
    copy:
      'Shipped on Vercel, monitored, and kept fast — with a direct line to the people who built it.',
    tags: ['Vercel', 'Monitoring', 'CI/CD'],
    keyword: 'LAUNCH',
  },
];

/* ================================================================
   MAIN SERVICES
   ================================================================ */

export default function Services() {
  const [headRef, headInView] = useInView();

  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        border-t
        border-ink/10
        bg-paper
        py-24
        sm:py-28
        lg:py-32
      "
    >
      {/* ============================================================
          AMBIENT BACKGROUND
         ============================================================ */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[520px]
          w-[1000px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-ink/[0.035]
          blur-[100px]
        "
      />
      
      {/* ============================================================
          SUBTLE GRID
         ============================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              currentColor 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              currentColor 1px,
              transparent 1px
            )
          `,
          backgroundSize: '72px 72px',
        }}
      />
      
      {/* ============================================================
          CONTENT
         ============================================================ */}

      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-6
          sm:px-8
          lg:px-10
        "
      >
        {/* ============================================================
            HEADER
           ============================================================ */}
        <div
          ref={headRef}
          className={`
            relative
            transition-all
            duration-1000
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              headInView
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }
          `}
        >
          {/* small top label */}

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ink/15" />

            <p
              className="
                text-center
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.34em]
                text-ink/40
              "
            >
              What We Do
            </p>

            <span className="h-px w-8 bg-ink/15" />
          </div>

          {/* heading */}

          <h2
            className="
              mt-4
              text-center
              font-display
              text-3xl
              font-semibold
              tracking-[-0.035em]
              text-ink
              sm:text-4xl
              lg:text-[46px]
              lg:leading-[1.05]
            "
          >
            Websites,{' '}
            <span className="relative inline-block">
              end to end.

              {/* underline */}

              <svg
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-2
                  w-full
                "
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,5 Q50,0 100,5 T200,5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-ink/20"
                />
              </svg>
            </span>
          </h2>

          {/* small supporting text */}

          <p
            className="
              mx-auto
              mt-5
              max-w-lg
              text-center
              text-sm
              leading-relaxed
              text-ink/45
            "
          >
            From the first pixel to the final deployment —
            everything designed, built and shipped as one system.
          </p>
        </div>

        {/* ============================================================
            SERVICE AREA
           ============================================================ */}

        <div className="relative mt-16 sm:mt-20">

          {/* ==========================================================
              CONNECTING LINE
             ========================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[16.66%]
              right-[16.66%]
              top-[72px]
              hidden
              h-px
              bg-gradient-to-r
              from-transparent
              via-ink/10
              to-transparent
              lg:block
            "
          />

          {/* moving light on line */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[16.66%]
              top-[71px]
              hidden
              h-[3px]
              w-20
              rounded-full
              bg-ink/20
              blur-[2px]
              lg:block
              animate-[servicesLine_5s_ease-in-out_infinite]
            "
          />

          {/* ==========================================================
              CARDS
             ========================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:gap-6
              lg:grid-cols-3
              lg:gap-6
            "
          >
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.n}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ============================================================
            BOTTOM MICRO CTA
           ============================================================ */}

        <div
          className="
            mt-14
            flex
            items-center
            justify-center
            gap-3
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-ink/30
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />

          <span>Design · Build · Launch</span>

          <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
        </div>
      </div>

      {/* ==============================================================
          LOCAL KEYFRAMES
         ============================================================== */}

      <style jsx>{`
        @keyframes servicesLine {
          0% {
            transform: translateX(0);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          70% {
            opacity: 0.7;
          }

          100% {
            transform: translateX(260%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

/* ================================================================
   SERVICE CARD
   ================================================================ */

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();

  const [hovered, setHovered] = useState(false);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  /* ================================================================
     MOUSE MOVE
     ================================================================ */

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    setMouse({
      x,
      y,
    });
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView
          ? `${index * 140}ms`
          : '0ms',
      }}
      className={`
        transition-all
        duration-1000
        ease-[cubic-bezier(.22,1,.36,1)]
        ${
          inView
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }
      `}
    >
      <div
        className="
          relative
          h-full
          [perspective:1200px]
        "
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
        onMouseMove={handleMouseMove}
      >
        {/* ==========================================================
            OUTER GLOW
           ========================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -inset-2
            rounded-[28px]
            bg-ink/[0.035]
            blur-2xl
            transition-all
            duration-700
          "
          style={{
            opacity: hovered
              ? 1
              : 0,

            transform: hovered
              ? 'scale(1.02)'
              : 'scale(0.94)',
          }}
        />

        {/* ==========================================================
            GLARE
           ========================================================== */}

        <GlareHover
          width="100%"
          height="100%"
          background="transparent"
          borderColor="transparent"
          borderRadius="22px"
          glareColor="#ffffff"
          glareOpacity={0.34}
          glareAngle={-30}
          glareSize={320}
          transitionDuration={900}
          className="
            group
            relative
            !items-stretch
            !justify-start
            overflow-hidden
            rounded-[22px]
            border
            border-ink/10
            bg-paper/80
            p-7
            transition-all
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            sm:p-8
          "
          style={{
            transform: hovered
              ? 'translateY(-8px) rotateX(1.2deg) rotateY(-1deg)'
              : 'translateY(0) rotateX(0) rotateY(0)',

            boxShadow: hovered
              ? `
                0 28px 60px -30px rgba(0,0,0,0.28),
                0 8px 24px -18px rgba(0,0,0,0.18)
              `
              : '0 8px 30px -25px rgba(0,0,0,0.08)',
          }}
        >
          {/* ========================================================
              CURSOR RADIAL LIGHT
             ======================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-20
              z-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
            style={{
              background: `
                radial-gradient(
                  circle at ${mouse.x}% ${mouse.y}%,
                  rgba(255,255,255,0.52),
                  rgba(255,255,255,0.12) 14%,
                  transparent 38%
                )
              `,
              mixBlendMode: 'screen',
            }}
          />

          {/* ========================================================
              TOP SCANNING LINE
             ======================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              z-10
              h-px
              origin-left
              scale-x-0
              bg-gradient-to-r
              from-transparent
              via-ink/30
              to-transparent
              transition-transform
              duration-700
              ease-out
              group-hover:scale-x-100
            "
          />

          {/* ========================================================
              GIANT BACKGROUND NUMBER
             ======================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-4
              -top-7
              z-0
              select-none
              font-display
              text-[150px]
              font-semibold
              leading-none
              tracking-[-0.08em]
              text-ink/[0.035]
              transition-all
              duration-700
              ease-out
              group-hover:-translate-y-3
              group-hover:text-ink/[0.065]
            "
          >
            {service.n}
          </div>

          {/* ========================================================
              CONTENT
             ======================================================== */}

          <div
            className="
              relative
              z-20
              flex
              min-h-[330px]
              w-full
              flex-col
            "
          >
            {/* ======================================================
                TOP ROW
               ====================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  tracking-[0.28em]
                  text-ink/35
                  transition-colors
                  duration-300
                  group-hover:text-ink/65
                "
              >
                {service.n}
              </span>

              {/* circular arrow */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-ink/10
                  text-ink/35
                  transition-all
                  duration-500
                  ease-out
                  group-hover:border-ink/25
                  group-hover:bg-ink
                  group-hover:text-paper
                  group-hover:rotate-45
                "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7H17V16" />
                </svg>
              </div>
            </div>

            {/* ======================================================
                KEYWORD
               ====================================================== */}

            <div
              className="
                mt-12
                overflow-hidden
              "
            >
              <span
                className="
                  inline-block
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-ink/25
                  transition-all
                  duration-500
                  group-hover:translate-y-0
                  group-hover:text-ink/45
                "
              >
                {service.keyword}
              </span>
            </div>

            {/* ======================================================
                TITLE
               ====================================================== */}

            <h3
              className="
                mt-2
                max-w-[280px]
                font-display
                text-[22px]
                font-semibold
                leading-[1.08]
                tracking-[-0.025em]
                text-ink
                transition-transform
                duration-500
                ease-out
                group-hover:translate-x-1
              "
            >
              {service.title}
            </h3>

            {/* ======================================================
                COPY
               ====================================================== */}

            <p
              className="
                mt-3
                max-w-[310px]
                text-sm
                leading-[1.7]
                text-ink/55
                transition-colors
                duration-300
                group-hover:text-ink/65
              "
            >
              {service.copy}
            </p>

            {/* ======================================================
                SPACER
               ====================================================== */}

            <div className="flex-1" />

            {/* ======================================================
                DIVIDER
               ====================================================== */}

            <div
              className="
                mb-5
                h-px
                w-full
                origin-left
                bg-ink/10
                transition-transform
                duration-700
                ease-out
                group-hover:scale-x-100
              "
            />

            {/* ======================================================
                TAGS
               ====================================================== */}

            <div className="flex flex-wrap gap-2">
              {service.tags.map(
                (tag, tagIndex) => (
                  <span
                    key={tag}
                    style={{
                      transitionDelay:
                        hovered
                          ? `${tagIndex * 45}ms`
                          : '0ms',
                    }}
                    className="
                      rounded-full
                      border
                      border-ink/10
                      bg-white/30
                      px-3
                      py-1.5
                      text-[10px]
                      font-medium
                      text-ink/45
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:border-ink/20
                      group-hover:bg-white/70
                      group-hover:text-ink/70
                    "
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ========================================================
              BOTTOM ACTIVE BAR
             ======================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-0
              left-7
              right-7
              h-[2px]
              origin-left
              scale-x-0
              rounded-full
              bg-ink/50
              transition-transform
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]
              group-hover:scale-x-100
              sm:left-8
              sm:right-8
            "
          />

          {/* ========================================================
              CORNER DETAIL
             ======================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-5
              right-6
              h-1
              w-1
              rounded-full
              bg-ink/15
              transition-all
              duration-500
              group-hover:h-1.5
              group-hover:w-1.5
              group-hover:bg-ink/50
            "
          />
        </GlareHover>
      </div>
    </div>
  );
}