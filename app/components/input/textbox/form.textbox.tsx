'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormTextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  isRequired?: boolean;
  containerClassName?: string;
}

export function FormTextBox({ name, label, isRequired, containerClassName, className, ...props }: FormTextBoxProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={name} className={error ? "text-destructive" : "text-slate-300"}>
          {label}
          {isRequired && <span className="text-red-400">*</span>}
        </Label>)}
      <Input
        id={name}
        {...register(name)}
        className={cn(error ? "border-destructive focus-visible:ring-destructive" : "", className)}
        required={isRequired}
        {...props}
      />
      {error && <div className="text-[0.8rem] font-medium text-destructive">{error}</div>}
    </div>
  );
}
