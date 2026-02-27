"use client";

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
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type Option = string | { value: string; label: string };

interface FormAsyncComboboxProps {
  name: string;
  label?: string;
  placeholder?: string;
  fetchOptions: (query: string) => Promise<Option[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  getOptionLabel?: (opt: Option) => string;
  getOptionValue?: (opt: Option) => string;
}

export function FormAsyncCombobox({
  name,
  label,
  placeholder = "Search and select...",
  fetchOptions,
  debounceMs = 300,
  isRequired = false,
  disabled = false,
  className,
  containerClassName,
  getOptionLabel = (opt) => (typeof opt === "string" ? opt : opt.label),
  getOptionValue = (opt) => (typeof opt === "string" ? opt : opt.value),
}: FormAsyncComboboxProps) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedValue = watch(name) as string | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, { required: isRequired ? t("common.combobox.required") : false });

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setOptions(fetched);
    } catch (err) {
      console.error("Fetch options error:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const displayOptions = selectedValue
    ? [...new Set([...options.map(getOptionValue), selectedValue])].map(
        (val) => options.find((o) => getOptionValue(o) === val) || val
      )
    : options;

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label className={cn(error && "text-destructive", disabled && "opacity-70")}>
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Combobox
        items={displayOptions.map(getOptionValue)}
        value={selectedValue}
        onValueChange={(val) => setValue(name, val ?? "", { shouldValidate: true })}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn("w-full", error && "border-destructive focus-visible:ring-destructive", className)}
        >
          <ComboboxValue placeholder={placeholder} />
          <ComboboxClear />
          <ComboboxTrigger />
        </ComboboxInput>

        <ComboboxContent>
          <ComboboxEmpty>
            {loading ? t("common.combobox.loading") : t("common.combobox.noResults")}
          </ComboboxEmpty>

          <ComboboxList>
            {(val) => {
              const opt = displayOptions.find((o) => getOptionValue(o) === val);
              return (
                <ComboboxItem key={val} value={val}>
                  {opt ? getOptionLabel(opt) : val}
                  {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
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
