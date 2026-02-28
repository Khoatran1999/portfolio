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

type DragState = {
  startX: number;
  startTrackX: number;
  lastX: number;
  velocity: number;
};

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const swRef = useRef(0); // single-set width in px
  const dragRef = useRef<DragState | null>(null);
  const didDragRef = useRef(false);

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

      const sw = projects.length * (cardWidth + GAP);
      swRef.current = sw;

      gsap.set(track, { x: 0 });
      tweenRef.current = gsap.to(track, {
        x: -sw,
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

  // ── Pointer drag handlers ────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    tweenRef.current?.pause();
    didDragRef.current = false;
    const trackX = gsap.getProperty(trackRef.current!, 'x') as number;
    dragRef.current = {
      startX: e.clientX,
      startTrackX: trackX,
      lastX: e.clientX,
      velocity: 0,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) didDragRef.current = true;
    dragRef.current.velocity = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    const sw = swRef.current;
    if (!sw) return;
    const newX = gsap.utils.wrap(-sw, 0)(dragRef.current.startTrackX + delta);
    gsap.set(trackRef.current!, { x: newX });
  };

  const onPointerUp = () => {
    if (!dragRef.current) return;
    const sw = swRef.current;
    const { velocity } = dragRef.current;
    dragRef.current = null;
    if (!sw) return;

    // Momentum flick
    let currentX = gsap.getProperty(trackRef.current!, 'x') as number;
    if (Math.abs(velocity) > 1) {
      currentX = gsap.utils.wrap(-sw, 0)(currentX + velocity * 10);
      gsap.set(trackRef.current!, { x: currentX });
    }

    // Resume tween from current position
    const progress = -gsap.utils.wrap(-sw, 0)(currentX) / sw;
    tweenRef.current?.progress(progress % 1).resume();

    // Clear drag flag after click event fires
    setTimeout(() => {
      didDragRef.current = false;
    }, 50);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Portfolio"
          title="Delivered Projects"
          subtitle="High-quality commercial projects meeting BigCommerce marketplace standards."
        />

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => !dragRef.current && tweenRef.current?.pause()}
          onMouseLeave={() => {
            if (!dragRef.current) tweenRef.current?.resume();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          // Block link navigation when user was dragging
          onClickCapture={(e) => {
            if (didDragRef.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

          {/* Sliding track */}
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP }}
            // Prevent browser native image/text drag
            onDragStart={(e) => e.preventDefault()}
          >
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
