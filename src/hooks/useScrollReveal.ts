import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -80px 0px",
    amount: threshold,
  });
  return { ref, isInView };
}
