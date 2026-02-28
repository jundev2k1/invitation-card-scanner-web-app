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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks";

type Option<T = string> = T | { value: T; label: string };

interface FormAsyncComboboxProps<T = string> {
  name: string;
  label?: string;
  placeholder?: string;
  fetchOptions: (query: string) => Promise<Option<T>[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  getOptionLabel?: (opt: Option<T>) => string;
  getOptionValue?: (opt: Option<T>) => string;
}

export function FormCombobox<T = string>({
  name,
  label,
  placeholder = "Search and select...",
  fetchOptions,
  debounceMs = 300,
  isRequired = false,
  disabled = false,
  className,
  containerClassName,
  getOptionLabel = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "label" in opt
      ? opt.label
      : String(opt),
  getOptionValue = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "value" in opt
      ? String(opt.value)
      : String(opt),
}: FormAsyncComboboxProps<T>) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedValue = watch(name) as T | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, { required: isRequired ? t("common.form.required") : false });

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option<T>[]>([]);
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
    ? [
        ...new Set([
          ...options.map(getOptionValue),
          getOptionValue(selectedValue as any),
        ]),
      ].map(
        (val) =>
          options.find((o) => getOptionValue(o) === val) ||
          (selectedValue as any)
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
        value={
          selectedValue !== undefined
            ? getOptionValue(selectedValue as any)
            : undefined
        }
        onValueChange={(strVal) => {
          setValue(name, strVal as T, { shouldValidate: true });
        }}
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
