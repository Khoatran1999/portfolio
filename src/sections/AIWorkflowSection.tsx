import { motion } from "framer-motion";
import { Brain, GitBranch, Wand2, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aiWorkflowItems } from "@/data";

// Map icon names to components — js-index-maps
const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Brain,
  GitBranch,
  Wand2,
  Rocket,
};

export function AIWorkflowSection() {
  return (
    <section
      id="ai-workflow"
      className="section-padding bg-slate-50/50 dark:bg-gray-900/40 overflow-hidden"
    >
      <div className="container-max relative">
        {/* Background decoration */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        />
        <SectionHeader
          eyebrow="AI-Assisted Development"
          title="Engineering with AI"
          subtitle="I integrate AI tools into every layer of my workflow — not as a crutch, but as a multiplier for quality and speed."
        />

        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiWorkflowItems.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Brain;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card card-hover group"
              >
                <div className="mb-4 p-3 inline-flex rounded-2xl bg-blue-50 dark:bg-blue-950/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/70 transition-colors">
                  <Icon
                    size={22}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white mb-2 text-sm leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
