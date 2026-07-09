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

const entranceItem = {
  hidden: { opacity: 0.001, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.entrance, ease: motionEase.out },
  },
} as const;

export function HeroSection({ locale, content }: HeroSectionProps) {
  const reduced = useReducedMotionPreference();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const fieldY = useTransform(scrollYProgress, [0.25, 0.95], [0, -16]);
  const fieldOpacity = useTransform(scrollYProgress, [0.25, 0.95], [1, 0.55]);

  return (
    <Section id="hero" variant="hero-screen" className="relative overflow-hidden">
      <Container className="w-full">
        <motion.div
          ref={heroRef}
          initial={false}
          animate="visible"
          variants={staggerContainer(0.08)}
        >
          <motion.div
            variants={entranceItem}
            className="flex items-baseline justify-between gap-4 border-t border-[var(--border-hairline)] pt-3"
          >
            <span className="font-mono-label text-graphite">{content.label}</span>
            <span className="font-mono-label text-graphite-soft">
              {content.visualBadge}
            </span>
          </motion.div>

          <motion.div variants={entranceItem} className="mt-10 lg:hidden">
            <HeroDotField static className="h-40 w-40" />
          </motion.div>

          <div className="mt-8 grid gap-[var(--section-gap)] lg:mt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-start [&>*]:min-w-0">
            <motion.div>
              <motion.h1
                variants={entranceItem}
                className="hero-title text-balance max-w-[13ch] text-[length:var(--type-display)] font-semibold leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-graphite"
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
                className="mt-7 hidden max-w-[var(--container-copy)] text-[length:var(--type-lead)] leading-[var(--leading-body)] text-graphite sm:block"
              >
                {content.intro}
              </motion.p>
              <motion.p
                variants={entranceItem}
                className="mt-4 max-w-[38ch] text-base leading-[var(--leading-body)] text-graphite-muted xl:hidden"
              >
                {content.mobileBody}
              </motion.p>
              <motion.p
                variants={entranceItem}
                className="mt-4 hidden max-w-[36rem] text-base leading-[var(--leading-body)] text-graphite-muted xl:block"
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
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              style={reduced ? undefined : { y: fieldY, opacity: fieldOpacity }}
            >
              <div className="overflow-hidden">
                <HeroDotField
                  delayBase={0.35}
                  className="ml-auto w-[min(24rem,88%)] translate-x-12 xl:translate-x-16"
                />
              </div>
              <div className="relative ml-auto mt-8 max-w-[24rem]">
                <span
                  className="absolute -top-6 right-16 h-6 w-px bg-[var(--border-hairline)]"
                  aria-hidden="true"
                />
                <div className="border-t border-[var(--border-hairline)] pt-4">
                  <MonoLabel tone="blue">{content.visualLabel}</MonoLabel>
                  <p className="mt-3 text-sm leading-[var(--leading-body)] text-graphite-muted">
                    {content.visualBody}
                  </p>
                  <ol className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {content.visualSteps.map((step, index) => (
                      <li key={step} className="flex items-baseline gap-2">
                        <span
                          className={`font-mono-label ${
                            index === content.visualSteps.length - 1
                              ? "text-elaman-red"
                              : "text-elaman-blue"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-graphite-muted">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.dl
            variants={entranceItem}
            className="mt-10 grid gap-6 border-t border-[var(--border-hairline)] pt-6 sm:grid-cols-3 lg:mt-16 lg:gap-8"
          >
            {content.stats.map((stat) => (
              <div key={stat.value} className="min-w-0">
                <dt
                  className={`text-balance font-semibold leading-none tracking-[var(--tracking-title)] text-graphite ${
                    stat.value.length <= 6
                      ? "text-[length:var(--type-numeral)]"
                      : "text-[length:var(--type-h3)]"
                  }`}
                >
                  {stat.value}
                </dt>
                <dd className="font-mono-label mt-3 max-w-56 text-graphite-soft">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </Section>
  );
}
