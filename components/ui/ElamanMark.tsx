import type { SVGProps } from "react";

import { DOT_COLORS } from "@/components/ui/DotMatrix";
import {
  BRAND_MARK_DOT_RADIUS,
  BRAND_MARK_VIEWBOX,
  brandMarkFormation,
} from "@/lib/design/formations";

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
      viewBox={`0 0 ${BRAND_MARK_VIEWBOX.width} ${BRAND_MARK_VIEWBOX.height}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {brandMarkFormation.dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={BRAND_MARK_DOT_RADIUS}
          fill={DOT_COLORS[dot.tone]}
        />
      ))}
    </svg>
  );
}
