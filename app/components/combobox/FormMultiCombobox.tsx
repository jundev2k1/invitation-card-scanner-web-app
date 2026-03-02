"use client";

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  useComboboxAnchor
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Check, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks";

type Option<T = unknown> = T | { value: T; label: string | React.ReactNode };

interface OptionGroup<T = unknown> {
  label: string | React.ReactNode;
  options: Option<T>[];
}

interface FormMultiComboboxProps<T = unknown> {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  groups?: OptionGroup<T>[];
  options?: Option<T>[];
  fetchOptions?: (query: string) => Promise<Option<T>[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  getOptionLabel: (option: T) => string | React.ReactNode;
  getDisplayValue?: (option: T) => string | React.ReactNode;
  getOptionKey?: (option: T) => string | number;
}

export function FormMultiCombobox<T = unknown>({
  name,
  label,
  placeholder = "Select options...",
  groups,
  options,
  fetchOptions,
  debounceMs = 300,
  isRequired = false,
  disabled = false,
  className,
  contentClassName,
  containerClassName,
  getOptionLabel,
  getDisplayValue = getOptionLabel,
  getOptionKey = (option) => {
    if (typeof option === "object" && option !== null && "value" in option) {
      return String((option as any).value);
    }
    return String(option);
  },
}: FormMultiComboboxProps<T>) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  const selectedValues = (watch(name) as T[]) ?? [];
  const error = errors[name]?.message as string | undefined;

  register(name, {
    required: isRequired ? t("common.form.required") : false,
  });

  const anchor = useComboboxAnchor();

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

  const selectedOptions = useMemo(() => {
    if (!selectedValues) return [];
    return selectedValues
      .map((val) =>
        finalOptions.find(
          (opt) => getOptionKey(opt as any) === getOptionKey(val as any)
        )
      )
      .filter((opt): opt is T => opt !== undefined);
  }, [finalOptions, selectedValues, getOptionKey]);

  const handleRemove = (keyToRemove: string | number) => {
    const updated = selectedValues.filter(
      (v) => getOptionKey(v as any) !== keyToRemove
    );
    setValue(name, updated, { shouldValidate: true });
  };

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
        multiple
        value={selectedOptions.map((opt) => getOptionKey(opt))}
        onValueChange={(newKeys: (string | number)[]) => {
          const newSelected = newKeys
            .map((key) =>
              finalOptions.find((opt) => getOptionKey(opt as any) === key)
            )
            .filter((opt): opt is T => opt !== undefined);

          setValue(name, newSelected, { shouldValidate: true });
        }}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          className={cn(
            "w-full min-h-10 px-3 py-2",
            className,
            error && "border-destructive focus-within:ring-destructive/30"
          )}
        >
          {selectedOptions.map((opt) => {
            const key = getOptionKey(opt);
            return (
              <ComboboxChip key={key}>
                <div className="flex items-center gap-1.5">
                  {getDisplayValue(opt)}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(key);
                    }}
                    className="ml-1 rounded-full hover:bg-muted/80 p-0.5 transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </ComboboxChip>
            );
          })}

          <ComboboxChipsInput
            placeholder={selectedValues.length ? "" : placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ComboboxChips>

        <ComboboxContent anchor={anchor} className={contentClassName}>
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
                  {group.options.map((opt, i) => {
                    const key = getOptionKey(opt as any);
                    const isSelected = selectedOptions.some(
                      (s) => getOptionKey(s) === key
                    );
                    return (
                      <ComboboxItem key={getOptionKey(opt as any)} value={key}>
                        {getOptionLabel(opt as any)}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </ComboboxItem>
                    );
                  })}
                  {idx < groups.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))
            ) : (
              finalOptions.map((opt, i) => {
                const key = getOptionKey(opt as any);
                const isSelected = selectedOptions.some(
                  (s) => getOptionKey(s) === key
                );
                return (
                  <ComboboxItem key={i} value={key}>
                    {getOptionLabel(opt as any)}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
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

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
