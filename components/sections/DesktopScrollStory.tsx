"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { StickyStoryStage } from "@/components/motion/StickyStoryStage";
import { StoryProgress } from "@/components/motion/StoryProgress";
import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SectionRule } from "@/components/ui/SectionRule";
import { formationSpring } from "@/lib/motion/presets";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DesktopScrollStoryProps = {
  content: LocalizedSiteContent["story"];
};

export function DesktopScrollStory({ content }: DesktopScrollStoryProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotionPreference();
  const activeStep = content.steps[activeIndex] ?? content.steps[0];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const formationProgress = useSpring(scrollYProgress, {
    ...formationSpring,
    visualDuration: reduced ? 0 : undefined,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      content.steps.length - 1,
      Math.max(0, Math.round(latest * (content.steps.length - 1))),
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${content.steps.length * 68}svh` }}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center overflow-hidden py-8">
        <Container className="h-full">
          <div className="flex h-full flex-col">
            <SectionRule index="02" keyword={content.label} />

            <div className="grid min-h-0 flex-1 grid-cols-[minmax(14rem,0.75fr)_minmax(22rem,1.35fr)_minmax(16rem,0.9fr)] items-center gap-8 2xl:gap-14">
              <div>
                <MonoLabel>{content.progressLabel}</MonoLabel>
                <h2 className="mt-5 max-w-[12ch] text-[length:var(--type-h2)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                  {content.title}
                </h2>
                <p className="mt-5 max-w-[31rem] text-[length:var(--type-small)] leading-[var(--leading-body)] text-graphite-muted">
                  {content.body}
                </p>
                <StoryProgress
                  activeIndex={activeIndex}
                  label={content.progressLabel}
                  progress={formationProgress}
                  steps={content.steps}
                />
              </div>

              <StickyStoryStage
                activeIndex={activeIndex}
                activeLayerLabel={content.activeLayerLabel}
                progress={formationProgress}
                steps={content.steps}
              />

              <motion.article
                key={activeStep.id}
                aria-current="step"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.3 }}
                className="border-t border-[var(--border-hairline)] pt-5"
              >
                <MonoLabel tone={activeIndex === 3 ? "red" : "blue"}>
                  {activeStep.eyebrow}
                </MonoLabel>
                <h3 className="mt-5 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                  {activeStep.title}
                </h3>
                <p className="mt-4 text-[length:var(--type-small)] leading-[var(--leading-body)] text-graphite-muted">
                  {activeStep.description}
                </p>
                <ul className="mt-6 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
                  {activeStep.bullets.map((bullet, index) => (
                    <li
                      key={bullet}
                      className="grid grid-cols-[2rem_1fr] gap-3 py-3 text-sm text-graphite-muted"
                    >
                      <span className="font-mono text-[0.65rem] tabular-nums text-graphite-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
