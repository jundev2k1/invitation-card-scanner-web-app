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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks";

interface AppComboboxProps<T = unknown> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  placeholder?: string;
  options?: T[];
  fetchOptions?: (query: string) => Promise<T[]>;
  debounceMs?: number;
  disabled?: boolean;
  containerClassName?: string;
  className?: string;
  contentClassName?: string;
  label?: string | React.ReactNode;
  error?: string;
  getOptionLabel: (option: T) => string | React.ReactNode;
  getDisplayValue?: (option: T) => string | React.ReactNode;
  getOptionKey: (option: T) => string | number;
}

export default function AppCombobox<T = unknown>({
  value,
  onChange,
  placeholder = "Select an option...",
  options: staticOptions = [],
  fetchOptions,
  debounceMs = 300,
  disabled = false,
  containerClassName,
  className,
  contentClassName,
  label,
  error,
  getOptionLabel,
  getDisplayValue = getOptionLabel,
  getOptionKey,
}: AppComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    if (!!value) return;

    if (!fetchOptions) return;
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
    if (open && !value && fetchOptions) {
      loadOptions();
    }
  }, [open, loadOptions, fetchOptions]);

  const allOptions = fetchOptions ? dynamicOptions : staticOptions;

  const displayText = useMemo(() => {
    if (value == null) return null;
    return getDisplayValue(value);
  }, [value, getDisplayValue]);

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label
          className={cn(
            "text-slate-900 dark:text-muted-foreground",
            error && "text-destructive", disabled && "opacity-70"
          )}
        >
          {label}
        </Label>
      )}

      <Combobox
        value={value ? String(getOptionKey(value)) : ""}
        onValueChange={(keyStr) => {
          if (!keyStr) {
            onChange?.(null);
            setQuery("");
            return;
          }
          const matched = allOptions.find((opt) => String(getOptionKey(opt)) === keyStr);
          if (matched) {
            onChange?.(matched);
          }
          setOpen(false);
          setQuery("");
        }}
        open={open && !disabled}
        onOpenChange={(o) => {
          if (disabled) return;
          setOpen(o);
          if (!o) setQuery("");
        }}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive",
            value != null && "cursor-default",
            className
          )}
        >
          <ComboboxValue placeholder={placeholder}>
            {displayText}
          </ComboboxValue>

          {value != null && (
            <ComboboxClear
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(null);
                setQuery("");
              }}
            />
          )}
        </ComboboxInput>

        <ComboboxContent className={cn("z-999 max-h-75 overflow-y-auto", !!value && "hidden", contentClassName)}>
          <ComboboxList>
            {loading ? (
              <div className="py-6 text-center">
                <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : allOptions.length === 0 ? (
              <ComboboxEmpty>{t("common.combobox.noResults")}</ComboboxEmpty>
            ) : (
              allOptions.map((opt) => {
                const key = String(getOptionKey(opt));

                return (
                  <ComboboxItem key={key} value={key}>
                    {getOptionLabel(opt)}
                  </ComboboxItem>
                );
              })
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
