import { SectionLabel } from "@/components/ui/SectionLabel";

type SectionIntroProps = {
  label: string;
  title: string;
  lead?: string;
  /** Matches `PageHeader`, so a section title sits on the same left edge. */
  className?: string;
};

/**
 * The opening of a section, built like the page header and therefore starting
 * on the same left edge: label, title, optional lead. Every section below a
 * page header uses it, so the eye has one vertical line to follow down a page
 * instead of the four it had to find before.
 *
 * The title is one step below the page title in weight of voice but the same
 * size step, because both are headings of their own level; item titles inside
 * a section are smaller and marked up as `h3`.
 */
export function SectionIntro({ label, title, lead, className = "" }: SectionIntroProps) {
  return (
    <div className={`reveal max-w-[var(--container-content)] ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-5 max-w-[20ch] text-balance text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
        {title}
      </h2>
      {lead ? (
        <p className="mt-6 max-w-[62ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
