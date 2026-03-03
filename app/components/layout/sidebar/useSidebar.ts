import {
  CalendarClockIcon,
  FileOutputIcon,
  FolderOpenIcon,
  GaugeIcon,
  LayoutTemplateIcon,
  SettingsIcon,
  ShieldUserIcon,
  UsersIcon,
  type IconType
} from "@/icons";

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
    title: "dashboard.title", items: [
      { title: "dashboard.items.dashboard", path: "/dashboard", icon: GaugeIcon },
    ]
  },
  {
    title: "users.title", items: [
      { title: "users.items.userList", path: "/users", icon: UsersIcon },
    ]
  },
  {
    title: "events.title", items: [
      { title: "events.items.categoryList", path: "/event-categories", icon: FolderOpenIcon },
      { title: "events.items.eventList", path: "/events", icon: CalendarClockIcon },
      { title: "events.items.eventTemplates", path: "/event-templates", icon: LayoutTemplateIcon, isDisabled: true },
    ]
  },
  {
    title: "systems.title", items: [
      { title: "systems.items.dataTransfer", path: "/data-transfer", icon: FileOutputIcon, isDisabled: true },
      { title: "systems.items.roleManagement", path: "/roles", icon: ShieldUserIcon },
      { title: "systems.items.systemConfig", path: "/settings", icon: SettingsIcon },
    ]
  },
];
