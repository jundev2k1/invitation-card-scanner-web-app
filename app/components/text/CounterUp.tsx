"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type CounterUpProps = {
  className?: string;
  value: number;
  duration: number;
  finalText?: string;
}

export const CounterUp = ({ value, duration = 2, className, finalText }: CounterUpProps) => {
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOutExpo * value);

      setDisplayValue(currentCount.toLocaleString());

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else if (finalText) {
        setDisplayValue(finalText);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, finalText]);

  return (
    <div 
      className={cn(
        "relative inline-flex flex-col items-center justify-center overflow-hidden",
        "h-[1.5em] leading-[1.5em]",
        className
      )}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayValue}
          initial={{ y: "80%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-80%", opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: 0.25,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block whitespace-nowrap will-change-[transform,opacity,filter]"
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>

      <span className="invisible pointer-events-none h-0 select-none">
        {finalText || value.toLocaleString()}
      </span>
    </div>
  );
};
