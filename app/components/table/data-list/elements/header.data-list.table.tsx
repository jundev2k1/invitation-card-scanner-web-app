import { cn } from "@/lib/utils";
import React from "react";
import { TableHead, TableHeader, TableRow } from "../../default.table";
import { Column } from "../data-list.table";

type HeaderDataListProps<T> = {
  columns: readonly Column<T>[];
}

function HeaderDataListInner<T>({ columns }: HeaderDataListProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((col) => (
          <TableHead key={String(col.key)} className={cn("bg-muted/50", col.className)}>
            {col.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export const HeaderDataList = React.memo(HeaderDataListInner) as typeof HeaderDataListInner;
