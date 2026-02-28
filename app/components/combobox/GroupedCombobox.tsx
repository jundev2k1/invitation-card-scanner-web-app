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

interface Group<T = unknown> {
  value: string;
  label?: string | React.ReactNode;
  items: T[];
}

interface GroupedComboboxProps<T = unknown> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  placeholder?: string;
  groups?: Group<T>[];
  fetchOptions?: (query: string) => Promise<Group<T>[]>;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: string | React.ReactNode;
  helperText?: string;
  getOptionLabel: (item: T) => string | React.ReactNode;
  getDisplayValue?: (item: T) => string | React.ReactNode;
  getOptionKey?: (item: T) => string | number;
}

export default function GroupedCombobox<T = unknown>({
  value,
  onChange,
  placeholder = "Select an option...",
  groups,
  fetchOptions,
  debounceMs = 300,
  disabled = false,
  className,
  contentClassName,
  label,
  helperText,
  getOptionLabel,
  getDisplayValue = getOptionLabel,
  getOptionKey = (item) => {
    if (typeof item === "object" && item !== null && "id" in item) {
      return String((item as any).id);
    }
    if (typeof item === "object" && item !== null && "value" in item) {
      return String((item as any).value);
    }
    return String(item);
  },
}: GroupedComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicGroups, setDynamicGroups] = useState<Group<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const isAsync = !!fetchOptions;
  const debouncedQuery = useDebounce(query, debounceMs);

  const loadOptions = useCallback(async () => {
    if (!isAsync || !fetchOptions) return;
    setLoading(true);
    try {
      const fetched = await fetchOptions(debouncedQuery);
      setDynamicGroups(fetched);
    } catch (err) {
      console.error("Failed to load grouped options:", err);
      setDynamicGroups([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, fetchOptions, isAsync]);

  useEffect(() => {
    if (isAsync) loadOptions();
  }, [loadOptions, isAsync]);

  const finalGroups = isAsync ? dynamicGroups : groups || [];

  const selectedItem = useMemo(() => {
    if (value == null) return null;
    for (const group of finalGroups) {
      const found = group.items.find(
        (item) => getOptionKey(item) === getOptionKey(value as any)
      );
      if (found) return found;
    }
    return null;
  }, [finalGroups, value, getOptionKey]);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        value={selectedItem ? getOptionKey(selectedItem).toString() : ""}
        onValueChange={(key) => {
          if (!key) {
            onChange?.(null);
            setQuery("");
            return;
          }

          let matched: T | undefined;
          for (const group of finalGroups) {
            matched = group.items.find(
              (item) => getOptionKey(item) === key
            ) as T | undefined;
            if (matched) break;
          }

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
            {selectedItem ? getDisplayValue(selectedItem) : null}
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
            {finalGroups.map((group, gIdx) => (
              <ComboboxGroup key={group.value || gIdx}>
                <ComboboxLabel>{group.label ?? group.value}</ComboboxLabel>
                {group.items.map((item, i) => (
                  <ComboboxItem key={i} value={getOptionKey(item)}>
                    {getOptionLabel(item)}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedItem &&
                          getOptionKey(selectedItem) === getOptionKey(item) &&
                          "opacity-100",
                        "opacity-0"
                      )}
                    />
                    {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  </ComboboxItem>
                ))}
                {gIdx < finalGroups.length - 1 && <ComboboxSeparator />}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
}
