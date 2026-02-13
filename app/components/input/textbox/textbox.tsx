import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export default function AppInput({ label, helperText, className, id, ...props }: InputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input className={cn("focus-visible:ring-2 dark:text-muted-foreground", className)} id={id} {...props} />
      {helperText && <div className="text-xs text-muted-foreground">{helperText}</div>}
    </div>
  );
}
