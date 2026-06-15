"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

import { StickyStoryStage } from "@/components/motion/StickyStoryStage";
import { StoryProgress } from "@/components/motion/StoryProgress";
import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Surface } from "@/components/ui/Surface";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DesktopScrollStoryProps = {
  content: LocalizedSiteContent["story"];
};

export function DesktopScrollStory({ content }: DesktopScrollStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const activeStep = content.steps[activeIndex] ?? content.steps[0];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    const nextIndex = Math.min(
      content.steps.length - 1,
      Math.max(0, Math.floor(clamped * content.steps.length)),
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${content.steps.length * 60}svh` }}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center overflow-hidden">
        <Container className="grid items-center gap-8 xl:grid-cols-3 xl:gap-10">
          <div>
            <SectionHeader
              body={content.body}
              label={content.label}
              size="h3"
              title={content.title}
              width="narrow"
            />
            <StoryProgress
              activeIndex={activeIndex}
              steps={content.steps}
              label={content.progressLabel}
            />
          </div>

          <StickyStoryStage
            activeIndex={activeIndex}
            steps={content.steps}
            activeLayerLabel={content.activeLayerLabel}
            systemFocusLabel={content.systemFocusLabel}
          />

          <motion.div
            key={activeStep.id}
            aria-current="step"
            initial={prefersReducedMotion ? false : { opacity: 0.001, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Surface as="article" className="p-6 xl:p-7" variant="strongGlass">
              <p className="text-[length:var(--type-micro)] font-semibold uppercase tracking-[var(--tracking-label)] text-elaman-blue">
                {activeStep.eyebrow}
              </p>
              <h3 className="mt-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                {activeStep.title}
              </h3>
              <p className="mt-4 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                {activeStep.description}
              </p>
              <div className="mt-6 grid gap-1.5">
                {activeStep.bullets.map((bullet, index) => (
                  <Surface
                    key={bullet}
                    className="flex items-center gap-3 px-4 py-2.5 shadow-none"
                    variant="inset"
                  >
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        activeIndex >= 4 && index === 0
                          ? "bg-elaman-red"
                          : "bg-elaman-blue"
                      }`}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium text-graphite-muted">{bullet}</p>
                  </Surface>
                ))}
              </div>
            </Surface>
          </motion.div>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] ml-auto mr-[var(--page-x)] h-px w-28 bg-graphite/10">
          <motion.div
            className={`h-full ${activeIndex >= 4 ? "bg-elaman-red" : "bg-elaman-blue"}`}
            initial={false}
            animate={{
              width: `${content.steps.length > 1 ? (activeIndex / (content.steps.length - 1)) * 100 : 100}%`,
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
          />
        </div>
      </div>
    </div>
  );
}
