type MobileStoryVisualProps = {
  index: number;
};

const nodeSets = [
  [3, 8, 13],
  [2, 7, 12, 17],
  [1, 6, 11, 16, 21],
  [4, 9, 14, 19],
  [0, 5, 10, 15, 20],
] as const;

export function MobileStoryVisual({ index }: MobileStoryVisualProps) {
  const activeNodes = (nodeSets[index] ?? nodeSets[0]) as readonly number[];
  const isProtection = index === 3;

  return (
    <div className="relative h-24 overflow-hidden rounded-sm border border-line bg-white/74">
      <div className="technical-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <svg
        viewBox="0 0 220 96"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 64 C58 34 91 34 112 50 C137 69 165 45 196 28"
          stroke={isProtection ? "#D83034" : "#244074"}
          strokeDasharray={isProtection ? "4 9" : "7 10"}
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.42"
        />
        <path
          d="M34 28 H102 C126 28 136 46 136 66 H188"
          stroke="#16181D"
          strokeLinecap="round"
          strokeWidth="1"
          opacity="0.14"
        />
      </svg>
      <div className="relative z-10 grid h-full grid-cols-7 gap-2 p-4">
        {Array.from({ length: 21 }, (_, dotIndex) => {
          const active = activeNodes.includes(dotIndex);

          return (
            <span
              key={dotIndex}
              className={`aspect-square self-center rounded-full ${
                active
                  ? isProtection
                    ? "bg-elaman-red shadow-[0_0_0_6px_rgba(216,48,52,0.08)]"
                    : "bg-elaman-blue shadow-[0_0_0_6px_rgba(36,64,116,0.08)]"
                  : "bg-graphite/10"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
