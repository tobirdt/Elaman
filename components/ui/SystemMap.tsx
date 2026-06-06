import type { ContentCard } from "@/types/site";

type SystemMapProps = {
  items: readonly ContentCard[];
};

export function SystemMap({ items }: SystemMapProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/12 bg-white/[0.055] p-5 sm:p-7">
      <div className="technical-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <svg
        viewBox="0 0 760 360"
        className="relative z-0 hidden w-full sm:block"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M106 184 H276 C326 184 336 84 392 84 H624"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
        />
        <path
          d="M106 184 H292 C344 184 350 276 405 276 H654"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
        />
        <path
          d="M106 184 H644"
          stroke="#D83034"
          strokeOpacity="0.42"
          strokeDasharray="6 12"
        />
        <circle cx="106" cy="184" r="42" fill="rgba(255,255,255,0.08)" />
        <circle cx="106" cy="184" r="12" fill="#244074" />
        <circle cx="644" cy="184" r="34" fill="rgba(255,255,255,0.08)" />
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
              <span className="h-px flex-1 bg-white/16" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="relative z-10 grid gap-3 sm:-mt-6 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-sm border border-white/10 bg-white/[0.07] p-4"
          >
            <p className="text-[0.68rem] font-semibold text-elaman-red">
              SYS {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
