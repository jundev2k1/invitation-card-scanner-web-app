"use client";

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks";

type Option<T = unknown> = T | { value: T; label: string | React.ReactNode };

interface OptionGroup<T = unknown> {
  label: string | React.ReactNode;
  options: Option<T>[];
}

interface AppComboboxProps<T = unknown> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  placeholder?: string;
  groups?: OptionGroup<T>[];
  options?: Option<T>[];
  fetchOptions?: (query: string) => Promise<Option<T>[]>;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: string | React.ReactNode;
  helperText?: string;
  getOptionLabel: (option: T) => string | React.ReactNode;
  getDisplayValue?: (option: T) => string | React.ReactNode;
  getOptionKey?: (option: T) => string | number;
}

export default function AppCombobox<T = unknown>({
  value,
  onChange,
  placeholder = "Select an option...",
  groups,
  options,
  fetchOptions,
  debounceMs = 300,
  disabled = false,
  className,
  contentClassName,
  label,
  helperText,
  getOptionLabel,
  getDisplayValue = getOptionLabel,
  getOptionKey = (option) => {
    if (typeof option === "object" && option !== null && "value" in option) {
      return String((option as any).value);
    }
    return String(option);
  },
}: AppComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const isAsync = !!fetchOptions;
  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    if (!isAsync || !fetchOptions) return;
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
  }, [debouncedQuery, fetchOptions, isAsync]);

  useEffect(() => {
    if (isAsync) loadOptions();
  }, [loadOptions, isAsync]);

  const finalOptions = useMemo(() => {
    if (isAsync) return dynamicOptions;
    return groups ? groups.flatMap((g) => g.options) : options || [];
  }, [isAsync, dynamicOptions, groups, options]);

  const selectedOption = useMemo(() => {
    if (value == null) return null;
    return finalOptions.find(
      (opt) => getOptionKey(opt as any) === getOptionKey(value as any)
    ) as T | null;
  }, [finalOptions, value, getOptionKey]);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        value={selectedOption ? getOptionKey(selectedOption as any).toString(): ""}
        onValueChange={(key) => {
          if (!key) {
            onChange?.(null);
            return;
          }
          const matched = finalOptions.find(
            (opt) => getOptionKey(opt as any) === key
          ) as T | undefined;
          onChange?.(matched ?? null);
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
          className={cn("w-full dark:text-foreground", className)}
        >
          <ComboboxValue placeholder={placeholder}>
            {selectedOption ? getDisplayValue(selectedOption) : null}
          </ComboboxValue>

          <ComboboxClear
            onClick={() => {
              onChange?.(null);
              setQuery("");
            }}
          />
          <ComboboxTrigger />
        </ComboboxInput>

        <ComboboxContent className={contentClassName}>
          <ComboboxEmpty>
            {loading
              ? t("common.combobox.loading")
              : t("common.combobox.noResults")}
          </ComboboxEmpty>

          <ComboboxList>
            {groups && !isAsync ? (
              groups.map((group, idx) => (
                <ComboboxGroup
                  key={typeof group.label === "string" ? group.label : idx}
                >
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  {group.options.map((opt, i) => (
                    <ComboboxItem key={i} value={getOptionKey(opt as any)}>
                      {getOptionLabel(opt as any)}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value &&
                            getOptionKey(value as any) ===
                              getOptionKey(opt as any) &&
                            "opacity-100",
                          "opacity-0"
                        )}
                      />
                    </ComboboxItem>
                  ))}
                  {idx < groups.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))
            ) : (
              finalOptions.map((opt, i) => (
                <ComboboxItem key={i} value={getOptionKey(opt as any)}>
                  {getOptionLabel(opt as any)}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value &&

                        getOptionKey(value as any) ===
                          getOptionKey(opt as any) &&
                        "opacity-100",
                      "opacity-0"
                    )}
                  />
                  {loading && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </ComboboxItem>
              ))
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
