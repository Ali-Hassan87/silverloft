'use client';

import { useState } from 'react';

import CaseStudyCard from './CaseStudyCard';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

/*
|--------------------------------------------------------------------------
| PROJECT DATA
|--------------------------------------------------------------------------
| Keep all project-specific information here.
| The visual system is handled by the components below.
*/

const PROJECTS = [
  {
    caseNumber: '01',
    title: 'Slantyfix Movie WebApp',
    subtitle: 'Entertainment & Fun App',
    description:
      'A playful movie experience designed around discovery, motion and effortless exploration.',
    tags: ['iOS / Android / Web App', 'FunTech'],
    theme: 'entertainment',
    href: 'https://slantyfix.vercel.app/',
    videoSrc: '/projects/slantyfix_glare.gif',
  },

  {
    caseNumber: '02',
    title: 'WorkNest SaaS Application',
    subtitle: 'Software as a Service',
    description:
      'A focused productivity ecosystem combining intelligent workflows, dashboards and modern SaaS patterns.',
    tags: ['Web App / Android', 'AI / AdvanceTech'],
    theme: 'ai',
    href: 'https://worknest-silverloft.vercel.app/dashboard',
    videoSrc: '/projects/netforce_glare.gif',
  },

  {
    caseNumber: '03',
    title: 'Learning Management System',
    subtitle: 'Online Learning Courses',
    description:
      'A learning platform shaped around clarity, progress and a frictionless digital education experience.',
    tags: ['Web App / Android', 'Productivity / Learning'],
    theme: 'productivity',
    href: 'https://lms-by-silver-loft.vercel.app/',
    videoSrc: '/projects/learningsystem_glare.gif',
  },
];

/*
|--------------------------------------------------------------------------
| PREMIUM COLOR SYSTEM
|--------------------------------------------------------------------------
| Less "template-like", more editorial.
| Neutral surfaces carry the UI while accents are used sparingly.
*/

const THEMES = {
  entertainment: {
    accent: '#E86A3D',
    secondary: '#F2B880',
    soft: 'rgba(232, 106, 61, 0.12)',
  },

  ai: {
    accent: '#6C63FF',
    secondary: '#A8A3FF',
    soft: 'rgba(108, 99, 255, 0.12)',
  },

  productivity: {
    accent: '#17866D',
    secondary: '#76C9B4',
    soft: 'rgba(23, 134, 109, 0.12)',
  },
};

/*
|--------------------------------------------------------------------------
| SECTION INTRO
|--------------------------------------------------------------------------
*/

function WorkIntro() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          {/* Small editorial eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/40" />

              <span className="relative h-2 w-2 rounded-full bg-orange-500" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/40">
              Selected work / 2026
            </span>
          </div>

          {/* Main heading */}
          <h2 className="max-w-5xl font-display text-[clamp(4rem,10vw,10rem)] leading-[0.78] tracking-[-0.085em] text-ink">
            Things
            <br />

            <span className="ml-[10vw] text-ink/15">
              we made.
            </span>
          </h2>
        </div>

        {/* Intro copy */}
        <div className="max-w-sm lg:pb-2 lg:justify-self-end">
          <p className="text-[14px] leading-7 text-ink/45">
            Digital products, interfaces and experiences built
            somewhere between strategy, curiosity and obsession.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-ink/25">
              Explore projects
            </span>

            <span className="h-px w-12 bg-ink/15" />

            <span className="animate-bounce text-sm text-ink/35">
              ↓
            </span>
          </div>
        </div>
      </div>

      {/* Editorial divider */}
      <div className="mt-14 h-px bg-ink/10" />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DESKTOP SIDE PROGRESS
|--------------------------------------------------------------------------
*/

