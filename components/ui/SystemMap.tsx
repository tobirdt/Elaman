import type { ContentCard } from "@/types/site";

type SystemMapProps = {
  items: readonly ContentCard[];
};

export function SystemMap({ items }: SystemMapProps) {
  return (
    <div className="glass-surface-strong relative overflow-hidden rounded-lg p-5 sm:p-7">
      <div className="technical-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <svg
        viewBox="0 0 760 360"
        className="relative z-0 hidden h-56 w-full sm:block"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M106 184 H276 C326 184 336 84 392 84 H624"
          stroke="#244074"
          strokeOpacity="0.18"
        />
        <path
          d="M106 184 H292 C344 184 350 276 405 276 H654"
          stroke="#244074"
          strokeOpacity="0.18"
        />
        <path
          d="M106 184 H644"
          stroke="#D83034"
          strokeOpacity="0.42"
          strokeDasharray="6 12"
        />
        <circle cx="106" cy="184" r="42" fill="rgba(36,64,116,0.06)" />
        <circle cx="106" cy="184" r="12" fill="#244074" />
        <circle cx="644" cy="184" r="34" fill="rgba(216,48,52,0.06)" />
        <circle cx="644" cy="184" r="10" fill="#D83034" />
      </svg>
      <div
        className="relative z-10 mb-5 grid grid-cols-5 items-center gap-2 sm:hidden"
        aria-hidden="true"
      >
        {items.map((item, index) => (
          <div key={item.title} className="flex items-center gap-2">
            <span
              className={`size-3 rounded-full ${index === items.length - 1 ? "bg-elaman-red" : "bg-elaman-blue"}`}
            />
            {index < items.length - 1 ? (
              <span className="h-px flex-1 bg-graphite/12" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="relative z-10 grid gap-3 sm:-mt-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-sm border border-line bg-white/72 p-3.5"
          >
            <p className="text-[0.68rem] font-semibold text-elaman-red">
              SYS {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-graphite">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-graphite-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
