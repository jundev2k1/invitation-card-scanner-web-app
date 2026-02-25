"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/datetime/date.util";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../input";

interface FormDatePickerProps {
  name: string;
  label?: string;
}

export function FormDateTimePicker({ name, label }: FormDatePickerProps) {
  const t = useTranslations();
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1.5 flex flex-col">
      {label && (
        <Label className={error ? "border-destructive text-destructive" : "text-slate-900 dark:text-muted-foreground"}>
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground", error && "border-destructive")}>
                {field.value ? formatDate(field.value, "PPP HH:mm") : <span>{t("common.datetime.placeholder")}</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                autoFocus
              />
              <div className="p-3 border-t">
                <Input
                  type="time"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const newDate = new Date(field.value || new Date());
                    newDate.setHours(parseInt(hours), parseInt(minutes));
                    field.onChange(newDate);
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
