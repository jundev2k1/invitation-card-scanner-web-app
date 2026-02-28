'use client';
import { cn } from "@/lib/utils";
import { Label } from "@/shadcn/label";
import { Textarea } from "@/shadcn/textarea";
import { forwardRef } from "react";

interface AppTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

const AppTextArea = forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  ({ label, helperText, className, id, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <Label className="text-slate-900 dark:text-muted-foreground" htmlFor={id}>
            {label}
          </Label>
        )}
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
