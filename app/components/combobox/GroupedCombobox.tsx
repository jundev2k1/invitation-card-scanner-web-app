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

interface Group<T = string> {
  value: string;
  items: T[];
}

interface GroupedComboboxProps<T = string> {
  value?: T;
  onValueChange?: (value: T) => void;
  placeholder?: string;
  groups?: Group<T>[];
  fetchOptions?: (query: string) => Promise<Group<T>[]>;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: string;
  helperText?: string;
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => string;
}

export default function GroupedCombobox<T = string>({
  value,
  onValueChange,
  placeholder = "Select a timezone...",
  groups,
  fetchOptions,
  debounceMs = 300,
  disabled = false,
  className,
  contentClassName,
  label,
  helperText,
  getOptionLabel = (item: T) => String(item),
  getOptionValue = (item: T) => String(item),
}: GroupedComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
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
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        items={allValues}
        value={value !== undefined ? getOptionValue(value) : undefined}
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
