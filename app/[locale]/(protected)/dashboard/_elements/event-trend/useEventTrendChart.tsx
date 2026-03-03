import { useTranslations } from "next-intl";
import { useState } from "react";

const mockChart = Object.freeze({
  day: [
    { date: "00:00", count: 12 },
    { date: "04:00", count: 18 },
    { date: "08:00", count: 45 },
    { date: "12:00", count: 67 },
    { date: "16:00", count: 89 },
    { date: "20:00", count: 34 },
    { date: "23:59", count: 21 },
  ],
  week: [
    { date: "Mon", count: 120 },
    { date: "Tue", count: 145 },
    { date: "Wed", count: 180 },
    { date: "Thu", count: 210 },
    { date: "Fri", count: 195 },
    { date: "Sat", count: 85 },
    { date: "Sun", count: 60 },
  ],
  month: [
    { date: "01", count: 320 },
    { date: "05", count: 450 },
    { date: "10", count: 680 },
    { date: "15", count: 920 },
    { date: "20", count: 1100 },
    { date: "25", count: 980 },
    { date: "30", count: 750 },
  ],
  year: [
    { date: "Jan", count: 4200 },
    { date: "Feb", count: 3800 },
    { date: "Mar", count: 5100 },
    { date: "Apr", count: 6200 },
    { date: "May", count: 5800 },
    { date: "Jun", count: 4900 },
    { date: "Jul", count: 7200 },
    { date: "Aug", count: 6500 },
    { date: "Sep", count: 5300 },
    { date: "Oct", count: 4800 },
    { date: "Nov", count: 4100 },
    { date: "Dec", count: 3900 },
  ],
});

export enum PeriodValues {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const useEventTrendChart = () => {
  const t = useTranslations("dashboard.eventTrends");
  const [period, setPeriod] = useState<PeriodValues>(PeriodValues.MONTH);

  const periodOptions = [
    { label: t("period.day"), value: "day" },
    { label: t("period.week"), value: "week" },
    { label: t("period.month"), value: "month" },
    { label: t("period.year"), value: "year" },
  ];
  return {
    isLoading: false,
    chartData: mockChart?.[period],
    periodOptions,
    period,
    onPeriodChange: setPeriod,
  }
}
