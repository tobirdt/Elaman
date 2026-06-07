import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnchorScrollManager } from "@/components/motion/AnchorScrollManager";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { CapabilityOverview } from "@/components/sections/CapabilityOverview";
import { ContactSection } from "@/components/sections/ContactSection";
import { DeliverySection } from "@/components/sections/DeliverySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProtectionSection } from "@/components/sections/ProtectionSection";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <>
      <AnchorScrollManager />
      <Header />
      <main>
        <HeroSection />
        <MotionReveal>
          <TrustSection />
        </MotionReveal>
        <ScrollStory />
        <MotionReveal>
          <CapabilityOverview />
        </MotionReveal>
        <MotionReveal>
          <SystemsSection />
        </MotionReveal>
        <MotionReveal>
          <ProtectionSection />
        </MotionReveal>
        <MotionReveal>
          <DeliverySection />
        </MotionReveal>
        <MotionReveal>
          <ContactSection />
        </MotionReveal>
      </main>
      <Footer />
    </>
  );
}
