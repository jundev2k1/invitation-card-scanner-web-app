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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks";

type Option<T = unknown> = T | { value: T; label: string | React.ReactNode };

interface OptionGroup<T = unknown> {
  label: string | React.ReactNode;
  options: Option<T>[];
}

interface AppMultiComboboxProps<T = unknown> {
  value: T[];
  onChange: (value: T[]) => void;
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
  getOptionValue?: (option: T) => string | number;
  displayCount?: number;
}

export default function AppMultiCombobox<T = unknown>({
  value = [],
  onChange,
  placeholder = "Select options...",
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
  getOptionKey = (option) => String(option),
  getOptionValue = getOptionKey,
  displayCount = 3,
}: AppMultiComboboxProps<T>) {
  const t = useTranslations();
  const anchor = useComboboxAnchor();

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

  const selectedKeys = useMemo(() => {
    return value.map(getOptionValue);
  }, [value, getOptionValue]);

  const visibleSelected = value.slice(0, displayCount);
  const remainingCount = value.length - displayCount;

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        multiple
        value={selectedKeys}
        onValueChange={(newKeys: (string | number)[]) => {
          const newSelected = newKeys
            .map((key) => {
              const opt = finalOptions.find((o) => {
                if (typeof o === "object" && o !== null && "value" in o) {
                  return getOptionValue((o as any).value) === key;
                }
                return getOptionValue(o as T) === key;
              });
              return opt ? (typeof opt === "object" && opt !== null && "value" in opt ? (opt as any).value : opt) : null;
            })
            .filter((v): v is T => v !== null);
          onChange(newSelected);
        }}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          className={cn(
            "w-full min-h-10 px-3 py-2",
            className,
            disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          {visibleSelected.map((opt) => {
            const key = getOptionValue(opt);
            return (
              <ComboboxChip key={String(key)}>
                <div className="flex items-center gap-1.5">
                  {getDisplayValue(opt)}
                </div>
              </ComboboxChip>
            );
          })}

          {remainingCount > 0 && (
            <span
              className="text-muted-foreground text-sm px-2 cursor-pointer whitespace-nowrap"
              onClick={() => setOpen(true)}
            >
              {t("common.combobox.moreItems", { count: remainingCount })}
            </span>
          )}

          <ComboboxChipsInput
            className="dark:text-foreground"
            placeholder={value.length ? "" : placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ComboboxChips>

        <ComboboxContent anchor={anchor} className={contentClassName}>
          {loading && (
            <ComboboxEmpty>
              {t("common.combobox.loading")}
            </ComboboxEmpty>
          )}
          {(!isAsync && groups?.length === 0) || (isAsync && finalOptions.length === 0)  && (
            <ComboboxEmpty>
              {t("common.combobox.noResults")}
            </ComboboxEmpty>
          )}

          <ComboboxList>
            {groups && !isAsync ? (
              groups.map((group, idx) => (
                <ComboboxGroup
                  key={typeof group.label === "string" ? group.label : idx}
                >
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  {group.options.map((opt, i) => {
                    const key = getOptionValue(typeof opt === "object" && opt !== null && "value" in opt ? (opt as any).value : opt);
                    return (
                      <ComboboxItem key={i} value={key}>
                        {getOptionLabel(typeof opt === "object" && opt !== null && "value" in opt ? (opt as any).value : opt)}
                      </ComboboxItem>
                    );
                  })}
                  {idx < groups.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))
            ) : (
              finalOptions.map((opt, i) => {
                const key = getOptionValue(typeof opt === "object" && opt !== null && "value" in opt ? (opt as any).value : opt);
                return (
                  <ComboboxItem key={i} value={key}>
                    {getOptionLabel(typeof opt === "object" && opt !== null && "value" in opt ? (opt as any).value : opt)}
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
