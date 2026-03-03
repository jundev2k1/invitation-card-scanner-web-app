"use client";

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components";
import { CalendarClockIcon, ClockIcon, CreditCardIcon, UsersIcon } from "@/icons";
import { GeneralStatsDto } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import { PeriodValues } from "../../useDashboard";

interface DashboardStatsProps {
  isLoading: boolean;
  stats: GeneralStatsDto | null | undefined;
  period: PeriodValues;
}

export const DashboardStats = React.memo(({ isLoading, stats, period }: DashboardStatsProps) => {
  const t = useTranslations("dashboard");
  const tStats = useTranslations("dashboard.stats");

  const items = [
    {
      title: tStats("totalUsers"),
      value: isLoading ? "..." : stats?.totalUsers ?? 0,
      subtitle: stats
        ? `${stats.activeUsers ?? 0} active / ${stats.unapprovedUsers ?? 0} pending`
        : "",
      icon: UsersIcon,
      change: stats?.userGrowthRate ? `+${stats.userGrowthRate}%` : "+0%",
    },
    {
      title: tStats("pendingUsers"),
      value: isLoading ? "..." : stats?.unapprovedUsers ?? 0,
      subtitle: stats?.totalUsers
        ? tStats("percentOfTotalUsers", {
          percent: Math.round((stats.unapprovedUsers / stats.totalUsers) * 100),
        })
        : "",
      icon: ClockIcon,
      change: stats?.newUsersInPeriod ? `+${stats.newUsersInPeriod}` : "+0",
    },
    {
      title: tStats("totalEvents"),
      value: isLoading ? "..." : stats?.totalEvents ?? 0,
      subtitle: stats
        ? `${stats.periodPublishedEvents ?? 0} ${t('enum.status.published')} / ${stats.periodCompletedEvents ?? 0} ${t('enum.status.completed')}`
        : "",
      icon: CalendarClockIcon,
      change: stats?.eventGrowthRate ? `+${stats.eventGrowthRate}%` : "+0%",
    },
    {
      title: tStats("totalInvitations"),
      value: isLoading ? "..." : stats?.totalCards ?? 0,
      subtitle: stats?.totalCards
        ? tStats("percentOfTotalCards", {
          percent: Math.round((stats.totalUsedCards / stats.totalCards) * 100),
        })
        : "",
      icon: CreditCardIcon,
      change: stats?.cardGrowthRate ? `+${stats.cardGrowthRate}%` : "+0%",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{item.value}</div>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                )}
                <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                  {item.change}
                  <span className="text-muted-foreground">
                    {tStats("vs_last_period", { period: t(`enum.period.${period}`) })}
                  </span>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
