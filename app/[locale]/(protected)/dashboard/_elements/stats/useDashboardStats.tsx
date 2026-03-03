import { useGetGeneralStats } from "@/services";

interface useDashboardStatsProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export const useDashboardStats = ({ startDate, endDate }: useDashboardStatsProps) => {
  const { isLoading, data } = useGetGeneralStats({ startDate, endDate });
  return {
    isLoading: isLoading,
    stats: data?.data
  };
}
