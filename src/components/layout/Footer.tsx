import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '@/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              Frontend Developer · Ho Chi Minh City
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              {
                href: personalInfo.github,
                icon: <Github size={18} />,
                label: 'GitHub',
              },
              {
                href: personalInfo.linkedin,
                icon: <Linkedin size={18} />,
                label: 'LinkedIn',
              },
              {
                href: `mailto:${personalInfo.email}`,
                icon: <Mail size={18} />,
                label: 'Email',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/60 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-600 flex items-center justify-center gap-1.5">
            © {year} Tran Dang Khoa. Built with
            <Heart size={13} className="text-red-400 fill-red-400" />
            using React 19 + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
