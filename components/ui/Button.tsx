import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "button-primary border-graphite bg-graphite shadow-[0_20px_50px_rgba(22,24,29,0.16)] hover:-translate-y-0.5 hover:bg-elaman-blue",
  secondary:
    "border-line bg-white/72 text-graphite hover:-translate-y-0.5 hover:border-elaman-blue/30 hover:bg-white",
  ghost: "border-transparent bg-transparent text-graphite-muted hover:text-graphite",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center rounded-sm border px-5 py-3 text-sm font-medium tracking-[0.01em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-elaman-blue disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-55";

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: never;
  variant?: ButtonVariant;
};

export function Button(props: AnchorButtonProps | NativeButtonProps) {
  if (typeof props.href === "string") {
    const { children, className = "", href, variant = "primary", ...anchorProps } = props;
    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
      <a {...anchorProps} href={href} className={classes}>
        {children}
      </a>
    );
  }

  const { children, className = "", variant = "primary", ...buttonProps } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
