'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';

import { arcLetterStyle } from '@/lib/textCurve';

const WORDS = ['Simple', 'Standard', 'Premium'];
const INTERVAL_MS = 3000;

/* =============================================================
   TIER THEME
   Each word in the rotator gets its own identity — a Tailwind
   gradient for the letters + a glow color for the drop-shadow.
   Basic → cool cyan/blue, Standard → electric violet/pink,
   Premium → luxe gold/amber.
   This turns the rotation into a subtle "pricing story": the
   headline itself visually upgrades as it cycles through tiers.

   TIER_ACCENT_HEX is exported so Hero.jsx can sync an ambient
   accent (e.g. the glow behind the foot labels) to whichever
   tier is currently showing — keeps the whole hero feeling like
   one cohesive, living element instead of isolated animations.

   NOTE: these gradient classes (cyan-400, sky-600, purple-500,
   pink-500, amber-400, orange-500...) rely on Tailwind's DEFAULT
   color palette. Make sure tailwind.config.js only extends colors
   (paper/ink/steel/etc. inside `theme.extend.colors`) and does NOT
   define a top-level `colors:` key — that would wipe out the
   default palette and break every gradient below.
   ============================================================= */
const TIER_THEME = {
  Basic: {
    gradient: 'from-cyan-400 via-sky-400 to-blue-500',
    glow: 'rgba(0,210,255,0.45)', // #00D2FF
  },
  Standard: {
    gradient: 'from-purple-500 via-fuchsia-400 to-pink-500',
    glow: 'rgba(160,51,255,0.45)', // #A033FF
  },
  Premium: {
    gradient: 'from-amber-400 via-yellow-300 to-orange-500',
    glow: 'rgba(255,200,55,0.5)', // #FFC837
  },
};

export const TIER_ACCENT_HEX = {
  Basic: '#00D2FF',
  Standard: '#A033FF',
  Premium: '#FFC837',
};

const containerVariants = {
  initial: {},

  animate: {
    transition: {
      staggerChildren: 0.045,
    },
  },

  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

/* Spring physics instead of a manual keyframe array — gives a
   natural, slightly-overshooting "pop" per letter (the bounce),
   plus a soft blur + scale settle for a premium, weighted feel. */
const letterVariants = {
  initial: {
    y: '65%',
    opacity: 0,
    rotateX: -50,
    scale: 0.72,
    filter: 'blur(6px)',
  },

  animate: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      // Spring stays on the transform properties for the "pop" bounce.
      default: {
        type: 'spring',
        stiffness: 320,
        damping: 13,
        mass: 0.8,
      },
      // Filter gets its own non-overshooting tween: a spring settling
      // on blur(0px) briefly overshoots past zero, which produces an
      // invalid negative blur() value (e.g. blur(-1.3px)) on every
      // animation frame — that's what was flooding the console with
      // "Invalid keyframe value for property filter" warnings.
      filter: {
        type: 'tween',
        duration: 0.32,
        ease: 'easeOut',
      },
    },
  },

  exit: {
    y: '-65%',
    opacity: 0,
    rotateX: 50,
    scale: 0.72,
    filter: 'blur(4px)',
    transition: {
      duration: 0.26,
      ease: [0.5, 0, 0.75, 0],
    },
  },
};

export default function RotatingWord({
  className = '',
  curveTotal,
  onWordChange,
  // Responsive curve amplitude — Hero.jsx measures the viewport and
  // passes smaller values on mobile/tablet so the arc's vertical dip
  // stays proportional to the (now much smaller) mobile font size
  // instead of reusing the same 40px/5.5deg desktop amplitude, which
  // would look disproportionately deep on a ~40px-tall mobile word.
  // Defaults match arcLetterStyle's own defaults, so nothing changes
  // for any caller that doesn't pass these.
  arcDepth,
  arcRotation,
}) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const word = WORDS[index];
  const theme = TIER_THEME[word] ?? TIER_THEME.Basic;

  // Tell Hero which word is currently active
  // so the entire headline uses ONE continuous arc.
  useEffect(() => {
    onWordChange?.(word);
  }, [word, onWordChange]);

  const total = curveTotal ?? word.length;

  const curveOptions = {
    ...(arcDepth !== undefined ? { depth: arcDepth } : {}),
    ...(arcRotation !== undefined ? { rotation: arcRotation } : {}),
  };

  return (
    <span
      className={`relative inline-flex overflow-visible align-top ${className}`}
      aria-live="polite"
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.span
          key={word}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="inline-flex shrink-0"
          style={{ filter: `drop-shadow(0 8px 24px ${theme.glow})` }}
        >
          {word.split('').map((char, i) => (
            <span
              key={`${word}-curve-${i}`}
              className="shrink-0"
              style={arcLetterStyle(i, total, curveOptions)}
            >
              <motion.span
                variants={letterVariants}
                className={`inline-block bg-gradient-to-b ${theme.gradient} bg-clip-text text-transparent`}
                style={{ transformOrigin: 'bottom center' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}