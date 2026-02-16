"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function FormPassword({ name, label, className }: { name: string; label?: string; className?: string }) {
  const { register, formState: { errors } } = useFormContext();
  const [show, setShow] = useState(false);
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative">
        <Input
          id={name}
          type={show ? "text" : "password"}
          {...register(name)}
          className={cn("pr-10", error && "border-destructive", className)}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <div className="text-xs text-destructive font-medium">{error}</div>}
    </div>
  );
}
