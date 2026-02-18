import {
  CalendarClockIcon,
  ClipboardPenIcon,
  FolderOpenIcon,
  LayoutDashboardIcon,
  UsersIcon, type IconType
} from "@/app/components/icons";

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
    title: "common.sidebar.dashboard.title", items: [
      { title: "common.sidebar.dashboard.items.dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
    ]
  },
  {
    title: "common.sidebar.users.title", items: [
      { title: "common.sidebar.users.items.userList", path: "/users", icon: UsersIcon },
    ]
  },
  {
    title: "common.sidebar.events.title", items: [
      { title: "common.sidebar.events.items.categoryList", path: "/event-categories", icon: FolderOpenIcon, isDisabled: true },
      { title: "common.sidebar.events.items.eventList", path: "/events", icon: CalendarClockIcon },
      { title: "common.sidebar.events.items.cardList", path: "/invitation-cards", icon: ClipboardPenIcon },
    ]
  }
];
