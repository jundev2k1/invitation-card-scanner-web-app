"use client";
import { TabItem } from "@/components";
import { useGetGeneralStats } from "@/services";
import { endOfDay, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

export type PeriodValues = "day" | "week" | "month" | "year";

const getDateRange = (period: PeriodValues) => {
  const now = new Date();
  switch (period) {
    case "day":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "week":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "month":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "year":
      return { start: startOfYear(now), end: endOfYear(now) };
  }
}

export const useDashboard = () => {
  const t = useTranslations("dashboard.eventTrends");
  const [period, setPeriod] = useState<PeriodValues>('month');

  const { start, end } = useMemo(() => getDateRange(period), [period]);
  const { isLoading, data } = useGetGeneralStats({ startDate: start, endDate: end });

  const onPeriodChange = useCallback((val: PeriodValues) => setPeriod(val), [period]);

  const periodOptions: TabItem[] = [
    { label: t("period.day"), value: "day" },
    { label: t("period.week"), value: "week" },
    { label: t("period.month"), value: "month" },
    { label: t("period.year"), value: "year" },
  ];
  return {
    isLoading,
    data: data?.data,
    period,
    onPeriodChange,
    periodOptions,
  }
}
