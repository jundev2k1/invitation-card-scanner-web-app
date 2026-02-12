import { userService } from "@/services";
import { UserStatus } from "@/types/enum/user-status.enum";
import { useEffect, useState } from "react";

export const useApproveList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<number>(0);
  const [unApprovedCount, setUnApprovedCount] = useState<number>(0);

  const onRefresh = () => {
    setIsRefresh(isRefresh + 1);
  }

  const onApprove = async (id: string) => {
    console.log(id);
    onRefresh();
  }

  useEffect(() => {
    setIsLoading(true);
    userService.getStatusStats().then(res => {
      const count = res.data
        ? res.data[UserStatus.WAITING_FOR_APPROVE] ?? 0
        : 0;
      setUnApprovedCount(count);
      setIsLoading(false);
    })
  }, [isRefresh]);

  return {
    unApprovedCount,
    onRefresh,
    isOpen,
    setIsOpen,
    isLoading,
    onApprove
  };
}
