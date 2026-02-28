"use client";
import { cn } from "@/lib/utils";
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
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../hooks";

interface Group<T = string> {
  value: string;
  items: T[];
}

interface FormGroupedComboboxProps<T = string> {
  name: string;
  label?: string;
  placeholder?: string;
  groups?: Group<T>[];
  fetchOptions?: (query: string) => Promise<Group<T>[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => string;
}

export function FormGroupedCombobox<T = string>({
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
  getOptionLabel = (item: T) => String(item),
  getOptionValue = (item: T) => String(item),
}: FormGroupedComboboxProps<T>) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedValue = watch(name) as T | undefined;
  const error = errors[name]?.message as string | undefined;

  register(name, { required: isRequired ? t("common.form.required") : false });

  const [query, setQuery] = useState("");
  const [dynamicGroups, setDynamicGroups] = useState<Group<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const isAsync = !!fetchOptions;
  const finalGroups = isAsync ? dynamicGroups : groups || [];
  const allItems = finalGroups.flatMap((g) => g.items);
  const allValues = allItems.map(getOptionValue);

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
        items={allValues}
        value={selectedValue !== undefined ? getOptionValue(selectedValue) : undefined}
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
                  {(item) => {
                    const val = getOptionValue(item);
                    return (
                      <ComboboxItem key={val} value={val}>
                        {getOptionLabel(item)}
                        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                      </ComboboxItem>
                    );
                  }}
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
