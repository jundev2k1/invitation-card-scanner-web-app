import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

interface BadgeButtonProps {
  count: number;
  onClick?: () => void | undefined;
  label?: string | React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  tooltip?: string;
}

export const BadgeButton = ({ count, label, variant = "default", size = "default", className, onClick, tooltip }: BadgeButtonProps) => {
  const buttonNode = (

    <div className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        className={cn(
          "relative font-medium transition-all cursor-pointer",
          count > 0 && "pr-8",
          className
        )}
        onClick={onClick}
      >
        {label}
        {count > 0 && (
          <Badge
            variant="destructive"
            className={cn(
              "absolute -top-2 -right-2 min-w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold px-1.5",
              "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
              "shadow-sm"
            )}
          >
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
    </div>
  )
  if (!tooltip) return buttonNode;

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