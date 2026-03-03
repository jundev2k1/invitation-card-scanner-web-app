import { api, baseQuery, mapToUrlSearchParams } from "@/lib/api-client";
import { GeneralStatsDto } from "@/types";
import { GetGeneralStatsRequest } from "./analysis.type";

export const analysisService = {
  getGeneralStats: (props: GetGeneralStatsRequest) => {
    const req = mapToUrlSearchParams(props);
    return baseQuery(api.get<GeneralStatsDto>('/backoffice/analysis/general', { params: req }));
  }
};
