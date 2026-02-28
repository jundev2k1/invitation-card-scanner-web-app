"use client";
import { Button } from "@/components/button";
import {
  CalendarClockIcon,
  LoaderIcon,
  SearchIcon,
  UserCircleIcon,
} from "@/icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shadcn/command";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Kbd } from "../../../kdb";
import { useSearchBar } from "./useSearchBar";

export const SearchBar = React.memo(() => {
  const t = useTranslations();
  const router = useRouter();
  const { open, onOpen, onClose, query, setQuery, isApiLoading, filteredFeatures, apiResults } = useSearchBar();

  const handleNavigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const hasApiResults = isApiLoading || apiResults.length > 0;
  const hasFeatures = filteredFeatures.length > 0;
  const showEmpty = !isApiLoading && !hasApiResults && !hasFeatures && query.trim();
  return (
    <>
      <Button
        className="flex items-center justify-between w-64 px-3 py-1.5 text-sm text-muted-foreground border rounded-md bg-muted/50 hover:bg-muted transition-all"
        leftIcon={
          <div className="flex items-center gap-1">
            <SearchIcon />
            <span>{t('common.placeholder.globalSearch')}</span>
          </div>
        }
        rightIcon={
          <div className="flex items-center gap-1">
            <Kbd>⌘K</Kbd>
            <Kbd>Ctrl+K</Kbd>
          </div>
        }
        onClick={onOpen}
      />

      <CommandDialog open={open} onOpenChange={(o) => !o && onClose()}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('common.globalSearch.placeholder.searchWith')}
            value={query}
            onValueChange={setQuery}
          />

          <CommandList className="max-h-112 overflow-y-auto transition-all duration-300">
            {showEmpty && <CommandEmpty>{t('common.placeholder.noResultsFoundFor', { key: query })}</CommandEmpty>}

            {/* SYSTEM RECORDS */}
            {hasApiResults && (
              <CommandGroup heading={t('common.globalSearch.placeholder.systemRecords')}>
                {isApiLoading ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
                    <span className="text-sm italic">{t('common.globalSearch.placeholder.systemSearching')}</span>
                  </div>
                ) : (
                  <>
                    {apiResults.length === 0 && query.trim() && (
                      <CommandItem disabled className="justify-center opacity-70">
                        {t('common.globalSearch.placeholder.noSystemResultsFound')}
                      </CommandItem>
                    )}

                    {apiResults.map((item) => (
                      <CommandItem
                        key={item.meta.id}
                        onSelect={() => handleNavigate(`/${item.module.toLowerCase()}s/${item.meta.id}`)}
                      >
                        {item.module === "User" ? (
                          <UserCircleIcon className="mr-2 h-4 w-4 text-blue-500" />
                        ) : (
                          <CalendarClockIcon className="mr-2 h-4 w-4 text-green-500" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.meta.name}</span>
                          <span className="text-[10px] opacity-60 uppercase">
                            {item.module}
                            {item.meta.role ? ` • ${item.meta.role}` : ""}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </>
                )}
              </CommandGroup>
            )}

            {hasApiResults && <CommandSeparator className="my-2" />}

            {/* QUICK ACCESS */}
            <CommandGroup heading={t('common.globalSearch.placeholder.quickAccess')}>
              {filteredFeatures.length === 0 ? (
                <CommandItem disabled className="justify-center opacity-70">
                  {t('common.globalSearch.placeholder.noQuickAcessMatches')}
                </CommandItem>
              ) : (
                filteredFeatures.map((f, i) => (
                  <CommandItem key={`${f.name}-${i}`} onSelect={() => handleNavigate(f.href)}>
                    <f.icon className="mr-2 h-4 w-4 opacity-70" />
                    <span>{f.name}</span>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
});
