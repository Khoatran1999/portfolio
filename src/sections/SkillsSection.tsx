import { useState, memo } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills, skillCategories } from "@/data";

// Memoized skill bar — rerender-memo
const SkillBar = memo(function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {name}
        </span>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
        />
      </div>
    </motion.div>
  );
});

// Build lookup map for O(1) category filtering — js-set-map-lookups, js-index-maps
const skillsByCategory = new Map<string, typeof skills>();
for (const skill of skills) {
  const arr = skillsByCategory.get(skill.category) ?? [];
  arr.push(skill);
  skillsByCategory.set(skill.category, arr);
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);
  const filtered = skillsByCategory.get(activeCategory) ?? [];

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Skills & Technologies"
          title="My Technical Stack"
          subtitle="Battle-tested across 70+ production projects — from React SPAs to BigCommerce storefronts."
        />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-5 max-w-4xl mx-auto"
        >
          {filtered.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              delay={i * 0.05}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
