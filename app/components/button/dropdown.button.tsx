import { EllipsisIcon } from "@/app/components/icons";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../dropdown";
import { default as Button } from "./default.button";

interface DropdownButtonOption {
  label: ReactNode | string;
  className?: string;
  action: () => void;
}

interface DropdownButtonProps extends ButtonProps {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pressEffect?: boolean;
  options: DropdownButtonOption[];
}

export default function DropdownButton({ options, ...props }: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" {...props}>
          <EllipsisIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className={cn("cursor-pointer", option.className || "")}
            onClick={option.action}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
