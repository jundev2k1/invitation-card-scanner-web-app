"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EventStatusBadge,
  SmartDateTime
} from "@/components";
import { CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUpcomingEventsList } from "./useUpcomingEventsList";

export function UpcomingEventsList() {
  const t = useTranslations("dashboard.upcomingEvents");
  const {
    upcomingEvents,
    isLoading,
    redirectToList,
  } = useUpcomingEventsList();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{t("title")}</CardTitle>
        <Button variant="outline" size="sm" onClick={redirectToList}>
          {t("viewAll")}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-10 w-10 rounded bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : upcomingEvents?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">{t("noUpcoming")}</div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents?.map(event => (
              <div key={event.id} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    <SmartDateTime date={event.startAt} />
                  </p>
                </div>
                <EventStatusBadge status={event.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
