"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SystemMap } from "@/components/ui/SystemMap";
import type { LocalizedSiteContent } from "@/lib/content/site";

type SystemsSectionProps = {
  content: LocalizedSiteContent["systems"];
};

export function SystemsSection({ content }: SystemsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="systems" variant="content-band" tone="white">
      <Container>
        <div className="grid gap-[var(--section-gap)] [&>*]:min-w-0 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            body={content.body}
            label={content.label}
            title={content.title}
            width="copy"
          />
          <SystemMap
            activeIndex={activeIndex}
            items={content.items}
            onSelect={setActiveIndex}
          />
        </div>
      </Container>
    </Section>
  );
}
