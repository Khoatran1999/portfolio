import { Github, Linkedin, Heart } from 'lucide-react';
import { personalInfo, skills } from '@/data';

/* ── category colour map (same as SkillsSection) ─────────────────────────── */
const categoryPill: Record<string, string> = {
  Core: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
  Styling:
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
  Ecosystem:
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
  Platform:
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
  Tooling:
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
  'AI Workflow':
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400',
};

const fallbackPill = categoryPill['Core'];

/* inline keyframes — guarantees the animation works regardless of Tailwind purge */
const marqueeStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  width: 'max-content',
  animation: 'footer-marquee 40s linear infinite',
};

export function Footer() {
  const year = new Date().getFullYear();

  /* duplicate the list so the strip is seamless */
  const loopSkills = [...skills, ...skills];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950">
      {/* ── Skills marquee ────────────────────────────────────────────── */}
      <style>{`
        @keyframes footer-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="overflow-hidden py-6"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          style={marqueeStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = 'paused')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = 'running')
          }
        >
          {loopSkills.map((skill, i) => (
            <span
              key={`${skill.name}-${i}`}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium select-none whitespace-nowrap ${categoryPill[skill.category] ?? fallbackPill}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="container-max pt-0 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
              Tran Dang Khoa · Frontend Developer
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
