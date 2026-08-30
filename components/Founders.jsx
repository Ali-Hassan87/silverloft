'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import GlareHover from './GlareHover';

const FOUNDERS = [
  {
    name: 'Ali Hassan',
    role: 'Co-Founder · Full-Stack Developer',
    initials: 'AH',
    image: '/founders/ali.png',
    focus: 'Frontend & UI Systems',
    objectPosition: 'center top',
    github: 'https://github.com/Ali-Hassan87',
    linkedin: 'https://www.linkedin.com/in/ali-hassan-fsdev/',
    portfolio: 'https://my-portfolio-silverloft.vercel.app/',
  },
  {
    name: 'Muhammad Hashir',
    role: 'Co-Founder · Full-Stack Developer',
    initials: 'MH',
    image: '/founders/hashir.png',
    focus: 'Backend & Infrastructure',
    objectPosition: 'center top',
    github: 'https://github.com/Muhammad-Hashir-786',
    linkedin: 'https://www.linkedin.com/in/muhammad-hashir-3a3a80412/',
    portfolio: 'https://my-portfolio-silverloft.vercel.app/',
  },
  {
    name: 'Muhammad Faizan',
    role: 'Co-Founder · Full-Stack Developer',
    initials: 'MF',
    image: '/founders/fazy.png',
    focus: 'Product & Integrations',
    objectPosition: 'center top',
    github: 'Https://www.github.com/fazy777',
    linkedin: 'Https://www.safesilverloft.dev',
    portfolio: 'Https://www.safesilverloft.dev',
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

/* =========================================================
   SOCIAL / PORTFOLIO ICONS
   ========================================================= */

function GithubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.165 6.839 9.49.5.092.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.337-2.221-.252-4.556-1.11-4.556-4.938 0-1.091.39-1.984 1.03-2.682-.103-.254-.446-1.276.098-2.658 0 0 .84-.269 2.75 1.024A9.56 9.56 0 0 1 12 6.844c.85.004 1.705.114 2.504.333 1.909-1.293 2.747-1.024 2.747-1.024.546 1.382.203 2.404.1 2.658.64.698 1.028 1.591 1.028 2.682 0 3.838-2.339 4.681-4.567 4.927.359.309.679.918.679 1.851 0 1.337-.012 2.416-.012 2.744 0 .269.18.581.688.482A10.01 10.01 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M5.25 3.5A2.25 2.25 0 1 1 5.25 8a2.25 2.25 0 0 1 0-4.5ZM3.3 9.75h3.9V21H3.3V9.75ZM9.45 9.75h3.74v1.54h.05c.52-.99 1.8-2.03 3.7-2.03 3.96 0 4.69 2.6 4.69 5.98V21h-3.9v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-3.9V9.75Z" />
    </svg>
  );
}

/* Portfolio / Website icon */
function PortfolioIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="6.5" width="18" height="13.5" rx="2.5" />
      <path d="M8 6.5V5.25A2.25 2.25 0 0 1 10.25 3h3.5A2.25 2.25 0 0 1 16 5.25V6.5" />
      <path d="M3 11.5h18" />
      <path d="M10 11.5v1.25a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5V11.5" />
    </svg>
  );
}

/* =========================================================
   SOCIAL LINK
   ========================================================= */

function SocialLink({ href, label, type, children }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group/social
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-ink/10
        bg-white/40
        text-ink/45
        backdrop-blur-md
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:border-ink/25
        hover:bg-white
        hover:text-ink
        hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ink/30
        focus-visible:ring-offset-2
        focus-visible:ring-offset-paper
      "
    >
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-ink/20
          opacity-0
          blur-md
          transition-opacity
          duration-300
          group-hover/social:opacity-30
        "
      />

      <span
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          transition-transform
          duration-300
          group-hover/social:scale-110
        "
      >
        {children}
      </span>

      <span
        className="
          pointer-events-none
          absolute
          -top-10
          left-1/2
          -translate-x-1/2
          translate-y-1
          whitespace-nowrap
          rounded-full
          border
          border-ink/10
          bg-ink
          px-2.5
          py-1
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-paper
          opacity-0
          shadow-lg
          transition-all
          duration-200
          group-hover/social:-translate-y-0
          group-hover/social:opacity-100
        "
      >
        {type}
      </span>
    </a>
  );
}

