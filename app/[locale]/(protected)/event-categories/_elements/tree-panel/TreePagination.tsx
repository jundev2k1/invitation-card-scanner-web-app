import { IconButton, Select } from "@/components";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "@/icons";
import { useTranslations } from "next-intl";

const pageSizeOptions = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

type PaginationProps = {
  page: number;
  totalPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const TreePagination = ({
  page,
  totalPage,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  console.log('page', page);
  console.log('totalPage', totalPage);
  const t = useTranslations();
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">{t('common.dataList.footer.rowPerPage')}</span>
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
          tooltip={t('common.dataList.footer.tooltipFirstPage')}
        />
        <IconButton
          variant="outline"
          className="h-8 w-8"
          icon={<ChevronLeftIcon size={14} />}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          tooltip={t('common.dataList.footer.tooltipPrevPage')}
        />

        <span className="px-4 font-medium whitespace-nowrap min-w-25 text-center">
          {t('common.dataList.footer.pagination', { page, totalPage })}
        </span>

        <IconButton
          variant="outline"
          className="h-8 w-8"
          icon={<ChevronRightIcon size={14} />}
          disabled={page === totalPage}
          onClick={() => onPageChange(page + 1)}
          tooltip={t('common.dataList.footer.tooltipNextPage')}
        />
        <IconButton
          variant="outline"
          className="h-8 w-8"
          icon={<ChevronsRightIcon size={14} />}
          disabled={page === totalPage}
          onClick={() => onPageChange(totalPage)}
          tooltip={t('common.dataList.footer.tooltipLastPage')}
        />
      </div>
    </div>
  );
}