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

  return {
    display: 'inline-block',
    transform: `translate3d(0, ${y}px, 0) rotate(${rotate}deg)`,
    transformOrigin: 'center center',
    willChange: 'transform',
  };
}