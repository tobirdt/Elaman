/**
 * Shared dot formations derived from the Elaman mark.
 *
 * System compositions contain exactly one blue point. Red is introduced only
 * for protection semantics, beginning with lifecycle step 04. The official
 * brand mark is the explicit exception and retains its original blue/red pair.
 */
export type DotTone = "ink" | "mark-light" | "mark-mid" | "mark-dark" | "blue" | "red";

export type FormationDot = {
  x: number;
  y: number;
  tone: DotTone;
};

export type Formation = {
  dots: FormationDot[];
  edges?: ReadonlyArray<readonly [number, number]>;
};

export const DIAMOND_RADIUS = 3;

export function manhattan(dot: Pick<FormationDot, "x" | "y">) {
  return Math.abs(dot.x) + Math.abs(dot.y);
}

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

      dots.push({
        x,
        y,
        tone: x === 0 && y === 0 ? "blue" : x === 2 && y === -1 ? "red" : "ink",
      });
    }
  }

  return dots;
}

export const diamondFormation: Formation = { dots: buildDiamondDots() };

export const BRAND_MARK_VIEWBOX = { width: 128, height: 100 } as const;
export const BRAND_MARK_DOT_RADIUS = 7.67;

/**
 * Exact constellation from the supplied Elaman mark artwork.
 * Coordinates, grayscale hierarchy, brand colours and dot radius are shared
 * by the static header mark and the animated hero mark.
 */
export const brandMarkFormation: Formation = {
  dots: [
    { x: 75.25, y: 7.67, tone: "mark-mid" },
    { x: 52.63, y: 28.87, tone: "mark-dark" },
    { x: 75.25, y: 28.87, tone: "mark-dark" },
    { x: 97.89, y: 28.87, tone: "mark-dark" },
    { x: 120.34, y: 28.87, tone: "mark-mid" },
    { x: 7.66, y: 49.94, tone: "mark-light" },
    { x: 30.29, y: 49.94, tone: "mark-mid" },
    { x: 52.63, y: 49.94, tone: "mark-dark" },
    { x: 75.25, y: 49.94, tone: "blue" },
    { x: 97.89, y: 49.94, tone: "red" },
    { x: 52.63, y: 71.13, tone: "mark-dark" },
    { x: 75.25, y: 71.13, tone: "mark-dark" },
    { x: 75.25, y: 92.2, tone: "mark-mid" },
  ],
};

export const STORY_BLUE_INDEX = 12;
export const STORY_RED_INDEX = 8;
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

function fieldFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, index) => {
    const radius = 0.74 * Math.sqrt(index + 0.4);
    const angle = index * 2.399963;

    return {
      x: round(Math.cos(angle) * radius * 1.5),
      y: round(Math.sin(angle) * radius * 1.05),
    };
  });

  return { dots: withTones(positions, false) };
}

function columnsFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, index) => ({
    x: ((index % 5) - 2) * 2.3,
    y: (Math.floor(index / 5) - 2) * 1.5,
  }));

  return { dots: withTones(positions, false) };
}

function chainFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, index) => {
    const progress = index / (DOT_COUNT - 1);

    return {
      x: round(-5.4 + progress * 10.8),
      y: round(Math.sin(progress * Math.PI * 2) * 1.7),
    };
  });
  const edges = Array.from(
    { length: DOT_COUNT - 1 },
    (_, index) => [index, index + 1] as const,
  );

  return { dots: withTones(positions, false), edges };
}

function perimeterFormation(): Formation {
  const positions: Array<Pick<FormationDot, "x" | "y">> = new Array(DOT_COUNT);
  positions[STORY_RED_INDEX] = { x: 0, y: 0 };

  const otherIndices = Array.from({ length: DOT_COUNT }, (_, index) => index).filter(
    (index) => index !== STORY_RED_INDEX,
  );

  otherIndices.forEach((dotIndex, slot) => {
    if (slot < 16) {
      const angle = (slot / 16) * Math.PI * 2 - Math.PI / 2;
      positions[dotIndex] = {
        x: round(Math.cos(angle) * 3.1),
        y: round(Math.sin(angle) * 2.3),
      };
      return;
    }

    const angle = ((slot - 16) / 8) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
    positions[dotIndex] = {
      x: round(Math.cos(angle) * 4.9),
      y: round(Math.sin(angle) * 3.5),
    };
  });

  return { dots: withTones(positions, true) };
}

function blockFormation(): Formation {
  const positions = Array.from({ length: DOT_COUNT }, (_, index) => ({
    x: ((index % 5) - 2) * 1.5,
    y: (Math.floor(index / 5) - 2) * 1.2,
  }));

  return { dots: withTones(positions, true) };
}

export const storyFormations: readonly Formation[] = [
  fieldFormation(),
  columnsFormation(),
  chainFormation(),
  perimeterFormation(),
  blockFormation(),
  { dots: diamondFormation.dots },
];
