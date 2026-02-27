"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/shadcn/input";
import { Label } from "@/shadcn/label";
import { useFormContext } from "react-hook-form";

interface FormNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  isRequired?: boolean;
}

export function FormNumber({ name, label, isRequired, ...props }: FormNumberProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <Input
        type="number"
        {...register(name, { valueAsNumber: true })}
        className={cn(
          "dark:text-foreground",
          error ? "border-destructive text-destructive" : "text-slate-900 dark:text-muted-foreground"
        )}
        required={isRequired}
        {...props}
      />
      {error && <div className="text-xs text-destructive font-medium">{error}</div>}
    </div>
  );
}
