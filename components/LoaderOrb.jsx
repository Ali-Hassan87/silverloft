'use client';

/* =============================================================
   LOADER ORB
   Uiverse loader (by andrew-manzyk), ported as a standalone
   component so it can drop into Hero.jsx as a floating accent
   next to the existing badges. `size` scales it via the
   component's own --size CSS var — no wrapper transforms needed,
   so the box-shadow/blur values stay crisp at any scale.

   NOTE: the SVG mask id ("silverloft-loader-clip") is fixed.
   Fine for a single instance (as used in Hero below) — if this
   ever gets reused twice on the same page, swap the id to a
   prop so the two masks don't collide.
   ============================================================= */
export default function LoaderOrb({ size = 1, className = '' }) {
  return (
    <div
      className={`loader-orb ${className}`}
      style={{
        '--size': 'var(--responsive-orb-size, ' + size + ')',
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="silverloft-loader-clip">
            <polygon points="0,0 100,0 100,100 0,100" fill="black" />
            <polygon points="25,25 75,25 50,75" fill="white" />
            <polygon points="50,25 75,75 25,75" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
          </mask>
        </defs>
      </svg>
      <div className="box" />

      <style jsx>{`
        .loader-orb {
          --color-one: #ffbf48;
          --color-two: #be4a1d;
          --color-three: #ffbf4780;
          --color-four: #bf4a1d80;
          --color-five: #ffbf4740;
          --time-animation: 2s;
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          transform: scale(var(--size));
          box-shadow:
            0 0 25px 0 var(--color-three),
            0 20px 50px 0 var(--color-four);
          animation: loaderColorize calc(var(--time-animation) * 3) ease-in-out infinite;
        }
        .loader-orb::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border-top: solid 1px var(--color-one);
          border-bottom: solid 1px var(--color-two);
          background: linear-gradient(180deg, var(--color-five), var(--color-four));
          box-shadow:
            inset 0 10px 10px 0 var(--color-three),
            inset 0 -10px 10px 0 var(--color-four);
        }
        .loader-orb .box {
          width: 100px;
          height: 100px;
          background: linear-gradient(180deg, var(--color-one) 30%, var(--color-two) 70%);
          mask: url(#silverloft-loader-clip);
          -webkit-mask: url(#silverloft-loader-clip);
        }
        .loader-orb svg {
          position: absolute;
          top: 0;
          left: 0;
        }
        .loader-orb svg mask {
          filter: contrast(15);
          animation: loaderRoundness calc(var(--time-animation) / 2) linear infinite;
        }
        .loader-orb svg mask polygon {
          filter: blur(7px);
        }
        .loader-orb svg mask polygon:nth-child(1) {
          transform-origin: 75% 25%;
          transform: rotate(90deg);
        }
        .loader-orb svg mask polygon:nth-child(2) {
          transform-origin: 50% 50%;
          animation: loaderRotation var(--time-animation) linear infinite reverse;
        }
        .loader-orb svg mask polygon:nth-child(3) {
          transform-origin: 50% 60%;
          animation: loaderRotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -3);
        }
        .loader-orb svg mask polygon:nth-child(4) {
          transform-origin: 40% 40%;
          animation: loaderRotation var(--time-animation) linear infinite reverse;
        }
        .loader-orb svg mask polygon:nth-child(5) {
          transform-origin: 40% 40%;
          animation: loaderRotation var(--time-animation) linear infinite reverse;
          animation-delay: calc(var(--time-animation) / -2);
        }
        .loader-orb svg mask polygon:nth-child(6) {
          transform-origin: 60% 40%;
          animation: loaderRotation var(--time-animation) linear infinite;
        }
        .loader-orb svg mask polygon:nth-child(7) {
          transform-origin: 60% 40%;
          animation: loaderRotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -1.5);
        }

        @keyframes loaderRotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes loaderRoundness {
          0% {
            filter: contrast(15);
          }
          20% {
            filter: contrast(3);
          }
          40% {
            filter: contrast(3);
          }
          60% {
            filter: contrast(15);
          }
          100% {
            filter: contrast(15);
          }
        }
        @keyframes loaderColorize {
          0% {
            filter: hue-rotate(0deg);
          }
          20% {
            filter: hue-rotate(-30deg);
          }
          40% {
            filter: hue-rotate(-60deg);
          }
          60% {
            filter: hue-rotate(-90deg);
          }
          80% {
            filter: hue-rotate(-45deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-orb,
          .loader-orb::before,
          .loader-orb svg mask,
          .loader-orb svg mask polygon {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}