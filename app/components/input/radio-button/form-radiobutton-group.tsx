'use client';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

interface FormRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  horizontal?: boolean;
  options: { label: string; value: string }[];
}

export function FormRadioGroup({ name, label, horizontal = false, options }: FormRadioGroupProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} value={field.value} className={cn("flex gap-2", horizontal && "flex-col")}>
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem className="cursor-pointer" value={opt.value} id={`${name}-${opt.value}`} />
                <Label htmlFor={`${name}-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
