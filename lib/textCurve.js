// lib/textCurve.js

/**
 * Places letters along one continuous, shallow circular-style arc.
 *
 * Center letters stay highest.
 * Letters gradually descend toward both sides.
 * Rotation follows the tangent of the same curve.
 */
export function arcLetterStyle(
  index,
  total,
  {
    depth = 40,
    rotation = 5.5,
  } = {}
) {
  if (total <= 1) {
    return {
      display: 'inline-block',
    };
  }

  const center = (total - 1) / 2;

  // -1 = far left
  //  0 = center
  // +1 = far right
  const x = (index - center) / center;

  // Smooth shallow arc.
  // Center = 0px
  // Edges = depth
  const y =
    depth *
    (1 - Math.sqrt(Math.max(0, 1 - x * x)));

  // Rotation follows the tangent of the curve.
  // Left side tilts left.
  // Center stays almost straight.
  // Right side tilts right.
  const rotate =
    Math.asin(x) *
    (rotation / (Math.PI / 2));

  // Round to a fixed precision before it ever becomes a string.
  // Math.sqrt/Math.asin can differ in their last 1-2 decimal digits
  // between server (Node) and client (browser) floating-point
  // implementations — visually meaningless, but React's hydration
  // check compares the style STRING exactly, so it was flagging a
  // "Prop `style` did not match" warning on every letter. Rounding
  // to 4 decimal places (still sub-pixel precision) makes server
  // and client always produce the identical string.
  const roundedY = Math.round(y * 10000) / 10000;
  const roundedRotate = Math.round(rotate * 10000) / 10000;

  return {
    display: 'inline-block',
    transform: `translate3d(0, ${roundedY}px, 0) rotate(${roundedRotate}deg)`,
    transformOrigin: 'center center',
    willChange: 'transform',
  };
}