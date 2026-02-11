import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

interface AppFilterButtonProps extends ButtonProps {
  activeCount?: number;
}

export function FilterButton({ activeCount = 0, className, children, ...props }: AppFilterButtonProps) {
  return (
    <Button 
      variant="outline" 
      className={cn("relative gap-2 border-dashed", activeCount > 0 && "border-primary text-primary", className)} 
      {...props}
    >
      <Filter className="h-4 w-4" />
      {children || "Filter"}
      {activeCount > 0 && (
        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {activeCount}
        </span>
      )}
    </Button>
  );
}