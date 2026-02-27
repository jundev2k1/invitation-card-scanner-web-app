"use client";
import { Toast } from "@/components";
import { IconButton } from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import { CheckIcon, CopyIcon } from "@/icons";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

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
      <span className={cn("flex items-center gap-2", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              onClick={handleCopy}
              className={cn(
                "block truncate cursor-pointer hover:text-primary transition-colors",
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
          <IconButton
            icon={copied ? <CheckIcon /> : <CopyIcon />}
            className="h-3 w-3 cursor-pointer dark:text-muted-foreground"
            onClick={handleCopy} />
        )}
      </span>
    </TooltipProvider>
  );
}
