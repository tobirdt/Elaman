/**
 * Dot formations — the brand's visual signature system.
 *
 * All coordinates live in the logo's own grid space: the Elaman icon
 * (public/brand/elaman-icon.svg) is a Manhattan diamond of radius 3 on a
 * 12px-pitch grid — 25 dots with |x| + |y| <= 3, the blue dot at the exact
 * center (0,0) and the red dot offset north-east at (2,-1).
 *
 * Governance: per composition exactly one blue dot (Elaman / the active
 * state), at most one red dot (protection semantics only), all other dots
 * ink at low opacity.
 */

export type DotTone = "ink" | "blue" | "red";

export type FormationDot = {
  x: number;
  y: number;
  tone: DotTone;
};

export type Formation = {
  dots: FormationDot[];
  /** Index pairs to connect with hairline edges. */
  edges?: ReadonlyArray<readonly [number, number]>;
};

export const DIAMOND_RADIUS = 3;

/**
 * Round trig-derived coordinates to a fixed precision. `Math.cos`/`Math.sin`
 * can differ in their last bit between the server's and the browser's libm,
 * which otherwise surfaces as a React hydration mismatch on every animated
 * dot. Three decimal places is far below visual significance.
 */
function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function buildDiamondDots(): FormationDot[] {
  const dots: FormationDot[] = [];

  for (let y = -DIAMOND_RADIUS; y <= DIAMOND_RADIUS; y += 1) {
    for (let x = -DIAMOND_RADIUS; x <= DIAMOND_RADIUS; x += 1) {
      if (Math.abs(x) + Math.abs(y) > DIAMOND_RADIUS) {
        continue;
      }

      const tone: DotTone =
        x === 0 && y === 0 ? "blue" : x === 2 && y === -1 ? "red" : "ink";
      dots.push({ x, y, tone });
    }
  }

  return dots;
}

/** The logo mark itself — 25 dots, blue center, red at (2,-1). */
export const diamondFormation: Formation = {
  dots: buildDiamondDots(),
};

/**
 * Defensive perimeter — ring of ink dots around a red center (the protected
 * principal). Used once on the page, in the Protection section.
 */
export function perimeterFormation(ringDots = 16, radius = 3): Formation {
  const dots: FormationDot[] = [{ x: 0, y: 0, tone: "red" }];

  for (let i = 0; i < ringDots; i += 1) {
    const angle = (i / ringDots) * Math.PI * 2 - Math.PI / 2;
    dots.push({
      x: round(Math.cos(angle) * radius),
      y: round(Math.sin(angle) * radius),
      tone: "ink",
    });
  }

  return { dots };
}

/*
 * Story formations — six states of the same 25 dots, one per lifecycle step.
 * Dot identity is positional: index i is the same physical dot in every
 * formation, so the stage can morph them 1:1.
 *
 * In the diamond (row-major generation order) the blue center sits at index
 * 12 and the red dot at index 8 — every other formation places its blue/red
 * moments at those same indices.
 */

export const STORY_BLUE_INDEX = 12;
export const STORY_RED_INDEX = 8;

/** Shared drawing bounds so every formation renders in the same frame. */
export const STORY_BOUNDS = { minX: -6.2, maxX: 6.2, minY: -4.2, maxY: 4.2 } as const;

const DOT_COUNT = diamondFormation.dots.length;

function withTones(
  positions: Array<Pick<FormationDot, "x" | "y">>,
  redActive: boolean,
): FormationDot[] {
  return positions.map((position, index) => ({
    ...position,
    tone:
      index === STORY_BLUE_INDEX
        ? "blue"
        : index === STORY_RED_INDEX && redActive
          ? "red"
          : "ink",
  }));
}

/** 01 Experience — dispersed field (assessment). Deterministic golden-angle scatter. */
function fieldFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, i) => {
    const radius = 0.74 * Math.sqrt(i + 0.4);
    const angle = i * 2.399963;
    return {
      x: round(Math.cos(angle) * radius * 1.5),
      y: round(Math.sin(angle) * radius * 1.05),
    };
  });

  return { dots: withTones(positions, false) };
}

/** 02 Advice — ordered columns (structure emerges). */
function columnsFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: ((i % 5) - 2) * 2.3,
    y: (Math.floor(i / 5) - 2) * 1.5,
  }));

  return { dots: withTones(positions, false) };
}

/** 03 Surveillance & communications — connected chain (integration). */
function chainFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, i) => {
    const t = i / (DOT_COUNT - 1);
    return {
      x: round(-5.4 + t * 10.8),
      y: round(Math.sin(t * Math.PI * 2) * 1.7),
    };
  });
  const edges = Array.from({ length: DOT_COUNT - 1 }, (_, i) => [i, i + 1] as const);

  return { dots: withTones(positions, false), edges };
}

/** 04 Protection — perimeter around the red principal. The page's red moment. */
function storyPerimeterFormation(): Formation {
  const positions: Array<Pick<FormationDot, "x" | "y">> = new Array(DOT_COUNT);
  positions[STORY_RED_INDEX] = { x: 0, y: 0 };

  const others: number[] = [];
  for (let i = 0; i < DOT_COUNT; i += 1) {
    if (i !== STORY_RED_INDEX) {
      others.push(i);
    }
  }

  others.forEach((dotIndex, slot) => {
    if (slot < 16) {
      const angle = (slot / 16) * Math.PI * 2 - Math.PI / 2;
      positions[dotIndex] = {
        x: round(Math.cos(angle) * 3.1),
        y: round(Math.sin(angle) * 2.3),
      };
    } else {
      const angle = ((slot - 16) / 8) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
      positions[dotIndex] = {
        x: round(Math.cos(angle) * 4.9),
        y: round(Math.sin(angle) * 3.5),
      };
    }
  });

  return { dots: withTones(positions, true) };
}

/** 05 Implementation — dense block (the built system; protection stays inside). */
function blockFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, i) => ({
    x: ((i % 5) - 2) * 1.5,
    y: (Math.floor(i / 5) - 2) * 1.2,
  }));

  return { dots: withTones(positions, true) };
}

/** 06 Training & support — the story resolves into the brand mark. */
function storyDiamondFormation(): Formation {
  return { dots: diamondFormation.dots };
}

export const storyFormations: readonly Formation[] = [
  fieldFormation(),
  columnsFormation(),
  chainFormation(),
  storyPerimeterFormation(),
  blockFormation(),
  storyDiamondFormation(),
];
