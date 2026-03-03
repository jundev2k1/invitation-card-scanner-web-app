import { useQuery } from "@tanstack/react-query";
import { analysisService } from "./analysis.service";
import { GetGeneralStatsRequest } from "./analysis.type";

const GENERAL_KEYS = {
  all: ["analysis"] as const,
  generalStats: (params: GetGeneralStatsRequest) => [...GENERAL_KEYS.all, "list", params] as const,
  detail: (id: string) => [...GENERAL_KEYS.all, "detail", id] as const,
};

const useGetGeneralStats = (params: GetGeneralStatsRequest) => {
  return useQuery({
    queryKey: GENERAL_KEYS.generalStats(params),
    queryFn: () => analysisService.getGeneralStats(params),
    staleTime: 1000 * 60,
    retry: false
  });
}

export {
  useGetGeneralStats
};

