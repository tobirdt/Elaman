type MobileStoryVisualProps = {
  index: number;
};

type DotPattern = { blue: number[]; ring: number[]; red: number[] };

// Per-step active dot sets — each creates a different visual pattern
const STEP_PATTERNS: DotPattern[] = [
  // 0: Trust — central stable cluster
  { blue: [10, 11, 17, 18], ring: [3, 4, 24, 25], red: [] },
  // 1: Advice — structured column
  { blue: [2, 9, 16, 23, 28], ring: [3, 10, 17, 24], red: [] },
  // 2: Communications — horizontal spread
  { blue: [6, 7, 8, 13, 14, 15], ring: [0, 5, 20, 27], red: [] },
  // 3: Surveillance — grid pattern
  { blue: [0, 4, 8, 14, 20, 24, 28], ring: [6, 12, 18], red: [] },
  // 4: Protection — red active
  { blue: [2, 4, 6], ring: [8, 14, 20], red: [10, 11, 17, 18] },
  // 5: Delivery — full system
  { blue: [0, 4, 8, 12, 16], ring: [2, 6, 10, 14], red: [18, 22, 26] },
];

export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  const pattern = STEP_PATTERNS[index] ?? STEP_PATTERNS[0];
  const isProtection = index === 4;
  const isDelivery = index === 5;

  return (
    <div className="relative h-20 overflow-hidden rounded-lg border border-line bg-white/76">
      <div className="technical-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Signal path SVG */}
      <svg
        viewBox="0 0 220 80"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Primary path */}
        <path
          d={
            isProtection
              ? "M18 54 C54 24 86 24 110 40 C138 58 168 36 202 20"
              : isDelivery
                ? "M18 40 H202"
                : "M22 58 C60 28 96 28 112 44 C130 62 162 38 198 24"
          }
          stroke={isProtection ? "#D83034" : "#244074"}
          strokeDasharray={isProtection ? "4 9" : isDelivery ? "3 6" : "7 11"}
          strokeLinecap="round"
          strokeWidth={isDelivery ? "1" : "1.6"}
          opacity="0.44"
        />
        {!isProtection && (
          <path
            d="M30 22 H96 C118 22 126 44 126 62 H186"
            stroke="#16181D"
            strokeLinecap="round"
            strokeWidth="0.9"
            opacity="0.12"
          />
        )}
        {isDelivery && (
          <path
            d="M18 58 C60 44 96 30 202 56"
            stroke="#D83034"
            strokeDasharray="3 8"
            strokeLinecap="round"
            strokeWidth="1.2"
            opacity="0.32"
          />
        )}
      </svg>

      {/* Dot grid */}
      <div className="relative z-10 grid h-full grid-cols-7 gap-1.5 p-3">
        {Array.from({ length: 7 * 4 }, (_, i) => {
          const isBlue = pattern.blue.includes(i);
          const isRing = pattern.ring.includes(i);
          const isRed = pattern.red.includes(i);

          return (
            <span
              key={i}
              className={`aspect-square self-center rounded-full ${
                isRed
                  ? "bg-elaman-red shadow-[0_0_0_4px_rgba(216,48,52,0.1)]"
                  : isBlue
                    ? "bg-elaman-blue shadow-[0_0_0_4px_rgba(36,64,116,0.1)]"
                    : isRing
                      ? "border border-elaman-blue/26 bg-white"
                      : "bg-graphite/10"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
