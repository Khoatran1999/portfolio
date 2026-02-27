import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/data';

// Duplicate items for seamless infinite loop
const LOOP_ITEMS = [...projects, ...projects];
const GAP = 24; // gap between cards (px)

// ─── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const liveUrl = project.url ?? project.link;

  return (
    <a
      href={liveUrl ?? '#'}
      target={liveUrl ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="group block w-full"
      onClick={(e) => !liveUrl && e.preventDefault()}
    >
      {/* Image — lift + shadow on hover */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
        <div className="aspect-[4/3]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              <ArrowUpRight size={48} />
            </div>
          )}

          {/* Gradient overlay slides up from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-semibold shadow-lg">
                <ExternalLink size={11} />
                View Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {project.title}
      </h3>
    </a>
  );
}

// ─── ProjectsSection ──────────────────────────────────────────────────────────
/** Seconds per item — controls overall speed (larger = slower). */
const SECS_PER_ITEM = 5;

/** Items visible per breakpoint. */
function getItemsToShow(): number {
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 3;
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = track.querySelectorAll<HTMLElement>('.c-card');
    if (!cards.length) return;

    const buildTween = () => {
      tweenRef.current?.kill();

      const visible = getItemsToShow();
      const containerWidth = container.offsetWidth;
      const cardWidth = (containerWidth - GAP * (visible - 1)) / visible;

      cards.forEach((card) => {
        card.style.width = `${cardWidth}px`;
      });

      const singleSetWidth = projects.length * (cardWidth + GAP);

      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, {
        x: -singleSetWidth,
        duration: projects.length * SECS_PER_ITEM,
        ease: 'none',
        repeat: -1,
      });
    };

    buildTween();

    window.addEventListener('resize', buildTween);
    return () => {
      tweenRef.current?.kill();
      window.removeEventListener('resize', buildTween);
    };
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
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

          {/* Sliding track */}
          <div ref={trackRef} className="flex" style={{ gap: GAP }}>
            {LOOP_ITEMS.map((project, i) => (
              <div key={i} className="c-card flex-shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
