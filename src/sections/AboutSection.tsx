import { motion } from "framer-motion";
import { MapPin, Briefcase, Code2, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { personalInfo } from "@/data";

// Static highlights hoisted outside component — rendering-hoist-jsx
const highlights = [
  {
    icon: <Code2 size={20} className="text-blue-600 dark:text-blue-400" />,
    title: "3+ Years",
    desc: "Building production React applications",
  },
  {
    icon: <Briefcase size={20} className="text-blue-600 dark:text-blue-400" />,
    title: "100+ Projects",
    desc: "BigCommerce storefronts delivered",
  },
  {
    icon: <Zap size={20} className="text-blue-600 dark:text-blue-400" />,
    title: "AI-First",
    desc: "Claude AI + GitHub Copilot workflow",
  },
  {
    icon: <MapPin size={20} className="text-blue-600 dark:text-blue-400" />,
    title: "Ho Chi Minh City",
    desc: "Open to remote worldwide",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-padding bg-slate-50/50 dark:bg-gray-900/40"
    >
      <div className="container-max">
        <SectionHeader
          eyebrow="About Me"
          title="Engineer & Designer Mindset"
          subtitle="I care deeply about code quality, user experience, and shipping products that matter."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              I approach every project with a product engineer mindset —
              thinking about performance, architecture, and user impact from day
              one. My expertise in BigCommerce and React lets me deliver
              end-to-end e-commerce solutions that are fast, scalable, and
              revenue-focused.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              I've embraced AI-assisted development as a force multiplier —
              using Claude AI and GitHub Copilot to ship higher quality code
              faster, without sacrificing architecture fundamentals or code
              review rigour.
            </p>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className="card card-hover"
              >
                <div className="mb-3 p-2.5 inline-flex rounded-xl bg-blue-50 dark:bg-blue-950/40">
                  {item.icon}
                </div>
                <p className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                  {item.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
