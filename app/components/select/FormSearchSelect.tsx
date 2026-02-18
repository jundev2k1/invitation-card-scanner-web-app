"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface FormSearchSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export function FormSearchSelect({ name, label, options, placeholder = "Select item..." }: FormSearchSelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5 w-full flex flex-col">
      {label && <Label>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className={cn("justify-between font-normal", !field.value && "text-muted-foreground", error && "border-destructive")}>
                {field.value ? options.find((opt) => opt.value === field.value)?.label : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => field.onChange(opt.value)}
                      >
                        <Check className={cn("mr-2 h-4 w-4", field.value === opt.value ? "opacity-100" : "opacity-0")} />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
