import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase mb-4"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
