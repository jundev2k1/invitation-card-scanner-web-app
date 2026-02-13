import { IconButton } from "@/app/components/button";
import { Select } from "@/app/components/select";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from "../../../icons";

const pageSizeOptions = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

interface FooterDataListProps {
  count: number;
  totalCount: number;
  totalPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
  onPageSizeChange: (newSize: number) => void;
}

export const FooterDataList = React.memo(({
  count,
  totalCount,
  totalPage,
  page,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: FooterDataListProps) => {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
      <div>
        Showing <span className="font-medium">{totalCount !== 0 ? ((page - 1) * pageSize + 1) : 0}</span> to{" "}
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
            options={pageSizeOptions}
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
  );
});
