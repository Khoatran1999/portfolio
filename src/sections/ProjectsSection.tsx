import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/data';

gsap.registerPlugin(Draggable);

// ─── seamless loop builder (ported from task.md) ──────────────────────────────
function buildSeamlessLoop(
  items: Element[],
  spacing: number,
  animateFunc: (el: Element) => gsap.core.Timeline
) {
  const overlap = Math.ceil(1 / spacing);
  const startTime = items.length * spacing + 0.5;
  const loopTime = (items.length + overlap) * spacing + 1;

  const rawSequence = gsap.timeline({ paused: true });
  const seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat(this: gsap.core.Timeline) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t = this as any;
      if (t._time === t._dur) t._tTime += t._dur - 0.01;
    },
  });

  const total = items.length + overlap * 2;
  for (let i = 0; i < total; i++) {
    const index = i % items.length;
    const time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
    if (i <= items.length) seamlessLoop.addLabel('label' + i, time);
  }

  rawSequence.time(startTime);
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: 'none',
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: 'none',
      }
    );

  return seamlessLoop;
}

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
      {/* 1:1 image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-md">
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

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
        {project.title}
      </h3>
    </a>
  );
}

// ─── ProjectsSection ──────────────────────────────────────────────────────────
const SPACING = 0.15;
// Speed per 60fps-equivalent frame (use deltaRatio for frame-rate independence)
const AUTOPLAY_SPEED = 0.003;

export function ProjectsSection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const cardsList = cardsRef.current;
    const dragProxy = dragProxyRef.current;
    if (!gallery || !cardsList || !dragProxy) return;

    const cards = gsap.utils.toArray<Element>(cardsList.querySelectorAll('li'));
    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const animateFunc = (el: Element): gsap.core.Timeline => {
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.in',
          immediateRender: false,
        }
      ).fromTo(
        el,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, SPACING, animateFunc);
    const snapTime = gsap.utils.snap(SPACING);
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const playhead = { offset: 0 };

    // Single source of truth: targetOffset is where we WANT to be
    let targetOffset = 0;

    // Scrub tween smoothly animates playhead.offset → targetOffset
    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: 'power3',
      paused: true,
    });

    // Move to a specific offset (use this instead of mutating scrub.vars directly)
    const goTo = (offset: number) => {
      targetOffset = offset;
      scrub.vars.offset = targetOffset;
      scrub.invalidate().restart();
    };

    // ── Autoplay via GSAP ticker ──
    let paused = false;
    const onTick = () => {
      if (!paused) {
        // deltaRatio() normalises speed across different frame rates
        targetOffset += AUTOPLAY_SPEED * gsap.ticker.deltaRatio();
        scrub.vars.offset = targetOffset;
        scrub.invalidate().restart();
      }
    };
    gsap.ticker.add(onTick);

    // ── Prev / Next buttons ──
    const nextBtn = gallery.querySelector<HTMLButtonElement>('.btn-next');
    const prevBtn = gallery.querySelector<HTMLButtonElement>('.btn-prev');

    const onNext = () => {
      paused = true;
      goTo(snapTime(targetOffset + SPACING));
      setTimeout(() => (paused = false), 700);
    };
    const onPrev = () => {
      paused = true;
      goTo(snapTime(targetOffset - SPACING));
      setTimeout(() => (paused = false), 700);
    };
    nextBtn?.addEventListener('click', onNext);
    prevBtn?.addEventListener('click', onPrev);

    // ── Draggable ──
    const draggable = Draggable.create(dragProxy, {
      type: 'x',
      trigger: cardsList,
      onPress() {
        paused = true;
      },
      onDrag(this: Draggable) {
        const delta = (this.startX - this.x) * 0.001;
        goTo(targetOffset + delta);
      },
      onDragEnd() {
        goTo(snapTime(targetOffset));
        setTimeout(() => (paused = false), 700);
      },
    });

    // Pause autoplay on hover
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    gallery.addEventListener('mouseenter', onEnter);
    gallery.addEventListener('mouseleave', onLeave);

    return () => {
      gsap.ticker.remove(onTick);
      scrub.kill();
      draggable[0]?.kill();
      seamlessLoop.kill();
      nextBtn?.removeEventListener('click', onNext);
      prevBtn?.removeEventListener('click', onPrev);
      gallery.removeEventListener('mouseenter', onEnter);
      gallery.removeEventListener('mouseleave', onLeave);
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

        <div
          ref={galleryRef}
          className="relative overflow-hidden"
          style={{ height: 400 }}
        >
          {/* Cards */}
          <ul
            ref={cardsRef}
            className="relative w-full h-full list-none p-0 m-0"
          >
            {projects.map((project, i) => (
              <li
                key={i}
                className="absolute top-0 left-1/2 w-[240px] -translate-x-1/2"
                style={{ willChange: 'transform, opacity' }}
              >
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          {/* Invisible drag proxy */}
          <div
            ref={dragProxyRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Controls */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            <button
              className="btn-prev p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="btn-next p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
