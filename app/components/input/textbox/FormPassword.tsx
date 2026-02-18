"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  isRequired?: boolean;
};

export function FormPassword({ name, label, className, isRequired, ...props }: FormPasswordProps) {
  const { register, formState: { errors } } = useFormContext();
  const [show, setShow] = useState(false);
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label className={error ? "text-destructive" : "text-slate-300"} htmlFor={name}>
          {label}
          {isRequired && <span className="text-red-400">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          id={name}
          type={show ? "text" : "password"}
          {...register(name)}
          className={cn("pr-10", error && "border-destructive", className)}
          required={isRequired}
          {...props}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShow(!show)}
          className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-200 hover:bg-transparent"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      {error && <div className="text-xs text-destructive font-medium">{error}</div>}
    </div>
  );
}
