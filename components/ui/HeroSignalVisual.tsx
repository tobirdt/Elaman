type HeroSignalVisualProps = {
  label: string;
  body: string;
  badge: string;
  steps: readonly string[];
};

const TOTAL_DOTS = 49; // 7 × 7
const ACTIVE_BLUE = new Set([10, 17, 18, 24, 25, 31]);
const ACTIVE_RED = new Set([32, 33]);
const RING_DOTS = new Set([11, 16, 23, 30, 37]);

export function HeroSignalVisual({ label, body, badge, steps }: HeroSignalVisualProps) {
  return (
    <div className="relative min-h-[18rem] overflow-hidden rounded-xl border border-white/80 bg-white/68 p-5 shadow-[0_36px_110px_rgba(22,24,29,0.10)] backdrop-blur-2xl sm:min-h-[30rem] sm:p-7 lg:min-h-[32rem]">
      <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />

      <svg
        viewBox="0 0 540 540"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Primary signal arc — blue comms line */}
        <path
          d="M54 360 C120 272 178 248 268 268 C356 288 408 232 486 148"
          stroke="#244074"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="9 14"
          opacity="0.5"
          className="signal-march"
        />
        {/* Secondary signal arc — comms layer */}
        <path
          d="M72 406 C148 386 208 352 262 296 C320 232 380 222 448 240"
          stroke="#244074"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="5 10"
          opacity="0.28"
        />
        {/* Protection line — red accent */}
        <path
          d="M80 432 C166 414 228 376 276 326 C340 258 404 254 474 270"
          stroke="#D83034"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 14"
          opacity="0.38"
          className="signal-march"
          style={{ animationDirection: "reverse" }}
        />
        {/* Structural frame — vertical */}
        <path
          d="M124 108 H332 C376 108 412 144 412 188 V392"
          stroke="#16181D"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.12"
        />
        {/* Horizontal grid reference */}
        <path
          d="M54 268 H486"
          stroke="#244074"
          strokeWidth="0.8"
          opacity="0.08"
          strokeDasharray="3 8"
        />
        {/* Node markers on signal path */}
        <circle cx="268" cy="268" r="5" fill="#244074" opacity="0.52" />
        <circle
          cx="268"
          cy="268"
          r="12"
          fill="none"
          stroke="#244074"
          strokeWidth="1"
          opacity="0.18"
        />
        <circle cx="412" cy="188" r="4" fill="#D83034" opacity="0.48" />
        <circle
          cx="412"
          cy="188"
          r="10"
          fill="none"
          stroke="#D83034"
          strokeWidth="1"
          opacity="0.16"
        />
        <circle cx="148" cy="218" r="3" fill="#244074" opacity="0.36" />
        <circle cx="354" cy="296" r="3" fill="#244074" opacity="0.36" />
      </svg>

      {/* Inset top/bottom accent lines */}
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/32 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/26 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[15rem] flex-col justify-between gap-6 sm:min-h-[27rem] lg:min-h-[29rem]">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-elaman-blue">
              {label}
            </p>
            <p className="mt-1.5 max-w-52 text-xs leading-5 text-graphite-muted sm:text-sm sm:leading-6">
              {body}
            </p>
          </div>
          <div className="shrink-0 rounded-full border border-line bg-white/80 px-3 py-1.5 text-[0.68rem] font-medium text-graphite-muted">
            {badge}
          </div>
        </div>

        {/* Dot matrix */}
        <div className="mx-auto grid w-full max-w-[14rem] grid-cols-7 gap-[0.45rem] sm:max-w-[18rem] sm:gap-3">
          {Array.from({ length: TOTAL_DOTS }, (_, index) => {
            const isBlue = ACTIVE_BLUE.has(index);
            const isRed = ACTIVE_RED.has(index);
            const isRing = RING_DOTS.has(index);

            return (
              <span
                key={index}
                className={`aspect-square rounded-full ${
                  isBlue
                    ? "node-blue"
                    : isRed
                      ? "node-red"
                      : isRing
                        ? "border border-elaman-blue/30 bg-elaman-blue/8"
                        : "bg-graphite/10"
                }`}
              />
            );
          })}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-md border border-line/80 bg-white/76 p-2.5 shadow-[0_8px_24px_rgba(22,24,29,0.05)] sm:p-3.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${index === 2 ? "bg-elaman-red" : "bg-elaman-blue"}`}
                  aria-hidden="true"
                />
                <p className="text-[0.6rem] font-semibold text-graphite-soft sm:text-[0.68rem]">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <p className="mt-2 text-[0.72rem] font-semibold leading-tight text-graphite sm:mt-2.5 sm:text-sm">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
