import { Skeleton } from "@/app/components/skeleton";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/types/search-result";
import React from "react";
import { TableBody, TableCell, TableRow } from "../../DefaultTable";
import { Column } from "../DataList";

interface BodyDataListProps<T> {
  columns: readonly Column<T>[];
  data: SearchResult<T>;
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey?: keyof T | ((item: T) => string);
  onRowClick?: (item: T) => void;
}

function BodyDataListInner<T extends { id?: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage,
  rowKey = "id" as keyof T,
  onRowClick,
}: BodyDataListProps<T>) {
  const { items, count, totalCount } = data;

  const getRowKey = (item: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(item);
    return String(item[rowKey] ?? index);
  };

  if (isLoading) {
    return (
      <TableBody>
        {Array.from({ length: count || 4 }, (_, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell key={String(col.key)} className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    )
  }

  if (totalCount === 0) {
    return (
      <TableBody>
        <TableRow className="hover:bg-inherit">
          <TableCell colSpan={columns.length} className="h-25 text-center">
            <div className="py-11.75 text-muted-foreground font-medium">{emptyMessage || "No results found"}</div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {items.map((item, index) => (
        <TableRow
          key={getRowKey(item, index)}
          className={cn(
            "hover:bg-muted/50 transition-colors cursor-pointer",
            onRowClick && "hover:bg-accent/30"
          )}
          onClick={() => onRowClick?.(item)}
        >
          {columns.map((col) => {
            const value = col.key.includes(".")
              ? col.key.split(".").reduce((o, k) => (o as any)?.[k], item)
              : item[col.key as keyof T];

            return (
              <TableCell key={col.key} className={cn("whitespace-nowrap", col.className)}>
                <div className={
                  cn("flex items-center min-h-10",
                    col.align === "center" && "justify-center",
                    col.align === "right" && "justify-end",
                    col.align === "left" && "justify-start"
                  )
                }>
                  {col.render ? col.render(value, item) : String(value ?? "-")}
                </div>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}

export const BodyDataList = React.memo(BodyDataListInner) as typeof BodyDataListInner;
