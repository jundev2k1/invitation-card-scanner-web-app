import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components";
import { EraserIcon, Rows3Icon, SquareDashedMousePointerIcon } from "@/icons";
import { cn } from "@/root/lib/utils";
import { useTranslations } from "next-intl";

interface PreviewContextProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  isSelected: boolean;
  isCellSelecting?: boolean;
  isShowSelectWithAutoScale?: boolean;
  onSelectionChangeWithAutoScale?: () => void;
  onSelectionChange?: () => void;
  onClearSelection?: () => void;
}

export const PreviewContext = ({
  children,
  className,
  interactive = false,
  isSelected,
  isCellSelecting = false,
  isShowSelectWithAutoScale = false,
  onSelectionChangeWithAutoScale,
  onSelectionChange,
  onClearSelection,
}: PreviewContextProps) => {
  const tContext = useTranslations('dataTransfer.import.range.previewContext');
  return (
    interactive ? (
      <ContextMenu>
        <ContextMenuTrigger className={cn("excel-wrapper grow border rounded-md shadow-sm bg-background overflow-hidden", className)}>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem disabled={!isShowSelectWithAutoScale} onClick={onSelectionChangeWithAutoScale}>
              <Rows3Icon className="mr-1" /> {tContext('applyWithAutoScale')}
            </ContextMenuItem>

            <ContextMenuItem disabled={!isCellSelecting} onClick={onSelectionChange}>
              <SquareDashedMousePointerIcon className="mr-1" /> {tContext('applySelection')}
            </ContextMenuItem>

            <ContextMenuItem disabled={!isSelected} onClick={onClearSelection}>
              <EraserIcon className="mr-1" /> {tContext('clearSelection')}
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    ) : (
      <div className={cn("excel-wrapper grow border rounded-md shadow-sm bg-background overflow-hidden", className)}>
        {children}
      </div>
    )
  );
}