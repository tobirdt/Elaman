import type { SVGProps } from "react";

type ElamanMarkProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox">;

/**
 * The Elaman point constellation, redrawn from the supplied logo artwork.
 *
 * The mark deliberately carries its original asymmetric rhythm. It is used as
 * a compact brand signal; the full wordmark remains reserved for the hero and
 * footer.
 */
export function ElamanMark({ className, ...props }: ElamanMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 128 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="75.25" cy="7.67" r="7.67" fill="#b1b1b1" />

      <circle cx="52.63" cy="28.87" r="7.67" fill="#919191" />
      <circle cx="75.25" cy="28.87" r="7.67" fill="#919191" />
      <circle cx="97.89" cy="28.87" r="7.67" fill="#919191" />
      <circle cx="120.34" cy="28.87" r="7.67" fill="#b1b1b1" />

      <circle cx="7.66" cy="49.94" r="7.67" fill="#d2d2d2" />
      <circle cx="30.29" cy="49.94" r="7.67" fill="#b1b1b1" />
      <circle cx="52.63" cy="49.94" r="7.67" fill="#919191" />
      <circle cx="75.25" cy="49.94" r="7.67" fill="#244074" />
      <circle cx="97.89" cy="49.94" r="7.67" fill="#d83034" />

      <circle cx="52.63" cy="71.13" r="7.67" fill="#919191" />
      <circle cx="75.25" cy="71.13" r="7.67" fill="#919191" />

      <circle cx="75.25" cy="92.2" r="7.67" fill="#b1b1b1" />
    </svg>
  );
}
