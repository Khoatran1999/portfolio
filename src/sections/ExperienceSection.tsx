import { motion } from 'framer-motion';
import { Briefcase, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { experiences } from '@/data';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-padding bg-slate-50/50 dark:bg-gray-900/40"
    >
      <div className="container-max">
        <SectionHeader
          eyebrow="Career"
          title="Work Experience"
          subtitle="3+ years building production-grade products across agencies, startups, and freelance roles."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-blue-400/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-shrink-0 w-12 justify-center">
                  <div
                    className={`mt-1 w-3 h-3 rounded-full border-2 border-blue-600 z-10 ${
                      exp.current ? 'bg-blue-600' : 'bg-white dark:bg-gray-950'
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 card card-hover pb-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase
                          size={15}
                          className="text-blue-600 dark:text-blue-400"
                        />
                        <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                          {exp.company}
                        </span>
                        {exp.current && <Badge variant="blue">Current</Badge>}
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-500 font-medium whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {exp.description.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <CheckCircle
                          size={15}
                          className="text-green-500 flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <Badge key={t} variant="blue">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
