import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean;
  toggleSidebar: (onShow: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  toggleSidebar: (onShow: boolean) => set({ isCollapsed: onShow }),
  currentPage: "",
  setCurrentPage: (page: string) => set({ currentPage: page }),
}));
