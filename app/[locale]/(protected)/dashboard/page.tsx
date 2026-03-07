"use client";
import { RefreshButton, Tabs } from "@/components";
import { useTranslations } from "next-intl";
import { EventTrendChart } from "./_elements/event-trend/EventTrendChart";
import { PendingUsersList } from "./_elements/pending-list/PendingUsersList";
import { QuickActions } from "./_elements/quick-actions/QuickActions";
import { QuickOverviewCard } from "./_elements/quick-overview-card/QuickOverviewCard";
import { DashboardStats } from "./_elements/stats/DashboardStats";
import { UpcomingEventsList } from "./_elements/up-comming-event/UpcomingEventsList";
import { PeriodValues, useDashboard } from "./useDashboard";

export default function DashboardPage() {
  const tDashboard = useTranslations("dashboard");
  const {
    isLoading,
    data,
    period,
    periodOptions,
    onPeriodChange,
    onRefresh,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-2 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-foreground">
              {tDashboard("title")}
            </h1>
            <p className="text-muted-foreground">{tDashboard("overview")}</p>
          </div>
          <QuickActions />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <RefreshButton onRefresh={onRefresh} />
          <Tabs
            listClassName="grid-cols-4"
            defaultValue={period}
            items={periodOptions}
            onChange={(val) => onPeriodChange(val as PeriodValues)}
          />
        </div>
        <DashboardStats isLoading={isLoading} stats={data} period={period} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
          <div className="xl:col-span-2">
            <EventTrendChart key={period} />
          </div>
          <UpcomingEventsList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <PendingUsersList />
          <QuickOverviewCard stats={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
