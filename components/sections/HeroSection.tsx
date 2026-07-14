"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useReducedMotionPreference } from "@/components/motion/useReducedMotionPreference";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroDotField } from "@/components/ui/HeroDotField";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Section } from "@/components/ui/Section";
import type { LocalizedSiteContent } from "@/lib/content/site";
import { sectionPath, type Locale } from "@/lib/i18n";
import { motionDuration, motionEase, staggerContainer } from "@/lib/motion/presets";

type HeroSectionProps = {
  locale: Locale;
  content: LocalizedSiteContent["hero"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  const reduced = useReducedMotionPreference();
  const entranceItem = {
    hidden: { opacity: 0.001, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : motionDuration.entrance,
        ease: motionEase.out,
      },
    },
  } as const;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const fieldY = useTransform(scrollYProgress, [0.2, 1], [0, -16]);
  const fieldOpacity = useTransform(scrollYProgress, [0.25, 0.9], [1, 0.82]);

  return (
    <Section
      id="hero"
      variant="hero-screen"
      tone="white"
      className="relative overflow-hidden"
    >
      <Container className="w-full">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={staggerContainer(reduced ? 0 : 0.06)}
        >
          <motion.div
            variants={entranceItem}
            className="flex items-baseline justify-between gap-4 border-t border-[var(--border-hairline)] pt-3"
          >
            <MonoLabel tone="ink" className="text-graphite">
              {content.label}
            </MonoLabel>
            <MonoLabel tone="ink">{content.visualBadge}</MonoLabel>
          </motion.div>

          <div className="mt-9 grid gap-12 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-center lg:gap-16 [&>*]:min-w-0">
            <div>
              <motion.h1
                variants={entranceItem}
                className="hero-title max-w-[14ch] text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite"
              >
                {content.title}
              </motion.h1>
              <motion.p
                variants={entranceItem}
                className="mt-6 max-w-[32ch] text-[length:var(--type-body)] leading-[var(--leading-body)] text-graphite sm:hidden"
              >
                {content.mobileIntro}
              </motion.p>
              <motion.p
                variants={entranceItem}
                className="mt-7 hidden max-w-[38rem] text-[length:var(--type-lead)] leading-[var(--leading-body)] text-graphite sm:block"
              >
                {content.intro}
              </motion.p>
              <motion.p
                variants={entranceItem}
                className="mt-4 max-w-[38rem] text-sm leading-[var(--leading-body)] text-graphite-muted sm:hidden"
              >
                {content.mobileBody}
              </motion.p>
              <motion.p
                variants={entranceItem}
                className="mt-5 hidden max-w-[40rem] text-base leading-[var(--leading-body)] text-graphite-muted sm:block"
              >
                {content.body}
              </motion.p>
              <motion.div
                variants={entranceItem}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button href={sectionPath(locale, content.primaryCta.href)}>
                  {content.primaryCta.label}
                </Button>
                <Button
                  href={sectionPath(locale, content.secondaryCta.href)}
                  variant="secondary"
                >
                  {content.secondaryCta.label}
                </Button>
              </motion.div>
            </div>

            <motion.div variants={entranceItem}>
              <motion.div
                className="relative border-y border-[var(--border-hairline)] py-7 lg:py-10"
                style={{
                  y: reduced ? 0 : fieldY,
                  opacity: reduced ? 1 : fieldOpacity,
                }}
              >
                <motion.span
                  className="absolute left-0 right-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-elaman-blue"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: motionDuration.trace,
                          ease: motionEase.out,
                          delay: 0.24,
                        }
                  }
                  aria-hidden="true"
                />
                <HeroDotField className="relative z-10 mx-auto h-52 w-full sm:h-64 lg:h-72" />
                <div className="relative z-10 mt-5 grid gap-5 border-t border-[var(--border-hairline)] bg-[var(--surface-paper)] pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div>
                    <MonoLabel>{content.visualLabel}</MonoLabel>
                    <p className="mt-3 max-w-[32rem] text-sm leading-6 text-graphite-muted">
                      {content.visualBody}
                    </p>
                  </div>
                  <ol className="flex flex-wrap gap-x-5 gap-y-2">
                    {content.visualSteps.map((step, index) => (
                      <li key={step} className="flex items-baseline gap-2">
                        <span
                          className={`font-mono-label ${index === 0 ? "text-elaman-blue" : "text-graphite-soft"}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium text-graphite-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
