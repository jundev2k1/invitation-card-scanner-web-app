import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface FormCheckboxGroupProps  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

export function FormCheckboxGroup({ name, label, options }: FormCheckboxGroupProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-3">
      {label && <Label className="text-base">{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const value = field.value || [];
          return (
            <div className="grid gap-2">
              {options.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`${name}-${opt.value}`}
                    checked={value.includes(opt.value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked 
                        ? [...value, opt.value] 
                        : value.filter((v: string) => v !== opt.value);
                      field.onChange(newValue);
                    }}
                  />
                  <Label htmlFor={`${name}-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </div>
          );
        }}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
