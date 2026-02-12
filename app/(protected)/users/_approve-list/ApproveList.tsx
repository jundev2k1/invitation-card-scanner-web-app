import { BadgeButton, Button, DataList, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, IconButton, SkeletonTable, TruncatedText } from "@/app/components";
import { CheckIcon, ClipboardPenIcon, EyeIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { useApproveList } from "./useApproveList";

const getColumns = (handleApprove: (id: string) => void) => [
  {
    key: "id",
    label: "ID",
    className: "w-32 font-mono text-muted-foreground",
    render: (_: any, item: UserSearchItemDto) => <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
  },
  {
    key: "info",
    label: "Information",
    render: (_: any, item: UserSearchItemDto) => (
      <div className="space-y-1">
        <div className="font-medium">
          {item.nickname || item.username}
        </div>
        <div className="text-sm text-muted-foreground">
          {item.email}
        </div>
        <div className="text-xs text-muted-foreground">
          Created At: {new Date(item.createdAt).toLocaleDateString("vi-VN")}
        </div>
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    className: "w-48 text-right",
    render: (_: any, item: UserSearchItemDto) => (
      <div className="flex gap-2 justify-end">
        <IconButton
          icon={<EyeIcon />}
          variant="outline"
          size="sm"
          onClick={() => RouteUtil.redirectToUserDetail(item.id)}
        />
        <Button
          variant="default"
          leftIcon={<CheckIcon />}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleApprove(item.id);
          }}
        >
          Approve
        </Button>
      </div>
    ),
  },
];

export function ApproveList() {
  const {
    unApprovedCount,
    isOpen,
    setIsOpen,
    isLoading,
    onApprove,
    data,
    filter,
    onPageChange,
    onPageSizeChange
  } = useApproveList();
  const columns = getColumns(onApprove);
  return (
    <>
      <BadgeButton
        count={unApprovedCount}
        label={<ClipboardPenIcon />}
        className="dark:text-muted-foreground"
        variant="outline"
        onClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b text-foreground">
            <DialogTitle className="text-xl font-semibold text-accent-foreground">
              Approve list
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="p-6 h-[80vh] overflow-y-auto">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <DataList
                data={data}
                columns={columns}
                page={filter.page}
                onPageChange={onPageChange}
                pageSize={filter.pageSize}
                onPageSizeChange={onPageSizeChange}
              />
            )}
          </DialogDescription>

        </DialogContent>
      </Dialog>
    </>
  );
};
