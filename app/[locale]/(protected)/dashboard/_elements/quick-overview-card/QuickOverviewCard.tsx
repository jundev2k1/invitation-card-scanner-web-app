"use client";
import { Card, CardContent, CardHeader, CardTitle, CounterUp, Skeleton } from "@/components";
import { CalendarClockIcon, ClockIcon, CreditCardIcon, UsersIcon } from "@/icons";
import { GeneralStatsDto } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";

interface QuickOverviewCardProps {
  isLoading: boolean;
  stats: GeneralStatsDto | null | undefined;
}

export const QuickOverviewCard = React.memo(({ isLoading, stats }: QuickOverviewCardProps) => {
  const t = useTranslations("dashboard.quickOverview");

  if (isLoading || !stats) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const userActiveRate = stats.totalUsers > 0
    ? Math.round((stats.activeUsers / stats.totalUsers) * 100)
    : 0;

  const cardUsedRate = stats.totalCards > 0
    ? Math.round((stats.totalUsedCards / stats.totalCards) * 100)
    : 0;

  const pendingRate = stats.totalUsers > 0
    ? Math.round((stats.unapprovedUsers / stats.totalUsers) * 100)
    : 0;

  const overviewItems = [
    {
      label: t("activeUsers"),
      value: stats.activeUsers,
      subtitle: t("activeUsersSubtitle", { rate: userActiveRate }),
      icon: UsersIcon,
      color: "text-teal-600",
    },
    {
      label: t("pendingApproval"),
      value: stats.unapprovedUsers,
      subtitle: t("pendingApprovalSubtitle", { rate: pendingRate }),
      icon: ClockIcon,
      color: "text-orange-600",
    },
    {
      label: t("usedCards"),
      value: stats.totalUsedCards,
      subtitle: t("usedCardsSubtitle", { rate: cardUsedRate }),
      icon: CreditCardIcon,
      color: "text-purple-600",
    },
    {
      label: t("completedEvents"),
      value: stats.periodCompletedEvents,
      subtitle: t("completedEventsSubtitle"),
      icon: CalendarClockIcon,
      color: "text-green-600",
    },
  ];

  const hasGrowth = stats.userGrowthRate > 0 || stats.eventGrowthRate > 0 || stats.cardGrowthRate > 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {overviewItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center gap-2">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-3xl font-bold">
                <CounterUp value={item.value} duration={1} />
              </p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {hasGrowth && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">{t("growthSummary")}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {stats.userGrowthRate > 0 && (
                <span className="text-emerald-600">
                  {t("usersGrowth")}: +{stats.userGrowthRate}%
                </span>
              )}
              {stats.eventGrowthRate > 0 && (
                <span className="text-emerald-600">
                  {t("eventsGrowth")}: +{stats.eventGrowthRate}%
                </span>
              )}
              {stats.cardGrowthRate > 0 && (
                <span className="text-emerald-600">
                  {t("cardsGrowth")}: +{stats.cardGrowthRate}%
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
