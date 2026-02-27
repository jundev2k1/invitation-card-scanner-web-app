"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { SearchIcon, XIcon } from "../../icons";

interface SearchInputProps {
  containerClassName?: string;
  className?: string;
  value?: string;
  onTextChange?: (text: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  placeholder?: string;
}

export function SearchTextbox({
  onClear,
  onTextChange,
  containerClassName,
  className,
  value = '',
  placeholder,
  debounceMs = 300
}: SearchInputProps) {
  const [keyword, setKeyword] = useState<string>(value);
  const debouncedKeyword = useDebounce(keyword, debounceMs);

  useEffect(() => {
    setKeyword(value);
  }, [value]);

  useEffect(() => {
    if (debouncedKeyword !== value)
      onTextChange?.(debouncedKeyword);
  }, [debouncedKeyword, onTextChange]);

  const handleClear = () => {
    setKeyword('');
    onClear?.();
  };

  return (
    <div className={cn("relative w-full max-w-sm", containerClassName)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={cn("pl-9 pr-9 focus-visible:ring-2 dark:text-muted-foreground", className)}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
