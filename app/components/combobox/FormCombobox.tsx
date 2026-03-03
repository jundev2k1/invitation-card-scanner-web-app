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
  ComboboxValue
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks";

interface FormComboboxProps<T = unknown> {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  fetchOptions: (query: string) => Promise<T[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  getOptionLabel: (option: T) => string | React.ReactNode;
  getDisplayValue?: (option: T) => string | React.ReactNode;
  getOptionKey: (option: T) => string | number;
  getValue?: (option: T) => any;
  disableAfterSelect?: boolean;
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
  getOptionKey,
  getValue = getOptionKey,
  disableAfterSelect = false
}: FormComboboxProps<T>) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  const selectedItem = watch(name) as T | null | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, {
    required: isRequired ? t("common.form.required") : false,
  });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setOptions(fetched);
    } catch (err) {
      console.error("Failed to load options:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions]);

  useEffect(() => {
    if (open) {
      loadOptions();
    }
  }, [open, loadOptions]);

  const selectedOption = useMemo(() => {
    if (!selectedItem) return null;

    if (typeof selectedItem === 'object' && selectedItem !== null)
      return options.find(opt => getOptionKey(opt) === getOptionKey(selectedItem as T)) ?? null;

    return options.find(opt => String(getOptionKey(opt)) === String(selectedItem)) ?? null;
  }, [options, selectedItem, getOptionKey]);

  const displayText = selectedOption
    ? getDisplayValue(selectedOption)
    : (typeof selectedItem === 'string' || typeof selectedItem === 'number'
      ? String(selectedItem)
      : null);

  const effectiveDisabled = disabled || (disableAfterSelect && !!selectedItem);
  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label className={cn(
          "text-slate-900 dark:text-muted-foreground",
          error && "text-destructive",
          disabled && "opacity-70"
        )}>
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Combobox
        value={selectedItem ? String(getOptionKey(selectedItem)) : ""}
        onValueChange={(keyStr) => {
          if (effectiveDisabled) return;
          if (!keyStr) {
            setValue(name, null, { shouldValidate: true });
            setQuery("");
            return;
          }

          const matched = options.find(
            (opt) => String(getOptionKey(opt)) === keyStr
          );

          if (matched) {
            const finalValue = getValue(matched);
            setValue(name, finalValue, { shouldValidate: true });
          }

          setOpen(false);
          setQuery("");
        }}
        open={open && !effectiveDisabled}
        onOpenChange={(o) => {
          if (effectiveDisabled) return;
          setOpen(o);
          if (!o) setQuery("");
        }}
        disabled={effectiveDisabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            if (effectiveDisabled) return;

            setQuery(e.target.value);
          }}
          className={cn(
            "w-full cursor-default text-foreground",
            effectiveDisabled && "cursor-default bg-muted/50 opacity-80",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
        >
          <ComboboxValue placeholder={placeholder}>
            {displayText}
          </ComboboxValue>

          {selectedItem != null && (
            <ComboboxClear
              onClick={(e) => {
                e.stopPropagation();

                setValue(name, null, { shouldValidate: true });
                setQuery("");
              }}
              className={cn(
                effectiveDisabled && "opacity-100 hover:opacity-100"
              )}
            />
          )}
        </ComboboxInput>

        <ComboboxContent className={cn(
          "z-999 pointer-events-auto max-h-75 overflow-y-auto",
          selectedItem && "hidden")}
        >
          {!selectedItem || loading && (
            <ComboboxEmpty>
              {loading
                ? t("common.combobox.loading")
                : t("common.combobox.noResults")}
            </ComboboxEmpty>
          )}

          <ComboboxList>
            {options.map((opt) => {
              const key = String(getOptionKey(opt));
              const isSelected =
                selectedItem && String(getOptionKey(selectedItem)) === key;

              return (
                <ComboboxItem key={key} value={key}>
                  {getOptionLabel(opt)}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                </ComboboxItem>
              );
            })}
          </ComboboxList>

          {loading && (
            <div className="py-6 text-center">
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            </div>
          )}
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
