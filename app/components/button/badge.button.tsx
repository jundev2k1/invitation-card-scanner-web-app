import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BadgeButtonProps {
  count: number;
  onClick: () => void;
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const BadgeButton = ({ count, label, variant = "default", size = "default", className, onClick }: BadgeButtonProps) => {
  return (
    <div className="relative inline-block">
      <Button
        variant={variant}
        size={size}
        className={cn(
          "relative font-medium transition-all",
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
  );
}