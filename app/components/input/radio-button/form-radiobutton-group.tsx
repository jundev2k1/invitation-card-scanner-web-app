import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";

interface FormRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

export function FormRadioGroup({ name, label, options }: FormRadioGroupProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col gap-2">
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                <Label htmlFor={`${name}-${opt.value}`} className="font-normal">{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
