"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { ReactNode } from "react";

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
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

export function DataList<T extends { id?: string | number }>({
  data,
  columns,
  actions,
  emptyMessage = "No data available",
  rowKey = "id" as keyof T,
  onRowClick,
  onPageChange,
  onPageSizeChange,
}: DataListProps<T>) {
  const { items, count, totalCount, totalPage, page, pageSize } = data;

  const getRowKey = (item: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(item);
    return String(item[rowKey as keyof T] ?? index);
  };

  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground dark:text-muted-foreground">
        <p className="text-lg font-medium">{emptyMessage}</p>
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
                        {col.render ? col.render(value, item) : String(value ?? "-")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
        {/* Range info */}
        <div>
          Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
          <span className="font-medium">{(page - 1) * pageSize + count}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results
        </div>

        <div className="flex items-center gap-4">
          {/* Page size */}
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => onPageSizeChange(Number(val))}
            >
              <SelectTrigger className="w-17.5 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === 1}
              onClick={() => onPageChange(1)}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <span className="px-4 font-medium">
              Page {page} of {totalPage}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === totalPage}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === totalPage}
              onClick={() => onPageChange(totalPage)}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
