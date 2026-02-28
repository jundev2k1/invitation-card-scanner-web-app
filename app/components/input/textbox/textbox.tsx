import { cn } from "@/lib/utils";
import { Input } from "@/shadcn/input";
import { Label } from "@/shadcn/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

export default function AppInput({ label, helperText, className, id, containerClassName, ...props }: InputProps) {
  return (
    <div className={cn("grid w-full items-center gap-1.5 ", containerClassName)}>
      {label && (
        <Label htmlFor={id} className="text-slate-900 dark:text-muted-foreground">
          {label}
        </Label>
      )}
      <Input className={cn("focus-visible:ring-2 dark:text-muted-foreground", className)} id={id} {...props} />
      {helperText && <div className="text-xs text-muted-foreground">{helperText}</div>}
    </div>
  );
}