function WorkProgress({ active }) {
  return (
    <aside className="pointer-events-none fixed right-7 top-1/2 z-50 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-end gap-5">
        {PROJECTS.map((project, index) => {
          const activeItem = index === active;
          const theme =
            THEMES[project.theme] || THEMES.entertainment;

          return (
            <div
              key={project.caseNumber}
              className="flex items-center gap-3"
            >
              <span
                className={[
                  'max-w-[150px] text-right text-[8px] font-semibold',
                  'uppercase tracking-[0.2em]',
                  'transition-all duration-700',
                  activeItem
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-3 opacity-0',
                ].join(' ')}
                style={{
                  color: activeItem
                    ? theme.accent
                    : undefined,
                }}
              >
                {project.subtitle}
              </span>

              <span
                className={[
                  'h-px transition-all duration-700',
                  activeItem
                    ? 'w-12'
                    : 'w-3 bg-ink/10',
                ].join(' ')}
                style={
                  activeItem
                    ? {
                        backgroundColor: theme.accent,
                      }
                    : undefined
                }
              />

              <span
                className={[
                  'font-display text-[11px]',
                  'transition-all duration-700',
                  activeItem
                    ? 'text-ink'
                    : 'text-ink/20',
                ].join(' ')}
              >
                {project.caseNumber}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/*
|--------------------------------------------------------------------------
| AMBIENT BACKGROUND LIGHT
|--------------------------------------------------------------------------
*/

function AmbientLight({ theme }) {
  const colors =
    THEMES[theme] || THEMES.entertainment;

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-[32%]
        -z-10
        h-[700px]
        w-[700px]
        -translate-x-1/2
        rounded-full
        blur-[130px]
        transition-all
        duration-[1400ms]
        ease-out
      "
      style={{
        background: colors.soft,
      }}
    />
  );
}

/*
|--------------------------------------------------------------------------
| WORK SECTION
|--------------------------------------------------------------------------
*/

export default function Work() {
  const [active, setActive] = useState(0);

  const currentProject = PROJECTS[active];

  const currentTheme =
    THEMES[currentProject.theme] ||
    THEMES.entertainment;

  return (
    <section
      id="work"
      className="
        relative
        isolate
        overflow-hidden
        bg-paper
        py-28
        sm:py-36
        lg:py-48
      "
    >
      {/* ================================================================
          BACKGROUND GRID
          ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
        }}
      />

      {/* ================================================================
          AMBIENT COLOR
          ================================================================ */}

      <AmbientLight theme={currentProject.theme} />

      {/* ================================================================
          HEADER
          ================================================================ */}

      <WorkIntro />

      {/* ================================================================
          DESKTOP PROJECT NAVIGATION
          ================================================================ */}

      <WorkProgress active={active} />

      {/* ================================================================
          CURRENT PROJECT META
          ================================================================ */}

      <div className="mx-auto mt-10 flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:mt-14 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs text-ink/30">
            0{active + 1}
          </span>

          <span
            className="h-1.5 w-1.5 rounded-full transition-all duration-700"
            style={{
              backgroundColor: currentTheme.accent,
              boxShadow: `0 0 18px ${currentTheme.accent}55`,
            }}
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink/30">
            Currently exploring
          </span>
        </div>

        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink/20">
          03 / 03
        </span>
      </div>

      {/* ================================================================
          PROJECT SHOWCASE
          ================================================================ */}

      <div className="relative z-10 mt-8 sm:mt-12">
        <ScrollStack
          className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12"
          onActiveChange={setActive}
        >
          {PROJECTS.map((project) => (
            <ScrollStackItem
              key={project.caseNumber}
              theme={project.theme}
            >
              <CaseStudyCard {...project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* ================================================================
          CLOSING STATEMENT
          ================================================================ */}

      <div className="mx-auto mt-32 max-w-[1500px] px-5 sm:mt-52 sm:px-8 lg:px-12">
        <div className="border-t border-ink/10 pt-8 sm:pt-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px] lg:items-end">
            <h3 className="max-w-5xl font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.86] tracking-[-0.065em] text-ink">
              Not just
              <span className="text-ink/15">
                {' '}
                another website.
              </span>

              <br />

              Something worth remembering.
            </h3>

            <div className="lg:text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-ink/25">
                Silverloft
              </p>

              <p className="mt-2 text-xs text-ink/35">
                Design · Build · Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          REDUCED MOTION SUPPORT
          ================================================================ */}

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}