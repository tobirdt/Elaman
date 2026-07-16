import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "control" | "pill";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--color-action-primary)] bg-[var(--color-action-primary)] text-[var(--color-on-primary)] hover:border-[var(--color-action-primary-hover)] hover:bg-[var(--color-action-primary-hover)]",
  secondary:
    "border-[var(--border-hairline-strong)] bg-[var(--surface-paper)] text-graphite hover:border-[var(--border-accent-blue)] hover:text-elaman-blue",
  ghost: "border-transparent bg-transparent text-graphite-muted hover:text-graphite",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 py-2 text-[length:var(--type-small)]",
  md: "min-h-11 px-5 py-3 text-[length:var(--type-small)]",
  lg: "min-h-12 px-6 py-3.5 text-[length:var(--type-body)]",
};

const shapeClasses: Record<ButtonShape, string> = {
  control: "rounded-[var(--radius-control)]",
  pill: "rounded-[var(--radius-pill)]",
};

const baseClasses =
  "inline-flex items-center justify-center border font-medium tracking-[0.01em] transition-colors [transition-duration:var(--motion-micro)] [transition-timing-function:var(--motion-ease)] disabled:pointer-events-none disabled:opacity-55";

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: never;
  shape?: ButtonShape;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button(props: AnchorButtonProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const {
      children,
      className = "",
      href,
      shape = "control",
      size = "md",
      variant = "primary",
      ...anchorProps
    } = props;
    const classes = `${baseClasses} ${sizeClasses[size]} ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`;

    return (
      <a {...anchorProps} href={href} className={classes}>
        {children}
      </a>
    );
  }

  const {
    children,
    className = "",
    shape = "control",
    size = "md",
    variant = "primary",
    ...buttonProps
  } = props;
  const classes = `${baseClasses} ${sizeClasses[size]} ${shapeClasses[shape]} ${variantClasses[variant]} ${className}`;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
