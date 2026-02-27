import { motion } from 'framer-motion';
import { ShoppingCart, TrendingUp, Zap, Clock } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { achievements } from '@/data';

// Map icon keys to components — js-index-maps
const ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ShoppingCart,
  TrendingUp,
  Zap,
  Clock,
};

export function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Impact"
          title="By The Numbers"
          subtitle="Measurable results across 3+ years of frontend engineering."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Zap;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card card-hover text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/70 transition-colors">
                    <Icon
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>
                <motion.p
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1 + 0.2,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="font-display font-bold text-4xl text-slate-900 dark:text-white mb-1"
                >
                  {item.value}
                </motion.p>
                <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-1.5">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
