import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { personalInfo } from '@/data';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

type FormStatus = 'idle' | 'sent';

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      '',
      data.message,
    ].join('\n');

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, '_blank');
    setStatus('sent');
    reset();
  };

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

        <div className="grid lg:grid-cols-5 gap-12 max-w-4xl mx-auto">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3">
                Get in Touch
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                I'm open to frontend engineering roles, freelance contracts, and
                technical consultations. Response time: within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <Mail
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  ),
                  label: 'Email',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                },
                {
                  icon: (
                    <Phone
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  ),
                  label: 'Phone',
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                },
                {
                  icon: (
                    <MapPin
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  ),
                  label: 'Location',
                  value: personalInfo.location,
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === 'sent' ? (
              <div className="card flex flex-col items-center justify-center py-16 text-center gap-4">
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Email Client Opened!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Your message has been pre-filled in Gmail. Just hit Send to
                  reach me — I'll reply within 24 hours.
                </p>
                <Button variant="outline" onClick={() => setStatus('idle')}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card space-y-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="Tran Van A"
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject?.message}>
                  <input
                    {...register('subject')}
                    placeholder="Frontend Developer Opportunity"
                    className={inputClass(!!errors.subject)}
                  />
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className={cn(inputClass(!!errors.message), 'resize-none')}
                  />
                </Field>

                <Button type="submit" size="lg" className="w-full">
                  <Send size={18} /> Open in Gmail
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-4 py-2.5 rounded-xl text-sm border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600',
    hasError
      ? 'border-red-300 dark:border-red-700 bg-red-50/30 dark:bg-red-950/10'
      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
