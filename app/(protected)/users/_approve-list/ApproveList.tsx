import {
  BadgeButton,
  Button,
  DataList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  IconButton,
  SmartDateTime,
  TextBox,
  TruncatedText
} from "@/app/components";
import { CheckCheckIcon, CheckIcon, ClipboardPenIcon, EyeIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { UserStatus } from "@/types";
import { UserSearchItemDto } from "@/types/dto/user/user-search-item.dto";
import { useApproveList } from "./useApproveList";

const getColumns = (handleApprove: (id: string) => void) => [
  {
    key: "id",
    label: "ID",
    className: "w-32 font-mono text-muted-foreground",
    render: (_: any, item: UserSearchItemDto) =>
      <TruncatedText className="dark:text-muted-foreground" text={item.id} isUUID showCopy />
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
        <div className="text-xs text-muted-foreground flex gap-1 items-center">
          Created at <SmartDateTime className="text-xs" date={item.createdAt} />
        </div>
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    className: "w-48 text-right",
    render: (_: any, item: UserSearchItemDto) => {
      const isApproved = item.status === UserStatus.ACTIVE;
      return (
        <div className="flex gap-2 justify-end">
          <IconButton
            icon={<EyeIcon />}
            variant="outline"
            onClick={() => RouteUtil.redirectToUserDetail(item.id)}
          />
          <Button
            variant={isApproved ? "outline" : "default"}
            leftIcon={isApproved ? <CheckCheckIcon /> : <CheckIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleApprove(item.id);
            }}
            disabled={isApproved}
          >
            Approve
          </Button>
        </div>
      )
    },
  },
];

type ApproveListProps = {
  onPageRefresh?: () => void
}

export function ApproveList({ onPageRefresh }: ApproveListProps) {
  const {
    unApprovedCount,
    isOpen,
    setIsOpen,
    onClose,
    isLoading,
    onApprove,
    data,
    filter,
    keyword,
    setKeyword,
    onPageChange,
    onPageSizeChange
  } = useApproveList({ onPageRefresh });
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

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="px-6 pt-6 pb-4 border-b text-foreground">
            <DialogTitle className="text-xl font-semibold text-accent-foreground">
              Approve list
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="px-6 pt-2 pb-6 max-h-[calc(90vh-90px)] overflow-y-auto">
            <div className="mb-3">
              <TextBox
                value={keyword}
                placeholder="Search with username or email..."
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
