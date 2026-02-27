'use client';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AppTextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export default function AppTextArea({ label, helperText, className, id, ...props }: AppTextAreaProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea
        className={cn("focus-visible:ring-2 dark:text-muted-foreground", className)}
        id={id}
        {...props}
      />
      {helperText && <div className="text-xs text-muted-foreground">{helperText}</div>}
    </div>
  );
}
