"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "@/app/components/icons";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./default.table";

import { IconButton, Select } from "@/app/components";

export interface SearchResult<T> {
  items: T[];
  count: number;
  totalCount: number;
  totalPage: number;
  page: number;
  pageSize: number;
}

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, item: T) => ReactNode;
  className?: string;
}

export interface DataListProps<T> {
  data: SearchResult<T>;
  columns: readonly Column<T>[];
  actions?: ReactNode;
  emptyMessage?: string;
  rowKey?: keyof T | ((item: T) => string);
  onRowClick?: (item: T) => void;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

export function DataList<T extends { id?: string | number }>({
  data,
  columns,
  actions,
  emptyMessage = "No data available",
  rowKey = "id" as keyof T,
  onRowClick,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: DataListProps<T>) {
  const { items, count, totalCount, totalPage } = data;

  const getRowKey = (item: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(item);
    return String(item[rowKey as keyof T] ?? index);
  };

  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <div className="text-lg font-medium">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {actions && (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
          <div className="flex-1 min-w-0" />
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={String(col.key)}
                    className={cn("bg-muted/50 whitespace-nowrap", col.className)}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
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
                        <div className="flex items-center min-h-10">
                          {col.render ? col.render(value, item) : String(value ?? "-")}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
        <div>
          Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
          <span className="font-medium">{(page - 1) * pageSize + count}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Rows per page:</span>
            <Select
              className="w-20 h-8"
              value={String(pageSize)}
              onValueChange={(val) => onPageSizeChange(Number(val))}
              options={[
                { label: "5", value: "5" },
                { label: "10", value: "10" },
                { label: "20", value: "20" },
                { label: "50", value: "50" },
                { label: "100", value: "100" },
              ]}
            />
          </div>

          <div className="flex items-center gap-1">
            <IconButton
              variant="outline"
              className="h-8 w-8"
              icon={<ChevronsLeftIcon size={14} />}
              disabled={page === 1}
              onClick={() => onPageChange(1)}
              tooltip="First page"
            />
            <IconButton
              variant="outline"
              className="h-8 w-8"
              icon={<ChevronLeftIcon size={14} />}
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              tooltip="Previous page"
            />

            <span className="px-4 font-medium whitespace-nowrap min-w-25 text-center">
              Page {page} of {totalPage}
            </span>

            <IconButton
              variant="outline"
              className="h-8 w-8"
              icon={<ChevronRightIcon size={14} />}
              disabled={page === totalPage}
              onClick={() => onPageChange(page + 1)}
              tooltip="Next page"
            />
            <IconButton
              variant="outline"
              className="h-8 w-8"
              icon={<ChevronsRightIcon size={14} />}
              disabled={page === totalPage}
              onClick={() => onPageChange(totalPage)}
              tooltip="Last page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
