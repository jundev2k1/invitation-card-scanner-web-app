"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components";
import { Calendar, Clock, Mail, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDashboardStats } from "./useDashboardStats";

export function DashboardStats() {
  const t = useTranslations("dashboard.stats");
  const { stats, isLoading } = useDashboardStats();

  const items = [
    {
      title: t("totalUsers"),
      value: isLoading ? "..." : stats?.totalUsers ?? 0,
      icon: Users,
      change: "+12%",
    },
    {
      title: t("pendingUsers"),
      value: isLoading ? "..." : stats?.pendingUsers ?? 0,
      icon: Clock,
      change: "+5%",
    },
    {
      title: t("totalEvents"),
      value: isLoading ? "..." : stats?.totalEvents ?? 0,
      icon: Calendar,
      change: "+18%",
    },
    {
      title: t("totalInvitations"),
      value: isLoading ? "..." : stats?.totalInvitations ?? 0,
      icon: Mail,
      change: "+9%",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
              {item.change} <span className="text-muted-foreground">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
