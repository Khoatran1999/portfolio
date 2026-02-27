import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/data";

// Per-category colour tokens: base bg/text (Tailwind) + hover colours (CSS values for whileHover)
const categoryTheme: Record<
  string,
  { pill: string; hoverBg: string; hoverText: string; hoverShadow: string }
> = {
  Core: {
    pill: "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
    hoverBg: "#2563eb",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(37,99,235,0.4)",
  },
  Styling: {
    pill: "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300",
    hoverBg: "#9333ea",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(147,51,234,0.4)",
  },
  Ecosystem: {
    pill: "bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300",
    hoverBg: "#0d9488",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(13,148,136,0.4)",
  },
  Platform: {
    pill: "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300",
    hoverBg: "#ea580c",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(234,88,12,0.4)",
  },
  Tooling: {
    pill: "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300",
    hoverBg: "#16a34a",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(22,163,74,0.4)",
  },
  "AI Workflow": {
    pill: "bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300",
    hoverBg: "#e11d48",
    hoverText: "#fff",
    hoverShadow: "0 4px 16px rgba(225,29,72,0.4)",
  },
};

const fallbackTheme = categoryTheme["Core"];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Skills & Technologies"
          title="My Technical Stack"
          subtitle="Battle-tested across 100+ production projects — from React SPAs to BigCommerce storefronts."
        />

        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, i) => {
              const theme = categoryTheme[skill.category] ?? fallbackTheme;
              return (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.025 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: theme.hoverBg,
                    color: theme.hoverText,
                    boxShadow: theme.hoverShadow,
                    transition: { duration: 0.15 },
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium cursor-default select-none ${theme.pill}`}
                >
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
