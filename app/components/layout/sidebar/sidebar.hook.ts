import { LayoutDashboardIcon, UsersIcon } from "lucide-react";
import { IconType } from "react-icons";
import { LuCalendarClock, LuClipboardPen, LuFolderOpen } from "react-icons/lu";

export interface PageInfo {
  title: string;
  path: string;
  icon: IconType;
  isDisabled?: boolean;
}
export interface SidebarGroupInfo {
  title: string;
  items: PageInfo[];
}

export const SIDEBAR_GROUPS: SidebarGroupInfo[] = [
  {
    title: "Dashboard", items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
    ]
  },
  {
    title: "Users", items: [
      { title: "User List", path: "/users", icon: UsersIcon },
    ]
  },
  {
    title: "Event Management", items: [
      { title: "Event Category", path: "/event-categories", icon: LuFolderOpen, isDisabled: true },
      { title: "Event List", path: "/events", icon: LuCalendarClock },
      { title: "Card List", path: "/invitation-cards", icon: LuClipboardPen },
    ]
  }
];
