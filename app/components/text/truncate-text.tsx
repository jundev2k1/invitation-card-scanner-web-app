"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { Toast } from "..";

interface TruncatedTextProps {
  text: string;
  showCopy?: boolean;
  className?: string;
  maxWidth?: string;
  isTruncate?: boolean;
  isUUID?: boolean;
}

export function TruncatedText({
  text,
  showCopy = false,
  className,
  maxWidth = "max-w-[150px]",
  isTruncate = true,
  isUUID = false
}: TruncatedTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (!showCopy)
      Toast.showSuccess("Copied", "top-right");
  };

  const textShow = isTruncate && isUUID
    ? (text.slice(0, 8) + "..." + text.slice(-8))
    : text

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              onClick={handleCopy}
              className={cn(
                "block truncate cursor-pointer hover:text-primary transition-colors dark:hover:text-primary",
                isTruncate ? maxWidth : ''
              )}
            >
              {textShow}
            </span>
          </TooltipTrigger>

          <TooltipContent>
            <p className="max-w-xs break-all">
              {isTruncate ? text : "copy"}
            </p>
          </TooltipContent>
        </Tooltip>

        {showCopy && (
          <Button
            variant="ghost"
            size="icon"
            className="h-2 w-2 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? (
              <Check size={12} className="text-green-500" />
            ) : (
              <Copy size={12} />
            )}
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}
