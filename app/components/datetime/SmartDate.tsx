"use client";

import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface SmartDateTimeProps {
  date: string | Date;
  label?: string;
  className?: string;
}

export function SmartDateTime({ date, label, className }: SmartDateTimeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const d = new Date(date);

  const relativeTime = formatDistanceToNow(d, {
    addSuffix: true,
    locale: enUS
  });

  const absoluteTime = format(d, "HH:mm dd/MM/yyyy", { locale: vi });

  return (
    <div
      className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && <span className="font-medium">{label}:</span>}

      <div className="relative overflow-hidden inline-block h-4 min-w-27">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.span
              key="absolute"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 whitespace-nowrap text-primary"
            >
              {absoluteTime}
            </motion.span>
          ) : (
            <motion.span
              key="relative"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 whitespace-nowrap"
            >
              {relativeTime}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
