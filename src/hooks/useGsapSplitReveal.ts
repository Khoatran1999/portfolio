import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Variant {
  splitType: 'chars' | 'words';
  fromVars: gsap.TweenVars;
  stagger: number;
  duration: number;
}

const VARIANTS: Variant[] = [
  // 0 — chars fly up with back-ease bounce
  {
    splitType: 'chars',
    stagger: 0.04,
    duration: 0.7,
    fromVars: { y: 80, autoAlpha: 0, ease: 'back.out(1.7)' },
  },
  // 1 — words slide in from left
  {
    splitType: 'words',
    stagger: 0.09,
    duration: 0.6,
    fromVars: { x: -50, autoAlpha: 0, ease: 'power3.out' },
  },
  // 2 — chars drop from above with vertical scale
  {
    splitType: 'chars',
    stagger: 0.03,
    duration: 0.65,
    fromVars: {
      y: -60,
      scaleY: 2,
      autoAlpha: 0,
      transformOrigin: 'top center',
      ease: 'power4.out',
    },
  },
  // 3 — words drift up with rotation
  {
    splitType: 'words',
    stagger: 0.1,
    duration: 0.75,
    fromVars: { y: 35, rotation: 8, autoAlpha: 0, ease: 'expo.out' },
  },
];

/**
 * Attach GSAP SplitText scroll-triggered reveal to a heading element.
 * @param variantIndex  0-3 to pin a specific variant; undefined = random per mount
 */
export function useGsapSplitReveal<T extends HTMLElement>(
  variantIndex?: number
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const v =
      VARIANTS[
        variantIndex !== undefined
          ? variantIndex
          : Math.floor(Math.random() * VARIANTS.length)
      ];

    const split = SplitText.create(ref.current, { type: v.splitType });
    const targets = v.splitType === 'chars' ? split.chars : split.words;

    const tween = gsap.from(targets, {
      ...v.fromVars,
      duration: v.duration,
      stagger: v.stagger,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once: true,
      },
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [variantIndex]);

  return ref;
}
