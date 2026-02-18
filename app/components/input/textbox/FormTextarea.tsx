'use client';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  containerClassName?: string;
  isRequired?: boolean;
}

export function FormTextArea({ name, label, containerClassName, className, isRequired, ...props }: FormTextAreaProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label htmlFor={name} className={error ? "text-destructive" : "text-slate-300"}>
          {label}
          {isRequired && <span className="text-red-400">*</span>}
        </Label>
      )}
      <Textarea
        id={name}
        {...register(name)}
        className={cn(
          "min-height-[100px] resize-y",
          error ? "border-destructive focus-visible:ring-destructive" : "", 
          className
        )}
        required={isRequired}
        {...props}
      />
      {error && (
        <div className="text-[0.8rem] font-medium text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
