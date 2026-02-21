"use client";

import { SearchResult } from "@/types/search-result";
import { ReactNode } from "react";
import {
  Table
} from "../DefaultTable";
import { BodyDataList } from "./elements/BodyDataList";
import { FooterDataList } from "./elements/FooterDataList";
import { HeaderDataList } from "./elements/HeaderDataList";

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: any, item: T) => ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}

export interface DataListProps<T> {
  data: SearchResult<T>;
  columns: readonly Column<T>[];
  actions?: ReactNode;
  isLoading?: boolean;
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
  isLoading = false,
  emptyMessage,
  rowKey,
  onRowClick,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange
}: DataListProps<T>) {

  return (
    <div className="space-y-6">
      {actions && (
        <div className="flex items-center justify-end gap-3 pb-2">
          {actions}
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <HeaderDataList columns={columns} />
            <BodyDataList
              columns={columns}
              data={data}
              emptyMessage={emptyMessage}
              rowKey={rowKey}
              onRowClick={onRowClick}
              isLoading={isLoading}
            />
          </Table>
        </div>
      </div>

      <FooterDataList
        count={data.items.length}
        totalCount={data.totalCount}
        totalPage={data.totalPage}
        page={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
