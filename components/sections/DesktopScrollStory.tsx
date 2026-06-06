"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { StickyStoryStage } from "@/components/motion/StickyStoryStage";
import { StoryProgress } from "@/components/motion/StoryProgress";
import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { storyContent } from "@/lib/content/story";

export function DesktopScrollStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];

    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const nextIndex = Number((visible.target as HTMLElement).dataset.storyIndex ?? 0);
        setActiveIndex(nextIndex);
      },
      {
        root: null,
        rootMargin: "-44% 0px -44% 0px",
        threshold: [0.12, 0.38, 0.62, 0.86],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <Container className="relative py-[var(--section-y)]">
      <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-end">
        <div>
          <SectionLabel>{storyContent.label}</SectionLabel>
          <h2 className="text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-graphite md:text-6xl">
            {storyContent.title}
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-graphite-muted xl:justify-self-end">
          {storyContent.body}
        </p>
      </div>

      <div className="mt-16 grid gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(25rem,0.92fr)] xl:gap-14">
        <div className="xl:sticky xl:top-24 xl:self-start">
          <StickyStoryStage activeIndex={activeIndex} steps={storyContent.steps} />
          <StoryProgress activeIndex={activeIndex} steps={storyContent.steps} />
        </div>

        <div className="xl:block">
          {storyContent.steps.map((step, index) => (
            <div
              key={step.id}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-story-index={index}
              className="xl:flex xl:min-h-[82vh] xl:items-center"
            >
              <motion.article
                aria-current={activeIndex === index ? "step" : undefined}
                className={`rounded-lg border p-7 shadow-[0_24px_80px_rgba(22,24,29,0.045)] transition duration-300 ${
                  activeIndex === index
                    ? "border-elaman-blue/30 bg-white shadow-[0_30px_90px_rgba(36,64,116,0.08)]"
                    : "border-line bg-white/64"
                }`}
                initial={false}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.7,
                  y: prefersReducedMotion || activeIndex === index ? 0 : 12,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.38, ease: "easeOut" }
                }
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-elaman-blue">
                  {step.eyebrow}
                </p>
                <h3 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-graphite">
                  {step.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-graphite-muted">
                  {step.description}
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {step.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-sm border border-line bg-porcelain/70 px-4 py-3"
                    >
                      <p className="text-sm font-medium text-graphite-muted">{bullet}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
