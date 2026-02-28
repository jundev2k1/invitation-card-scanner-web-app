"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components";
import { useTranslations } from "next-intl";
import { useInvitationMetrics } from "./useInvitationMetrics";

export function InvitationMetrics() {
  const t = useTranslations("dashboard.invitationMetrics");
  const { invitationStats, isLoading } = useInvitationMetrics();

  const metrics = [
    { label: t("created"), value: isLoading ? "..." : invitationStats?.created ?? 0 },
    { label: t("draft"), value: isLoading ? "..." : invitationStats?.draft ?? 0 },
    { label: t("used"), value: isLoading ? "..." : invitationStats?.used ?? 0 },
    { label: t("disabled"), value: isLoading ? "..." : invitationStats?.disabled ?? 0 },
  ];

  const conversion = invitationStats?.conversionRate ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-bold">{m.value}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t("conversionRate")}</p>
          <p className="text-3xl font-bold text-emerald-600">{conversion}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
