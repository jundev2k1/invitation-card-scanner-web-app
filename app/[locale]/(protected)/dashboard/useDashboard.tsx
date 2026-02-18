"use client";
import { useSidebarStore } from "@/store";
import { useEffect, useState } from "react";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentPage, setCurrentPage } = useSidebarStore();

  useEffect(() => {
    if (currentPage != "dashboard.title") {
      setCurrentPage("dashboard.title");
    }
  }, []);

  return {
    isLoading
  }
}
