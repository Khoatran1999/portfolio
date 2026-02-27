import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/data';

// Triple for seamless infinite loop
const ITEMS = [...projects, ...projects, ...projects];
const TOTAL = projects.length;
const GAP = 24; // px — matches gap-6
const VISIBLE = 3;
const AUTOPLAY_INTERVAL = 3000;

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const liveUrl = project.url ?? project.link;

  return (
    <a
      href={liveUrl ?? '#'}
      target={liveUrl ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group flex-shrink-0 block cursor-pointer"
      onClick={(e) => !liveUrl && e.preventDefault()}
    >
      {/* 1:1 image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-sm">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <ArrowUpRight size={40} />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-semibold shadow-lg">
            <ExternalLink size={12} />
            View
          </span>
        </div>
      </div>

      {/* Title only */}
      <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
    </a>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(TOTAL); // start at middle copy
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Compute x position for a given index
  const getX = useCallback((idx: number) => {
    if (!containerRef.current) return 0;
    const containerW = containerRef.current.offsetWidth;
    const cardW = (containerW - GAP * (VISIBLE - 1)) / VISIBLE;
    return -(idx * (cardW + GAP));
  }, []);

  // Animate to index, then reset silently if at ends
  const slideTo = useCallback(
    (idx: number, instant = false) => {
      if (!trackRef.current) return;
      tweenRef.current?.kill();
      const x = getX(idx);
      if (instant) {
        gsap.set(trackRef.current, { x });
      } else {
        tweenRef.current = gsap.to(trackRef.current, {
          x,
          duration: 0.55,
          ease: 'power2.inOut',
          onComplete: () => {
            // Silent jump after reaching far ends
            if (idx >= TOTAL * 2) {
              indexRef.current = TOTAL;
              gsap.set(trackRef.current, { x: getX(TOTAL) });
            } else if (idx < TOTAL) {
              indexRef.current = TOTAL + (idx % TOTAL === 0 ? 0 : idx % TOTAL);
              // Jump to equivalent position in middle copy
              const newIdx = TOTAL + (((idx % TOTAL) + TOTAL) % TOTAL);
              indexRef.current = newIdx;
              gsap.set(trackRef.current, { x: getX(newIdx) });
            }
          },
        });
      }
    },
    [getX]
  );

  const next = useCallback(() => {
    const idx = ++indexRef.current;
    slideTo(idx);
  }, [slideTo]);

  const prev = useCallback(() => {
    const idx = --indexRef.current;
    slideTo(idx);
  }, [slideTo]);

  // Init position
  useEffect(() => {
    gsap.set(trackRef.current, { x: getX(TOTAL) });
  }, [getX]);

  // Reposition on window resize
  useEffect(() => {
    const onResize = () => {
      gsap.set(trackRef.current, { x: getX(indexRef.current) });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getX]);

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [next]);

  const pauseAutoplay = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };
  const resumeAutoplay = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, AUTOPLAY_INTERVAL);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Projects"
          subtitle="Real-world solutions spanning e-commerce, tooling, and AI integrations."
        />

        <div
          className="relative"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Slider track */}
          <div ref={containerRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{ gap: GAP }}
            >
              {ITEMS.map((project, i) => {
                const cardWidth = `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})`;
                return (
                  <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute -left-5 top-1/3 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute -right-5 top-1/3 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
