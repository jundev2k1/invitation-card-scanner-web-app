import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export function FormNumber({ name, label, ...props }: FormNumberProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <Input
        type="number"
        {...register(name, { valueAsNumber: true })}
        className={cn(error && "border-destructive")}
        {...props}
      />
      {error && <div className="text-xs text-destructive font-medium">{error}</div>}
    </div>
  );
}
