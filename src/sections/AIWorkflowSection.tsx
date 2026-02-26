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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        </div>

        {/* AI tools used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl mb-2">
                35% Faster Delivery
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-lg">
                By integrating Claude AI and GitHub Copilot across my full
                development lifecycle — from architecture planning to code
                review — I consistently deliver higher quality features in less
                time without compromising on standards.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-4 text-center flex-shrink-0">
              {[
                { tool: "Claude AI", use: "Architecture & Refactoring" },
                { tool: "GitHub Copilot", use: "Inline Code Generation" },
              ].map((item) => (
                <div
                  key={item.tool}
                  className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <p className="font-bold text-white">{item.tool}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{item.use}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
