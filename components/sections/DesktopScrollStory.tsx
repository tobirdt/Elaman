"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

import { StickyStoryStage } from "@/components/motion/StickyStoryStage";
import { StoryProgress } from "@/components/motion/StoryProgress";
import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { motionDuration, motionEase, scrollSpring } from "@/lib/motion/presets";

type DesktopScrollStoryProps = {
  content: LocalizedSiteContent["story"];
};

/** svh of scroll runway per story step. */
const STEP_RUNWAY = 80;

export function DesktopScrollStory({ content }: DesktopScrollStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotionPreference();
  const steps = content.steps;
  const activeStep = steps[activeIndex] ?? steps[0];
  const redIndex = steps.findIndex((step) => step.id === "protection");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, scrollSpring);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    const nextIndex = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(clamped * steps.length)),
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  });

  function scrollToStep(index: number) {
    const runway = sectionRef.current;

    if (!runway) {
      return;
    }

    const rect = runway.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const scrollable = runway.offsetHeight - window.innerHeight;
    const progress = (index + 0.5) / steps.length;

    window.scrollTo({
      top: top + progress * scrollable,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${steps.length * STEP_RUNWAY}svh` }}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center">
        <Container className="w-full">
          <SectionRule index="02" keyword={content.label} />

          <div className="mt-8 grid items-center gap-10 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)_minmax(0,0.95fr)] [&>*]:min-w-0">
            <div>
              <SectionHeader size="h3" title={content.title} width="narrow" />
              <div className="mt-8">
                <StoryProgress
                  activeIndex={activeIndex}
                  label={content.progressLabel}
                  onSelect={scrollToStep}
                  progress={smooth}
                  redIndex={redIndex}
                  steps={steps}
                />
              </div>
            </div>

            <StickyStoryStage
              activeIndex={activeIndex}
              progress={smooth}
              stepCount={steps.length}
            />

            <div className="min-h-[24rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeStep.id}
                  aria-current="step"
                  initial={reduced ? false : { opacity: 0.001, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0.001 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: motionDuration.state, ease: motionEase.out }
                  }
                  className="border-t border-[var(--border-hairline)] pt-5"
                >
                  <p
                    className={`font-mono-label ${
                      activeIndex === redIndex ? "text-elaman-red" : "text-elaman-blue"
                    }`}
                  >
                    {activeStep.eyebrow}
                  </p>
                  <h3 className="mt-4 text-[length:var(--type-h3)] font-semibold leading-[var(--leading-title)] tracking-[var(--tracking-title)] text-graphite">
                    {activeStep.title}
                  </h3>
                  <p className="mt-4 text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite-muted">
                    {activeStep.description}
                  </p>
                  <ul className="mt-6">
                    {activeStep.bullets.map((bullet, index) => (
                      <li
                        key={bullet}
                        className="flex items-baseline gap-4 border-t border-[var(--border-hairline)] py-2.5"
                      >
                        <span className="font-mono-label shrink-0 text-graphite-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-graphite-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
