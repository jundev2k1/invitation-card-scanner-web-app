"use client";

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Group {
  value: string;
  items: string[];
}

interface FormGroupedComboboxProps {
  name: string;
  label?: string;
  placeholder?: string;
  groups?: Group[];
  fetchOptions?: (query: string) => Promise<Group[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
}

export function FormGroupedCombobox({
  name,
  label,
  placeholder = "Select a timezone...",
  groups,
  fetchOptions,
  debounceMs = 300,
  isRequired = false,
  disabled = false,
  className,
  contentClassName,
  containerClassName,
}: FormGroupedComboboxProps) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedValue = watch(name) as string | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, { required: isRequired ? t("common.combobox.required") : false });

  const [query, setQuery] = useState("");
  const [dynamicGroups, setDynamicGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  const isAsync = !!fetchOptions;
  const finalGroups = isAsync ? dynamicGroups : groups || [];
  const allItems = finalGroups.flatMap((g) => g.items);

  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    if (!isAsync) return;
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setDynamicGroups(fetched);
    } catch (err) {
      console.error("Fetch grouped options error:", err);
      setDynamicGroups([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions, isAsync]);

  useEffect(() => {
    if (isAsync) loadOptions();
  }, [loadOptions, isAsync]);

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label className={cn(error && "text-destructive", disabled && "opacity-70")}>
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Combobox
        items={allItems}
        value={selectedValue}
        onValueChange={(val) => setValue(name, val ?? "", { shouldValidate: true })}
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
        />

        <ComboboxContent className={contentClassName}>
          <ComboboxEmpty>
            {loading ? t("common.combobox.loading") : t("common.combobox.noResults")}
          </ComboboxEmpty>

          <ComboboxList>
            {(group, index) => (
              <ComboboxGroup key={group.value}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                      {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
                {index < finalGroups.length - 1 && <ComboboxSeparator />}
              </ComboboxGroup>
            )}
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
