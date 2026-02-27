import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/data';

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const isFeatured = project.type === 'featured';
  const liveUrl = project.url ?? project.link;

  return (
    <div
      className={`card card-hover group flex flex-col overflow-hidden p-0 ${
        isFeatured
          ? 'border-blue-200/80 dark:border-blue-800/60 ring-1 ring-blue-500/10'
          : ''
      }`}
    >
      {/* ── Image ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <ArrowUpRight size={40} />
          </div>
        )}

        {/* Featured badge overlay */}
        {isFeatured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">
              Featured
            </span>
          </div>
        )}

        {/* Live link overlay button */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live project"
            className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold shadow-lg">
              <ExternalLink size={14} />
              View Project
            </span>
          </a>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug flex-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live site"
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <Badge variant="outline" className="w-fit mb-3">
          {project.category}
        </Badge>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {project.metrics && (
          <div className="px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200/60 dark:border-green-800/60 text-green-700 dark:text-green-400 text-xs font-semibold mb-4">
            {project.metrics}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <Badge key={t} variant="blue">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const pauseRef = useRef(false);

  const goTo = (next: number, d: number) => {
    setDir(d);
    setIndex(next);
  };

  const prev = () => goTo((index - 1 + projects.length) % projects.length, -1);
  const next = () => goTo((index + 1) % projects.length, 1);

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return;
      setDir(1);
      setIndex((p) => (p + 1) % projects.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Projects"
          subtitle="Real-world solutions spanning e-commerce, tooling, and AI integrations."
        />

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => (pauseRef.current = true)}
          onMouseLeave={() => (pauseRef.current = false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d * 80, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -80, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45 }}
                className="max-w-xl mx-auto"
              >
                <ProjectCard project={projects[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 p-2 rounded-full bg-white dark:bg-slate-800 shadow border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 p-2 rounded-full bg-white dark:bg-slate-800 shadow border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 justify-center mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              aria-label={`Project ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
