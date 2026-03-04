import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shadcn/select";

interface SelectProps {
  value?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  disabled?: boolean;
}

export default function AppSelect({ value, onValueChange, placeholder, options, className, disabled }: SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("cursor-pointer", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}