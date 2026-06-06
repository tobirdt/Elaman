export function HeroSignalVisual() {
  const dots = Array.from({ length: 49 }, (_, index) => {
    const activeBlue = [10, 17, 24, 31].includes(index);
    const activeRed = [25, 32].includes(index);

    return {
      activeBlue,
      activeRed,
    };
  });

  return (
    <div className="relative min-h-[20rem] overflow-hidden rounded-lg border border-white/80 bg-white/64 p-5 shadow-[0_32px_100px_rgba(22,24,29,0.09)] backdrop-blur-2xl sm:min-h-[31rem] sm:p-7 lg:min-h-[38rem]">
      <div className="technical-grid absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-elaman-blue/30 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-elaman-red/24 to-transparent" />

      <svg
        viewBox="0 0 520 520"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M64 336 C148 252 192 236 260 260 C332 285 378 246 456 156"
          stroke="#244074"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="9 13"
          opacity="0.46"
        />
        <path
          d="M84 398 C151 376 201 340 252 292 C312 236 360 220 438 230"
          stroke="#D83034"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 12"
          opacity="0.38"
        />
        <path
          d="M122 124 H318 C360 124 394 158 394 200 V376"
          stroke="#16181D"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.16"
        />
      </svg>

      <div className="relative z-10 flex h-full min-h-[17rem] flex-col justify-between sm:min-h-[28rem] lg:min-h-[35rem]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-elaman-blue">
              Secure Systems
            </p>
            <p className="mt-2 max-w-56 text-xs leading-5 text-graphite-muted sm:text-sm sm:leading-6">
              Communications, observation, command, and protection layers.
            </p>
          </div>
          <div className="rounded-full border border-line bg-white/72 px-3 py-2 text-xs font-medium text-graphite-muted">
            Munich / DE
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[15rem] grid-cols-7 gap-2 sm:max-w-sm sm:gap-4">
          {dots.map((dot, index) => (
            <span
              key={index}
              className={`aspect-square rounded-full ${
                dot.activeBlue
                  ? "bg-elaman-blue shadow-[0_0_0_8px_rgba(36,64,116,0.08)]"
                  : dot.activeRed
                    ? "bg-elaman-red shadow-[0_0_0_8px_rgba(216,48,52,0.08)]"
                    : "bg-graphite/12"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {["Analyze", "Integrate", "Support"].map((label, index) => (
            <div
              key={label}
              className="rounded-sm border border-line/80 bg-white/72 p-3 sm:p-4"
            >
              <p className="text-[0.66rem] font-semibold text-graphite-soft sm:text-xs">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-xs font-semibold text-graphite sm:mt-4 sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
