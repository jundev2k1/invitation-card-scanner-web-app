import {
  BadgeButton,
  DataList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  TextBox
} from "@/app/components";
import { ClipboardPenIcon } from "@/app/components/icons";
import { useTranslations } from "next-intl";
import { useApproveList } from "./useApproveList";

type ApproveListProps = {
  onPageRefresh?: () => void,
  tooltip?: string
}

export function ApproveList({ onPageRefresh, tooltip }: ApproveListProps) {
  const {
    columns,
    unApprovedCount,
    isOpen,
    setIsOpen,
    onClose,
    isLoading,
    data,
    filter,
    keyword,
    setKeyword,
    onPageChange,
    onPageSizeChange
  } = useApproveList({ onPageRefresh });
  const t = useTranslations();
  return (
    <>
      <BadgeButton
        count={unApprovedCount}
        label={<ClipboardPenIcon />}
        className="dark:text-muted-foreground"
        variant="outline"
        onClick={() => setIsOpen(true)}
        tooltip={tooltip}
      />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b text-foreground">
            <DialogTitle className="text-xl font-semibold text-accent-foreground">
              {t("user.approveList.title")}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="px-6 pt-2 pb-6 max-h-[calc(90vh-90px)] overflow-y-auto">
            <div className="mb-3">
              <TextBox
                value={keyword}
                placeholder={t('user.approveList.filter.search.placeholder')}
                className="w-75"
                onChange={(e) => setKeyword(e.currentTarget.value)}
              />
            </div>
            <DataList
              data={data}
              columns={columns}
              isLoading={isLoading}
              page={filter.page}
              onPageChange={onPageChange}
              pageSize={filter.pageSize}
              onPageSizeChange={onPageSizeChange}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
