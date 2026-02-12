import { BadgeButton, Button, DataList, Dialog, DialogContent, DialogHeader, DialogTitle, IconButton } from "@/app/components";
import { CheckIcon, ClipboardPenIcon, EyeIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { defaultSearchResult } from "@/types/search-result";
import { useApproveList } from "./useApproveList";

const getColumns = (handleApprove: (id: string) => void) => [
  {
    key: "id",
    label: "ID",
    className: "w-32 font-mono text-muted-foreground",
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
    onApprove
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
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b text-foreground">
            <DialogTitle className="text-xl font-semibold text-accent-foreground">
              Approve list
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading ...
              </div>
            ) : (
              <DataList
                data={defaultSearchResult}
                columns={columns}
                onPageChange={(newPage) => console.log(newPage, defaultSearchResult.page)}
                onPageSizeChange={(newSize) => console.log(newSize, defaultSearchResult.pageSize)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
