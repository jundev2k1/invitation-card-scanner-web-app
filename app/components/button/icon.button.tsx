import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  isLoading?: boolean;
  tooltip?: string;
  isRound?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, isLoading, tooltip, isRound, variant = "ghost", size = "icon", disabled, ...props }, ref) => {

    const buttonNode = (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        className={cn(
          "shrink-0 active:scale-90 transition-transform",
          isRound ? "rounded-full" : "rounded-md",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>{buttonNode}</TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonNode;
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
