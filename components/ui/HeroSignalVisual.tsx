type HeroSignalVisualProps = {
  label: string;
  body: string;
  badge: string;
  steps: readonly string[];
};

export function HeroSignalVisual({ label, body, badge, steps }: HeroSignalVisualProps) {
  return (
    <div className="relative min-h-[18rem] overflow-hidden rounded-xl border border-white/80 bg-white/68 p-5 shadow-[0_36px_110px_rgba(22,24,29,0.10)] backdrop-blur-2xl sm:min-h-[30rem] sm:p-7 lg:min-h-[32rem]">
      <div className="technical-grid absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Inset accent lines */}
      <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-elaman-blue/28 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-elaman-red/22 to-transparent" />

      {/* Main abstract diagram */}
      <svg
        viewBox="0 0 400 320"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer ring */}
        <circle
          cx="200"
          cy="160"
          r="120"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.14"
          strokeDasharray="3 9"
        />
        {/* Mid ring */}
        <circle
          cx="200"
          cy="160"
          r="80"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.10"
        />
        {/* Inner ring */}
        <circle
          cx="200"
          cy="160"
          r="40"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeDasharray="2 6"
        />

        {/* Crosshair — horizontal */}
        <line
          x1="60"
          y1="160"
          x2="340"
          y2="160"
          stroke="#244074"
          strokeWidth="0.7"
          strokeOpacity="0.12"
        />
        {/* Crosshair — vertical */}
        <line
          x1="200"
          y1="24"
          x2="200"
          y2="296"
          stroke="#244074"
          strokeWidth="0.7"
          strokeOpacity="0.12"
        />

        {/* Diagonal reference lines */}
        <line
          x1="115"
          y1="75"
          x2="285"
          y2="245"
          stroke="#244074"
          strokeWidth="0.5"
          strokeOpacity="0.07"
        />
        <line
          x1="285"
          y1="75"
          x2="115"
          y2="245"
          stroke="#244074"
          strokeWidth="0.5"
          strokeOpacity="0.07"
        />

        {/* Primary signal arc — blue, animated march */}
        <path
          d="M80 220 C120 160 160 124 200 120 C244 116 276 136 320 96"
          stroke="#244074"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="8 14"
          strokeOpacity="0.52"
          className="signal-march"
        />
        {/* Secondary arc — red, reverse march */}
        <path
          d="M80 248 C130 228 170 200 200 170 C232 140 270 132 320 140"
          stroke="#D83034"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="5 12"
          strokeOpacity="0.40"
          className="signal-march"
          style={{ animationDirection: "reverse", animationDuration: "2.6s" }}
        />

        {/* Scanning arc segment (decorative, thin) */}
        <path
          d="M200 160 L200 80"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.20"
        />
        <path
          d="M200 80 A80 80 0 0 1 272 136"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.18"
          fill="rgba(36,64,116,0.03)"
        />

        {/* Center origin */}
        <circle cx="200" cy="160" r="4" fill="#244074" fillOpacity="0.50" />
        <circle
          cx="200"
          cy="160"
          r="10"
          fill="none"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.18"
        />

        {/* Cardinal point markers */}
        <circle cx="200" cy="80" r="3" fill="#244074" fillOpacity="0.35" />
        <circle cx="280" cy="160" r="3" fill="#244074" fillOpacity="0.35" />
        <circle cx="200" cy="240" r="3" fill="#244074" fillOpacity="0.35" />
        <circle cx="120" cy="160" r="3" fill="#244074" fillOpacity="0.35" />

        {/* Signal node on blue arc */}
        <circle cx="200" cy="120" r="4.5" fill="#244074" fillOpacity="0.55" />
        <circle
          cx="200"
          cy="120"
          r="10"
          fill="none"
          stroke="#244074"
          strokeWidth="0.8"
          strokeOpacity="0.18"
        />

        {/* Signal node on red arc */}
        <circle cx="270" cy="132" r="3.5" fill="#D83034" fillOpacity="0.50" />
        <circle
          cx="270"
          cy="132"
          r="8"
          fill="none"
          stroke="#D83034"
          strokeWidth="0.8"
          strokeOpacity="0.16"
        />

        {/* Corner micro-marks */}
        <path
          d="M44 44 H58 M44 44 V58"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />
        <path
          d="M356 44 H342 M356 44 V58"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />
        <path
          d="M44 276 H58 M44 276 V262"
          stroke="#244074"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />
        <path
          d="M356 276 H342 M356 276 V262"
          stroke="#D83034"
          strokeWidth="1"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
      </svg>

      {/* Content layer */}
      <div className="relative z-10 flex h-full min-h-[15rem] flex-col justify-between gap-5 sm:min-h-[27rem] lg:min-h-[29rem]">
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

        {/* Spacer — the SVG fills this area */}
        <div className="flex-1" />

        {/* Step cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-line/80 bg-white/80 p-2.5 shadow-[0_6px_20px_rgba(22,24,29,0.05)] sm:p-3.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`size-1.5 rounded-full ${index === 2 ? "bg-elaman-red/70" : "bg-elaman-blue/70"}`}
                  aria-hidden="true"
                />
                <p className="text-[0.6rem] font-semibold tabular-nums text-graphite-soft sm:text-[0.68rem]">
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
