import { lazy, Suspense } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";

// Lazy load below-fold sections — bundle-dynamic-imports
const AboutSection = lazy(() =>
  import("@/sections/AboutSection").then((m) => ({ default: m.AboutSection })),
);
const SkillsSection = lazy(() =>
  import("@/sections/SkillsSection").then((m) => ({
    default: m.SkillsSection,
  })),
);
const ExperienceSection = lazy(() =>
  import("@/sections/ExperienceSection").then((m) => ({
    default: m.ExperienceSection,
  })),
);
const ProjectsSection = lazy(() =>
  import("@/sections/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  })),
);
const AIWorkflowSection = lazy(() =>
  import("@/sections/AIWorkflowSection").then((m) => ({
    default: m.AIWorkflowSection,
  })),
);
const AchievementsSection = lazy(() =>
  import("@/sections/AchievementsSection").then((m) => ({
    default: m.AchievementsSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  })),
);

function SectionFallback() {
  return (
    <div className="section-padding flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar isDark={isDark} onToggleTheme={toggle} />

      <main>
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AIWorkflowSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AchievementsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
