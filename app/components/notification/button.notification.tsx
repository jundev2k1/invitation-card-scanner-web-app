import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, UserPlus } from "lucide-react";
import { IconButton } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../dropdown";
import { BellIcon } from "../icons";
import { NotificationItem } from "./item.notification";

export const ButtonNotification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors outline-none"
          aria-label="Notifications"
        >
          <IconButton icon={
            <>
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center border-2 border-background">
                2
              </span>
            </>
          } />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center px-4 py-3">
          <span>Notification</span>
          <span className="text-xs font-normal text-muted-foreground cursor-pointer hover:underline">
            Mark all as read
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-87.5">
          <NotificationItem
            icon={<UserPlus />}
            title="New user"
            desc="Nguyễn Văn A registered."
            time="2 minute ago"
          />
          <NotificationItem
            icon={<Check />}
            title="System updates"
            desc="System updates have been applied."
            time="Yesterday"
            isUnread
          />
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full justify-center text-primary font-medium cursor-pointer p-3">
          View all
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
