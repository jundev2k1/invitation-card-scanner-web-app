"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        className={error ? "border-destructive text-destructive" : "text-slate-300"}
        required={isRequired}
        {...props}
      />
      {error && <div className="text-xs text-destructive font-medium">{error}</div>}
    </div>
  );
}
