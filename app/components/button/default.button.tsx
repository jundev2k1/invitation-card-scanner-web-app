import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pressEffect?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      pressEffect = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        variant={variant}
        size={size}
        className={cn(
          "gap-2 select-none cursor-pointer",
          pressEffect && "active:scale-95 transition-all",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        <span className="truncate">{children}</span>

        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";
export default AppButton;
