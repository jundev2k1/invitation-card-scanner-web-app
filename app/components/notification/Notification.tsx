import { IconButton } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/dropdown";
import { BellIcon, CheckIcon, UserPlusIcon } from "@/icons";
import { ScrollArea } from "@/shadcn/scroll-area";
import { useTranslations } from "next-intl";
import { NotificationItem } from "./NotificationItem";

export const Notification = () => {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors outline-none"
          icon={
            <>
              <BellIcon />
              <span className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center border-2 border-background select-none">
                2
              </span>
            </>
          }
          aria-label="Notifications"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center px-4 py-3">
          <span>{t('common.notification.title')}</span>
          <span className="text-xs font-normal text-muted-foreground cursor-pointer hover:underline">
            {t('common.notification.markAllAsRead')}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-87.5">
          <NotificationItem
            icon={<UserPlusIcon />}
            title="New user"
            desc="Nguyễn Văn A registered."
            time="2 minute ago"
          />
          <NotificationItem
            icon={<CheckIcon />}
            title="System updates"
            desc="System updates have been applied."
            time="Yesterday"
            isUnread
          />
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full justify-center text-primary font-medium cursor-pointer p-3">
          {t('common.notification.viewAll')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
