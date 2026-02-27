"use client";

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
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Option = string | { value: string; label: string };

interface OptionGroup {
  label: string;
  options: Option[];
}

interface AppMultiComboboxProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  groups?: OptionGroup[];
  options?: Option[];
  fetchOptions?: (query: string) => Promise<Option[]>;
  debounceMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: string;
  helperText?: string;
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => string;
}

export default function AppMultiCombobox({
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
  getOptionLabel = (opt) => (typeof opt === "string" ? opt : opt.label),
  getOptionValue = (opt) => (typeof opt === "string" ? opt : opt.value),
}: AppMultiComboboxProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
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
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxChips ref={anchor} className={cn("w-full", className)}>
          <ComboboxValue>
            {(values: string[]) =>
              values.map((val) => {
                const opt = finalOptions.find((o) => getOptionValue(o) === val);
                return opt ? <ComboboxChip key={val}>{getOptionLabel(opt)}</ComboboxChip> : null;
              })
            }
          </ComboboxValue>
          <ComboboxChipsInput
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
                    const selected = value.includes(val);
                    return (
                      <ComboboxItem key={val} value={val}>
                        {getOptionLabel(opt)}
                        {selected && <Check className="ml-auto h-4 w-4" />}
                      </ComboboxItem>
                    );
                  })}
                  {idx < finalGroups.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              ))
            ) : (
              finalOptions.map((opt) => {
                const val = getOptionValue(opt);
                const selected = value.includes(val);
                return (
                  <ComboboxItem key={val} value={val}>
                    {getOptionLabel(opt)}
                    {selected && <Check className="ml-auto h-4 w-4" />}
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
