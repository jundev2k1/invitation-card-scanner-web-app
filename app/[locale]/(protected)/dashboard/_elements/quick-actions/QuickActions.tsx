"use client";

import { Button } from "@/components";
import { RouteUtil } from "@/root/app/utils/route";
import { PlusCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export const QuickActions = React.memo(() => {
  const t = useTranslations("dashboard.quickActions");
  const locale = useLocale();
  const router = useRouter();

  const redirectToEventList = () => useCallback(() => {
    router.push(RouteUtil.getEventListRoute(locale));
  }, []);

  const redirectToUserList = () => useCallback(() => {
    router.push(RouteUtil.getUserListRoute(locale));
  }, []);

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        leftIcon={<PlusCircle />}
        onClick={redirectToEventList}
      >
        {t("createEvent")}
      </Button>

      <Button
        leftIcon={<PlusCircle />}
        variant="outline"
        className="dark:text-foreground"
        onClick={redirectToEventList}
      >
        {t("createInvitation")}
      </Button>

      <Button
        variant="ghost"
        className="dark:text-foreground"
        onClick={redirectToUserList}
      >
        {t("manageUsers")}
      </Button>
    </div>
  );
});
