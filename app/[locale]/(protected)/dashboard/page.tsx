"use client";
import { useTranslations } from "next-intl";
import { EventTrendChart } from "./_elements/event-trend/EventTrendChart";
import { InvitationMetrics } from "./_elements/invitation/InvitationMetrics";
import { PendingUsersList } from "./_elements/pending-list/PendingUsersList";
import { QuickActions } from "./_elements/quick-actions/QuickActions";
import { DashboardStats } from "./_elements/stats/DashboardStats";
import { UpcomingEventsList } from "./_elements/up-comming-event/UpcomingEventsList";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-8 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-foreground">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("overview")}</p>
          </div>
          <QuickActions />
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <EventTrendChart />
          </div>
          <InvitationMetrics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PendingUsersList />
          <UpcomingEventsList />
        </div>
      </div>
    </div>
  );
}
