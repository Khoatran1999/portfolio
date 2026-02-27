import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { personalInfo } from '@/data';

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent('Frontend Developer Inquiry')}`;

const CONTACTS = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: GMAIL_COMPOSE,
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    external: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: undefined,
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/khoatran1999',
    href: personalInfo.github,
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/khoatranitdev',
    href: personalInfo.linkedin,
    external: true,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding bg-slate-50/50 dark:bg-gray-900/40"
    >
      <div className="container-max">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
        />

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              I'm open to frontend engineering roles, freelance contracts, and
              technical consultations. Click the email below to reach me
              directly via Gmail — I'll reply within 24 hours.
            </p>

            <div className="space-y-4">
              {CONTACTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex-shrink-0">
                      <Icon
                        size={18}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={
                            item.external ? 'noopener noreferrer' : undefined
                          }
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
