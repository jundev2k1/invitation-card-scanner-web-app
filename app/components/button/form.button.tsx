"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";

interface FormButtonProps extends ButtonProps {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoDisable?: boolean;
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      autoDisable = true,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const isSubmitting = formContext?.formState?.isSubmitting;
    
    const _disabled = disabled || isLoading || (autoDisable && isSubmitting);
    const _showLoading = isLoading || (autoDisable && isSubmitting && type === "submit");

    return (
      <Button
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        disabled={_disabled}
        className={cn("gap-2 active:scale-[0.98] transition-transform", className)}
        {...props}
      >
        {_showLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        
        <span className="truncate">{children}</span>

        {!_showLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </Button>
    );
  }
);

FormButton.displayName = "FormButton";
