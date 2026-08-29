export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base: Crimson / Deep Red */}
      <div className="absolute inset-0 bg-[#650008]" />

      {/* Main orange glow */}
      <div
        className="
          absolute
          -left-[25%]
          -top-[15%]
          h-[85vh]
          w-[85vw]
          rounded-full
          bg-[#ffb000]/90
          blur-[140px]
        "
      />

      {/* Strong orange transition */}
      <div
        className="
          absolute
          left-[5%]
          top-[5%]
          h-[80vh]
          w-[70vw]
          rounded-full
          bg-[#ff5a00]/75
          blur-[130px]
        "
      />

      {/* Red / crimson right side */}
      <div
        className="
          absolute
          -right-[20%]
          top-[0%]
          h-[90vh]
          w-[65vw]
          rounded-full
          bg-[#d40018]/80
          blur-[120px]
        "
      />

      {/* Deep crimson bottom */}
      <div
        className="
          absolute
          -bottom-[35%]
          left-[15%]
          h-[75vh]
          w-[80vw]
          rounded-full
          bg-[#8b0010]
          blur-[130px]
        "
      />

      {/* Bright cinematic center */}
      <div
        className="
          absolute
          left-[18%]
          top-[15%]
          h-[55vh]
          w-[55vw]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,190,0,0.65)_0%,rgba(255,80,0,0.35)_35%,transparent_72%)]
          blur-[70px]
        "
      />

      {/* Diagonal orange light */}
      <div
        className="
          absolute
          -left-[10%]
          top-[38%]
          h-[180px]
          w-[125%]
          rotate-[8deg]
          bg-gradient-to-r
          from-transparent
          via-[#ff7a00]/35
          to-transparent
          blur-[35px]
        "
      />

      {/* Sharp diagonal highlight */}
      <div
        className="
          absolute
          -left-[10%]
          top-[40%]
          h-[2px]
          w-[120%]
          rotate-[8deg]
          bg-[#ffb000]/40
          shadow-[0_0_35px_#ff6a00]
        "
      />

      {/* Subtle futuristic grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.06]
          [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:90px_90px]
        "
      />

      {/* Soft vignette — NOT black */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(80,0,8,0.28)_100%)]
        "
      />
    </div>
  );
}