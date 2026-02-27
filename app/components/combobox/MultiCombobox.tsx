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
  ComboboxValue,
  useComboboxAnchor,
} from "@/shadcn/combobox";
import { Label } from "@/shadcn/label";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Option<T = string> = T | { value: T; label: string };

interface OptionGroup<T = string> {
  label: string;
  options: Option<T>[];
}

interface AppMultiComboboxProps<T = string> {
  value: T[];
  onValueChange: (value: T[]) => void;
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
  displayCount?: number;
}

export default function AppMultiCombobox<T = string>({
  value = [],
  onValueChange,
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
  getOptionLabel = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "label" in opt
      ? opt.label
      : String(opt),
  getOptionValue = (opt: Option<T>) =>
    typeof opt === "object" && opt !== null && "value" in opt
      ? String(opt.value)
      : String(opt),
  displayCount = 3,
}: AppMultiComboboxProps<T>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const anchor = useComboboxAnchor();

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
  const itemValues = finalOptions.map(getOptionValue);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label>{label}</Label>}

      <Combobox
        multiple
        items={itemValues}
        value={value.map((v) => getOptionValue(v as any))}
        onValueChange={(newStrValues: string[]) => {
          const newValues = newStrValues.map((str) => str as T);
          onValueChange(newValues);
        }}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxChips ref={anchor} className={cn("w-full", className)}>
          <ComboboxValue>
            {(values: string[]) => {
              const visible = values.slice(0, displayCount);
              const remaining = values.length - displayCount;
              return (
                <>
                  {visible.map((val) => {
                    const opt = finalOptions.find((o) => getOptionValue(o) === val);
                    return opt ? <ComboboxChip className="bg-gray-200 dark:bg-gray-700" key={val}>{getOptionLabel(opt)}</ComboboxChip> : null;
                  })}
                  {remaining > 0 && (
                    <span className="text-muted-foreground text-sm px-2 text-nowrap" onClick={() => setOpen(true)}>
                      {t('common.combobox.moreItems', { count: remaining })}
                    </span>
                  )}
                </>
              )
            }}
          </ComboboxValue>
          <ComboboxChipsInput
            className="dark:text-foreground"
            placeholder={value.length ? "" : placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </ComboboxChips>

        <ComboboxContent anchor={anchor} className={contentClassName}>
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
