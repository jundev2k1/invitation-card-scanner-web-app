"use client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export function FormSelect({ name, label, options, placeholder }: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5 w-full">
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={error ? "border-destructive" : ""}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
