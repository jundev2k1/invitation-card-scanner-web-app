"use client";

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks";

type Option<T = unknown> = T | { value: T; label: string | React.ReactNode };

interface FormComboboxProps<T = unknown> {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  fetchOptions: (query: string) => Promise<Option<T>[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  getOptionLabel: (option: T) => string | React.ReactNode;
  getDisplayValue?: (option: T) => string | React.ReactNode;
  getOptionKey?: (option: T) => string | number;
}

export function FormCombobox<T = unknown>({
  name,
  label,
  placeholder = "Search and select...",
  fetchOptions,
  debounceMs = 300,
  isRequired = false,
  disabled = false,
  className,
  containerClassName,
  getOptionLabel,
  getDisplayValue = getOptionLabel,
  getOptionKey = (option) => {
    if (typeof option === "object" && option !== null && "value" in option) {
      return String((option as any).value);
    }
    return String(option);
  },
}: FormComboboxProps<T>) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  const selectedValue = watch(name) as T | null | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, {
    required: isRequired ? t("common.form.required") : false,
  });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setDynamicOptions(fetched);
    } catch (err) {
      console.error("Failed to load options:", err);
      setDynamicOptions([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const selectedOption = useMemo(() => {
    if (selectedValue == null) return null;

    return dynamicOptions.find(
      (opt) => getOptionKey(opt as any) === getOptionKey(selectedValue as any)
    ) as T | null;
  }, [dynamicOptions, selectedValue, getOptionKey]);

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label
          className={cn(
            error && "text-destructive",
            disabled && "opacity-70"
          )}
        >
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Combobox
        value={selectedOption ? getOptionKey(selectedOption as any).toString() : ""}
        onValueChange={(key) => {
          if (!key) {
            setValue(name, null, { shouldValidate: true });
            setQuery("");
            return;
          }

          const matched = dynamicOptions.find(
            (opt) => getOptionKey(opt as any) === key
          ) as T | undefined;

          setValue(name, matched ?? null, { shouldValidate: true });
          setOpen(false);
        }}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "w-full",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        >
          <ComboboxValue placeholder={placeholder}>
            {selectedOption ? getDisplayValue(selectedOption) : null}
          </ComboboxValue>

          <ComboboxClear
            onClick={() => {
              setValue(name, null, { shouldValidate: true });
              setQuery("");
            }}
          />
          <ComboboxTrigger />
        </ComboboxInput>

        <ComboboxContent>
          <ComboboxEmpty>
            {loading
              ? t("common.combobox.loading")
              : t("common.combobox.noResults")}
          </ComboboxEmpty>

          <ComboboxList>
            {dynamicOptions.map((opt, i) => (
              <ComboboxItem key={i} value={getOptionKey(opt as any)}>
                {getOptionLabel(opt as any)}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedOption &&
                      getOptionKey(selectedOption as any) ===
                        getOptionKey(opt as any) &&
                      "opacity-100",
                    "opacity-0"
                  )}
                />
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
