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
import { useFormContext } from "react-hook-form";

type Option = string | { value: string; label: string };

interface OptionGroup {
  label: string;
  options: Option[];
}

interface FormMultiComboboxProps {
  name: string;
  label?: string;
  placeholder?: string;
  groups?: OptionGroup[];
  options?: Option[];
  fetchOptions?: (query: string) => Promise<Option[]>;
  debounceMs?: number;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  getOptionLabel?: (option: Option) => string;
  getOptionValue?: (option: Option) => string;
}

export function FormMultiCombobox({
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
  getOptionLabel = (opt) => (typeof opt === "string" ? opt : opt.label),
  getOptionValue = (opt) => (typeof opt === "string" ? opt : opt.value),
}: FormMultiComboboxProps) {
  const t = useTranslations();
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const selectedValues = (watch(name) as string[]) ?? [];
  const error = errors[name]?.message as string | undefined;

  register(name, {
    required: isRequired ? t("common.combobox.requiredMulti") : false,
  });

  const anchor = useComboboxAnchor();

  const [query, setQuery] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <Label className={cn(error && "text-destructive", disabled && "opacity-70")}>
          {label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <Combobox
        multiple
        items={itemValues}
        value={selectedValues}
        onValueChange={(newValues: string[]) => setValue(name, newValues, { shouldValidate: true })}
        disabled={disabled}
      >
        <ComboboxChips
          ref={anchor}
          className={cn("w-full", className, error && "border-destructive focus-within:ring-destructive/30")}
        >
          <ComboboxValue>
            {(values: string[]) =>
              values.map((val) => {
                const opt = finalOptions.find((o) => getOptionValue(o) === val);
                return opt ? <ComboboxChip key={val}>{getOptionLabel(opt)}</ComboboxChip> : null;
              })
            }
          </ComboboxValue>
          <ComboboxChipsInput
            placeholder={selectedValues.length ? "" : placeholder}
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
                    const selected = selectedValues.includes(val);
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
                const selected = selectedValues.includes(val);
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
