"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionRule } from "@/components/ui/SectionRule";
import { SystemsAccordion } from "@/components/ui/SystemsAccordion";
import { SystemsMatrix } from "@/components/ui/SystemsMatrix";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SystemsSectionProps = {
  content: LocalizedSiteContent["systems"];
};

export function SystemsSection({ content }: SystemsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const redIndex = content.items.length - 1;

  return (
    <Section id="systems" variant="content-band">
      <Container>
        <SectionRule index="04" keyword={content.label} />

        <div className="mt-10 grid gap-[var(--section-gap)] [&>*]:min-w-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start lg:mt-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeader body={content.body} title={content.title} width="copy" />
            <SystemsMatrix
              activeIndex={activeIndex}
              className="mt-10 hidden w-full max-w-sm sm:block"
              items={content.items}
              redIndex={redIndex}
            />
          </Reveal>

          <Reveal variant="rise" delay={0.06}>
            <SystemsAccordion
              activeIndex={activeIndex}
              items={content.items}
              onSelect={setActiveIndex}
              redIndex={redIndex}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
