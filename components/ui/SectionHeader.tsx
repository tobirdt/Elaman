import { MonoLabel } from "@/components/ui/MonoLabel";

type SectionHeaderAlign = "left" | "center";
type SectionHeaderSize = "display" | "h1" | "h2" | "h3";
type SectionHeaderWidth = "copy" | "content" | "narrow" | "full";

type SectionHeaderProps = {
  align?: SectionHeaderAlign;
  as?: "h1" | "h2" | "h3";
  body?: string;
  className?: string;
  label?: string;
  labelTone?: "blue" | "red" | "ink" | "onDark";
  onDark?: boolean;
  size?: SectionHeaderSize;
  title: string;
  width?: SectionHeaderWidth;
};

const alignClasses: Record<SectionHeaderAlign, string> = {
  left: "",
  center: "mx-auto text-center",
};

const widthClasses: Record<SectionHeaderWidth, string> = {
  copy: "max-w-[var(--container-copy)]",
  content: "max-w-[var(--container-content)]",
  narrow: "max-w-[var(--container-narrow)]",
  full: "max-w-none",
};

const titleClasses: Record<SectionHeaderSize, string> = {
  display:
    "text-[length:var(--type-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]",
  /* Legacy size — mapped to h2 while remaining consumers migrate. */
  h1: "text-[length:var(--type-h2)] leading-[var(--leading-title)] tracking-[var(--tracking-title)]",
  h2: "text-[length:var(--type-h2)] leading-[var(--leading-title)] tracking-[var(--tracking-title)]",
  h3: "text-[length:var(--type-h3)] leading-[var(--leading-title)] tracking-[var(--tracking-title)]",
};

export function SectionHeader({
  align = "left",
  as: TitleTag = "h2",
  body,
  className = "",
  label,
  labelTone = "blue",
  onDark = false,
  size = "h2",
  title,
  width = "copy",
}: SectionHeaderProps) {
  return (
    <div className={`${widthClasses[width]} ${alignClasses[align]} ${className}`}>
      {label ? (
        <MonoLabel tone={labelTone} className="mb-5">
          {label}
        </MonoLabel>
      ) : null}
      <TitleTag
        className={`text-balance font-semibold ${
          onDark ? "text-[var(--color-on-dark)]" : "text-graphite"
        } ${titleClasses[size]}`}
      >
        {title}
      </TitleTag>
      {body ? (
        <p
          className={`mt-5 text-[length:var(--type-lead)] leading-[var(--leading-body)] ${
            onDark ? "text-[var(--color-on-dark-muted)]" : "text-graphite-muted"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
