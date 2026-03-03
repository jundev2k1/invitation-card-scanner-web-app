"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
} from "@/components";
import { useTranslations } from "next-intl";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PeriodValues, useEventTrendChart } from "./useEventTrendChart";

export const EventTrendChart = React.memo(() => {
  const t = useTranslations();
  const {
    chartData,
    isLoading,
    periodOptions,
    period,
    onPeriodChange,
  } = useEventTrendChart();

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("dashboard.eventTrends.title")}</CardTitle>
          <CardDescription>{t("dashboard.eventTrends.description")}</CardDescription>
        </div>
        <Tabs
          listClassName="grid-cols-4"
          defaultValue={period}
          items={periodOptions}
          onChange={(val) => onPeriodChange(val as PeriodValues)}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-75 flex items-center justify-center">{t('common.placeholder.loading')}</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
});
