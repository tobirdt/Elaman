"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { StickyStoryStage } from "@/components/motion/StickyStoryStage";
import { StoryProgress } from "@/components/motion/StoryProgress";
import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { LocalizedSiteContent } from "@/lib/content/site";

type DesktopScrollStoryProps = {
  content: LocalizedSiteContent["story"];
};

export function DesktopScrollStory({ content }: DesktopScrollStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const activeStep = content.steps[activeIndex] ?? content.steps[0];

  useEffect(() => {
    let frame = 0;

    function updateActiveStep() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollRange = section.offsetHeight - window.innerHeight;
      const traveled = Math.min(Math.max(-rect.top, 0), scrollRange);
      const progress = scrollRange > 0 ? traveled / scrollRange : 0;
      const nextIndex = Math.min(
        content.steps.length - 1,
        Math.max(0, Math.round(progress * (content.steps.length - 1))),
      );

      setActiveIndex(nextIndex);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveStep);
    }

    updateActiveStep();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [content.steps.length]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${content.steps.length * 60}svh` }}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center overflow-hidden">
        <Container className="grid items-center gap-8 xl:grid-cols-[0.72fr_1.04fr_0.78fr] xl:gap-10">
          <div>
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-graphite 2xl:text-5xl">
              {content.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-graphite-muted 2xl:text-lg 2xl:leading-8">
              {content.body}
            </p>
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

          <motion.article
            key={activeStep.id}
            aria-current="step"
            className="glass-surface-strong rounded-xl p-6 xl:p-7"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-elaman-blue">
              {activeStep.eyebrow}
            </p>
            <h3 className="mt-4 text-[1.85rem] font-semibold leading-[1.07] tracking-[-0.04em] text-graphite xl:text-4xl">
              {activeStep.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-graphite-muted xl:text-base xl:leading-8">
              {activeStep.description}
            </p>
            <div className="mt-6 grid gap-1.5">
              {activeStep.bullets.map((bullet, index) => (
                <div
                  key={bullet}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white/74 px-4 py-2.5"
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      activeIndex >= 4 && index === 0 ? "bg-elaman-red" : "bg-elaman-blue"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-sm font-medium text-graphite-muted">{bullet}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] ml-auto mr-[var(--page-x)] h-1 w-28 overflow-hidden rounded-full bg-graphite/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-elaman-blue to-elaman-red"
            initial={false}
            animate={{
              width: `${((activeIndex + 1) / content.steps.length) * 100}%`,
            }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35 }}
          />
        </div>
      </div>
    </div>
  );
}
