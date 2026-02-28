"use client";
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterUpProps = {
  className?: string;
  value: number;
  duration: number;
}

export const CounterUp = ({ value, duration = 1000, className }: CounterUpProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span ref={nodeRef} className={className}>0</span>;
};
