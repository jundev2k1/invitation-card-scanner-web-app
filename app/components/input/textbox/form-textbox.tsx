import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormTextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerClassName?: string;
}

export function FormTextBox({ name, label, containerClassName, className, ...props }: FormTextBoxProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && <Label htmlFor={name} className={error ? "text-destructive" : ""}>{label}</Label>}
      <Input
        id={name}
        {...register(name)}
        className={cn(error ? "border-destructive focus-visible:ring-destructive" : "", className)}
        {...props}
      />
      {error && <div className="text-[0.8rem] font-medium text-destructive">{error}</div>}
    </div>
  );
}
