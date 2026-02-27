import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { Button } from '@/components/ui/Button';
import { personalInfo } from '@/data';

gsap.registerPlugin(SplitText);

const TECH_STACK = [
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'BigCommerce',
  'Framer Motion',
];

export function HeroSection() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const techRowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── Name: SplitText chars fly-up
  useEffect(() => {
    if (!nameRef.current) return;
    const split = SplitText.create(nameRef.current, { type: 'chars' });
    gsap.from(split.chars, {
      duration: 0.6,
      y: 60,
      autoAlpha: 0,
      stagger: 0.055,
      ease: 'back.out(1.7)',
      delay: 0.45,
    });
    return () => split.revert();
  }, []);

  // ── Tech-stack tag hover: lift + glow
  useEffect(() => {
    const container = techRowRef.current;
    if (!container) return;
    const tags = Array.from(
      container.querySelectorAll<HTMLElement>('[data-tag]')
    );
    const cleanups: (() => void)[] = [];

    tags.forEach((tag) => {
      const enter = () =>
        gsap.to(tag, {
          y: -5,
          scale: 1.1,
          duration: 0.2,
          ease: 'power2.out',
          boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
        });
      const leave = () =>
        gsap.to(tag, {
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.inOut',
          boxShadow: 'none',
        });
      tag.addEventListener('mouseenter', enter);
      tag.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        tag.removeEventListener('mouseenter', enter);
        tag.removeEventListener('mouseleave', leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  // ── CTA button hover: magnetic-scale
  useEffect(() => {
    const container = ctaRef.current;
    if (!container) return;
    const btns = Array.from(
      container.querySelectorAll<HTMLElement>('[data-btn]')
    );
    const cleanups: (() => void)[] = [];

    btns.forEach((btn) => {
      const enter = () =>
        gsap.to(btn, { scale: 1.06, duration: 0.22, ease: 'power2.out' });
      const leave = () =>
        gsap.to(btn, { scale: 1, duration: 0.28, ease: 'elastic.out(1, 0.5)' });
      btn.addEventListener('mouseenter', enter);
      btn.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        btn.removeEventListener('mouseenter', enter);
        btn.removeEventListener('mouseleave', leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20"
    >
      {/* Background orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/8 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-500/6 dark:bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-sky-400/6 dark:bg-sky-400/8 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10 text-center max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200/60 dark:border-green-800/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for new opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="text-blue-600 dark:text-blue-400" ref={nameRef}>
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6"
        >
          Frontend Developer · 3+ Years Experience
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline} Specializing in{' '}
          <strong className="text-slate-700 dark:text-slate-300">
            React.js architecture
          </strong>
          ,{' '}
          <strong className="text-slate-700 dark:text-slate-300">
            BigCommerce platforms
          </strong>
          , and{' '}
          <strong className="text-slate-700 dark:text-slate-300">
            AI-assisted workflows
          </strong>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <span data-btn className="inline-block">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <Sparkles size={18} />
              View My Work
            </Button>
          </span>
          <span data-btn className="inline-block">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open('/resume-tran-dang-khoa.pdf', '_blank')
              }
            >
              <Download size={18} />
              Download Resume
            </Button>
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
          >
            <Github size={16} />
            GitHub
          </a>
          <span className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>

        {/* Tech stack preview */}
        <motion.div
          ref={techRowRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              data-tag
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-sm font-medium border border-slate-200 dark:border-slate-700/60 cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-slate-400 dark:text-slate-600"
        >
          <ArrowDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
