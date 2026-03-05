"use client";
import { Checkbox } from "@/shadcn/checkbox";
import { Label } from "@/shadcn/label";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function AppCheckbox({ id, label, checked, onCheckedChange }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="cursor-pointer text-slate-900 dark:text-muted-foreground">{label}</Label>
    </div>
  );
}
