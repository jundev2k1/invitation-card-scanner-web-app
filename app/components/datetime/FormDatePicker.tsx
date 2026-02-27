"use client";
import { ClockIcon, XCircleIcon } from "@/icons";
import { formatDate } from "@/lib/datetime/date.util";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/button";
import { Calendar } from "@/shadcn/calendar";
import { Label } from "@/shadcn/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IconButton } from "../button";
import { Input } from "../input";

interface FormDatePickerProps {
  name: string;
  label?: string;
  captionLayout?: "dropdown" | "label" | "dropdown-months" | "dropdown-years";
  nullable?: boolean
}

export function FormDateTimePicker({ name, label, nullable = false, captionLayout = "label" }: FormDatePickerProps) {
  const t = useTranslations();
  const timeInputRef = useRef<HTMLInputElement>(null);
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  const handleIconClick = useCallback(() => {
    if (timeInputRef.current) {
      timeInputRef.current.showPicker();
    }
  }, []);
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
              <Button variant="outline" className={cn(
                "pl-3 text-left font-normal dark:text-foreground",
                !field.value && "text-muted-foreground",
                error && "border-destructive")}
              >
                {field.value ? formatDate(field.value, "PPP HH:mm") : <span>{t("common.datetime.placeholder")}</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout={captionLayout}
                className="cursor-pointer"
                selected={field.value}
                onSelect={field.onChange}
                autoFocus
              />
              <div className="p-3 border-t flex gap-1">
                <div role="button" className="relative cursor-pointer grow" onClick={handleIconClick}>
                  <Input
                    ref={timeInputRef}
                    type="time"
                    className="custom-time-input flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors pr-10 dark:text-foreground"
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(field.value || new Date());
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      field.onChange(newDate);
                    }}
                  />
                  <ClockIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none opacity-50" />
                </div>
                {nullable && (
                  <IconButton
                    icon={<XCircleIcon />}
                    variant="outline"
                    className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                    onClick={() => field.onChange(null)}
                    disabled={!field.value}
                  />
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <div className="text-xs text-destructive">{error}</div>}
    </div>
  );
}
