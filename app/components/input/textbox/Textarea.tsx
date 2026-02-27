'use client';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface AppTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

const AppTextArea = forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  ({ label, helperText, className, id, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Textarea
          ref={ref}
          className={cn("focus-visible:ring-2 dark:text-muted-foreground", className)}
          id={id}
          {...props}
        />
        {helperText && <div className="text-xs text-muted-foreground">{helperText}</div>}
      </div>
    );
  }
);

AppTextArea.displayName = "AppTextArea";
export default AppTextArea;
