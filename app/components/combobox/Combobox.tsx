"use client";

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
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Option<T = string> = T | { value: T; label: string };

interface OptionGroup<T = string> {
  label: string;
  options: Option<T>[];
}

interface AppComboboxProps<T = string> {
  value?: T;
  onValueChange?: (value: T) => void;
  placeholder?: string;
  groups?: OptionGroup<T>[];
  options?: Option<T>[];
  fetchOptions?: (query: string) => Promise<Option<T>[]>;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: string;
  helperText?: string;
  getOptionLabel?: (option: Option<T>) => string;
  getOptionValue?: (option: Option<T>) => string;
}

export default function AppCombobox<T = string>({
  value,
  onValueChange,
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
  getOptionLabel = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "label" in opt
      ? opt.label
      : String(opt),
  getOptionValue = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "value" in opt
      ? String(opt.value)
      : String(opt),
}: AppComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const isAsync = !!fetchOptions;

  const flatStaticOptions = groups ? groups.flatMap((g) => g.options) : options || [];

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    if (!isAsync) return;
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setDynamicOptions(fetched);
    } catch (err) {
      console.error("Fetch options error:", err);
      setDynamicOptions([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions, isAsync]);

  useEffect(() => {
    if (isAsync) loadOptions();
  }, [loadOptions, isAsync]);

  const finalGroups = isAsync ? undefined : groups;
  const finalOptions = isAsync ? dynamicOptions : flatStaticOptions;
  const allValues = finalOptions.map(getOptionValue);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        items={allValues}
        value={value !== undefined ? getOptionValue(value as any) : undefined}
        onValueChange={(strVal) => {
          onValueChange?.(strVal as T);
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
          className={cn("w-full", className)}
        >
          <ComboboxValue placeholder={placeholder} />
          <ComboboxClear />
          <ComboboxTrigger />
        </ComboboxInput>

        <ComboboxContent className={contentClassName}>
          <ComboboxEmpty>
            {loading ? t("common.combobox.loading") : t("common.combobox.noResults")}
          </ComboboxEmpty>

          <ComboboxList>
            {finalGroups ? (
              finalGroups.map((group, idx) => (
                <ComboboxGroup key={group.label}>
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  {group.options.map((opt) => {
                    const val = getOptionValue(opt);
                    return (
                      <ComboboxItem key={val} value={val}>
                        {getOptionLabel(opt)}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value !== undefined && getOptionValue(value as any) === val
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </ComboboxItem>
                    );
                  })}
                  {idx < finalGroups.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))
            ) : (
              finalOptions.map((opt) => {
                const val = getOptionValue(opt);
                return (
                  <ComboboxItem key={val} value={val}>
                    {getOptionLabel(opt)}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value !== undefined && getOptionValue(value as any) === val
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  </ComboboxItem>
                );
              })
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
