"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  UserStatusBadge
} from "@/components";
import { useTranslations } from "next-intl";
import { usePendingUsersList } from "./usePendingUsersList";

export function PendingUsersList() {
  const t = useTranslations("dashboard.pendingUsers");
  const {
    isLoading,
    pendingUsers,
    redirectToList,
  } = usePendingUsersList();

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
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : pendingUsers?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">{t("noPending")}</div>
        ) : (
          <div className="space-y-4">
            {pendingUsers?.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                  <AvatarFallback>{user.nickname?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.nickname}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <UserStatusBadge status={user.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