/* =========================================================
   AVATAR
   ========================================================= */

function Avatar({ founder }) {
  return (
    <div className="relative mx-auto h-32 w-32 sm:h-36 sm:w-36">
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderColor="transparent"
        borderRadius="9999px"
        glareColor="#ffffff"
        glareOpacity={0.45}
        glareAngle={-30}
        glareSize={280}
        transitionDuration={750}
        className="group !h-full !w-full !rounded-full"
      >
        {/* Outer premium ring */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-br
            from-ink/25
            via-ink/5
            to-transparent
            p-[2px]
            transition-transform
            duration-500
            group-hover:scale-105
          "
        >
          <div className="h-full w-full rounded-full bg-paper" />
        </div>

        {/* Image */}
        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            overflow-hidden
            rounded-full
          "
        >
          {founder.image ? (
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              sizes="(max-width: 640px) 128px, 144px"
              style={{
                objectPosition: founder.objectPosition || 'center',
                transform: founder.scale
                  ? `scale(${founder.scale})`
                  : undefined,
              }}
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-graphite
                text-lg
                font-semibold
                uppercase
                tracking-widest
                text-paper
                transition-transform
                duration-500
                group-hover:scale-105
              "
            >
              {founder.initials}
            </div>
          )}
        </div>

        {/* Inner glass highlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-[3px]
            z-20
            rounded-full
            ring-1
            ring-white/30
          "
        />

        {/* Hover aura */}
        <div
          className="
            pointer-events-none
            absolute
            -inset-3
            z-0
            rounded-full
            bg-ink/[0.04]
            opacity-0
            blur-xl
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />
      </GlareHover>
    </div>
  );
}

/* =========================================================
   FOUNDER CARD
   ========================================================= */

function FounderCard({ founder, index }) {
  const [ref, inView] = useInView();

  const number = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${index * 130}ms` : '0ms',
      }}
      className={`
        group/card
        relative
        flex
        min-w-0
        flex-col
        items-center
        transition-all
        duration-700
        ease-out
        ${inView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
        }
      `}
    >
      {/* Card number */}
      <div
        className="
          absolute
          -top-5
          left-1/2
          z-30
          flex
          h-8
          min-w-8
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-ink/10
          bg-paper/80
          px-2
          text-[9px]
          font-semibold
          tracking-[0.2em]
          text-ink/35
          backdrop-blur-md
          transition-all
          duration-300
          group-hover/card:border-ink/20
          group-hover/card:bg-white
          group-hover/card:text-ink
        "
      >
        {number}
      </div>

      {/* Founder visual area */}
      <div
        className="
          relative
          w-full
          rounded-[2rem]
          border
          border-ink/[0.07]
          bg-white/[0.18]
          px-5
          pb-7
          pt-9
          backdrop-blur-[2px]
          transition-all
          duration-500
          ease-out
          group-hover/card:-translate-y-2
          group-hover/card:border-ink/15
          group-hover/card:bg-white/[0.35]
          group-hover/card:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.45)]
        "
      >
        {/* Top mini label */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="h-px w-5 bg-ink/15" />

          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-ink/30
            "
          >
            Founder
          </span>

          <span className="h-px w-5 bg-ink/15" />
        </div>

        <Avatar founder={founder} />

        {/* Founder information */}
        <div className="mt-7 text-center">
          <p
            className="
              font-display
              text-xl
              tracking-[-0.02em]
              text-ink
              transition-transform
              duration-300
              group-hover/card:-translate-y-0.5
            "
          >
            {founder.name}
          </p>

          <p
            className="
              mt-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-ink/45
            "
          >
            {founder.role}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-ink/30" />

            <p className="text-xs text-ink/40">
              {founder.focus}
            </p>

            <span className="h-1 w-1 rounded-full bg-ink/30" />
          </div>
        </div>

        {/* Divider */}
        <div
          className="
            mx-auto
            my-6
            h-px
            w-16
            bg-ink/10
            transition-all
            duration-500
            group-hover/card:w-24
            group-hover/card:bg-ink/20
          "
        />

        {/* Social + Portfolio */}
        <div className="flex items-center justify-center gap-2.5">
          <SocialLink
            href={founder.github}
            label={`${founder.name} on GitHub`}
            type="GitHub"
          >
            <GithubIcon className="h-[17px] w-[17px]" />
          </SocialLink>

          <SocialLink
            href={founder.linkedin}
            label={`${founder.name} on LinkedIn`}
            type="LinkedIn"
          >
            <LinkedinIcon className="h-[17px] w-[17px]" />
          </SocialLink>

          {/* Portfolio */}
          <SocialLink
            href={founder.portfolio}
            label={`${founder.name}'s Portfolio`}
            type="Portfolio"
          >
            <PortfolioIcon className="h-[17px] w-[17px]" />
          </SocialLink>
        </div>

        {/* Bottom hover indicator */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-[2px]
            w-0
            -translate-x-1/2
            rounded-full
            bg-ink/40
            transition-all
            duration-500
            group-hover/card:w-16
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   FOUNDERS SECTION
   ========================================================= */

export default function Founders() {
  const [headRef, headInView] = useInView();

  return (
    <section
      className="
        relative
        overflow-hidden
        border-t
        border-ink/10
        bg-paper
        py-24
        sm:py-28
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
         ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-ink/[0.025]
          blur-3xl
        "
      />

      {/* Subtle radial light */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[38%]
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-white/40
          blur-3xl
        "
      />

      {/* Minimal grid texture */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ===================================================
            HEADING
           =================================================== */}

        <div
          ref={headRef}
          className={`
            mx-auto
            max-w-3xl
            text-center
            transition-all
            duration-700
            ease-out
            ${headInView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
            }
          `}
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ink/15" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-ink/40
              "
            >
              The People Behind The Work
            </p>

            <span className="h-px w-8 bg-ink/15" />
          </div>

          {/* Main heading */}
          <h2
            className="
              font-display
              text-4xl
              leading-[1.05]
              tracking-[-0.035em]
              text-ink
              sm:text-5xl
            "
          >
            Three developers.
            <br />

            <span className="relative inline-block">
              One studio.

              {/* Hand-drawn underline */}
              <svg
                className="
                  absolute
                  -bottom-3
                  left-1/2
                  h-3
                  w-[115%]
                  -translate-x-1/2
                  text-ink/20
                "
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8C38 2 70 10 108 7C146 4 181 2 218 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-8
              max-w-xl
              text-sm
              leading-7
              text-ink/45
            "
          >
            Different strengths. One shared vision.
            We design, build and ship digital experiences
            that feel as good as they perform.
          </p>
        </div>

        {/* ===================================================
            FOUNDERS
           =================================================== */}

        <div className="relative mt-20 sm:mt-24">
          {/* Connecting line */}
          <div
            className="
              pointer-events-none
              absolute
              left-[16.666%]
              right-[16.666%]
              top-[4.5rem]
              hidden
              h-px
              bg-gradient-to-r
              from-transparent
              via-ink/10
              to-transparent
              sm:block
            "
          />

          {/* Connection dots */}
          <div
            className="
              pointer-events-none
              absolute
              left-[16.666%]
              top-[calc(4.5rem-2px)]
              hidden
              h-1
              w-1
              rounded-full
              bg-ink/20
              sm:block
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[16.666%]
              top-[calc(4.5rem-2px)]
              hidden
              h-1
              w-1
              rounded-full
              bg-ink/20
              sm:block
            "
          />

          <div
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-3
              sm:gap-6
              lg:gap-8
            "
          >
            {FOUNDERS.map((founder, index) => (
              <FounderCard
                key={founder.name}
                founder={founder}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            BOTTOM STATEMENT
           =================================================== */}

        <div
          className="
            mt-16
            flex
            items-center
            justify-center
            gap-4
            text-center
          "
        >
          <span className="h-px w-10 bg-ink/10" />

          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-ink/25
            "
          >
            Built together · Shipped worldwide
          </p>

          <span className="h-px w-10 bg-ink/10" />
        </div>
      </div>
    </section>
  );
}
